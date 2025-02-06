<template>
  <div :class="$style.wrapper">
    <!-- header -->
    <div v-if="showHeader" :class="[$style.header, { height: headerHeight + 'px' }]">
      <slot name="header" />
    </div>
    <!-- content -->
    <div :class="[$style.content, { marginTop: headerHeight + 'px' }]">
      <slot />
    </div>
    <!-- footer -->
    <div v-if="showFooter" :class="[$style.footer, { height: footerHeight + 'px' }]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      /** header高度 像素值 不传默认64 */
      headerHeight?: number;
      /** footer高度 像素值 不传默认200 */
      footerHeight?: number;
      /** 是否显示header */
      showHeader?: boolean;
      /** 是否显示footer */
      showFooter?: boolean;
    }>(),
    {
      headerHeight: 64,
      footerHeight: 200,
      showHeader: true,
      showFooter: true,
    }
  );
</script>

<style lang="scss" module>
  .wrapper {
    @apply flex flex-col w-full min-h-screen overflow-hidden;
    .header {
      @apply fixed left-0 right-0 top-0 z-1000 w-full h-64px flex flex-row items-center bg-bg;
    }
    .content {
      @apply flex flex-col flex-1 flex-shrink-0 w-full mx-auto min-h-0 bg-bg-page;
    }
    .footer {
      @apply flex flex-row w-full h-200px justify-center color-bg bg-primary-dark-9;
    }
  }
</style>
