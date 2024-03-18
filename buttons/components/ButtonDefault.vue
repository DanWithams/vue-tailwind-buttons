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
        classes: [ 'bg-zinc-400', 'text-zinc-100', 'dark:bg-zinc-500', 'hover:bg-zinc-500', 'dark:hover:bg-zinc-700', 'focus:bg-zinc-500', 'dark:focus:bg-zinc-700' ],
        classesOutline: [ 'bg-transparent', 'text-zinc-400', 'dark:text-zinc-500', 'hover:text-zinc-500', 'dark:hover:text-zinc-700', 'focus:text-zinc-500', 'dark:focus:text-zinc-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-zinc-400', 'dark:border-zinc-500', 'group-hover:border-zinc-500', 'dark:group-hover:border-zinc-700', 'group-focus:border-zinc-500', 'dark:group-focus:border-zinc-700' ],
    }
);

</script>

<style scoped>

</style>
