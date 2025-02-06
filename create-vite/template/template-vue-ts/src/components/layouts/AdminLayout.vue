<template>
  <LayoutAdmin :menu-routes="getMenuRoutes()">
    <template #sidebarHeader>
      <div class="flex flex-row items-center w-full p-spacing">
        <i class="i-uplus:logo w-32px h-32px flex-shrink-0" />
        <div class="text-size-medium font-semibold ml-spacing-xxs truncate">Frontend Scaffold</div>
      </div>
    </template>
    <RouterView />
  </LayoutAdmin>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue';
  import LayoutAdmin from '@/frame/layouts/LayoutAdmin.vue';
  import { useMenuRoutes } from '@/frame/composables/useMenuRoutes';

  const prop = defineProps<{ layout: string }>();
  const { layout } = toRefs(prop);

  const { getMenuRoutes } = useMenuRoutes(layout.value);
</script>
