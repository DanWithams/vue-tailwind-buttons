<template>
    <button type="button" class="focus:outline-none group" :class="classes">
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
    }
});

const classes = computed(() => {
    return props.outline
        ? _.get(defaults, props.variant + '.classesOutline')
        : _.get(defaults, props.variant + '.classes')
});

const baseClasses = computed(() => {
    return _.get(defaults, props.variant + '.baseClasses')
});

const insetClasses = computed(() => {
    return props.outline
        ? _.get(defaults, props.variant + '.insetClassesOutline')
        : _.get(defaults, props.variant + '.insetClasses')
});

</script>

<style scoped>

</style>
