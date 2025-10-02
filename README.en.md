# Introduction

[中文 README](https://github.com/waycowei/vuepress-plugin-demo-container-v2/blob/master/README.md)

`Demo Container V2` is a `Vuepress-based` plug-in, which can help you add `Vue` examples when writing documents.

It can help you:
1. Write an example to automatically generate component examples and code examples by the custom `::: demo` syntax;
2. Support the `import` syntax in code example;

# Install
Use `yarn`:
```bash
yarn add vuepress-plugin-demo-container-v2.7 -D
```
Or `npm`:
```bash
npm i vuepress-plugin-demo-container-v2.7 -D
```

# Usage
Open the `.vuepress/config.js` file, and then reference the plugin in the appropriate location:

```js
module.exports = {
  plugins: ['demo-container-v2.7']
}
```

Write the following code in the Markdown file:

## Traditional Syntax

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
<!-- ignore space in the previous line -->
:::
```

## Script Setup Syntax (Vue 2.7+)

The plugin now fully supports Vue 2.7+ script-setup syntax, including:

### Basic Usage

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
<!-- ignore space in the previous line -->
:::
```

### Advanced Usage

The plugin supports all features of script-setup, including:

- Reactive APIs (ref, reactive, computed, watch, watchEffect)
- Function declarations
- defineProps and defineEmits
- Complex import statements

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

// Watch count changes
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
<!-- ignore space in the previous line -->
:::
```

### Using defineProps and defineEmits

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
<!-- ignore space in the previous line -->
:::
```

[View full documentation](https://waycowei.github.io/vuepress-plugin-demo-container-v2/zh/)

# Thanks
This project is heavily inspired by the [md-loader](https://github.com/element-plus/element-plus/tree/dev/website/md-loader) of ElemeFE team.

# Contributors
<p>
  <a href="https://github.com/calebman" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/27751088" width="54px" height="54px" style="border-radius: 50%;" title="JianhuiChen" class="avatar-user avatar">
  </a>
  <a href="https://github.com/waycowei" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/8675871" width="54px" height="54px" style="border-radius: 50%;" title="WaycoWei" class="avatar-user avatar">
  </a>
</p>

# License

[MIT License](https://github.com/waycowei/vuepress-plugin-demo-container-v2/blob/master/LICENSE) @2020-PRESENT [Wayco Wei](https://github.com/waycowei)
