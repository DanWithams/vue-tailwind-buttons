import {computed} from "vue";
import {mergeTwClasses} from "tailwind-helpers";


let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];
let buttonRoundedDefault = 'rounded';

export function getButtonRoundedDefault() {
    return buttonRoundedDefault;
}

export function setButtonRoundedDefault(rounded) {
    buttonRoundedDefault = rounded;
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
            ? mergeTwClasses(options.classes, props.rounded || getButtonRoundedDefault())
            : mergeTwClasses(options.classesOutline, props.rounded || getButtonRoundedDefault());

        if (props.disabled) {
            classes.push('cursor-not-allowed');
        }

        return classes;
    });

    const buttonInsetClasses = computed(() => {
        const classes = ! props.outline
            ? mergeTwClasses(options.insetClasses, props.rounded || getButtonRoundedDefault())
            : mergeTwClasses(options.insetClassesOutline, props.rounded || getButtonRoundedDefault());

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
