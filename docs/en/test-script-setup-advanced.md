# Advanced Script Setup Syntax Test

## Complex Example

::: demo Complex example using script setup syntax

```vue
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>Counter: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increase</button>
    <button @click="decrement">Decrease</button>
    <button @click="reset">Reset</button>
    <div v-if="user">
      <p>User: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'

const count = ref(0)
const greeting = 'Hello, Advanced Script Setup!'
const user = reactive({ name: 'John Doe', email: 'john@example.com' })

const doubled = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
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

button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
```

:::

## Using defineProps and defineEmits

::: demo Example using defineProps and defineEmits

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
/* div {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
} */
</style>
```

:::