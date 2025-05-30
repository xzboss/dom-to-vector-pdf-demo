<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { Printer, Download } from "@element-plus/icons-vue";
import { PrintPDF, ExportToPDF } from "./utils";

const mainContent = ref(null);
const svgChart = ref(null);
const canvasChart = ref(null);

// Initialize ECharts
onMounted(() => {
  // SVG Chart
  const svgChartInstance = echarts.init(svgChart.value, null, {
    renderer: "svg",
  });
  svgChartInstance.setOption({
    title: {
      text: "SVG Chart Example",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });

  // Canvas Chart
  const canvasChartInstance = echarts.init(canvasChart.value, null, {
    renderer: "canvas",
  });
  canvasChartInstance.setOption({
    title: {
      text: "Canvas Chart Example",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
      },
    ],
  });
});

// Print PDF function
const printPDF = () => {
  PrintPDF("PDF_DOM");
};

// Export to PDF function
const exportToPDF = async () => {
  ExportToPDF("#PDF_DOM");
};
</script>

<template>
  <el-container class="layout-container">
    <el-header class="header">
      <div class="header-left">
        <h1>DOM to PDF Demo</h1>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="printPDF">
          <el-icon><Printer /></el-icon>
          打印PDF
        </el-button>
        <el-button type="success" @click="exportToPDF">
          <el-icon><Download /></el-icon>
          导出PDF
        </el-button>
      </div>
    </el-header>

    <el-container class="main-container">
      <el-aside width="200px" class="sider">
        <el-menu default-active="1">
          <el-menu-item index="1">
            <el-icon><Document /></el-icon>
            <span>Menu Item 1</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><CopyDocument /></el-icon>
            <span>Menu Item 2</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="main" ref="mainContent">
        <div class="content-wrapper" id="PDF_DOM">
          <!-- Headings -->
          <section class="section">
            <h1 class="heading-1">Heading 1 - Large Title</h1>
            <h2 class="heading-2">Heading 2 - Subtitle</h2>
            <h3 class="heading-3">Heading 3 - Section Title</h3>
            <h4 class="heading-4">Heading 4 - Subsection</h4>
            <h5 class="heading-5">Heading 5 - Minor Title</h5>
          </section>

          <!-- 中文 -->
          <section class="section">
            <h1 class="zh-400">中简-400字重</h1>
            <h2 class="zh-500">中简-500字重</h2>
            <h3 class="zh-700">中简-700字重</h3>
          </section>

          <!-- Different Font Styles -->
          <section class="section">
            <h3>Font Styles</h3>
            <div class="font-styles">
              <p class="font-serif">Serif Font Style</p>
              <p class="font-sans">Sans-serif Font Style</p>
              <p class="font-mono">Monospace Font Style</p>
            </div>
          </section>

          <!-- Different Font Sizes -->
          <section class="section">
            <h3>Font Sizes</h3>
            <div class="font-sizes">
              <p class="text-xs">Extra Small Text</p>
              <p class="text-sm">Small Text</p>
              <p class="text-base">Base Text</p>
              <p class="text-lg">Large Text</p>
              <p class="text-xl">Extra Large Text</p>
            </div>
          </section>

          <!-- Different Colors -->
          <section class="section">
            <h3>Text Colors</h3>
            <div class="text-colors">
              <p class="text-red">Red Text</p>
              <p class="text-blue">Blue Text</p>
              <p class="text-green">Green Text</p>
              <p class="text-purple">Purple Text</p>
            </div>
          </section>

          <!-- iconfont -->
          <section class="section">
            <h3>Iconfont</h3>
            <div class="iconfont-container">
              <svg class="iconfont-svg">
                <use xlink:href="#icon-pool"></use>
              </svg>
            </div>
          </section>

          <!-- Backgrounds -->
          <section class="section">
            <h3>Backgrounds</h3>
            <div class="backgrounds">
              <div class="bg-gradient">Gradient Background</div>
              <div class="bg-pattern">Pattern Background</div>
              <!-- <div class="bg-image">Image Background</div> -->
            </div>
          </section>

          <!-- ECharts Examples -->
          <section class="section">
            <h3>Charts</h3>
            <div class="charts-container">
              <div ref="svgChart" class="chart"></div>
              <div ref="canvasChart" class="chart"></div>
            </div>
          </section>

          <!-- Images -->
          <section class="section">
            <h3>Images</h3>
            <div class="images-container">
              <img src="/1.jpg" alt="Nature Image 1" />
              <img src="/2.jpg" alt="Nature Image 2" />
              <img src="/3.jpg" alt="Natur e Image 3" />
            </div>
          </section>
        </div>
      </el-main>
    </el-container>

    <el-footer class="footer">
      <p>Footer Content © 2024</p>
    </el-footer>
  </el-container>
</template>

<style>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  display: flex;
}

.header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  gap: 10px;
}

.header h1 {
  margin: 0;
  font-size: 1.5em;
}

.sider {
  background-color: #f5f7fa;
  border-right: 1px solid #e6e6e6;
  height: 100%;
}

.main {
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background-color: #f5f7fa;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  height: 60px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

/* Headings */
.heading-1 {
  font-size: 2.5em;
  color: #303133;
  margin-bottom: 0.5em;
}
.heading-2 {
  font-size: 2em;
  color: #606266;
  margin-bottom: 0.5em;
}
.heading-3 {
  font-size: 1.75em;
  color: #909399;
  margin-bottom: 0.5em;
}
.heading-4 {
  font-size: 1.5em;
  color: #c0c4cc;
  margin-bottom: 0.5em;
}
.heading-5 {
  font-size: 1.25em;
  color: #dcdfe6;
  margin-bottom: 0.5em;
}

/* zh */
.zh-400 {
  font-weight: 400;
}
.zh-500 {
  font-weight: 500;
}
.zh-700 {
  font-weight: 700;
}

/* Font Styles */
.font-styles {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.font-serif {
  font-family: Georgia, serif;
}
.font-sans {
  font-family: Arial, sans-serif;
}
.font-mono {
  font-family: "Courier New", monospace;
}

/* Font Sizes */
.font-sizes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.text-xs {
  font-size: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-base {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}

/* Text Colors */
.text-colors {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.text-red {
  color: #f56c6c;
}
.text-blue {
  color: #409eff;
}
.text-green {
  color: #67c23a;
}
.text-purple {
  color: #909399;
}

/* Backgrounds */
.backgrounds {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.bg-gradient {
  background: linear-gradient(45deg, #409eff, #67c23a);
  padding: 20px;
  color: white;
  border-radius: 4px;
}

.bg-pattern {
  background-color: #f5f7fa;
  background-image: linear-gradient(45deg, #e6e6e6 25%, transparent 25%),
    linear-gradient(-45deg, #e6e6e6 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e6e6e6 75%),
    linear-gradient(-45deg, transparent 75%, #e6e6e6 75%);
  background-size: 20px 20px;
  padding: 20px;
  border-radius: 4px;
}

.bg-image {
  background-image: url("https://picsum.photos/800/400");
  background-size: cover;
  padding: 20px;
  color: white;
  border-radius: 4px;
}

/* Charts */
.charts-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.chart {
  flex: 1;
  height: 300px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}

/* Images */
.images-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.images-container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* iconfont */
.iconfont-container {
  display: flex;
  gap: 20px;
  font-size: 32px;
  flex-wrap: wrap;
}

.iconfont-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #409eff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.iconfont-svg:hover {
  color: #67c23a;
  transform: scale(1.2);
}
</style>
