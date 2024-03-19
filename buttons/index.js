import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";

let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];
let buttonRoundedDefaultCore = 'rounded';


export function getButtonRoundedDefault() {
    console.log('buttonRoundedDefault', buttonRoundedDefaultCore);
    return buttonRoundedDefaultCore;
}

export function setButtonRoundedDefault(rounded) {
    console.log('buttonRoundedDefault', rounded);
    buttonRoundedDefaultCore = rounded;
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

export const makeUseButtons = () => {
    console.log('makeUseButtons', getButtonRoundedDefault());
    return (props, options = { classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) => {
        console.log('useButtons', getButtonRoundedDefault());
        const buttonRoundedDefault = ref(getButtonRoundedDefault());
        const buttonClasses = computed(() => {
            const classes = ! props.outline
                ? mergeTwClasses(options.classes, props.rounded || buttonRoundedDefault.value)
                : mergeTwClasses(options.classesOutline, props.rounded || buttonRoundedDefault.value);

            if (props.disabled) {
                classes.push('cursor-not-allowed');
            }

            return classes;
        });

        const buttonInsetClasses = computed(() => {
            console.log('useBs::buttonRoundedDefault.value', buttonRoundedDefault.value);
            console.log('useBs::buttonRoundedDefaultString', options.buttonRoundedDefault);
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
}
