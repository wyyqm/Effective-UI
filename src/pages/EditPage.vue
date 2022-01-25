<template>
  <div>
    <edit-dialog
      v-if="editDialogState.isMount"
      :state="editDialogState"
    />
    <div>
      name: {{ currentData.name }}
    </div>
    <div>
      age: {{ currentData.age }}
    </div>
    <el-button @click="edit">编辑 - 使用组件</el-button>
    <el-button @click="editByService">编辑 - 使用 Service</el-button>
  </div>
</template>

<script>

import makeDialogState from '@/components/dialog/makeDialogState'
import EfDialog from '@/components/dialog'
import EditDialog from '@/pages/dialogs/EditDialog'
import dialogAsService from '@/components/dialog/dialogAsService'

const EditDialogService = dialogAsService(EditDialog)

export default {
  name: 'EditPage',
  components: {
    EditDialog,
    EfDialog,
  },
  data() {
    return {
      currentData: {},
      editDialogState: makeDialogState()
    }
  },
  methods: {
    async edit() {
      this.currentData = await this.editDialogState.open({...this.currentData})
    },
    async editByService() {
      this.currentData = await EditDialogService.open({ ...this.currentData })
    },
    async cancel() {
      console.log('cancel')
    }
  }
}
</script>

<style scoped>

</style>
