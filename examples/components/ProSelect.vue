<template>
  <div>
    <el-select v-model="formData[item.prop]" v-bind="item.elCompProps">
      <el-option v-for="temp in item.cusData" :key="temp.value" :label="temp.label" :value="temp.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import { ProItemMixin } from '../../packages/json-form/index'
import { buildIdx } from './OtherUtils'

export default {
  name: 'ProSelect',
  model: {
    prop: 'selectedData',
    event: 'changeSelected'
  },
  mixins: [ProItemMixin],
  props: {
    selectedData: {
      type: [String, Array, Number]
    }
  },
  data() {
    return {
      idx: buildIdx()
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('ProSelect 组件创建' + this.idx)
  },
  updated() {
    console.log('ProSelect 组件更新' + this.idx)
  },
  methods: {},
  install(Vue) {
    Vue.component(this.name, this)
  }
}
</script>

<style lang="scss" scope></style>
