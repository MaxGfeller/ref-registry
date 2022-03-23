import { ref, computed, inject } from 'vue'

export const registryKey = Symbol('componentRegistry')

export function useRefRegistry () {
  const componentRegistry = inject(registryKey)
  const refs = computed(() => {
    return componentRegistry.value.reduce((acc, component) => {
      Object.keys(component.$refs).forEach((refName) => {
        if (acc[refName]) {
          if (!Array.isArray(acc[refName])) {
            acc[refName] = [acc[refName]]
          }

          acc[refName].push(Array.isArray(component.$refs[refName]) ? component.$refs[refName] : [component.$refs[refName]])
          return
        }

        acc[refName] = component.$refs[refName]
      })
      return acc
    }, {})
  })

  return refs
}

export default {
  install (app) {
    app.provide(registryKey, ref([]))

    app.mixin({
      mounted () {
        const componentRegistry = inject(registryKey)
        componentRegistry.value.push(this)
      },
      beforeUnmount () {
        const componentRegistry = inject(registryKey)
        componentRegistry.value.splice(componentRegistry.value.indexOf(this), 1)
      }
    })
  }
}
