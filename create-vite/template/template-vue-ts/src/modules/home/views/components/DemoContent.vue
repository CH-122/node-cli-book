<template>
  <div class="w-full flex flex-col items-center">
    <HelloWorld msg="Hellow World" />
    <el-button @click="$emit('btnClick')">{{ btnLabel }}</el-button>
    <div class="p-spacing-sm">
      <el-select v-model="selectedItem" value-key="id" placeholder="请选择" class="w-200px">
        <el-option value="option1" />
        <el-option value="option2" />
        <el-option value="option3" />
      </el-select>
    </div>
    <div class="w-full px-spacing mb-spacing">
      <el-table border :data="configList">
        <el-table-column type="index" width="80" align="center" label="index" />
        <el-table-column property="configKey" label="configKey" />
        <el-table-column property="configValue" label="configValue" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import HelloWorld from '@/components/HelloWorld.vue';
  import { ConfigModel, getConfigList } from '../../api/home';

  defineProps<{ btnLabel: string }>();

  defineEmits<{
    // emit with param data example
    // (e: 'updateQuery', data: SomeData): void;
    (e: 'btnClick'): void;
  }>();

  const configList = ref<ConfigModel[]>([]);

  const selectedItem = ref<string>();

  onMounted(() => {
    getConfigList().then((res) => {
      configList.value = res.data ? res.data : [];
    });
  });
</script>
