<script setup lang="ts">
import { add } from '@wendraw/lib'
import { add as add2 } from '@wendraw/lib2'

defineProps<{
  text: string
}>()
</script>

<template>
  <button>
    {{ `${text} HMR` }}
    <div>{{ `add(1, 2): ${add(1, 2)}` }}</div>
    <div>{{ `add2(1, 2): ${add2(1, 2)}` }}</div>
  </button>
</template>
