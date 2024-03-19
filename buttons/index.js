import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";

let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];

import {getButtonRoundedDefault, setButtonRoundedDefault} from "./defaults";
import ButtonPrimary from "./components/ButtonPrimary.vue";

export {getButtonRoundedDefault, setButtonRoundedDefault};

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
    return (props, options = { classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) => {
        const buttonRoundedDefault = ref(getButtonRoundedDefault())
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
}


export const vueButtons = {
    install(app, options) {
        console.log(options);
        app.component('ButtonPrimary', ButtonPrimary)
    }
}