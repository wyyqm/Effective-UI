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
    <el-button @click="edit">编辑 - 使用组件 state</el-button>
    <el-button @click="editByService">编辑 - 使用 Service</el-button>

    <ul>
      <li v-for="(item, index) in dataList" :key="item.id">
        {{ item }}
        <ef-sync v-model="dataList[index]" :fn="editDialogState.open">
          <el-button type="text">编辑</el-button>
        </ef-sync>
      </li>
    </ul>
  </div>
</template>

<script>

import EditDialog from '@/pages/dialogs/EditDialog'
import { dialogAsService, makeDialogState } from '@/components/float'
import EfSync from '@/components/sync'

const EditDialogService = dialogAsService(EditDialog)

export default {
  name: 'EditPage',
  components: {
    EfSync,
    EditDialog,
  },
  data() {
    return {
      dataList: [
        { id: 1, name: 'Alexa', age: '10'},
        { id: 2, name: 'John', age: '21'},
        { id: 3, name: 'Bob', age: '13'},
      ],
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
