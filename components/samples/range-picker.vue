<template>
  <VxBox :style="{ height: '880px' }">
    <VxItem>
      <VxButtonBar>
        <VxFieldSet>
          <VxFieldRow flex>
            <VxField label="일자" :totalWidth="410" :labelWidth="100">
              <VxKDateRangePicker format="yyyy-MM-dd" />
            </VxField>
            <VxField label="자재명" :totalWidth="300" :labelWidth="100">
              <TextBox />
            </VxField>
            <VxField label="자재코드" :totalWidth="300" :labelWidth="100">
              <TextBox />
            </VxField>
            <VxButtonBox right top>
              <VxButton
                text="조회"
                type="primary"
                @click="
                  () => {
                    _getData()
                  }
                "
              />
            </VxButtonBox>
          </VxFieldRow>
        </VxFieldSet>
      </VxButtonBar>
    </VxItem>
    <VxItem :ratio="0.99">
      <VxBox direction="row">
        <VxItem :ratio="1" scrollType="auto">
          <VxTab>
            <VTabs v-model="tab" density="compact">
              <VTab value="income"> 입고 리스트 </VTab>
              <VTab value="publish"> 발행 내역 </VTab>
            </VTabs>
            <template #content>
              <VTabsWindow v-model="tab">
                <VTabsWindowItem value="income">
                  <VxBox direction="row" style="padding: 5px">
                    <VxItem :ratio="1" scrollType="auto">
                      <VxSplitpanes style="height: 100%">
                        <VxPane :size="65" :minSize="20" :maxSize="250">
                          <VxBox>
                            <VxItem :ratio="1" scrollType="auto">
                              <Grid
                                :selected-field="selectedFieldIncome"
                                :columns="columnsIncome"
                                :dataItems="gridDataIncome"
                                style="height: 100%"
                                resizable
                                @selectionchange="onSelectionChangeIncome"
                                @headerselectionchange="onHeaderSelectionChangeIncome"
                                @rowclick="onRowClickIncome"
                              >
                              </Grid>
                            </VxItem>
                          </VxBox>
                        </VxPane>
                        <VxPane :size="35" :minSize="20" :maxSize="250">
                          <VxBox :style="{ 'background-color': '#FFFFFF' }">
                            <VxItem>
                              <VxFieldRow flex>
                                <VxField label="자재코드" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field00" />
                                </VxField>
                                <VxField label="자재명" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field01" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="Lot No" :totalWidth="600" :labelWidth="100">
                                  <TextBox v-model="formData.field02" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="수량" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field03" />
                                </VxField>
                                <VxField label="수량단위" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field04" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="무게" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field05" />
                                </VxField>
                                <VxField label="무게단위" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field06" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="제조일" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field07" />
                                </VxField>
                                <VxField label="사용기한" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field08" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="라벨번호" :totalWidth="600" :labelWidth="100">
                                  <TextBox v-model="formData.field09" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="자재구성 수" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field10" />
                                </VxField>
                                <VxField label="세트 수" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field11" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="프로젝트 번호" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field12" />
                                </VxField>
                                <VxField label="제조번호" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field13" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="업체코드" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field14" />
                                </VxField>
                                <VxField label="업체명" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field15" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="실중량" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field16" />
                                </VxField>
                                <VxField label="총중량" :totalWidth="300" :labelWidth="100">
                                  <TextBox v-model="formData.field17" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="판매처" :totalWidth="600" :labelWidth="100">
                                  <TextBox v-model="formData.field18" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="비고" :totalWidth="600" :labelWidth="100">
                                  <TextBox v-model="formData.field19" />
                                </VxField>
                              </VxFieldRow>
                              <VxFieldRow flex>
                                <VxField label="여분항목" :totalWidth="600" :labelWidth="100">
                                  <TextBox v-model="formData.field20" />
                                </VxField>
                              </VxFieldRow>
                              <VxButtonBox right top>
                                <VxButton
                                  text="초기화"
                                  type="primary"
                                  @click="
                                    () => {
                                      _reset()
                                    }
                                  "
                                />
                                <VxButton
                                  text="저장"
                                  type="primary"
                                  @click="
                                    () => {
                                      _save()
                                    }
                                  "
                                />
                                <VxButton
                                  text="출력"
                                  type="primary"
                                  @click="
                                    () => {
                                      _print()
                                    }
                                  "
                                />
                              </VxButtonBox>
                            </VxItem>
                          </VxBox>
                        </VxPane>
                      </VxSplitpanes>
                    </VxItem>
                  </VxBox>
                </VTabsWindowItem>
                <VTabsWindowItem value="publish">
                  <VxBox direction="row" style="padding: 5px">
                    <VxItem :ratio="1" scrollType="auto">
                      <Grid
                        :selected-field="selectedFieldPublish"
                        :columns="columnsPublish"
                        :dataItems="gridDataPublish"
                        style="height: 100%"
                        resizable
                        @selectionchange="onSelectionChangePublish"
                        @headerselectionchange="onHeaderSelectionChangePublish"
                        @rowclick="onRowClickPublish"
                      >
                      </Grid>
                    </VxItem>
                  </VxBox>
                </VTabsWindowItem>
              </VTabsWindow>
            </template>
          </VxTab>
        </VxItem>
      </VxBox>
      <VxPopup v-model="showPopup" :width="800" :height="500" title="라벨 출력">
        <VxBox direction="col">
          <VxItem :ratio="1" scrollType="auto">
            <!-- <img src="~/assets/images/label.png" /> -->
          </VxItem>
        </VxBox>
        <template #buttonsRight>
          <VxButton text="닫기" type="primary" @click="_closePopup" />
        </template>
      </VxPopup>
    </VxItem>
  </VxBox>
