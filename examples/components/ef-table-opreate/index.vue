<template>
  <div class="ef-operate">
    <!-- <el-table-column :label="label"> -->
    <!-- <div class="ef-operate" v-slot="{ row }"> -->
    <!-- <template v-slot="{ row }"> -->
    <slot>
      <el-button type="text" :value="row">编辑</el-button>
      <el-divider direction="vertical"></el-divider>
      <ty-confirm content="确定删除吗?" type="text" btn-text="删除" @confirm="confirm(row)" @cancel="cancel" />
    </slot>
    <!-- </template> -->
  </div>
  <!-- </el-table-column> -->
</template>
<script>
import TyConfirm from '@tuya-fe/ty-confirm'
import '@tuya-fe/ty-confirm/dist/TyConfirm.css'
export default {
  components: { TyConfirm },
  name: 'ef-opreate',
  props: {
    label: {
      type: String
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$slots)
  },
  methods: {
    confirm(value) {
      console.log(value)
      this.$message.success('confirm')
    },
    cancel() {
      this.$message.error('cancel')
    }
  }
}
</script>
<style scoped lang="less">
// .ef-operate
// display: flex;
// align-items: center;
</style>
