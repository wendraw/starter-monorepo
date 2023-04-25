<script setup lang="ts">
import { Button } from '@wendraw/ui'
import { minus } from '@wendraw/lib'

import { add as add2 } from '@wendraw/lib2'
</script>

<template>
  <div>
    <Button text="haha" />
    <div icon-btn i-ri:add-circle-fill w-4 h-4 />
    <div>{{ `1 + 2 = ${add2(1, 2)}` }}</div>
    <div>{{ `1 - 2 = ${minus(1, 2)}` }}</div>
  </div>
</template>
