<template>
  <div class="w-24px h-24px flex items-center justify-center flex-shrink-0">
    <i v-if="iconClass" class="inline-block align-middle text-size-16px" :class="iconClass" />
    <div v-else class="default-menu-icon w-6px h-6px rounded-3px" />
  </div>
</template>

<script lang="ts" setup>
  defineProps<{ iconClass?: string }>();
</script>

<style lang="scss">
  .el-menu-item {
    .default-menu-icon {
      background-color: var(--el-menu-text-color);
    }
    &.is-active {
      .default-menu-icon {
        background-color: var(--el-menu-active-color);
      }
    }
  }
</style>
