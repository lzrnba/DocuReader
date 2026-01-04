<template>
  <div class="dashboard-container">
    <!-- 卡片式悬浮界面主体容器 -->
    <div class="card-hover-container">
      <!-- 第一个功能框 -->
      <div class="feature-card">
        <!-- 左侧分组器 -->
        <div class="group-section">
          <!-- 饼图组件 -->
          <div 
            ref="pieChartRef"
            class="pie-chart"
            @mouseover="handlePieChartHover"
          ></div>
        </div>
        <!-- 右侧内容框 -->
        <div class="content-section">
          <!-- 内容区域 -->
          <div class="content-area">
            <!-- 条形图组件 -->
            <div 
              ref="barChartRef"
              class="bar-chart"
            ></div>
            <!-- 文件列表（根据当前hover的分类显示） -->
            <div class="file-list">
              <div 
                v-for="file in activeFiles" 
                :key="file.id"
                class="file-item"
              >
                {{ file.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 第二个空的功能框 -->
      <div class="feature-card empty-card">
        <!-- 空卡片占位符 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

// 饼图引用
const pieChartRef = ref(null)
let pieChartInstance = null

// 条形图引用
const barChartRef = ref(null)
let barChartInstance = null

// 模拟数据：文件夹分类
const categories = ref([
  { id: 1, name: '产品说明', fileCount: 15, color: '#2196F3' },
  { id: 2, name: '背景', fileCount: 28, color: '#4CAF50' },
  { id: 3, name: '技术', fileCount: 8, color: '#FF9800' },
  { id: 4, name: '操作手册', fileCount: 12, color: '#9C27B0' },
  { id: 5, name: '压缩包', fileCount: 5, color: '#F44336' }
])

// 模拟数据：文件列表
const filesData = {
  1: [
    { id: 1, name: '项目计划.docx' },
    { id: 2, name: '需求文档.pdf' },
    { id: 3, name: '设计方案.pptx' },
    { id: 4, name: '会议记录.txt' },
    { id: 5, name: '技术文档.md' }
  ],
  2: [
    { id: 6, name: '产品截图.jpg' },
    { id: 7, name: '设计草图.png' },
    { id: 8, name: '界面原型.svg' }
  ],
  3: [
    { id: 9, name: '产品演示.mp4' },
    { id: 10, name: '培训视频.avi' }
  ],
  4: [
    { id: 11, name: '背景音乐.mp3' },
    { id: 12, name: '音效.wav' }
  ],
  5: [
    { id: 13, name: '项目源码.zip' },
    { id: 14, name: '数据备份.rar' }
  ]
}

// 当前激活的分类
const activeCategory = ref(1)

// 设置激活的分类
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

// 根据激活的分类获取对应的文件列表
const activeFiles = computed(() => {
  return filesData[activeCategory.value] || []
})

// 饼图数据
const pieChartData = computed(() => {
  return categories.value.map(category => ({
    value: category.fileCount,
    name: category.name,
    color: category.color
  }))
})

// 饼图配置
const pieChartOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  color: categories.value.map(cat => cat.color),
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: 'transparent',
        borderWidth: 0
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{b}'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {
        show: false
      },
      data: pieChartData.value
    }
  ],
  // 使用graphic组件绘制中心黑色圆
  graphic: [
    {
      id: 'centerCircle',
      type: 'circle',
      shape: {
        cx: '50%',
        cy: '50%',
        r: '35%'  // 半径小于饼图的内半径(40%)
      },
      style: {
        fill: '#000'
      },
      invisible: false
    }
  ]
})

// 条形图数据
const barChartData = computed(() => {
  return categories.value.map(category => ({
    value: category.fileCount,
    name: category.name,
    color: category.color
  }))
})

// 条形图配置
const barChartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}: {c}'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      show: true
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#eee'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: categories.value.map(cat => cat.name),
    axisLabel: {
      show: true,
      fontSize: 14
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: [
    {
      name: '文件数量',
      type: 'bar',
      data: barChartData.value,
      barWidth: '60%',
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: function(params) {
          return categories.value[params.dataIndex].color
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      }
    }
  ]
})

// 处理饼图hover事件
const handlePieChartHover = (params) => {
  if (params && params.data) {
    const category = categories.value.find(cat => cat.name === params.data.name)
    if (category) {
      activeCategory.value = category.id
      
      // 隐藏中心黑色圆
      if (pieChartInstance) {
        pieChartInstance.setOption({
          graphic: [
            {
              id: 'centerCircle',
              invisible: true
            }
          ]
        })
      }
    }
  }
}

