# Vue 3 Ref Registry

## Introduction

This library keeps a central registry of all component `ref`s in your application and provides a complete new way of inter-component communication.
## Usage

The plugin can be installed in your `main.js` file (or wherever you set up your Vue instance) by adding the following line:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import RefRegistry from 'vue3-ref-registry'

const app = createApp(App)

app.use(RefRegistry)

app.mount('#app')
```

Whenever you set a `ref` on a component, the plugin will automatically register it in the registry.

```vue
<template>
  <component-a ref="componentA"></component-a>
</template>
```

You can then use the following composable to get the list of refs:

```vue
<script setup>
import { useRefRegistry } from 'vue3-ref-registry'

const registry = useRefRegistry()
registry.value.componentA.sayHello()
</script>
```

## script setup

A quick heads-up if you are using the `script setup` syntax: variables and methods defined in a `<script setup>` are [per default private](https://vuejs.org/guide/essentials/template-refs.html#ref-on-component) and cannot be accessed from outside.

If you want to be able to access them from outside, you need to use the `defineExpose` syntax:

```vue
<script setup>
const sayHello = () => {
  console.log('Hello')
}

defineExpose({ sayHello })
</script>
```