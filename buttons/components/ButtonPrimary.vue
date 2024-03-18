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
        classes: [ 'bg-indigo-400', 'text-zinc-100', 'dark:bg-indigo-500', 'hover:bg-indigo-500', 'dark:hover:bg-indigo-700', 'focus:bg-indigo-500', 'dark:focus:bg-indigo-700' ],
        classesOutline: [ 'bg-transparent', 'text-indigo-400', 'dark:text-indigo-500', 'hover:text-indigo-500', 'dark:hover:text-indigo-700', 'focus:text-indigo-500', 'dark:focus:text-indigo-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-indigo-400', 'dark:border-indigo-500', 'group-hover:border-indigo-500', 'dark:group-hover:border-indigo-700', 'group-focus:border-indigo-500', 'dark:group-focus:border-indigo-700' ],
    }
);

</script>

<style scoped>

</style>
