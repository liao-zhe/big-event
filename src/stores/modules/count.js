import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore('count', () => {
  const count = ref(100)

  const increment = () => {
    count.value++
  }
  return { count, increment }
})
