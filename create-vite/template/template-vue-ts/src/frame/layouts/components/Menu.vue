<template>
  <!-- TODO 拖拽可折叠菜单；折叠后的样式调整 -->
  <el-menu :collapse="false" :default-active="activeMenuRouteName" class="bg-transparent !border-none admin-menu">
    <menu-item v-for="item in menuRoutes" :key="item.name" :menu-data="item" />
  </el-menu>
</template>

<script lang="ts" setup>
  import { toRefs, computed } from 'vue';
  import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
  import { useRoute } from 'vue-router';
  import MenuItem from './MenuItem.vue';

  const props = defineProps<{ menuRoutes: RouteRecordRaw[] }>();
  const { menuRoutes } = toRefs(props);

  const route = useRoute();

  const activeMenuRouteName = computed(() => getActiveMenuName(route));

  const getActiveMenuName = (route: RouteLocationNormalizedLoaded | RouteRecordRaw): string => {
    if (route && route.meta && route.meta.menuConfig) {
      // 路由meta信息中有menuConfig，才可能具有有效的activeMenuName
      if (route.meta.menuConfig.activeRouteName) {
        return route.meta.menuConfig.activeRouteName;
      } else {
        return route.name as string;
      }
    } else {
      return '';
    }
  };
</script>

<style lang="scss">
  .admin-menu {
    background-color: transparent;
    .el-sub-menu__title {
      @apply mr-1px;
    }
    .el-menu-item.is-active {
      background-color: var(--el-bg-color);
    }
  }
</style>
