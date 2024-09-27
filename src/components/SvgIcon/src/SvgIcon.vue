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
import { computed } from "vue";
import type { CSSProperties } from "vue";

defineOptions({
  name: "SvgIcon",
});

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  // SVG圖片名稱
  name: {
    type: String,
    required: true,
  },
  // 顏色
  color: {
    type: String,
    default: "",
  },
  // 圖示大小
  size: {
    type: [Number, String],
    default: 20,
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
    let s = `${size}`;
    s = `${s.replace("px", "")}px`;
    return {
      width: s,
      height: s,
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
