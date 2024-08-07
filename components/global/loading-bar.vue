<template>
  <VOverlay :model-value="showLoadingBar" :closeOnContentClick="false" class="align-center justify-center" :persistent="true">
    <div class="loader">
      <img src="/google.png" />
      <div class="bar"></div>
      <div class="progress">정보를 가져오는 중 입니다. 잠시만 기다려 주세요.</div>
    </div>
  </VOverlay>
  <VOverlay :model-value="showPrgressBar" :closeOnContentClick="false" class="align-center justify-center" :persistent="true">
    <div class="loader">
      <img src="/google.png" />
      <div class="bar"></div>
      <div class="progress">
        요청하신 작업을 <span class="emphas">{{ progressRate }}%</span> 진행 중 입니다.
      </div>
    </div>
  </VOverlay>
</template>
<script lang="ts" setup>
import { VProgressCircular, VOverlay } from 'vuetify/lib/components/index.mjs'
import { defineVxLoadingBarComponent } from '#vectorx/nuxt/composables/components/loading-bar'

defineOptions({
  name: 'VxLoadingBar',
  components: { VOverlay, VProgressCircular },
})

const { showLoadingBar, showPrgressBar, progressRate } = defineVxLoadingBarComponent()
</script>
<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader img {
  width: 100px;
  height: 100px;
  margin-bottom: 25px;
}

.loader .bar {
  width: 200px;
  height: 5px;
  background: linear-gradient(#356cfa 0 0) 0/0% no-repeat #ddd;
  animation: l1 2s infinite linear;
}
@keyframes l1 {
  100% {
    background-size: 100%;
  }
}

.loader .progress {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  text-shadow: 0px 0px 2px gray;
}

.loader .progress .emphas {
  color: yellow;
}
</style>
