useOnError method 를 사용하여 API의 에러메시지를 노출하는 예제
```html
<script lang="ts" setup>
const callApi = useOnError(async () => {
  return (await $vx.api.call('/api/test/exception/custom-message')).data
})
</script>
<template>
  <div>
    <VxButton text="call api" @click="() => callApi()" />
  </div>
</template>
```
