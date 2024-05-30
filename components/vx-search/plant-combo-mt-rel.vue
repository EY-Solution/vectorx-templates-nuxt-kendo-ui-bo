<template>
  <div>
    <VxBox direction="row">
      <VxItem ratio="1" style="margin-right: 5px">
        <VxKMultiSelect
          v-model="modelPlantCd"
          :size="'medium'"
          :dataItems="plantList"
          valuePrimitive
          textField="plantNm"
          valueField="plantCd"
          :autoClose="autoClose"
          placeholder="플랜트"
          @change="onPlantChange"
        />
      </VxItem>
      <VxItem ratio="2" style="margin-right: 5px">
        <VxKMultiSelect
          v-model="modelSectionCd"
          :size="'medium'"
          :dataItems="setcionList"
          valuePrimitive
          textField="plantSectionNm"
          valueField="plantSectionCd"
          :value="modelSectionCd"
          :autoClose="autoClose"
          placeholder="섹션"
          @change="onSectionChange"
          @click="onSectionClick"
        />
      </VxItem>
      <VxItem ratio="2">
        <VxKMultiSelect
          v-model="modelPlantLocCd"
          :size="'medium'"
          :dataItems="locationList"
          valuePrimitive
          textField="plantLocNm"
          valueField="plantLocCd"
          :value="modelPlantLocCd"
          :autoClose="autoClose"
          placeholder="위치"
          @change="onLocationChange"
          @click="onLocationClick"
        />
      </VxItem>
    </VxBox>
  </div>
</template>

<script setup lang="ts">
import { VxKMultiSelect } from '#components'
import { InterfaceTmpPlant } from '~/models/samples/sample/inf-tmp-plant'
import { tmpPlantService } from '~/services/samples/sample/api-tmp-plant'

const plantService = tmpPlantService()

const modelPlantCd = defineModel<string[]>('plantCd')
const modelSectionCd = defineModel<string[]>('plantSectionCd')
const modelPlantLocCd = defineModel<string[]>('plantLocCd')

const autoClose: boolean = false

const plantList = ref<InterfaceTmpPlant[]>()
const setcionList = ref<InterfaceTmpPlant[]>([])
const locationList = ref<InterfaceTmpPlant[]>()

//이벤트 시작
const onPlantChange = event => {
  modelPlantCd.value = event.value

  nextTick(() => {
    resetValues('section')

    nextTick(() => {
      resetValues('location')
    })
  })
}

const onSectionChange = event => {
  modelSectionCd.value = event.value
  nextTick(() => {
    resetValues('location')
  })
}

const onLocationChange = event => {
  modelPlantLocCd.value = event.value
}

const onSectionClick = () => {
  getSectionList()
}

const onLocationClick = () => {
  getLocationList()
}

const resetValues = (typ: 'section' | 'location') => {
  if (typ == 'section') {
    if (!modelPlantCd.value) {
      modelSectionCd.value = []
      modelPlantLocCd.value = []
      return
    }

    if (toRaw(modelPlantCd.value).length == 0) {
      modelSectionCd.value = []
      modelPlantLocCd.value = []
    } else {
      if (setcionList.value) {
        //1번 : 현재 섹션 ID를 가지고 있는 리스트의 집합
        const valueSectionList = toRaw(setcionList.value).filter(item => toRaw(modelSectionCd.value).includes(item.plantSectionCd))

        //1번 리스트에서 유효한 플랜트 코드를 가지고 있는 리스트의 집합
        const reValueSectionList = valueSectionList.filter(item => toRaw(modelPlantCd.value).includes(item.plantCd))
        const reSectionValues: string[] = []
        reValueSectionList.forEach(element => {
          reSectionValues.push(element.plantSectionCd)
        })

        if (modelSectionCd.value) {
          modelSectionCd.value = toRaw(modelSectionCd.value).filter(item => reSectionValues.includes(item))
        }
      }
    }
  }

  if (typ == 'location') {
    if (!modelSectionCd.value) {
      modelPlantLocCd.value = []
      return
    }

    if (toRaw(modelSectionCd.value).length == 0) {
      modelPlantLocCd.value = []
    } else {
      //1번 : 현재 LOC ID를 가지고 있는 리스트의 집합

      if (locationList.value) {
        const valueLocationList = toRaw(locationList.value).filter(item => toRaw(modelPlantLocCd.value).includes(item.plantLocCd))

        //1번 리스트에서 유효한 LOC 코드를 가지고 있는 리스트의 집합
        const reValueLocationList = valueLocationList.filter(item => toRaw(modelSectionCd.value).includes(item.plantSectionCd))

        const reLocationValues: string[] = []
        reValueLocationList.forEach(element => {
          reLocationValues.push(element.plantLocCd)
        })
        if (modelPlantLocCd.value) {
          modelPlantLocCd.value = toRaw(modelPlantLocCd.value).filter(item => reLocationValues.includes(item))
        }
      }
    }
  }
}
//이벤트종료 시작

//목록 가져오기 시작
async function getSectionList() {
  if (!modelPlantCd.value) {
    setcionList.value = []
    return
  }

  //플랜트 값이 없다면 초기화 합니다.
  if (toRaw(modelPlantCd.value).length == 0) {
    setcionList.value = []
    return
  }

  const param = ref<InterfaceTmpPlant>({})
  param.value.plantCds = modelPlantCd.value
  setcionList.value = await plantService.selectTmpSectionList(param.value)
}

async function getLocationList() {
  if (!modelSectionCd.value) {
    locationList.value = []
    return
  }
  //섹션 값이 없다면 초기화 합니다.
  if (toRaw(modelSectionCd.value).length == 0) {
    locationList.value = []
    return
  }

  const param = ref<InterfaceTmpPlant>({})
  param.value.plantSectionCds = modelSectionCd.value
  locationList.value = await plantService.selectTmpLocationList(param.value)
}
//목록 가져오기 종료

plantList.value = await plantService.selectTmpPlantList()
</script>

<style scoped></style>
