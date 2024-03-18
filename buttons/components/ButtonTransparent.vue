<template>
    <BaseButton :button-classes="buttonClasses" :button-inset-classes="buttonInsetClasses" :disabled="disabled">
        <template v-slot:default>
            <slot name="default"></slot>
        </template>
    </BaseButton>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import {useButtons} from "../index";

const props = defineProps({
    outline: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    rounded: {
        type: [String, null],
        required: false,
        default: null,
    },
});

const { buttonClasses, buttonInsetClasses } = useButtons(
    props,
    {
        classes: [ 'bg-transparent', 'hover:bg-transparent', 'focus:bg-transparent', 'text-indigo-400',  'hover:text-indigo-700' ],
        classesOutline: [],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [],
    }
);

</script>

<style scoped>

</style>
