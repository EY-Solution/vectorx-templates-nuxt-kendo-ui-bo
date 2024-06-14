import { apiModels, baseModels, paginationModels } from '#vectorx/core/data'
import { defineVxService } from '#vectorx/nuxt/composables'

/**
 * 샘플 게시판
 */
export interface SamplePost extends baseModels.BaseModel {
  /**
   * 게시아이디
   */
  postId: number

  /**
   * 작성자 명
   */
  authNm: string

  /**
   * 작성자 이메일
   */
  authEml: string

  /**
   * 게시 제목
   */
  postTtl: string

  /**
   * 게시 내용
   */
  postCont: string

  /**
   * 조회 수
   */
  viewCnt: number
}

export interface SamplePostCondition extends Record<string, any> {
  /**
   * 제목
   */
  postTtl: string

  /**
   * 작성자 명
   */
  authNm: string

  /**
   * 시작일자 (yyyyMMdd)
   */
  stRegYyyyMMdd: string

  /**
   * 종료일자 (yyyyMMdd)
   */
  edRegYyyyMMdd: string
}

export const useVxSamplePostService = defineVxService(({ api }) => {
  /**
   * 그룹 코드 목록 조회
   * @param criteria 검색 조건
   * @returns 그룹 코드 목록
   */
  async function getPosts(pagination: paginationModels.PaginationRequest, condition: SamplePostCondition) {
    const result = await api.call<apiModels.ApiResponse<SamplePost[]>>({
      url: '/api/samples/post/posts',
      method: 'POST',
      data: {
        header: pagination,
        ...condition,
      },
    })

    return result.data
  }

  async function getPost(postId: number) {
    return (
      await api.call<apiModels.ApiResponse<SamplePost>>({
        url: `/api/samples/post/${postId}`,
        method: 'GET',
      })
    )?.data?.body
  }

  async function add(post: Partial<SamplePost>) {
    const result = await api.call<apiModels.ApiResponse<void>>({
      url: '/api/samples/post',
      method: 'POST',
      data: post,
    })

    return result.data?.body
  }

  async function edit(post: Partial<SamplePost>) {
    const result = await api.call<apiModels.ApiResponse<void>>({
      url: '/api/samples/post',
      method: 'PATCH',
      data: post,
    })

    return result.data?.body
  }

  async function remove(postId: number) {
    return (
      await api.call<apiModels.ApiResponse<SamplePost>>({
        url: `/api/samples/post/${postId}`,
        method: 'DELETE',
      })
    )?.data?.body
  }

  return { getPosts, add, edit, remove, getPost }
})
