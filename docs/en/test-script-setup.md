# Test Script Setup Syntax

## Basic Example

::: demo Basic example using script setup syntax

```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>Counter: {{ count }}</p>
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

## Example with Methods

::: demo Example with methods using script setup syntax

```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>Counter: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
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