<template>
  <div class="btn">
    <el-tooltip effect="dark" content="系統設置">
      <el-button circle @click="onSetting">
        <IconifyIcon icon="ep:setting" height="16" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";

defineOptions({
  name: "Settings",
});

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
