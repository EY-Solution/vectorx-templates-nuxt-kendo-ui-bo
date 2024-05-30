<template>
  <div>
    <div>
      <VxBox direction="col">
        <VxItem ratio="1">
          <VxFieldSet>
            <VxFieldRow :ratio="[33.33, 33.33, 33.33]">
              <VxField left v-for="(item, idx) in props.options" :label="item.title" :key="idx"> {{ item }}</VxField>
            </VxFieldRow>
          </VxFieldSet>
        </VxItem>
        <VxItem ratio="2">
          <VxButtonBar backgroundColor="#fff">
            <VxButtonBox right>
              <v-btn>검색</v-btn>
              <v-btn>초기화</v-btn>
              <v-btn>개인화</v-btn>
            </VxButtonBox>
          </VxButtonBar>
        </VxItem>
      </VxBox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComboBox } from '@progress/kendo-vue-dropdowns'
interface initOptions {
  title: string
  objects: any[]
}

const props = defineProps<{ options: initOptions[] }>()

onBeforeMount(() => {
  console.log('props : ', props)
})

const countries = [
  { value: null, text: '전체' },
  { value: 'KR', text: '대한민국' },
  { value: 'US', text: '미국' },
  { value: 'CN', text: '중국' },
  { value: 'JP', text: '일본' },
]
</script>

<style scoped></style>
