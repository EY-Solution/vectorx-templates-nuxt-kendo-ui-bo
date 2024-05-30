<template>
  <VxPopup v-model="modelValue" :width="1000" :height="700" title="기능위치 선택 팝업">
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
        </VxFieldSet>
      </VxItem>
      <VxItem>
        <VxButtonBar backgroundColor="#fff">
          <VxButtonBox right>
            <v-btn @click="btnClick">검색</v-btn>
            <v-btn @click="reset">초기화</v-btn>
          </VxButtonBox>
        </VxButtonBar>
      </VxItem>
      <VxItem style="margin-top: 15px">
        <Grid
          v-bind="grid.props.value"
          :style="{ height: '400px', width: '100%' }"
          :columns="grid.selection.addCheckBoxColumns(columns, gridData)"
          :dataItems="gridData"
          :resizable="true"
        ></Grid>
      </VxItem>
      <VxItem style="margin-top: 15px">
        {{ selectedVal }}
      </VxItem>
    </VxBox>
  </VxPopup>
</template>

<script setup lang="ts">
import { InterfaceTmpPlant } from '~/models/samples/sample/inf-tmp-plant'
import { tmpPlantService } from '~/services/samples/sample/api-tmp-plant'
import { Grid } from '@progress/kendo-vue-grid'

const plantService = tmpPlantService()
const gridList = ref<InterfaceTmpPlant[]>([])
const modelValue = defineModel<boolean>()

const grid = useKendoUiGrid<any>({
  selection: {
    mode: 'multi',
    selectedField: 'selected',
    keyFieldId: 'idx',
  },
})

// 실제 바인딩 되는 데이터는 아래와 같이 generateData 메소드를 호출하여 computed로 작성한다.
const gridData = computed(() => {
  //초기화 - 창을 닫고 새로 열었을 경우 이전 데이터에 영향을 받지 않게한다.
  if (!modelValue.value) {
    gridList.value = []
    grid.selection.clear()
  }
  return grid.selection.generateData(gridList.value)
})

const selectedVal = computed(() => {
  return grid.selection.selectedItems.value
})

const columns = [
  { field: 'idx', title: 'No.', width: '60px', className: 'text-center' },
  { field: 'plantCd', title: 'Plant', width: '100px', className: 'text-center' },
  { field: 'plantLocCd', title: 'Loc ID', width: '80px', className: 'text-center text-red' },
  { field: 'plantLocNm', title: 'Loc NM', width: '250px', className: 'text-blue' },
  { field: 'useYn', title: 'Use', width: '80px', className: 'text-center' },
  { field: 'plantSectionCd', title: 'Section', width: '100px' },
  { field: 'operationCd', title: 'operationCd', width: '100px', hidden: true },
  { field: 'createUser', title: '생성자', width: '100px', className: 'text-center bg-gray' },
  { field: 'createDate', title: '생성일', width: '120px' },
  { field: 'lstUptUser', title: '수정자', width: '100px', hidden: true },
  { field: 'lstUptDate', title: '수정일', width: '120px' },
]

const btnClick = () => {
  search()
}

async function search() {
  const param: InterfaceTmpPlant = {}
  gridList.value = await plantService.selectTmpGridList(param)
}

const searcData = reactive({
  plantCd: null,
  plantSectionCd: null,
  plantLocCd: null,
})

function reset() {
  useDeepMerge(searcData, {
    plantCd: null,
    plantSectionCd: null,
    plantLocCd: null,
  })
}

reset()
</script>

<style scoped>
.text-center {
  text-align: 'center';
}
.text-red {
  color: red;
}
.text-blue {
  color: blue;
}
.bg-gray {
  background-color: #eaeaea;
}
</style>
