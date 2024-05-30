<template>
  <div>
    <div>
      <VxBox direction="col">
        <VxItem>
          <VxFieldSet>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="200" left label="공정 멀티콤보"><VxSearchPlantComboMtRel /></VxField>
            </VxFieldRow>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="200" left label="공정 콤보"><VxSearchPlantComboSgRel /></VxField>
            </VxFieldRow>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="200" left label="공정 DropDown "><VxSearchPlantDrdnSgRel /></VxField>
            </VxFieldRow>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="200" left label="팝업오픈"> <VxSearchPopupTest /></VxField>
            </VxFieldRow>
          </VxFieldSet>
        </VxItem>
        <VxItem>
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
    <div>
      <Grid
        :columns="[
          { field: 'country', title: 'Country', width: 150, format: null },
          { field: 'sales', title: 'Sales', width: 200, format: '{0:##,#.00}' },
          { field: 'expenses', title: 'Expenses', width: 200, format: '{0:##,#.00}' },
        ]"
        :dataItems="data"
        style="height: 300px"
        resizable
      >
      </Grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Grid } from '@progress/kendo-vue-grid'

const data = ref([])
</script>

<style scoped></style>
