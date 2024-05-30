<template>
  <div>
    <div>
      <VxBox direction="col">
        <VxItem>
          <VxFieldSet>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="120" left label="공정">
                <VxSearchPlantDrdnSgRel
                  v-model:plantCd="searcData.plantCd"
                  v-model:plantSectionCd="searcData.plantSectionCd"
                  v-model:plantLocCd="searcData.plantLocCd"
                />
              </VxField>
            </VxFieldRow>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="120" left label="공정">
                <VxSearchPlantComboSgRel
                  v-model:plantCd="searcData.plantCd"
                  v-model:plantSectionCd="searcData.plantSectionCd"
                  v-model:plantLocCd="searcData.plantLocCd"
                ></VxSearchPlantComboSgRel>
              </VxField>
            </VxFieldRow>
            <VxFieldRow :ratio="[100]">
              <VxField labelWidth="120" left label="기능위치">
                <VxSearchPlantLocTextPop></VxSearchPlantLocTextPop>
              </VxField>
            </VxFieldRow>
          </VxFieldSet>
        </VxItem>
        <VxItem>
          <VxButtonBar backgroundColor="#fff">
            <VxButtonBox right>
              <v-btn @click="btnClick">검색</v-btn>
              <v-btn @click="reset">초기화</v-btn>
              <v-btn>개인화</v-btn>
            </VxButtonBox>
          </VxButtonBar>
        </VxItem>
      </VxBox>
    </div>
    <div style="margin-top: 7px">
      <Grid
        ref="grid"
        :style="{ height: '550px', width: '100%' }"
        :columns="columns"
        :dataItems="gridList"
        :resizable="true"
        :editField="'inEdit'"
        @cellclick="cellClick"
      >
      </Grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InterfaceTmpPlant } from '~/models/samples/sample/inf-tmp-plant'
import { tmpPlantService } from '~/services/samples/sample/api-tmp-plant'
import { Grid } from '@progress/kendo-vue-grid'

const plantService = tmpPlantService()
const gridList = ref<InterfaceTmpPlant[]>([])

const searcData = reactive({
  plantCd: null,
  plantSectionCd: null,
  plantLocCd: null,
})

const editField = ref<string>()
const inEdit = ref<string>()

const cellClick = event => {
  if (event.dataItem.inEdit && event.field === editField.value) {
    return
  }

  editField.value = event.field

  console.log('editField.value : ', editField.value)

  event.dataItem.inEdit = event.field

  console.log('event.dataItem : ', toRaw(event.dataItem))

  inEdit.value = event.field
}

function reset() {
  useDeepMerge(searcData, {
    plantCd: null,
    plantSectionCd: null,
    plantLocCd: null,
  })
}

const columns = [
  { field: 'idx', title: 'No.', width: '60px', className: 'text-center', editable: true },
  { field: 'plantCd', title: 'Plant', width: '120px', className: 'text-center', editable: true },
  { field: 'plantLocCd', title: 'Loc ID', width: '120px', className: 'text-center text-red', editable: true },
  { field: 'plantLocNm', title: 'Loc NM', width: '250px', className: 'text-blue', editable: true },
  { field: 'useYn', title: 'Use', width: '80px', className: 'text-center', editable: true },
  { field: 'plantSectionCd', title: 'Section', width: '150px', editable: true },
  { field: 'operationCd', title: 'operationCd', width: '150px', editable: true },
  { field: 'createUser', title: '생성자', width: '100px', className: 'text-center bg-gray', editable: true },
  { field: 'createDate', title: '생성일', width: '120px', editable: true },
  { field: 'lstUptUser', title: '수정자', width: '100px', editable: true },
  { field: 'lstUptDate', title: '수정일', width: '120px', editable: true },
]

const btnClick = () => {
  search()
}

async function search() {
  const param: InterfaceTmpPlant = {}
  gridList.value = await plantService.selectTmpGridList(param)
}

reset()

defineOptions({
  name: 'SampleComponent02',
})
</script>

<style></style>
