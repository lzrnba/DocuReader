<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

const navItems = [
  {
    title: '仪表盘',
    icon: 'mdi-view-dashboard',
    route: '/'
  },
  {
    title: '个人中心',
    icon: 'mdi-account',
    route: '/profile'
  },
  {
    title: '对话助手',
    icon: 'mdi-chat',
    route: '/assistant'
  }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (routePath) => {
  router.push(routePath)
  isMenuOpen.value = false
}
</script>

<template>
  <v-app class="obsidian-theme">
    <!-- 自定义导航按钮 -->
    <div class="nav-button-container">
      <button 
        class="nav-button" 
        @click="toggleMenu"
        :class="{ 'active': isMenuOpen }"
      >
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <!-- 弹出菜单 -->
      <div class="nav-menu" :class="{ 'open': isMenuOpen }">
        <div class="menu-content">
          <label 
            v-for="item in navItems" 
            :key="item.title" 
            class="menu-item"
            @click="navigateTo(item.route)"
            :class="{ 'active': route.path === item.route }"
          >
            <input 
              type="radio" 
              name="nav" 
              :checked="route.path === item.route" 
              @change="navigateTo(item.route)"
            />
            <v-icon class="menu-icon">{{ item.icon }}</v-icon>
            <span class="menu-text">{{ item.title }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <v-main>
      <div class="content-container">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style>
/* Obsidian 默认主题颜色 */
:root {
  --obsidian-bg: #1e1e1e;
  --obsidian-primary: #2d2d2d;
  --obsidian-text: #cccccc;
  --obsidian-accent: #007acc;
  --obsidian-border: #3e3e42;
  --obsidian-hover: #3a3a3a;
}

/* 全局样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--obsidian-bg);
  color: var(--obsidian-text);
}

.obsidian-theme {
  background-color: var(--obsidian-bg);
  color: var(--obsidian-text);
}

/* 导航按钮容器 */
.nav-button-container {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 导航按钮 */
.nav-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--obsidian-primary);
  border: 2px solid var(--obsidian-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.nav-button:hover {
  background-color: var(--obsidian-hover);
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
}

.nav-button.active {
  background-color: var(--obsidian-accent);
  border-color: var(--obsidian-accent);
}

/* 汉堡菜单图标 */
.hamburger {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: var(--obsidian-text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-button.active .hamburger span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.nav-button.active .hamburger span:nth-child(2) {
  opacity: 0;
}

.nav-button.active .hamburger span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 导航菜单 */
.nav-menu {
  margin-top: 10px;
  background-color: var(--obsidian-primary);
  border: 1px solid var(--obsidian-border);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  min-width: 200px;
}

.nav-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.menu-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 菜单项 */
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--obsidian-text);
  position: relative;
}

.menu-item:hover {
  background-color: var(--obsidian-hover);
}

.menu-item.active {
  background-color: var(--obsidian-accent);
  color: white;
}

/* 自定义radio按钮 */
.menu-item input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.menu-item::before {
  content: "";
  width: 16px;
  height: 16px;
  border: 2px solid var(--obsidian-text);
  border-radius: 50%;
  margin-right: 12px;
  transition: all 0.2s ease;
}

.menu-item.active::before {
  background-color: white;
  border-color: white;
}

.menu-item.active:hover::before {
  background-color: white;
}

/* 菜单项内容 */
.menu-icon {
  margin-right: 10px;
  font-size: 18px;
}

.menu-text {
  font-size: 16px;
}

/* 内容容器 */
.content-container {
  padding: 20px;
  margin-left: 80px;
  min-height: 100vh;
}
</style>
