<template>
  <VxManagementApp :language="language" :locale="locale"> </VxManagementApp>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const language = ref($vx.env.appProps.nuxt.kendoUi.i18n.message.default)
const locale = ref($vx.env.appProps.nuxt.kendoUi.i18n.locales[0])
</script>
