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

import {computed} from "vue";
import _ from "lodash";
import {defaultClasses} from "../../defaults";

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

const classes = computed(
    () => (props.outline
        ? _.get(defaultClasses, props.variant + '.outline.classes')
        : _.get(defaultClasses, props.variant + '.solid.classes')
    ).concat(props.disabled ? ['cursor-not-allowed'] : [])
);

const baseClasses = computed(
    () => _.get(defaultClasses, props.variant + '.baseClasses')
);

const insetClasses = computed(
    () => props.outline
        ? _.get(defaultClasses, props.variant + '.outline.insetClasses')
        : _.get(defaultClasses, props.variant + '.solid.insetClasses')
);

</script>

<style scoped>

</style>
