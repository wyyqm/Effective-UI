<template>
  <span>{{ showValue }}</span>
</template>

<script>
import { ProItemMixin } from '../../packages/json-form/index'
export default {
  name: 'CommView',
  mixins: [ProItemMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    showValue() {
      if (this.item.showValue) {
        return this.item.showValue(this.item, this.formData)
      } else {
        return this.formData[this.item.prop]
      }
    }
  },
  watch: {},
  created() {
    console.log('CommView 组件创建')
  },
  updated() {
    console.log('CommView 组件更新')
  },
  methods: {},
  install(Vue) {
    Vue.component(this.name, this)
  }
}
</script>

<style lang="scss" scope></style>
