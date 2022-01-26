<template>
  <ef-drawer :state="state">
    <div slot="title">
      查看 Drawer
    </div>

    <el-descriptions title="信息">
      <el-descriptions-item label="id">{{ model.id }}</el-descriptions-item>
      <el-descriptions-item label="name">{{model.name}}</el-descriptions-item>
      <el-descriptions-item label="status">{{ model.status }}</el-descriptions-item>
    </el-descriptions>
  </ef-drawer>
</template>

<script>
import { EfDrawer } from '@/components/float'

export default {
  name: 'ViewDrawer',
  components: { EfDrawer },
  props: {
    state: {
      type: Object
    }
  },
  data() {
    return {
      model: {
        ...this.state.data
      }
    }
  }
}
</script>

<style scoped>

</style>
