<template>
  <div :style="chartBox">
    <canvas id="chartContainer" ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  ChartData,
  ChartOptions,
  Legend,
} from "chart.js";

// 註冊圖表需要組件
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend
);
// 定義props類型
interface ChartProps {
  chartData: ChartData<"line">; //圖表資料
  chartOptions?: ChartOptions<"line">; //圖表樣式選項
  chartboxHeight: Number; //圖表高度
}
// 接收props
const props = defineProps<ChartProps>();
const chartCanvas = ref(null);
let chartInstance: Chart | null = null;

const chartBox = computed(() => ({
  padding: "20px",
  width: "80%",
  height: `${props.chartboxHeight}px`,
}));
// 組件掛載時初始化圖表
onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: "line",
      data: props.chartData,
      options: props.chartOptions,
    });
  }
});

// 監聽chart
watch(
  () => props.chartData,
  (newData) => {
    if (chartInstance) {
      chartInstance.data = newData;
      chartInstance.update();
    }
  }
);
</script>

<style lang="scss" scoped>
#chartContainer {
  max-width: 100%;
}
</style>