// 处理条形图hover事件
const handleBarChartHover = (params) => {
  if (params && params.data) {
    const category = categories.value.find(cat => cat.name === params.data.name)
    if (category) {
      activeCategory.value = category.id
    }
  }
}

// 处理饼图mouseout事件
const handlePieChartMouseOut = () => {
  // 显示中心黑色圆
  if (pieChartInstance) {
    pieChartInstance.setOption({
      graphic: [
        {
          id: 'centerCircle',
          invisible: false
        }
      ]
    })
  }
}

// 初始化饼图和条形图
onMounted(() => {
  // 初始化饼图
  if (pieChartRef.value) {
    pieChartInstance = echarts.init(pieChartRef.value)
    
    // 更新饼图数据
    pieChartOptions.value.series[0].data = pieChartData.value
    
    // 渲染饼图
    pieChartInstance.setOption(pieChartOptions.value)
    
    // 监听饼图hover事件
    pieChartInstance.on('mouseover', 'series', handlePieChartHover)
    // 监听饼图mouseout事件
    pieChartInstance.on('mouseout', 'series', handlePieChartMouseOut)
    
    // 监听窗口大小变化，调整饼图大小
    window.addEventListener('resize', () => {
      if (pieChartInstance) {
        pieChartInstance.resize()
      }
    })
  }
  
  // 初始化条形图
  if (barChartRef.value) {
    barChartInstance = echarts.init(barChartRef.value)
    
    // 更新条形图数据
    barChartOptions.value.series[0].data = barChartData.value
    barChartOptions.value.yAxis.data = categories.value.map(cat => cat.name)
    
    // 渲染条形图
    barChartInstance.setOption(barChartOptions.value)
    
    // 监听条形图hover事件
    barChartInstance.on('mouseover', 'series', handleBarChartHover)
    
    // 监听窗口大小变化，调整条形图大小
    window.addEventListener('resize', () => {
      if (barChartInstance) {
        barChartInstance.resize()
      }
    })
  }
})

// 监听饼图数据变化，更新饼图和条形图
watch(pieChartData, (newData) => {
  // 更新饼图
  if (pieChartInstance) {
    pieChartInstance.setOption({
      series: [
        {
          data: newData
        }
      ]
    })
  }
  
  // 更新条形图
  if (barChartInstance) {
    barChartInstance.setOption({
      series: [
        {
          data: newData
        }
      ],
      yAxis: {
        data: categories.value.map(cat => cat.name)
      }
    })
  }
}, { deep: true })
</script>

<style scoped>
.dashboard-container {
  padding-top: 80px;
  padding-bottom: 50px;
  margin: 0 0 0 0px;
  width: calc(100% - 240px);
  min-height: 100vh;
  width: 1200px;
  background-color: var(--light-bg);
}

/* 卡片式悬浮界面主体容器 */
.card-hover-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border: 1px solid var(--light-border); /* Material-UI风格边框 */
  border-radius: 12px;
  background-color: var(--light-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
}

/* 功能框样式 */
.feature-card {
  display: flex;
  border: 1px solid var(--light-border); /* Material-UI风格边框 */
  border-radius: 12px;
  background-color: var(--light-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: visible;
  transition: all 0.3s ease;
  min-height: 350px;
  width: 100%;
}

/* 空卡片样式 */
.empty-card {
  height: 350px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* 左侧分组器 */
.group-section {
  flex: 0 0 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: var(--light-bg);
  border-right: 1px solid var(--light-border);
}

/* 饼图组件 */
.pie-chart {
  width: 200px;
  height: 200px;
}

/* 右侧内容框 */
.content-section {
  flex: 1;
  padding: 24px;
}

/* 内容区域 */
.content-area {
  display: flex;
  gap: 24px;
  height: 100%;
}

/* 条形图组件 */
.bar-chart {
  flex: 0 0 300px;
  height: 100%;
  min-height: 250px;
}

/* 文件列表 */
.file-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}

/* 文件项 */
.file-item {
  padding: 10px 18px;
  border-radius: 6px;
  background-color: var(--light-bg);
  color: var(--light-text);
  font-size: 14px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.file-item:hover {
  background-color: var(--light-primary);
  border-color: var(--light-border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}
</style>