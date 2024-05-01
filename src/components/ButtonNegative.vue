<template>
    <AppButton variant="negative">
        <template v-slot:default>
            <slot name="default"></slot>
        </template>
    </AppButton>
</template>
<script setup>
import AppButton from "./AppButton.vue";
</script>