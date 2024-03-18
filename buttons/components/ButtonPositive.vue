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
        classes: [ 'bg-green-400', 'text-zinc-100', 'dark:bg-green-500', 'hover:bg-green-500', 'dark:hover:bg-green-700', 'focus:bg-green-700' ],
        classesOutline: [ 'bg-transparent', 'text-green-400', 'dark:text-green-500', 'hover:text-green-500', 'dark:hover:text-green-700', 'focus:text-green-500', 'focus:text-green-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-green-400', 'dark:border-green-500', 'group-hover:border-green-500', 'dark:group-hover:border-green-700', 'group-focus:border-green-500', 'dark:group-focus:border-green-700' ],
    }
);

</script>

<style scoped>

</style>
