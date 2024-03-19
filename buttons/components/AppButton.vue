<template>
    <button type="button" class="focus:outline-none group" :class="classes" :disabled="disabled">
        <div class="relative select-none" :class="baseClasses">
            <div class="absolute inset-0" :class="insetClasses"></div>
            <div class="flex flex-row justify-center items-center">
                <slot name="default"></slot>
            </div>
        </div>
    </button>
</template>

<script setup>

import {computed, inject} from "vue";
import _ from "lodash";

const defaults = inject('vueButtonDefaults');

const props = defineProps({
    variant: {
        type: String,
        required: false,
        default: 'primary',
    },
    outline: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    }
});

const classes = computed(() => {
    return (
            props.outline
                ? _.get(defaults, props.variant + '.outline.classes')
                : _.get(defaults, props.variant + '.solid.classes')
        ).concat(['cursor-not-allowed']);
});

const baseClasses = computed(() => {
    return _.get(defaults, props.variant + '.baseClasses')
});

const insetClasses = computed(() => {
    return props.outline
        ? _.get(defaults, props.variant + '.outline.insetClasses')
        : _.get(defaults, props.variant + '.solid.insetClasses')
});

</script>

<style scoped>

</style>
