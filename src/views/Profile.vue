<template>
  <div class="dashboard-container">
    <!-- 卡片式悬浮界面主体容器 -->
    <div class="card-hover-container">
      <!-- 个人信息卡片 -->
      <div class="feature-card">
        <div class="profile-header">
          <div class="avatar-container">
            <div class="avatar">
              <v-icon size="64" color="white">mdi-account</v-icon>
            </div>
          </div>
          <div class="user-info">
            <h2 class="username">{{ userInfo.name }}</h2>
            <p class="email">{{ userInfo.email }}</p>
            <p class="user-role">{{ userInfo.role }}</p>
          </div>
        </div>
      </div>
      
      <!-- 设置卡片区域 -->
      <div class="subcards-container">
        <!-- 账户设置卡片 -->
        <div class="subcard">
          <div class="subcard-header">
            <h3>账户设置</h3>
          </div>
          <div class="subcard-content">
            <div class="setting-item">
              <v-icon size="24" color="#4ECDC4">mdi-account-edit</v-icon>
              <div class="setting-info">
                <div class="setting-name">个人资料</div>
                <div class="setting-desc">编辑您的个人信息</div>
              </div>
              <v-icon size="20" color="#999">mdi-chevron-right</v-icon>
            </div>
            <div class="setting-item">
              <v-icon size="24" color="#45B7D1">mdi-language</v-icon>
              <div class="setting-info">
                <div class="setting-name">语言设置</div>
                <div class="setting-desc">选择界面语言</div>
              </div>
              <div class="setting-control">
                <v-select
                  v-model="currentLanguage"
                  :items="languages"
                  item-value="value"
                  item-title="label"
                  density="compact"
                  hide-details
                  single-line
                  @change="changeLanguage(currentLanguage)"
                  style="width: 120px;"
                ></v-select>
              </div>
            </div>
            <div class="setting-item">
              <v-icon size="24" color="#F9CA24">mdi-theme-light-dark</v-icon>
              <div class="setting-info">
                <div class="setting-name">主题设置</div>
                <div class="setting-desc">切换深色/浅色主题</div>
              </div>
              <div class="setting-control">
                <v-select
                  v-model="currentTheme"
                  :items="themes"
                  item-value="value"
                  item-title="label"
                  density="compact"
                  hide-details
                  single-line
                  @change="changeTheme(currentTheme)"
                  style="width: 120px;"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 安全设置卡片 -->
        <div class="subcard">
          <div class="subcard-header">
            <h3>安全设置</h3>
          </div>
          <div class="subcard-content">
            <div class="setting-item">
              <v-icon size="24" color="#FF7675">mdi-lock</v-icon>
              <div class="setting-info">
                <div class="setting-name">修改密码</div>
                <div class="setting-desc">更新您的登录密码</div>
              </div>
              <v-icon size="20" color="#999">mdi-chevron-right</v-icon>
            </div>
            <div class="setting-item">
              <v-icon size="24" color="#A29BFE">mdi-shield-account</v-icon>
              <div class="setting-info">
                <div class="setting-name">两步验证</div>
                <div class="setting-desc">增强账户安全性</div>
              </div>
              <v-icon size="20" color="#999">mdi-chevron-right</v-icon>
            </div>
            <div class="setting-item">
              <v-icon size="24" color="#FD79A8">mdi-logout</v-icon>
              <div class="setting-info">
                <div class="setting-name">退出登录</div>
                <div class="setting-desc">安全退出当前账户</div>
              </div>
              <v-icon size="20" color="#999">mdi-chevron-right</v-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 使用统计卡片 -->
      <div class="feature-card">
        <div class="subcard-header">
          <h3>使用统计</h3>
        </div>
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon size="40" color="#FF6B6B">mdi-file-document-multiple</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ usageStats.totalDocs }}</div>
              <div class="stat-label">已上传文档</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon size="40" color="#4ECDC4">mdi-tag-multiple</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ usageStats.totalCategories }}</div>
              <div class="stat-label">文档分类</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon size="40" color="#45B7D1">mdi-message-text</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ usageStats.totalQueries }}</div>
              <div class="stat-label">查询次数</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <v-icon size="40" color="#F9CA24">mdi-clock-outline</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ usageStats.accountAge }}</div>
              <div class="stat-label">账户时长</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 用户信息数据
const userInfo = ref({
  name: '李政融',
  email: '2012636331@qq.com',
  role: '普通用户'
})

// 使用统计数据
const usageStats = ref({
  totalDocs: 156,
  totalCategories: 8,
  totalQueries: 324,
  accountAge: '3个月'
})

// 语言设置
const languages = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' }
]
const currentLanguage = ref('zh-CN')

// 主题设置
const themes = [
  { value: 'light', label: '浅色模式' },
  { value: 'dark', label: '深色模式' }
]
const currentTheme = ref('light')

// 切换语言
const changeLanguage = (lang) => {
  currentLanguage.value = lang
  // 这里可以添加实际的语言切换逻辑，比如使用i18n
  console.log(`语言切换为: ${lang}`)
}

// 切换主题
const changeTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  console.log(`主题切换为: ${theme}`)
}

// 从localStorage加载设置
onMounted(() => {
  // 加载语言设置
  const savedLang = localStorage.getItem('user-language')
  if (savedLang) {
    currentLanguage.value = savedLang
  }
  
  // 加载主题设置
  const savedTheme = localStorage.getItem('user-theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})

// 保存设置到localStorage
onBeforeUnmount(() => {
  localStorage.setItem('user-language', currentLanguage.value)
  localStorage.setItem('user-theme', currentTheme.value)
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
  border: 1px solid var(--light-border);
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
  border: 1px solid var(--light-border);
  border-radius: 12px;
  background-color: var(--light-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  overflow: visible;
  transition: all 0.3s ease;
  width: 100%;
}

.feature-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 个人信息头部 */
.profile-header {
  display: flex;
  align-items: center;
  padding: 32px;
  width: 100%;
}

/* 头像容器 */
.avatar-container {
  margin-right: 32px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #FF6B6B;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

/* 用户信息 */
.user-info {
  flex: 1;
}

.username {
  font-size: 32px;
  font-weight: 600;
  color: var(--light-text);
  margin: 0 0 8px 0;
}

.email {
  font-size: 16px;
  color: #666;
  margin: 0 0 8px 0;
}

.user-role {
  font-size: 14px;
  color: #999;
  margin: 0;
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
  color: var(--light-text);
  font-size: 14px;
}

/* 设置项样式 */
.setting-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

[data-theme="dark"] .setting-item {
  background-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .setting-item:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.setting-item:hover {
  background-color: #f0f0f0;
  transform: translateX(4px);
}

.setting-item .setting-info {
  flex: 1;
  margin: 0 16px;
}

.setting-item .setting-control {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.setting-name {
  font-weight: 500;
  margin-bottom: 2px;
}

.setting-desc {
  font-size: 12px;
  color: #999;
}

/* 统计数据容器 */
.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
}

/* 统计项样式 */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.stat-icon {
  margin-bottom: 16px;
}

.stat-number {
  font-size: 32px;
  font-weight: 600;
  color: var(--light-text);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .dashboard-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    width: 100%;
    padding-top: 40px;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar-container {
    margin-right: 0;
    margin-bottom: 24px;
  }
  
  .subcards-container {
    flex-direction: column;
  }
  
  .stats-container {
    flex-direction: column;
    gap: 32px;
  }
}
</style>