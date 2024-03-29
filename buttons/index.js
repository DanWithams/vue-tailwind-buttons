import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";
import {mergeDefaultClasses} from "./defaults";

let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];

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

export const useButtons = (props, options = { rounded: 'rounded', classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) => {
    const buttonRoundedDefault = ref(options.rounded)
    console.log(buttonRoundedDefault.value);
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

export const createVueButtons = (options = { classes: {} }) => {
    return {
        install(app) {
            console.log(mergeDefaultClasses(options.classes));
            app.provide('vueButtonDefaults', mergeDefaultClasses(options.classes));
        }
    }
}