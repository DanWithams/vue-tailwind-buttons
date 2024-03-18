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
        classes: [ 'bg-cyan-400', 'text-zinc-100', 'dark:bg-cyan-500', 'hover:bg-cyan-500', 'dark:hover:bg-cyan-700', 'focus:bg-cyan-500', 'dark:focus:bg-cyan-700' ],
        classesOutline: [ 'bg-transparent', 'text-cyan-400', 'dark:text-cyan-500', 'hover:text-cyan-500', 'dark:hover:text-cyan-700', 'focus:text-cyan-500', 'dark:focus:text-cyan-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-cyan-400', 'dark:border-cyan-500', 'group-hover:border-cyan-500', 'dark:group-hover:border-cyan-700', 'group-focus:border-cyan-500', 'dark:group-focus:border-cyan-700' ],
    }
);
</script>

<style scoped>

</style>
