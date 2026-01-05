<template>
  <div class="assistant-container">
    <div class="assistant-card">
      <div class="assistant-header">
        <h2 class="assistant-title">对话助手</h2>
        <v-icon class="assistant-icon">mdi-chat</v-icon>
      </div>
      
      <!-- 消息列表 -->
      <div class="messages-container" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="message"
          :class="message.sender === 'user' ? 'user-message' : 'assistant-message'"
        >
          <div class="message-content">
            <div class="message-bubble">
              {{ message.content }}
            </div>
            <div class="message-time">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="input-container">
        <v-textarea
          v-model="inputMessage"
          class="message-input"
          placeholder="请输入您的问题..."
          rows="1"
          auto-grow
          @keydown.enter.exact="sendMessage"
          @keydown.enter.shift="$event.preventDefault()"
        ></v-textarea>
        <v-btn
          class="send-button"
          @click="sendMessage"
          :disabled="!inputMessage.trim()"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 消息列表
const messages = ref([
  {
    sender: 'assistant',
    content: '您好！我是您的文档助手，有什么可以帮助您的吗？',
    timestamp: new Date()
  }
])

// 输入消息
const inputMessage = ref('')

// 消息容器引用
const messagesContainer = ref(null)

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  const userMessage = {
    sender: 'user',
    content: inputMessage.value,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  
  // 清空输入框
  inputMessage.value = ''
  
  // 滚动到底部
  scrollToBottom()
  
  // 模拟助手回复
  setTimeout(() => {
    const assistantReply = {
      sender: 'assistant',
      content: `您的问题是："${userMessage.content}"。这是一个模拟回复，实际应用中会连接到后端服务。`,
      timestamp: new Date()
    }
    messages.value.push(assistantReply)
    scrollToBottom()
  }, 1000)
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.assistant-container {
  padding-top: 80px;
  padding-bottom: 50px;
  margin: 0 auto;
  width: 1200px;
  min-height: 100vh;
  background-color: var(--light-bg);
}

.assistant-card {
  background-color: var(--light-bg);
  border: 1px solid var(--light-border);
  border-radius: 12px;
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.assistant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--light-border);
  background-color: var(--light-bg);
  border-radius: 12px 12px 0 0;
}

.assistant-title {
  color: var(--light-text);
  font-size: 24px;
  margin: 0;
  font-weight: 600;
}

.assistant-icon {
  color: var(--light-accent);
  font-size: 28px;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--light-bg);
}

.message {
  display: flex;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  justify-content: flex-end;
}

.assistant-message {
  align-self: flex-start;
  justify-content: flex-start;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.user-message .message-bubble {
  background-color: var(--light-accent);
  color: white;
  border-bottom-right-radius: 4px;
  text-align: left;
}

.assistant-message .message-bubble {
  background-color: var(--light-bg);
  color: var(--light-text);
  border: 1px solid var(--light-border);
  border-bottom-left-radius: 4px;
  text-align: left;
  max-width: 80%;
  display: inline-block;
}

.message-time {
  font-size: 12px;
  color: rgba(var(--light-text), 0.6);
  align-self: flex-end;
  margin: 0 8px;
}

.assistant-message .message-time {
  align-self: flex-start;
  text-align: left;
  margin-left: 8px;
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid var(--light-border);
  background-color: var(--light-bg);
  border-radius: 0 0 12px 12px;
}

.message-input {
  flex: 1;
  border-radius: 24px !important;
  border: 1px solid var(--light-border) !important;
  background-color: var(--light-primary) !important;
  color: var(--light-text) !important;
  padding: 10px 16px !important;
  font-size: 15px !important;
  resize: none;
}

.message-input::placeholder {
  color: rgba(var(--light-text), 0.5) !important;
}

.send-button {
  background-color: var(--light-accent) !important;
  color: white !important;
  border-radius: 50% !important;
  min-width: 44px !important;
  width: 44px !important;
  height: 44px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.send-button:hover {
  background-color: rgba(var(--light-accent), 0.8) !important;
  transform: scale(1.05);
}

.send-button:disabled {
  background-color: var(--light-border) !important;
  cursor: not-allowed;
  transform: none;
}

/* 滚动条样式 */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: var(--light-primary);
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--light-border);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--light-hover);
}

/* 深色主题适配 */
[data-theme="dark"] .assistant-card {
  background-color: var(--light-primary);
  border-color: var(--light-border);
}

[data-theme="dark"] .assistant-header {
  background-color: var(--light-bg);
}

[data-theme="dark"] .messages-container {
  background-color: var(--light-primary);
}

[data-theme="dark"] .assistant-message .message-bubble {
  background-color: var(--light-bg);
  color: var(--light-text);
  border-color: var(--light-border);
}

[data-theme="dark"] .message-input {
  background-color: var(--light-primary) !important;
  color: var(--light-text) !important;
  border-color: var(--light-border) !important;
}

[data-theme="dark"] .input-container {
  background-color: var(--light-bg);
}
</style>