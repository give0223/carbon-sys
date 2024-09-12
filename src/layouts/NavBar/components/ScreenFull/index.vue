<template>
  <div class="m-screenful">
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? '全螢幕' : '收起全螢幕'"
      placement="bottom"
    >
      <el-button circle @click="toggle">
        <IconifyIcon
          v-if="!isFullscreen"
          icon="fluent:full-screen-maximize-24-filled"
          height="16"
        />
        <IconifyIcon v-else icon="fluent:full-screen-minimize-24-filled" height="18" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";

const { toggle, isFullscreen } = useFullscreen();
</script>

<style lang="scss" scoped>
.m-screenful {
  padding-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
