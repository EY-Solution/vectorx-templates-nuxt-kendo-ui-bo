<template>
  <VxBox>
    <VxItem>
      <VxButtonBar>
        <VxFieldSet>
          <VxFieldRow flex>
            <VxField label="제목" :totalWidth="300" :labelWidth="100">
              <TextBox v-model="searchAction.conditions.postTtl" />
            </VxField>

            <VxField label="작성자명" :totalWidth="300" :labelWidth="100">
              <TextBox v-model="searchAction.conditions.authNm" />
            </VxField>

            <VxButtonBox right top>
              <VxButton text="검색" type="primary" @click="searchAction.search" />
            </VxButtonBox>
          </VxFieldRow>

          <VxFieldRow flex>
            <VxField label="작성일" :labelWidth="100">
              <VxKDateRangePicker
                v-model:start="searchAction.conditions.stRegYyyyMMdd"
                v-model:end="searchAction.conditions.edRegYyyyMMdd"
                format="yyyy-MM-dd"
              />
            </VxField>
          </VxFieldRow>
        </VxFieldSet>
      </VxButtonBar>
    </VxItem>
    <VxItem :ratio="1">
      <VxBox>
        <VxItem :ratio="1" scrollType="auto">
          <Grid
            v-bind="gridAction.grid.props.value"
            :style="{ height: '100%' }"
            :dataItems="gridAction.grid.selection.generateData(gridAction.grid.pagination.dataItems.value)"
            :columns="[
              { field: 'postTtl', title: '제목', width: 500 },
              { field: 'authNm', title: '작성자', width: 150 },
              { field: 'viewCnt', title: '조회수', width: 100 },
            ]"
          ></Grid>
        </VxItem>
        <VxItem>
          <VxButtonBar>
            <VxButtonBox>
              <VxButton text="신규" @click="formAction.newForm" />
            </VxButtonBox>
          </VxButtonBar>

          <VxPopup v-model="formAction.showPopup.value" :width="800" :height="500" title="게시 입력">
            <VxBox direction="col">
              <VxItem :ratio="1" scrollType="auto">
                <VxKForm>
                  <VxFieldSet>
                    <VxFieldRow>
                      <VxField label="작성자명" required>
                        <VxKField :context="formAction.fields.get('authNm')">
                          <template #default="{ props: subProps }">
                            <TextBox v-bind="subProps" />
                          </template>
                        </VxKField>
                      </VxField>
                    </VxFieldRow>

                    <VxFieldRow>
                      <VxField label="이메일" required>
                        <VxKField :context="formAction.fields.get('authEml')">
                          <template #default="{ props: subProps }">
                            <TextBox v-bind="subProps" />
                          </template>
                        </VxKField>
                      </VxField>
                    </VxFieldRow>

                    <VxFieldRow>
                      <VxField label="제목" required>
                        <VxKField :context="formAction.fields.get('postTtl')">
                          <template #default="{ props: subProps }">
                            <TextBox v-bind="subProps" />
                          </template>
                        </VxKField>
                      </VxField>
                    </VxFieldRow>

                    <VxFieldRow>
                      <VxField label="내용" required>
                        <VxKField :context="formAction.fields.get('postCont')">
                          <template #default="{ props: subProps }">
                            <TextArea v-bind="subProps" :rows="8" />
                          </template>
                        </VxKField>
                      </VxField>
                    </VxFieldRow>
                  </VxFieldSet>
                </VxKForm>
              </VxItem>
            </VxBox>
            <template #buttonsRight>
              <VxButton text="저장" type="primary" @click="formAction.save" />
              <VxButton v-if="!formAction.isNew.value" text="삭제" type="gray" @click="formAction.remove" />
            </template>

            <template #buttonsLeft>
              <!-- <VxButton text="초기화" @click="formAction.reset" /> -->
            </template>
          </VxPopup>
        </VxItem>
      </VxBox>
    </VxItem>
  </VxBox>
</template>
<script lang="ts" setup>
import { Grid } from '@progress/kendo-vue-grid'
import { TextBox, TextArea } from '@progress/kendo-vue-inputs'
import { SamplePost, SamplePostCondition, useVxSamplePostService } from '~/services/samples/post'

import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const service = useVxSamplePostService()

const searchAction = createAction(() => {
  const conditions: SamplePostCondition = reactive({
    postTtl: null,
    authNm: null,
    stRegYyyyMMdd: $vx.utils.date.format($vx.utils.date.addDays(new Date(), -31), 'yyyyMMdd'),
    edRegYyyyMMdd: $vx.utils.date.format($vx.utils.date.addDays(new Date(), 1), 'yyyyMMdd'),
  })

  function search() {
    gridAction.grid.pagination.loadPageData()
  }

  return { conditions, search }
})

const gridAction = createAction(() => {
  const gridData = ref([])
  const grid = useKendoUiGrid({
    pagination: {
      async handler(currentPage, pageSize, orders) {
        return useOnError(
          async () => {
            const result = await service.getPosts(
              {
                currentPage,
                pageSize,
                orders,
              },
              searchAction.conditions,
            )

            return {
              data: result.body,
              totalRecords: result.header.totalRecords,
            }
          },
          {
            message: '데이터 조회 중 오류가 발생하였습니다.',
          },
        )()
      },
    },
    selection: {
      mode: 'single',
      keyFieldId: 'postId',
      onSelectionChanged(selectionItems) {
        if (selectionItems.length > 0) {
          formAction.loadForm(selectionItems[0].postId)
        }
      },
    },
  })

  return { gridData, grid }
})

const formAction = createAction(() => {
  const showPopup = ref(false)
  const isNew = ref(true)

  const form = useForm({
    validationSchema: toTypedSchema(
      yup.object({
        postId: yup.number().nullable().label('아이디'),
        authNm: yup.string().required().label('작성자명'),
        authEml: yup.string().required().email().label('이메일'),
        postTtl: yup.string().required().label('제목'),
        postCont: yup.string().required().label('내용'),
      }),
    ),
  })
  const fields = new Map(Object.keys(form.values).map(k => [k, useField(k)]))

  async function save() {
    const validationResult = await form.validate()
    if (!validationResult.valid) {
      alert('입력된 데이터를 확인해주세요.')
      return
    }

    const data: Partial<SamplePost> = $vx.utils.core.clone(form.values)

    useOnError(
      async () => {
        if (isNew.value) {
          await service.add(data)
        } else {
          await service.edit(data)
        }

        showPopup.value = false
        searchAction.search()
      },
      {
        message: '데이터 저장 중 오류가 발생하였습니다.',
      },
    )()
  }

  function reset() {
    form.resetForm({
      values: {
        postId: null,
        authNm: null,
        authEml: null,
        postTtl: null,
        postCont: null,
      },
    })
  }

  function newForm() {
    reset()
    isNew.value = true
    showPopup.value = true
  }

  function loadForm(postId: number) {
    useOnError(async () => {
      const post = await service.getPost(postId)

      form.resetForm({
        values: post,
      })

      isNew.value = false
      showPopup.value = true
    })()
  }

  function remove() {
    useOnError(
      async () => {
        if (!(await confirm('삭제하시겠습니까?'))) {
          return
        }

        await service.remove(form.values.postId)
        showPopup.value = false
        searchAction.search()
      },
      {
        message: '삭제 중 오류가 발생하였습니다.',
      },
    )()
  }

  return { showPopup, form, fields, save, reset, newForm, loadForm, isNew, remove }
})
</script>
