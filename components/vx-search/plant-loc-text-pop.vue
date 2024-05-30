<template>
  <div>
    <VxBox direction="row">
      <VxItem ratio="1" style="margin-right: 5px">
        <KTextBox placeholder="기능위치명" :show-clear-button="true" :input-prefix="'prefix'" :input-suffix="'suffix'" @keypress="txtSearch">
          <template v-slot:prefix> </template>
          <template v-slot:suffix>
            <SvgIcon :icon="searchIcon" @click="iconClick" style="cursor: pointer" />
            <InputSeparator />
          </template>
        </KTextBox>
      </VxItem>
      <VxItem ratio="2" style="margin-right: 5px">
        <KTextBox :readonly="true"></KTextBox>
      </VxItem>
    </VxBox>
    <VxBox direction="col">
      <VxItem>
        <VxPopPlantLocPop v-model="showPopup"> </VxPopPlantLocPop>
      </VxItem>
    </VxBox>
  </div>
</template>

<script setup lang="ts">
import { TextBox as KTextBox, InputSeparator } from '@progress/kendo-vue-inputs'
import { SvgIcon } from '@progress/kendo-vue-common'
import { searchIcon } from '@progress/kendo-svg-icons'

const iconClick = () => {
  showPopup.value = true
}

const txtSearch = event => {
  console.log('event : ', event)
}

const showPopup = ref<boolean>(false)
</script>

<style scoped></style>
