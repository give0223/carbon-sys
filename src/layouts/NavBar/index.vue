<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <el-icon class="fold-unfold" @click="handleCollapse">
            <component :is="collapse ? 'Expand' : 'Fold'"></component>
          </el-icon>
          <Breadcrumb />
        </div>
      </el-col>
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <Refresh />
          <ScreenFull />
          <Settings />
          <User />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
import ScreenFull from "./components/ScreenFull/index.vue";
import Settings from "./components/Settings/index.vue";
import User from "./components/User/index.vue";
import Refresh from "./components/Refresh/index.vue";
import Breadcrumb from "./components/Breadcrumb/index.vue";

defineOptions({
  name: "LayoutNavBar",
});

const settingsStore = useSettingsStore();
const collapse = computed(() => settingsStore.collapse);
const handleCollapse = () => {
  settingsStore.changeCollapse();
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;

    .fold-unfold {
      font-size: 18px;
      color: $base-color-gray;
      cursor: pointer;
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
  }
}
</style>
