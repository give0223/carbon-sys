<template>
  <div class="btn">
    <el-tooltip content="刷新">
      <el-button circle @click="onRefresh">
        <IconifyIcon icon="ri:refresh-line" height="16" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";

defineOptions({
  name: "Refresh",
});

const settingsStore = useSettingsStore();
const onRefresh = () => {
  settingsStore.setRefresh();
};
</script>

<style lang="scss" scoped>
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
