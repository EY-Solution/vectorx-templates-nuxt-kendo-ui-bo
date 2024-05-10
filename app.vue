<template>
  <VxManagementApp :language="language" :locale="locale" />
</template>
<script setup lang="ts">
const language = ref($vx.env.appProps.nuxt.kendoUi.i18n.message.default)
const locale = ref($vx.env.appProps.nuxt.kendoUi.i18n.locales[0])
</script>
