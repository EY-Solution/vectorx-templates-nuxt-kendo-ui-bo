import { ShallowRef, MaybeRefOrGetter, computed, shallowRef } from 'vue'
import { TreeList, TreeListProps } from '@progress/kendo-vue-treelist'
import { functionUtils } from '#vectorx/core/utils/functions'
import { coreUtils } from '#vectorx/core/utils/core'
import { configExpandation, KendUiTreeListExpandationOptions } from './treelist/expandation'
import { configSelection, KendUiTreeListSelectionOptions } from './treelist/selection'

export interface KendUiTreeListOption<Data = any> {
  /**
   * id 필드 명
   * @default 'id'
   */
  idField?: string

  /**
   * sub item field 명
   * @deafult 'items'
   */
  subItemFieldName?: string

  /**
   * 확장 옵션
   */
  expandation?: KendUiTreeListExpandationOptions

  /**
   * 선택 옵션
   */
  selection?: KendUiTreeListSelectionOptions

  /**
   * tree list event option
   */
  events?: KendUiTreeListOptionEvent<Data>

  /**
   * control 객체 내부에서만 사용
   */
  _control?: ShallowRef<InstanceType<typeof TreeList>>
}

export type KendUiTreeListOptionEvent<Data = any> = {} & Pick<
  TreeListProps,
  // @ts-ignore
  | 'onDatastatechange'
  | 'onExpandchange'
  | 'onFilterchange'
  | 'onKeyDown'
  | 'onPagechange'
  | 'onRowblur'
  | 'onRowclick'
  | 'onRowcontextmenu'
  | 'onRowfocus'
  | 'onSortchange'
> &
  Record<string, any>

export interface KendoUITreeListAfterConfigContext {
  expandation: ReturnType<typeof configExpandation>
}

/**
 * Kendo UI Tree List 사용
 * @param options
 */
export const useKendoTreeList = <Data = any>(options: KendUiTreeListOption<Data>) => {
  const _control = shallowRef<InstanceType<typeof TreeList>>()
  options._control = _control

  options = coreUtils.deepMerge({ idField: 'id', subItemFieldName: 'items' }, options)

  const expandation = configExpandation(options)
  const selection = configSelection(options)

  const context: KendoUITreeListAfterConfigContext = { expandation }

  expandation.afterConfig(context)
  selection.afterConfig(context)

  const props = computed(() => {
    return Object.assign(
      {
        ref(treelist) {
          _control.value = treelist
        },
        get dataItemKey() {
          return options.idField
        },
        get subItemsField() {
          return options.subItemFieldName
        },
      },
      expandation.props,
      selection.props,
    )
  })

  // mapping event
  if (options.events) {
    for (const eventKey in options.events) {
      const handler = options.events[eventKey]

      props.value[eventKey] = functionUtils.wrap(props.value[eventKey], (next, args) => {
        next()
        handler(...args)
      })
    }
  }

  return {
    props: props,
    expandation: expandation.exposed,
    selection: selection.exposed,

    /**
     * Treelist instance 객체
     */
    get control() {
      return _control.value
    },
  }
}
