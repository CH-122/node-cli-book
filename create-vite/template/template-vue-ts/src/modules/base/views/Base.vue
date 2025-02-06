<template>
  <ScrollableContent>
    <div class="w-full flex flex-col items-center">
      <div class="w-full py-50px text-center font-bold">Index</div>
      <DemoContent btn-label="To Home" @btn-click="$router.push({ name: 'home' })" />
    </div>
  </ScrollableContent>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import DemoContent from '@/modules/home/views/components/DemoContent.vue';
  import ScrollableContent from '@/components/ScrollableContent.vue';

  const router = useRouter();

  onMounted(() => {
    console.log('routes:::::::::', router.options.routes);
  });
</script>
