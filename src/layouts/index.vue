<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <!-- SubMenu -->
      <LayoutSideBar />
      <div class="layout-main" :class="{ 'is-collapse': collapse }">
        <!-- Header -->
        <div class="layout-header fixed-header" :class="{ 'is-collapse': collapse }">
          <!-- NavBar -->
          <LayoutNavBar />
          <!-- TabsBar -->
          <!-- <LayoutTabsBar /> -->
        </div>
        <div class="app-main-container">
          <!-- Main -->
          <LayoutMain />
          <!-- Footer -->
          <LayoutFooter />
        </div>
      </div>
    </div>
    <!-- 黑暗模式切換 -->
    <ThemeDrawer />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, computed, ref } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
import { useDebounceFn } from "@vueuse/core";
import LayoutSideBar from "./SideBar/index.vue";
import LayoutNavBar from "./NavBar/index.vue";
// import LayoutTabsBar from './TabsBar/index.vue';
import LayoutMain from "./Main/index.vue";
import LayoutFooter from "./Footer/index.vue";
import ThemeDrawer from "./NavBar/components/ThemeDrawer/index.vue";

defineOptions({
  name: "Layout",
});

const settingsStore = useSettingsStore();
const collapse = computed(() => settingsStore.collapse);
// 監聽視窗大小,是否收合左邊選單
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  // 視窗小於 1200 時收合左邊選單
  if (!collapse.value && screenWidth.value < 1200) settingsStore.changeCollapse();
  // 視窗大於 1200 時展開左邊選單
  if (collapse.value && screenWidth.value > 1200) settingsStore.changeCollapse();
}, 100);

window.addEventListener("resize", listeningWindow, false);

onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style lang="scss" scoped>
@import "@/styles/variable/index.scss";
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .layout-container-vertical {
    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    .layout-main {
      min-height: 100%;
      margin-left: $base-left-menu-width;

      &.is-collapse {
        margin-left: $base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }

      .app-main-container {
        padding: 20px;
      }
    }
  }
}
</style>
