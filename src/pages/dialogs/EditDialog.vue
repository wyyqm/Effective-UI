<template>
  <ef-dialog :state="state">
    <div slot="title">
      编辑 Dialog
    </div>
    <el-form :model="model" ref="form">
      <el-form-item label="name" prop="name" :rules="[{ required: true, message: '名称必填'}]">
        <el-input v-model="model.name" />
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button @click="state.cancel()" size="small">取消</el-button>
      <el-button type="primary" @click="validateConfirm" size="small">确定 - 带验证</el-button>
    </div>
  </ef-dialog>
</template>

<script>
import { EfDialog } from '@/components/float'

export default {
  name: 'EditDialog',
  components: { EfDialog },
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
  },
  methods: {
    async validateConfirm() {
      await this.$refs.form.validate()
      this.state.confirm(this.model)
    }
  }
}
</script>

<style scoped>

</style>
