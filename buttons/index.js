import {computed, ref} from "vue";
import {mergeTwClasses} from "tailwind-helpers";
import {buttonRoundedDefault} from "./defaults";

let baseClasses = ['px-6', 'py-2', 'font-semibold'];
let baseInsetClasses = [];
let baseOuterClasses = [];
// export let buttonRoundedDefault = ref('rounded');

let value = 'foo';
let valueX = { value: 'foo' };

export const mutator = {
    getValue() {
        return value;
    },
    setValue(v) {
        value = v;
    },
    getValueX() {
        return valueX.value;
    },
    setValueX(v) {
        valueX = v;
    }
};

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

export const useButtons = (props, options = { classes: [], classesOutline: [], insetClasses: [], insetClassesOutline: [] }) => {
    console.log('useBs', buttonRoundedDefault.value);
    console.log('useBs', getButtonRoundedDefault());
    console.log('v', value);
    console.log('vx', valueX.value);
    const buttonClasses = computed(() => {
        console.log(buttonRoundedDefault.value);
        console.log(getButtonRoundedDefault());
        console.log('v', value);
        console.log('vx', valueX.value);
        const classes = ! props.outline
            ? mergeTwClasses(options.classes, props.rounded || buttonRoundedDefault.value)
            : mergeTwClasses(options.classesOutline, props.rounded || buttonRoundedDefault.value);

        if (props.disabled) {
            classes.push('cursor-not-allowed');
        }

        return classes;
    });

    const buttonInsetClasses = computed(() => {
        console.log(buttonRoundedDefault.value);
        console.log(getButtonRoundedDefault());
        console.log('v', value);
        console.log('vx', valueX.value);
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
