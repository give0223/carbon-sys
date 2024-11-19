<template>
  <div class="layout-footer-container">
    Copyright &#169;
    {{ fullYear }}Vincent-Lin
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "LayoutFooter" });

const fullYear = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
.layout-footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $base-app-footer-height;
  padding: 0 20px;
  color: rgb(0 0 0 / 45%);
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
}
</style>
