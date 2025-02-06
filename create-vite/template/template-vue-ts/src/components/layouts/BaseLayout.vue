<template>
  <LayoutBase :header-height="64">
    <template #header>
      <div
        class="w-full h-64px flex flex-row items-center justify-between px-spacing bg-bg border-b border-border-light">
        <div class="flex flex-row items-center">
          <i class="i-uplus:logo inline-block align-middle text-size-32px" />
          <div class="text-size-large font-semibold ml-10px">Frontend Scaffold</div>
        </div>
        <ThemeToggler />
      </div>
    </template>
    <RouterView />
  </LayoutBase>
</template>

<script lang="ts" setup>
  import ThemeToggler from '@/components/ThemeToggler.vue';
  import LayoutBase from '@/frame/layouts/LayoutBase.vue';
</script>
