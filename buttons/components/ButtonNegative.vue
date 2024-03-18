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
        classes: [ 'bg-red-400', 'text-zinc-100', 'dark:bg-red-500', 'hover:bg-red-500', 'dark:hover:bg-red-700', 'focus:bg-red-500', 'dark:focus:bg-red-700' ],
        classesOutline: [ 'bg-transparent', 'text-red-400', 'dark:text-red-500', 'hover:text-red-500', 'dark:hover:text-red-700', 'focus:text-red-500', 'dark:focus:text-red-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-red-400', 'dark:border-red-500', 'group-hover:border-red-500', 'dark:group-hover:border-red-700', 'group-focus:border-red-500', 'dark:group-focus:border-red-700' ],
    }
);

</script>

<style scoped>

</style>
