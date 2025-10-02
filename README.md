# 简介

`Demo Container V2` 是一个基于 `Vuepress` 的插件，它可以为你提供简单便利的组件示例编写体验。

它可以帮你做到：
1. 使用自定义 `::: demo` 语法，写一遍示例即可自动生成组件示例与代码示例；
2. 支持示例中的 `import` 语法；

# 安装
使用 `yarn`:
```bash
yarn add vuepress-plugin-demo-container-v2 -D
```
或者 `npm`:
```bash
npm i vuepress-plugin-demo-container-v2 -D
```

# 使用
打开 `.vuepress/config.js` 文件, 添加插件:

```js
module.exports = {
  plugins: ['demo-container-v2']
}
```

在 md 文件中可以按照以下格式书写代码示例:

## 传统语法

```html
::: demo
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message" placeholder="Input something..."/>
  </div>
</template>
<script>
  import { ref } from 'vue-demi'
  export default {
    setup () {
      const message = ref('Hello Here')

      return {
        message
      }
    }
  }
</script>
` ``
<!-- 忽略上一行的空格 -->
:::
```

## Script Setup 语法 (Vue 2.7+)

现在插件已经完全支持 Vue 2.7+ 的 script-setup 语法，包括：

### 基本用法

```html
::: demo
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message" placeholder="Input something..."/>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const message = ref('Hello Here with Script Setup!')
</script>
` ``
<!-- 忽略上一行的空格 -->
:::
```

### 高级用法

插件支持 script-setup 的所有特性，包括：

- 响应式 API（ref, reactive, computed, watch, watchEffect）
- 函数声明
- defineProps 和 defineEmits
- 复杂的导入语句

```html
::: demo
```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>Counter: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increase</button>
    <button @click="decrement">Decrease</button>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const greeting = 'Hello, Advanced Script Setup!'

const doubled = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

// 监听 count 变化
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
</script>
<style scoped>
h1 {
  color: #42b983;
}
</style>
` ``
<!-- 忽略上一行的空格 -->
:::
```

### 使用 defineProps 和 defineEmits

```html
::: demo
```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Message: {{ message }}</p>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  initialMessage: {
    type: String,
    default: 'Hello'
  }
})

const emit = defineEmits(['message-sent'])

const message = ref(props.initialMessage)

const sendMessage = () => {
  emit('message-sent', message.value)
}
</script>
<style scoped>
div {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
</style>
` ``
<!-- 忽略上一行的空格 -->
:::
```

[点此查看完整文档](https://waycowei.github.io/vuepress-plugin-demo-container-v2/zh/)

# 致谢
该项目是受到 ElementUI / [md-loader](https://github.com/element-plus/element-plus/tree/dev/website/md-loader) 的启发而生，向 **饿了么大前端** 致意。

# 贡献者
<p>
  <a href="https://github.com/calebman" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/27751088" width="54px" height="54px" style="border-radius: 50%;" title="JianhuiChen" class="avatar-user avatar">
  </a>
  <a href="https://github.com/waycowei" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/8675871" width="54px" height="54px" style="border-radius: 50%;" title="WaycoWei" class="avatar-user avatar">
  </a>
</p>

# 许可

[MIT License](https://github.com/waycowei/vuepress-plugin-demo-container-v2/blob/master/LICENSE) @2020-PRESENT [Wayco Wei](https://github.com/waycowei)
