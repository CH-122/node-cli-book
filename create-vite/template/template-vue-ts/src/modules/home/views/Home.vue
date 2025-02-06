<template>
  <ScrollableContent>
    <div class="w-full flex flex-col items-center">
      <div class="w-full py-50px text-center font-bold">Home</div>
      <DemoContent btn-label="To Index" @btn-click="$router.push({ name: 'index' })" />
    </div>
  </ScrollableContent>
</template>

<script lang="ts" setup>
  import DemoContent from './components/DemoContent.vue';
  import ScrollableContent from '@/components/ScrollableContent.vue';
</script>
