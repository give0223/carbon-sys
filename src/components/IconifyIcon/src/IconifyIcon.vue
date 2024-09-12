<template>
  <IconifyIcon :icon="icon" v-bind="$attrs" :style="computedStyle" @click="handleClick" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

// 定義 props，便於定制圖標屬性
const props = defineProps({
  icon: {
    type: String,
    required: true, // icon 是必填項
  },
  // width: {
  //   type: [String, Number],
  //   default: 24, // 默認寬度為 24px
  // },
  // height: {
  //   type: [String, Number],
  //   default: 24, // 默認高度為 24px
  // },
  // color: {
  //   type: String,
  //   default: 'currentColor', // 默認顏色為文本顏色
  // },
});
// 使用 attrs 獲取傳入的樣式屬性
const attrs = useAttrs() as any;

// 計算內聯樣式，確保圖標樣式可擴展
const computedStyle = computed(() => {
  return {
    ...attrs.style, // 保留傳入的樣式
    outline: "none", // 預設無外框
  };
});
// 添加點擊事件處理器
const handleClick = () => {
  console.log(`${props.icon} icon clicked!`);
};
</script>
