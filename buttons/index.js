import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";

let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];
let buttonRoundedDefaultString = 'rounded';


export function getButtonRoundedDefault() {
    console.log('buttonRoundedDefaultString', buttonRoundedDefaultString);
    return buttonRoundedDefaultString;
}

export function setButtonRoundedDefault(rounded) {
    console.log('buttonRoundedDefaultString', rounded);
    buttonRoundedDefaultString = rounded;
}

export function updateBaseButtonClasses(classes, insetClasses, outerClasses) {
    baseClasses = classes;
    baseInsetClasses = insetClasses;
    baseOuterClasses = outerClasses;
}

export function extendBaseButtonClasses(classes, insetClasses, outerClasses) {
    baseClasses = mergeTwClasses(baseClasses, classes);
    baseInsetClasses = mergeTwClasses(baseInsetClasses, insetClasses);
    baseOuterClasses = mergeTwClasses(baseOuterClasses, outerClasses);
}

export function useBaseButton() {
    return {
        baseClasses,
        baseInsetClasses
    };
}

export const useButtons = (props, options = { classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) => {
    const buttonRoundedDefault = ref(buttonRoundedDefaultString);
    console.log('useBs::buttonRoundedDefault.value', buttonRoundedDefault.value);
    console.log('useBs::getButtonRoundedDefault()', getButtonRoundedDefault());
    console.log('useBs::buttonRoundedDefaultString', buttonRoundedDefaultString);
    const buttonClasses = computed(() => {
        console.log('c1::buttonRoundedDefault.value', buttonRoundedDefault.value);
        console.log('c1::getButtonRoundedDefault()', getButtonRoundedDefault());
        console.log('c1::buttonRoundedDefaultString', buttonRoundedDefaultString);
        const classes = ! props.outline
            ? mergeTwClasses(options.classes, props.rounded || buttonRoundedDefault.value)
            : mergeTwClasses(options.classesOutline, props.rounded || buttonRoundedDefault.value);

        if (props.disabled) {
            classes.push('cursor-not-allowed');
        }

        return classes;
    });

    const buttonInsetClasses = computed(() => {
        console.log('c2::buttonRoundedDefault.value', buttonRoundedDefault.value);
        console.log('c2::getButtonRoundedDefault()', getButtonRoundedDefault());
        console.log('c2::buttonRoundedDefaultString', buttonRoundedDefaultString);
        const classes = ! props.outline
            ? mergeTwClasses(options.insetClasses, props.rounded || buttonRoundedDefault.value)
            : mergeTwClasses(options.insetClassesOutline, props.rounded || buttonRoundedDefault.value);

        if (props.disabled) {
            classes.push('cursor-not-allowed');
        }

        return classes;
    });

    return {
        buttonClasses,
        buttonInsetClasses,
    };
}
