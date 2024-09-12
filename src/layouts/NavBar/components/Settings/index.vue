<template>
  <div class="btn">
    <el-tooltip effect="dark" content="系统设置">
      <el-button circle @click="onSetting">
        <IconifyIcon icon="ep:setting" height="16" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";

const onSetting = () => {
  // mitt組件的emit(觸發定義名稱)
  mittBus.emit("openThemeDrawer");
};
</script>

<style lang="scss" scoped>
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
