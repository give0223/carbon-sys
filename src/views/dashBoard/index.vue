<template>
  <div>
    <div>數據資料表</div>
    <!-- 圖表數據 -->
    <div>
      <LineChart
        :chartData="planetChartData"
        :chartOptions="planetChartOptions"
        :chartboxHeight="planetChartHeight"
      />
    </div>
    <div class="coe-box">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div class="coecard-header">
            <span>碳足跡排放係數</span>
          </div>
        </template>
        <!-- card body -->
        <div class="coe-text">
          <el-table
            :data="coeTableData"
            :default-sort="{ prop: 'announcementyear', order: 'descending' }"
            style="width: 100%"
            height="500"
          >
            <el-table-column
              fixed
              prop="announcementyear"
              label="公告年份"
              min-width="100"
            />
            <el-table-column prop="name" label="係數名稱" min-width="150" />
            <el-table-column prop="coe" label="碳足跡數值" min-width="120" />
            <el-table-column prop="unit" label="宣告單位" min-width="100" />
            <el-table-column
              prop="departmentname"
              label="政府部門/公司名稱"
              min-width="250"
            />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChartData, ChartOptions } from "chart.js";
// import { getCoeData } from "@/api";
import coeData from "@/mock/coeData.json";
defineOptions({
  name: "DashBoard",
});

onMounted(async () => {
  await GetCoeDataApi();
});
interface tableData {
  name: string;
  coe: string;
  unit: string;
  departmentname: string;
  announcementyear: string;
}
let coeTableData: Array<tableData> = reactive([]);
// 定義圖表數據類型
const planetChartData: ChartData<"line"> = reactive({
  labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
  datasets: [
    {
      label: "Data1",
      data: [0, 0, 1, 2, 79, 82, 27, 14],
      backgroundColor: "#721121",
      borderColor: "#721121",
      borderWidth: 3,
    },
    {
      label: "Data2",
      data: [16.6, 208.1, 300.3, 123, 954.792, 685.886, 243.662, 201.514],
      backgroundColor: "#839788",
      borderColor: "#839788",
      borderWidth: 3,
    },
  ],
});

const planetChartOptions: ChartOptions<"line"> = reactive({
  responsive: true,
  maintainAspectRatio: false,
  lineTension: 0.1,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "DataTitle",
    },
    tooltip: {
      enabled: true, // 啟用 tooltip
      mode: "nearest", // 可以使用 'index' 或 'nearest' 模式
      intersect: false, // 確保 tooltip 顯示在重疊點上方
    },
  },
});

const planetChartHeight = ref(400);
// 碳足跡
const GetCoeDataApi = async () => {
  const { records } = coeData;
  coeTableData = records;
  console.log("取得碳足跡:", coeTableData);
};
</script>

<style lang="scss" scoped></style>
