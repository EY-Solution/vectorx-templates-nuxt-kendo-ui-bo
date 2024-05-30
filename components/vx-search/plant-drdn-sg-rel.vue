<template>
  <div>
    <VxBox direction="row">
      <VxItem ratio="1" style="margin-right: 5px">
        <DropDownList
          v-model="modelPlantCd"
          :dataItems="plantListFilter"
          :valuePrimitive="valuePrimitivePlant"
          textField="plantNm"
          valueField="plantCd"
          :filterable="true"
          @change="onPlantChange"
          @filterchange="onPlantFilterChange"
        />
      </VxItem>

      <VxItem ratio="2" style="margin-right: 5px">
        <DropDownList
          v-model="modelSectionCd"
          :dataItems="setcionListFilter"
          :valuePrimitive="valuePrimitiveSection"
          textField="plantSectionNm"
          valueField="plantSectionCd"
          :filterable="true"
          :value="modelSectionCd"
          @change="onSectionChange"
          @filterchange="onSectionFilterChange"
        />
      </VxItem>

      <VxItem ratio="2">
        <DropDownList
          v-model="modelPlantLocCd"
          :dataItems="locationListFilter"
          textField="plantLocNm"
          valueField="plantLocCd"
          :valuePrimitive="valuePrimitiveLocation"
          :filterable="true"
          :value="modelPlantLocCd"
          @change="onLocationChange"
          @filterchange="onLocationilterChange"
        />
      </VxItem>
    </VxBox>
  </div>
</template>

<script setup lang="ts">
import { DropDownList } from '@progress/kendo-vue-dropdowns'
import { InterfaceTmpPlant } from '~/models/samples/sample/inf-tmp-plant'
import { tmpPlantService } from '~/services/samples/sample/api-tmp-plant'
import { filterBy } from '@progress/kendo-data-query'
import { object } from '@vectorx/nuxt/src/plugins/runtime/yup.ko'

const plantService = tmpPlantService()
const modelPlantCd = defineModel<string>('plantCd')
const modelSectionCd = defineModel<string>('plantSectionCd')
const modelPlantLocCd = defineModel<string>('plantLocCd')

const plantList = ref<InterfaceTmpPlant[]>()
const setcionList = ref<InterfaceTmpPlant[]>([])
const locationList = ref<InterfaceTmpPlant[]>()

const plantListFilter = ref<InterfaceTmpPlant[]>()
const setcionListFilter = ref<InterfaceTmpPlant[]>([])
const locationListFilter = ref<InterfaceTmpPlant[]>()

const valuePrimitivePlant = ref<boolean>(true)

//컴포넌트에 2개초과하는 Dropdown이 존재하는경우 valuePrimitive옵션이 default - true이면 Kendo에서 findIndex오류를 발생시킨다.
const valuePrimitiveSection = ref<boolean>(false)
const valuePrimitiveLocation = ref<boolean>(false)

//이벤트 시작
const onPlantChange = event => {
  modelPlantCd.value = event.value
  modelSectionCd.value = null
  modelPlantLocCd.value = null

  nextTick(() => {
    getSectionList()
  })
}

const onPlantFilterChange = event => {
  const data = plantList.value.slice()
  plantListFilter.value = filterBy(data, event.filter)
}

const onSectionFilterChange = event => {
  const data = setcionList.value.slice()
  setcionListFilter.value = filterBy(data, event.filter)
}

const onLocationilterChange = event => {
  const data = locationList.value.slice()
  locationListFilter.value = filterBy(data, event.filter)
}

const onSectionChange = event => {
  modelSectionCd.value = event.value
  modelPlantLocCd.value = null
  nextTick(() => {
    getLocationList()
  })
}

const onLocationChange = event => {
  modelPlantLocCd.value = event.value
}

//이벤트종료 시작

//목록 가져오기 시작
async function getSectionList() {
  if (!modelPlantCd.value) {
    setcionList.value = []
    return
  }

  const param = ref<InterfaceTmpPlant>({})
  param.value.plantCd = modelPlantCd.value
  setcionList.value = await plantService.selectTmpSectionList(param.value)
  setcionListFilter.value = setcionList.value.slice()
  valuePrimitiveSection.value = true
}

async function getLocationList() {
  if (!modelSectionCd.value) {
    locationList.value = []
    return
  }

  const param = ref<InterfaceTmpPlant>({})
  param.value.plantSectionCd = modelSectionCd.value
  locationList.value = await plantService.selectTmpLocationList(param.value)
  locationListFilter.value = locationList.value.slice()
  valuePrimitiveLocation.value = true
}
//목록 가져오기 종료

plantList.value = await plantService.selectTmpPlantList()
setcionList.value = []
locationList.value = []

plantListFilter.value = plantList.value.slice()
</script>

<style scoped></style>
