<template>
  <div :class="$style.wrapper">
    <!-- header -->
    <div v-if="showHeader" :class="$style.header">
      <slot name="header" />
    </div>
    <!-- body -->
    <div :class="$style.body">
      <!-- sidebar -->
      <div :class="$style.sidebar" :style="{ width: curSidebarWidth + 'px' }">
        <div :class="$style.sidebarWrapper">
          <slot v-if="showSidebarHeader" name="sidebarHeader" />
          <el-scrollbar class="w-full flex flex-col">
            <Menu v-if="menuRoutes" :menu-routes="menuRoutes" />
            <slot name="sidebarContent" />
          </el-scrollbar>
          <slot name="sidebarFooter" />
        </div>
        <div :class="$style.sidebarLine" />
        <div :class="$style.sidebarDragArea" @mousedown="handleDrag">
          <div :class="$style.sidebarDragLine" />
        </div>
      </div>
      <!-- content -->
      <div :class="$style.content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs } from 'vue';
  import { type RouteRecordRaw } from 'vue-router';
  import Menu from './components/Menu.vue';
  import { clamp } from 'lodash-es';

  const props = withDefaults(
    defineProps<{
      /** header高度 像素值 不传默认64 */
      headerHeight?: number;
      /** 是否显示header */
      showHeader?: boolean;
      /** 是否显示sidebarHeader */
      showSidebarHeader?: boolean;
      /** 是否显示sidebarFooter */
      showSidebarFooter?: boolean;
      /** 初始的侧边栏宽度 */
      sidebarWidth?: number;
      sidebarDraggable?: boolean;
      /** 菜单路由，不传则不显示菜单 */
      menuRoutes?: RouteRecordRaw[] | undefined;
    }>(),
    {
      headerHeight: 64,
      showHeader: false,
      showSidebarHeader: true,
      showSidebarContent: true,
      showSidebarFooter: false,
      sidebarWidth: 280,
      sidebarDraggable: true,
      menuRoutes: undefined,
    }
  );

  const { sidebarWidth } = toRefs(props);

  const curSidebarWidth = ref<number>(sidebarWidth.value);

  const handleDrag = (e: MouseEvent) => {
    const start = e.clientX;
    const startWidth = curSidebarWidth.value;
    document.onmousemove = (e) => {
      curSidebarWidth.value = clamp(startWidth + (e.clientX - start), 150, 500);
    };
    document.onmouseup = () => {
      // if (this.panelHeight <= this.criticalHeight) {
      //   this.panelHeight = this.minHeight;
      // }
      document.onmousemove = null;
    };
  };
</script>

<style lang="scss" module>
  .wrapper {
    @apply w-full flex flex-col h-full min-h-0;
    .header {
      @apply w-full h-64px flex flex-row items-center bg-bg border-b border-b-border-light border-b-solid;
    }
    .body {
      @apply flex flex-row items-stretch w-full flex-1 min-h-full max-h-full overflow-hidden;
      .sidebar {
        @apply flex flex-col bg-bg-page flex-shrink-0 relative;
        .sidebarWrapper {
          @apply flex flex-1 flex-col relative w-full z-10 min-h-0;
        }
        .sidebarLine {
          @apply absolute w-1px top-0 bottom-0 right-0px bg-border-light;
        }
        .sidebarDragArea {
          @apply absolute w-16px top-0 -right-8px bottom-0 z-11 bg-transparent cursor-col-resize;
          .sidebarDragLine {
            @apply absolute w-1px top-0 bottom-0 right-8px bg-transparent transition-colors;
          }
          &:hover {
            .sidebarDragLine {
              @apply bg-primary;
            }
          }
        }
      }
      .content {
        @apply flex flex-col flex-1 bg-bg min-w-0 min-h-0;
      }
    }
  }
</style>
