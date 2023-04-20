<script setup lang="ts">
import { add } from '@wendraw/lib'

defineProps<{
  text: string
}>()
</script>

<template>
  <button>
    {{ `${text} HMR ${add(1, 2)}` }}
  </button>
</template>
