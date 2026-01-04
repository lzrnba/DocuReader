<template>
  <div class="dashboard-container">
    <!-- 卡片式悬浮界面主体容器 -->
    <div class="card-hover-container">
      <!-- 第一个功能框 -->
      <div class="feature-card">
        <!-- 左侧分组器 -->
        <div class="group-section">
          <!-- 大圆圈组件 -->
          <div class="large-circle"></div>
        </div>
        <!-- 右侧内容框 -->
        <div class="content-section">
          <!-- 内容区域 -->
          <div class="content-area">
            <div class="category-list">
              <!-- 文件夹分类列表 -->
              <div 
                v-for="category in categories" 
                :key="category.id"
                class="category-item"
                :class="{ 'active': activeCategory === category.id }"
                @mouseenter="setActiveCategory(category.id)"
              >
                <span class="category-name">{{ category.name }}</span>
                <span class="file-count">({{ category.fileCount }})</span>
              </div>
            </div>
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
import { ref, computed } from 'vue'

// 模拟数据：文件夹分类
const categories = ref([
  { id: 1, name: '文档', fileCount: 15 },
  { id: 2, name: '图片', fileCount: 28 },
  { id: 3, name: '视频', fileCount: 8 },
  { id: 4, name: '音频', fileCount: 12 },
  { id: 5, name: '压缩包', fileCount: 5 }
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
  overflow: hidden;
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

/* 大圆圈组件 */
.large-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 2px solid var(--light-accent);
  background-color: var(--light-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.large-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

/* 文件夹分类列表 */
.category-list {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 分类项 */
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-radius: 8px;
  background-color: var(--light-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  font-size: 14px;
}

.category-item:hover,
.category-item.active {
  background-color: var(--light-primary);
  border-color: var(--light-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.category-name {
  font-weight: 500;
  color: var(--light-text);
}

.file-count {
  font-size: 12px;
  color: var(--light-text);
  opacity: 0.7;
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