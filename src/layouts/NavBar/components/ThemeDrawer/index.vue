<template>
  <el-drawer title="主題設定" v-model="drawerVisible" size="300px">
    <el-divider class="divider" content-position="center">全域主題</el-divider>
    <div class="theme-item">
      <span>主題顏色</span>
      <!-- <el-color-picker
        v-model="themeConfig.primary"
        :predefine="colorList"
        @change="changePrimary"
      /> -->
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <!-- <SwitchDark /> -->
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
import { ref } from "vue";
const drawerVisible = ref(false);
// mitt組件的on接收(監聽定義名稱)
mittBus.on("openThemeDrawer", () => {
  drawerVisible.value = true;
});
</script>

<style lang="scss" scoped>
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0;
}
</style>
