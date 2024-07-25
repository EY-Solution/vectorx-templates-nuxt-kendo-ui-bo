<script lang="ts" setup>
import VxSampleContentContainer from '#vectorx/nuxt-vuetify/samples/vx-sample-content-container.vue'

// @ts-ignore
import doc from './md/exception.md'

const callApi = useOnError(
  async () => {
    return (await $vx.api.call('/api/test/exception/custom-message')).data
  },
  {
    notifyType: 'alert',
  },
)
</script>
<template>
  <VxSampleContentContainer title="Exception">
    <div>
      <VxMarkdownViewer>{{ doc }}</VxMarkdownViewer>
      <VxButton text="call api" @click="() => callApi()" />
    </div>
  </VxSampleContentContainer>
</template>
