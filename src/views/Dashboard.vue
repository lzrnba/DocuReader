<template>
  <div class="dashboard-container">
    <div class="obsidian-card">
      <h2 class="obsidian-title">仪表盘</h2>
      <div class="obsidian-content">
        <p>欢迎使用仪表盘页面</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 仪表盘组件
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.obsidian-card {
  background-color: var(--obsidian-primary);
  border: 1px solid var(--obsidian-border);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.obsidian-title {
  color: var(--obsidian-text);
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.obsidian-content {
  color: var(--obsidian-text);
}

.obsidian-content p {
  margin: 0;
  line-height: 1.6;
}
</style>