<template>
  <ef-popover :state="state">
    <el-select v-model="value">
      <el-option :value="1" label="执行中" />
      <el-option :value="2" label="通过" />
      <el-option :value="3" label="失败" />
    </el-select>
    <el-button @click="state.confirm(value)">确定</el-button>
    <el-button @click="state.cancel()">取消</el-button>
  </ef-popover>
</template>

<script>
import EfPopover from '@/components/float/popover'
export default {
  name: 'inner-edit',
  components: { EfPopover },
  props: {
    state: {}
  },
  data() {
    return {
      value: this.state.data
    }
  }
}
</script>
