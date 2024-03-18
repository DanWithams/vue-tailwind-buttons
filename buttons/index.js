import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";


let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];
export const buttonRoundedDefault = ref('rounded');

export function getButtonRoundedDefault() {
    console.log('getButtonRoundedDefault', buttonRoundedDefault.value);
    return buttonRoundedDefault.value;
}

export function setButtonRoundedDefault(rounded) {
    console.log('setButtonRoundedDefault', rounded);
    buttonRoundedDefault.value = rounded;
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

export function useButtons(props, options = { classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) {
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
