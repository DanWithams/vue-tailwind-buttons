<template>
    <button type="button" class="focus:outline-none group" :class="buttonClasses">
        <div class="relative select-none" :class="baseClasses">
            <div class="absolute inset-0" :class="mergeTwClasses(baseInsetClasses, buttonInsetClasses)"></div>
            <div class="flex flex-row justify-center items-center">
                <slot name="default"></slot>
            </div>
        </div>
    </button>
</template>

<script setup>
import {mergeTwClasses} from "tailwind-helpers";
import {useBaseButton} from "../index";

const {baseClasses, baseInsetClasses} = useBaseButton();

const props = defineProps({
    buttonClasses: {
        type: [Array, String],
        required: false,
        default: '',
    },
    buttonInsetClasses: {
        type: [Array, String],
        required: false,
        default: '',
    },
});

</script>

<style scoped>

</style>
