<script setup lang="ts">
import { minus } from '@wendraw/lib'
import { add as add2 } from '@wendraw/lib2'

import { Button } from '@wendraw/ui'

import { add as add3 } from '~/utils'
</script>

<template>
  <div>
    <Button text="haha" />
    <div i-ri:add-circle-fill h-4 w-4 icon-btn />
    <div>{{ `1 + 2 = ${add2(1, 2)}` }}</div>
    <div>{{ `1 - 2 = ${minus(1, 2)}` }}</div>
    <div>{{ `1 + 2 = ${add3(1, 2)}` }}</div>
  </div>
</template>
