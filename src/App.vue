<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";

localStorage.setItem("vueuse-color-scheme", "dark");
useDark();
</script>

<style lang="scss">
#app {
  padding: 0;
}
</style>
