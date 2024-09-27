<template>
  <div class="logo-container flex-center">
    <a href="/index">
      <img class="logo" alt="logo" src="../../assets/icons/carbonlogo_white.svg" />
      <h1 class="title" v-if="!collapse">碳盤管理系統</h1>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";

defineOptions({
  name: "Logo",
});

const settingsStore = useSettingsStore();
const collapse = computed(() => settingsStore.collapse);
</script>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  display: flex;
  justify-content: center;

  // padding-left: 24px;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  background: transparent;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 62px;
    height: 62px;
    vertical-align: middle;
  }
}
</style>
