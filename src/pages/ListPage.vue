<template>
  <ef-search-list-container :search-list="searchList" fetch-on-mounted>
    <section>
      <ef-search :model.sync="searchForm">
        <el-form-item label="ID">
          <el-input v-model="searchForm.id" />
        </el-form-item>

        <el-form-item label="名字">
          <el-input v-model="searchForm.name" />
        </el-form-item>
      </ef-search>
      <el-button @click="create">
        新增
      </el-button>

      <ef-confirm title="test" dialog>
        <div slot="content">
          <el-input v-model="searchForm.name" />
        </div>

        <el-button>
          test
        </el-button>
      </ef-confirm>
    </section>

    <main>
      <ef-table ref="table" height="full">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="状态" v-slot="{ row }">
          <ef-switch-span :match="statusMatch" :value="row.status" />
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row, $index }">
          <el-button-group>
            <el-button type="text" @click="view(row)">
              查看
            </el-button>
            <ef-sync v-model="searchList.data[$index]" :fn="editDialogState.open">
              <el-button type="text" icon="el-icon-edit">
                编辑
              </el-button>
            </ef-sync>
            <el-button type="text" icon="el-icon-video-pause">
              停用
            </el-button>
            <ef-confirm type="text">
              <div slot="content">
                确定要删除{{ row.name }}？
              </div>
              <el-button type="text" icon="el-icon-delete" >
                删除
              </el-button>
            </ef-confirm>
          </el-button-group>
        </el-table-column>
      </ef-table>
    </main>

    <footer>
      <el-button-group>
        <el-button icon="el-icon-delete">
          批量删除
        </el-button>
        <el-button>
          测试
        </el-button>
        <el-button>
          测试
        </el-button>
      </el-button-group>
      <ef-pagination
        layout="total, sizes, prev, pager, next, jumper"
      />
    </footer>
    <edit-dialog
      v-if="editDialogState.isMount"
      :state="editDialogState"
    />
  </ef-search-list-container>
</template>

<script>
import Vue from 'vue'
import EfSearchListContainer from '@/components/searchList/container'
import EfPagination from '@/components/pagination/index.vue'
import EfTable from '@/components/table/index.vue'
import EfSearch from '@/components/search'
import EfSpan from '@/components/span'
import makeSearchListState from '@/components/searchList/makeSearchListState'
import EditDialog from '@/pages/dialogs/EditDialog'
import EfSync from '@/components/sync'
import { drawerAsService, makeDialogState } from '@/components/float'
import ViewDrawer from '@/pages/dialogs/ViewDrawer'
import EfConfirm from '@/components/confirm'

Vue.use(EfSpan)
const list = []

const ViewDrawerService = drawerAsService(ViewDrawer)

for (let i = 0; i < 1000; i++) {
  list.push({
    id: i,
    name: 'item ' + i,
    status: Math.ceil(Math.random() * 3)
  })
}

async function getData({ page, pageSize, name }) {
  let result = list
  if (name) {
    result = result.filter((d) => d.name.includes(name))
  }

  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    data: result.slice((page - 1) * pageSize, page * pageSize),
    total: result.length
  }
}

export default {
  name: 'ListPage',
  components: {
    EfConfirm,
    EfSync,
    EfSearch,
    EfSearchListContainer,
    EfTable,
    EfPagination,
    EditDialog,
  },
  data() {
    const searchForm = {
      name: ''
    }
    return {
      editDialogState: makeDialogState(),
      statusMatch: [
        [1, '执行中', { type: 'info', }],
        [2, '通过', { type: 'success', }],
        [3, '失败', { type: 'warning', }],
      ],
      searchForm,
      searchList: makeSearchListState({
        fetchFn: this.fetchFn,
        initialSearchParams: searchForm
      }),
    }
  },
  methods: {
    async fetchFn({ currentPage, pageSize }, { name }) {
      const { data, total } = await getData({
        page: currentPage,
        pageSize,
        name,
      })

      return {
        data,
        total,
      }
    },
    async create() {
      const value = await this.editDialogState.open({
        name: ''
      })

      console.log(value)
    },
    log(...args) {
      console.log(args)
    },
    view(data) {
      ViewDrawerService.open(data)
    }
  }
}
</script>

<style>

.el-button-group .el-button.el-button--text:not(:last-child) {
  margin-right: 1em;
}

.el-button-group .el-button--text:not(:last-child):after {
  display: inline;
  white-space: pre;
  content: ' ';
  color: transparent;

  /* absolute 可以保证按钮的文本结尾，如果有空白，那个空白不占空间 */
  position: absolute;
  margin-right: 0.4em;
  margin-left: 0.4em;

  /* 模拟一条竖线 */
  background: linear-gradient(90deg,
    rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%,
    rgba(220,223,230,1) 35%, rgba(220,223,230,1) 65%,
    rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%
  );
}
</style>
