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
              <!-- 搜索框 -->
              <div class="search-container">
                <input 
                  type="text" 
                  v-model="searchKeyword" 
                  placeholder="搜索文件..."
                  class="search-input"
                />
              </div>
              
              <div 
                v-for="file in activeFiles" 
                :key="file.id"
                class="file-item"
              >
                <!-- 文件信息 -->
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-meta">
                    <span class="file-size">{{ file.size }}</span>
                    <span class="file-date">{{ file.modified }}</span>
                  </div>
                </div>
                
                <!-- 文件操作 -->
                <div class="file-actions">
                  <span class="action-icon">⋮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 第二个空的功能框 -->
      <div class="feature-card empty-card">
        <!-- 水平排列的两个卡片 -->
        <div class="subcards-container">
          <!-- 第一个子卡片 -->
          <div class="subcard">
            <div class="subcard-header">
              <h3>文档总量</h3>
            </div>
            <div class="subcard-content">
              <div class="doc-total-display">
                <v-icon size="64" color="#FF6B6B" class="doc-icon">mdi-file-document-multiple</v-icon>
                <div class="doc-number">{{ totalDocs }}</div>
                <div class="doc-label">文档总量</div>
              </div>
            </div>
          </div>
          
          <!-- 第二个子卡片 -->
          <div class="subcard">
            <div class="subcard-header">
              <h3>分类数量</h3>
            </div>
            <div class="subcard-content">
              <div class="doc-total-display">
                <v-icon size="64" color="#FF6B6B" class="doc-icon">mdi-folder-multiple</v-icon>
                <div class="doc-number">{{ totalCategories }}</div>
                <div class="doc-label">分类数量</div>
              </div>
            </div>
          </div>
        </div>
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
  { id: 5, name: '压缩包', fileCount: 5, color: '#F44336' },
  { id: 6, name: '音视频文件', fileCount: 5, color: '#5FF556' }
])

// 模拟数据：文件列表
const filesData = {
  1: [
    { id: 1, name: '项目计划.docx', type: 'document', size: '2.3 MB', modified: '2024-01-15 14:30' },
    { id: 2, name: '需求文档.pdf', type: 'pdf', size: '5.6 MB', modified: '2024-01-16 09:15' },
    { id: 3, name: '设计方案.pptx', type: 'presentation', size: '12.8 MB', modified: '2024-01-17 16:45' },
    { id: 4, name: '会议记录.txt', type: 'text', size: '15 KB', modified: '2024-01-18 11:20' },
    { id: 5, name: '技术文档.md', type: 'markdown', size: '23 KB', modified: '2024-01-19 10:05' },
    { id: 6, name: '技术文档.md', type: 'markdown', size: '23 KB', modified: '2024-01-19 10:05' },
    { id: 7, name: '技术文档.md', type: 'markdown', size: '23 KB', modified: '2024-01-19 10:05' }
  ],
  2: [
    { id: 6, name: '产品截图.jpg', type: 'image', size: '1.2 MB', modified: '2024-01-20 15:30' },
    { id: 7, name: '设计草图.png', type: 'image', size: '850 KB', modified: '2024-01-21 08:45' },
    { id: 8, name: '界面原型.svg', type: 'vector', size: '45 KB', modified: '2024-01-22 14:20' }
  ],
  3: [
    { id: 9, name: '产品演示.mp4', type: 'video', size: '120 MB', modified: '2024-01-23 11:10' },
    { id: 10, name: '培训视频.avi', type: 'video', size: '85 MB', modified: '2024-01-24 16:50' }
  ],
  4: [
    { id: 11, name: '背景音乐.mp3', type: 'audio', size: '4.5 MB', modified: '2024-01-25 09:30' },
    { id: 12, name: '音效.wav', type: 'audio', size: '2.8 MB', modified: '2024-01-26 14:45' }
  ],
  5: [
    { id: 13, name: '项目源码.zip', type: 'archive', size: '45 MB', modified: '2024-01-27 10:20' },
    { id: 14, name: '数据备份.rar', type: 'archive', size: '38 MB', modified: '2024-01-28 16:15' }
  ]
}

// 当前激活的分类
const activeCategory = ref(1)

// 搜索关键词
const searchKeyword = ref('')

// 设置激活的分类
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

// 根据激活的分类获取对应的文件列表，并支持搜索过滤
const activeFiles = computed(() => {
  const files = filesData[activeCategory.value] || []
  if (!searchKeyword.value) {
    return files
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return files.filter(file => {
    return file.name.toLowerCase().includes(keyword)
  })
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
  if (params && params.dataIndex !== undefined) {
    // 使用dataIndex获取分类，这种方式更可靠
    const category = categories.value[params.dataIndex]
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

// 计算文档总量
const totalDocs = computed(() => {
  let count = 0
  // 遍历所有分类，计算文件总数
  Object.values(filesData).forEach(files => {
    count += files.length
  })
  return count
})

// 计算分类数量
const totalCategories = computed(() => {
  return categories.value.length
})

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
  padding: 20px;
  box-sizing: border-box;
}

/* 子卡片容器 */
.subcards-container {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
}

/* 子卡片样式 */
.subcard {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.subcard:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 子卡片头部 */
.subcard-header {
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.subcard-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--light-text);
}

/* 子卡片内容 */
.subcard-content {
  flex: 1;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
  font-size: 14px;
}

/* 文档总量数字卡片样式 */
.doc-total-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
}

.doc-icon {
  margin-bottom: 12px;
}

.doc-number {
  font-size: 48px;
  font-weight: bold;
  color: #FF6B6B;
  margin-bottom: 4px;
}

.doc-label {
  font-size: 16px;
  color: #666;
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
  height: 450px; /* 设置固定高度，确保饼图高度不变 */
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

/* 搜索框容器 */
.search-container {
  padding: 16px;
  background-color: var(--light-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

/* 搜索输入框 */
.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #4285F4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

/* 文件列表 */
.file-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background-color: var(--light-bg);
  max-height: 400px; /* 设置最大高度，超出时滚动 */
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
}

/* 文件项 */
.file-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  background-color: transparent;
  color: var(--light-text);
  font-size: 14px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.15s ease;
  cursor: pointer;
}

/* 最后一个文件项移除底部边框 */
.file-item:last-child {
  border-bottom: none;
}

.file-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: none;
}

/* 文件信息 */
.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}

.file-size {
  white-space: nowrap;
}

.file-date {
  white-space: nowrap;
}

/* 文件操作 */
.file-actions {
  flex-shrink: 0;
}

.action-icon {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.54);
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.action-icon:hover {
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.87);
}
</style>