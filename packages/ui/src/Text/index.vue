<script setup lang="ts">
import { add } from '@wendraw/lib'

defineProps<{
  content: string
}>()
</script>

<template>
  <div>
    {{ content + add(1, 2) }}
  </div>
</template>
