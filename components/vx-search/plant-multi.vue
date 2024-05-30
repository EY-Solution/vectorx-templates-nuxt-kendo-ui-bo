<template>
  <div>
    <ComboBox :dataItems="countries" textField="text" valueField="value" />
  </div>
</template>

<script setup lang="ts">
import { ComboBox } from '@progress/kendo-vue-dropdowns'

const countries = [
  { value: null, text: '전체' },
  { value: 'KR', text: '대한민국' },
  { value: 'US', text: '미국' },
  { value: 'CN', text: '중국' },
  { value: 'JP', text: '일본' },
]
</script>

<style lang="scss" scoped></style>
