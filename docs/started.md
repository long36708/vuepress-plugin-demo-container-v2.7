# Getting Started

## Installation

### Install VuePress

Please refer to the official Vuepress documentation, [click here to view](https://vuepress.vuejs.org/guide/)

### Install the plugin

Use `yarn` to install the` vuepress-plugin-demo-container-v2.7` component:
```bash
yarn add vuepress-plugin-demo-container-v2.7 -D
```
Or use `npm` to install it:
```bash
npm i vuepress-plugin-demo-container-v2.7 --save-dev
```

### Configure plugin

Open the `.vuepress/config.js` file, and then reference the plugin in the appropriate location:

```js
module.exports = {
  plugins: ['demo-container-v2.7']
}
```

If you are not familiar with VuePress plugin configuration, please click here: [Use plugin](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)

After the configuration is complete, start the VUePress dev service

## Use plugin

::: warning
In order to show how to write an example, the three points used to mark the end of the code part have been separated by spaces, and the spaces need to be removed when used.
:::

Write the following code in the Markdown file:

```html
::: demo The description information of the code example is placed here, supporting the `Markdown` syntax, **the description information only supports a single line**
```html
<template>
  <div>
    <p>{{ message }}</p>
    <AInput v-model="message" placeholder="Input something..." />
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
:::
```

The running effect is as follows

::: demo The description information of the code example is placed here, supporting the `Markdown` syntax, **the description information only supports a single line**
```html
<template>
  <div>
    <p>{{ message }}</p>
    <AInput v-model="message" placeholder="Input something..." />
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
```
:::

### Using Script Setup Syntax (Vue 2.7+)

Starting from Vue 2.7, you can use the `<script setup>` syntax to simplify component writing. This plugin now supports this syntax:

```html
::: demo Example using Script Setup syntax
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <AInput v-model="message" placeholder="Input something..." />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const message = ref('Hello Here with Script Setup!')
</script>
` ``
:::
```