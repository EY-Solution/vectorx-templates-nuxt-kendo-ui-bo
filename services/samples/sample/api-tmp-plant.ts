import { apiModels } from '@vectorx/core/src/data'
import { InterfaceTmpPlant } from '~/models/samples/sample/inf-tmp-plant'
import { defineVxService } from '@vectorx/nuxt/src'

export const tmpPlantService = defineVxService(({ api }) => {
  async function selectTmpPlantList() {
    const res = await api.call<apiModels.ApiResponse<InterfaceTmpPlant[]>>({
      url: '/api/samples/temp/plant',
      method: 'GET',
    })
    return res.data.body
  }

  async function selectTmpSectionList(param: InterfaceTmpPlant) {
    const res = await api.call<apiModels.ApiResponse<InterfaceTmpPlant[]>>({
      url: '/api/samples/temp/section',
      method: 'POST',
      data: toRaw(param),
    })
    return res.data.body
  }

  async function selectTmpLocationList(param: InterfaceTmpPlant) {
    const res = await api.call<apiModels.ApiResponse<InterfaceTmpPlant[]>>({
      url: '/api/samples/temp/location',
      method: 'POST',
      data: toRaw(param),
    })
    return res.data.body
  }

  async function selectTmpGridList(param: InterfaceTmpPlant) {
    const res = await api.call<apiModels.ApiResponse<InterfaceTmpPlant[]>>({
      url: '/api/samples/temp/gridList',
      method: 'POST',
      data: toRaw(param),
    })
    return res.data.body
  }

  return { selectTmpPlantList, selectTmpSectionList, selectTmpLocationList, selectTmpGridList }
})
