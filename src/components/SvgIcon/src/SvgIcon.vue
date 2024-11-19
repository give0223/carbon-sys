<template>
  <svg
    aria-hidden="true"
    :class="['svg-icon', spin && 'svg-icon-spin']"
    :style="getStyle"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";

defineOptions({
  name: "SvgIcon",
});

const props = defineProps({
  // SVG圖片名稱
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: "icon",
  },
  // 顏色
  color: {
    type: String,
    default: "",
  },
  // 圖示大小
  size: {
    type: Array,
    default: () => [16, 16],
  },
  // 是否旋轉
  spin: {
    type: Boolean,
    default: false,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getStyle = computed(
  (): CSSProperties => {
    const { size } = props;
    let w = `${size[0]}`;
    let h = `${size[1]}`;
    w = `${w.replace("px", "")}px`;
    h = `${h.replace("px", "")}px`;
    return {
      width: w,
      height: h,
    };
  }
);
</script>

<style lang="scss" scoped>
.el-icon {
  --color: inherit;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  font-size: inherit;
  line-height: 1em;
  color: var(--color);
  fill: currentColor;

  svg {
    width: 1em;
    height: 1em;
  }
}

.svg-icon-spin {
  animation: circle 1.5s infinite linear;
}

/* 旋轉動畫 */
@keyframes loadingCircle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
