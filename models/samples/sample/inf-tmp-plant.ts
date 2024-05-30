export interface InterfaceTmpPlant {
  /**
   * 공장코드
   */
  plantCd?: string
  /**
   * 공장코드명칭
   * /
  plantNm?: string
  /**
   * 회사명칭
   */
  companyNm?: string
  /**
   * 회사코드
   */
  companyCd?: string
  /**
   * [공장코드] + 명칭
   */
  plantNmAbbr?: string
  /**
   * 공장타입
   */
  plantType?: string
  /**
   * 로케이션
   */
  locationCd?: string
  /**
   * 공장코드명칭
   */
  plantCdNm?: string

  /**
   * 섹션코드
   */
  plantSectionCd?: string

  /**
   * 섹션명
   */
  plantSectionNm?: string

  /**
   * 로케이션 코드
   */
  plantLocCd?: string

  /**
   * 로케이션 명칭
   */
  plantLocNm?: string

  /**
   * 검색조건
   */
  plantCds?: string[]
  plantSectionCds?: string[]
}