</template>

<script lang="ts" setup>
import { Grid } from '@progress/kendo-vue-grid'
import { TextBox } from '@progress/kendo-vue-inputs'

const tab = ref()

const gridDataIncome = ref([])
const selectedFieldIncome = ref('selected')

const columnsStaticIncome = [
  { field: 'incomeNo', title: '입고번호', width: 100 },
  { field: 'incomeDate', title: '입고일', width: 110 },
  { field: 'labelType', title: '라벨타입', width: 80 },
  { field: 'lotNo', title: 'Lot No', width: 120 },
  { field: 'materialNo', title: '자재코드', width: 100 },
  { field: 'materialName', title: '자재명', width: 400 },
  { field: 'count', title: '수량', width: 50 },
  { field: 'unit', title: '단위', width: 50 },
  { field: 'projectName', title: '프로젝트명', width: 400 },
  { field: 'companyName', title: '업체명', width: 250 },
  { field: 'productDate', title: '제조일', width: 110 },
  { field: 'note', title: '비고', width: 400 },
]

const _getDataIncome = () => {
  let data = []
  data.push({
    incomeNo: '240701-01',
    incomeDate: '2024-07-04',
    labelType: '단일자재',
    lotNo: 'L2392110-B',
    materialNo: '7632845',
    materialName: '스프링 T4-L120(SWOSC-V)V+ OD23',
    count: '22',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  data.push({
    incomeNo: '240701-02',
    incomeDate: '2024-07-01',
    labelType: '단일자재',
    lotNo: '',
    materialNo: '7620237',
    materialName: '보호관(A) CV154PMIJ 137B ID233-480L(N)',
    count: '1',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  data.push({
    incomeNo: '240701-03',
    incomeDate: '2024-06-30',
    labelType: '단일자재',
    lotNo: '',
    materialNo: '7620238',
    materialName: '보호관(B) CV154PMIJ 137B ID233-710L(N)',
    count: '1',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  // { incomeNo: '', incomeDate: '', labelType: '', lotNo: '', materialNo: '', materialName: '', count: '', unit: '', projectName: '', companyName: '', productDate: '', note: '' },

  data = data.map(item => {
    return { ...item, selected: false }
  })

  return data
}

const areAllSelectedIncome = computed(() => {
  return gridDataIncome.value.findIndex(item => item.selected === false) === -1
})

const columnsIncome = computed(() => {
  return [{ field: 'selected', width: '50px', headerSelectionValue: areAllSelectedIncome.value }, ...columnsStaticIncome]
})

const onHeaderSelectionChangeIncome = event => {
  const checked = event.event.target.checked
  gridDataIncome.value = gridDataIncome.value.map(item => {
    return { ...item, selected: checked }
  })
}

const onSelectionChangeIncome = event => {
  event.dataItem[selectedFieldIncome.value] = !event.dataItem[selectedFieldIncome.value]
}

const onRowClickIncome = event => {
  event.dataItem[selectedFieldIncome.value] = !event.dataItem[selectedFieldIncome.value]
  formData.value = fieldData
}

const gridDataPublish = ref([])
const selectedFieldPublish = ref('selected')

const columnsStaticPublish = [
  { field: 'incomeNo', title: '입고번호', width: 100 },
  { field: 'incomeDate', title: '입고일', width: 110 },
  { field: 'labelType', title: '라벨타입', width: 80 },
  { field: 'lotNo', title: 'Lot No', width: 120 },
  { field: 'materialNo', title: '자재코드', width: 100 },
  { field: 'materialName', title: '자재명', width: 400 },
  { field: 'count', title: '수량', width: 50 },
  { field: 'unit', title: '단위', width: 50 },
  { field: 'projectName', title: '프로젝트명', width: 400 },
  { field: 'companyName', title: '업체명', width: 250 },
  { field: 'productDate', title: '제조일', width: 110 },
  { field: 'note', title: '비고', width: 400 },
]

const _getDataPublish = () => {
  let data = []
  data.push({
    incomeNo: '240701-04',
    incomeDate: '2024-06-28',
    labelType: '단일자재',
    lotNo: 'L2392111-B',
    materialNo: '7208521',
    materialName: '접지단자(1) OF220 NJB,SJB',
    count: '2',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  data.push({
    incomeNo: '240701-05',
    incomeDate: '2024-06-25',
    labelType: '단일자재',
    lotNo: 'L2392112-B',
    materialNo: '7206523',
    materialName: '납스페이서 PB 23TX40W LS-380',
    count: '2',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  data.push({
    incomeNo: '240701-06',
    incomeDate: '2024-06-20',
    labelType: '단일자재',
    lotNo: 'L2392113-B',
    materialNo: '7617650',
    materialName: '열수축튜브 360/140-750 NO.1175 300A',
    count: '1',
    unit: 'EA',
    projectName: '한전 154KV 남전',
    companyName: '한전',
    productDate: '2024-06-21',
    note: '',
  })
  // { incomeNo: '', incomeDate: '', labelType: '', lotNo: '', materialNo: '', materialName: '', count: '', unit: '', projectName: '', companyName: '', productDate: '', note: '' },

  data = data.map(item => {
    return { ...item, selected: false }
  })

  return data
}

const areAllSelectedPublish = computed(() => {
  return gridDataPublish.value.findIndex(item => item.selected === false) === -1
})

const columnsPublish = computed(() => {
  return [{ field: 'selected', width: '50px', headerSelectionValue: areAllSelectedPublish.value }, ...columnsStaticPublish]
})

const onHeaderSelectionChangePublish = event => {
  const checked = event.event.target.checked
  gridDataPublish.value = gridDataPublish.value.map(item => {
    return { ...item, selected: checked }
  })
}

const onSelectionChangePublish = event => {
  event.dataItem[selectedFieldPublish.value] = !event.dataItem[selectedFieldPublish.value]
}

const onRowClickPublish = event => {
  event.dataItem[selectedFieldPublish.value] = !event.dataItem[selectedFieldPublish.value]
  formData.value = fieldData
}

const _getData = () => {
  gridDataIncome.value = _getDataIncome()
  gridDataPublish.value = _getDataPublish()
}

type FieldData = {
  field00: string
  field01: string
  field02: string
  field03: string
  field04: string
  field05: string
  field06: string
  field07: string
  field08: string
  field09: string
  field10: string
  field11: string
  field12: string
  field13: string
  field14: string
  field15: string
  field16: string
  field17: string
  field18: string
  field19: string
  field20: string
}

const fieldData: FieldData = {
  field00: '7632845',
  field01: '스프링 T4-L120(SWOSC-V)V+ OD23',
  field02: 'L2392110-B',
  field03: '22',
  field04: 'EA',
  field05: '',
  field06: '',
  field07: '2024-07-01',
  field08: '2027-07-01',
  field09: '',
  field10: '',
  field11: '',
  field12: '5111170717',
  field13: '',
  field14: '43789',
  field15: '한전',
  field16: '',
  field17: '',
  field18: '한전',
  field19: '',
  field20: '',
}

const emptyData: FieldData = {
  field00: '',
  field01: '',
  field02: '',
  field03: '',
  field04: '',
  field05: '',
  field06: '',
  field07: '',
  field08: '',
  field09: '',
  field10: '',
  field11: '',
  field12: '',
  field13: '',
  field14: '',
  field15: '',
  field16: '',
  field17: '',
  field18: '',
  field19: '',
  field20: '',
}

const formData = ref<FieldData>(emptyData)

const _reset = () => {
  formData.value = emptyData
}

const _save = () => {
  alert('저장했습니다.')
}

const showPopup = ref(false)

const _print = () => {
  showPopup.value = true
}

const _closePopup = () => {
  showPopup.value = false
}
</script>

<style></style>
