# 测试 Script Setup 语法

## 基本示例

::: demo 使用 script setup 语法的基本示例

```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>计数器: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const greeting = 'Hello, Vue 2.7 with Script Setup!'
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
```

:::

## 带方法的示例

::: demo 使用 script setup 语法带方法的示例

```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>计数器: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const greeting = 'Hello, Vue 2.7 with Script Setup!'

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
```

:::