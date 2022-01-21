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
      <el-button>
        新增
      </el-button>
    </section>

    <main>
      <ef-table ref="table" @row-click="log" height="full">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="操作">
          <el-button-group>
            <el-button type="text" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="text" icon="el-icon-video-pause">
              停用
            </el-button>
            <el-button type="text" icon="el-icon-delete" >
              删除
            </el-button>
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
          @current-change="log"
          layout="total, sizes, prev, pager, next, jumper"
      />
    </footer>
  </ef-search-list-container>
</template>

<script>
import EfSearchListContainer from '@/components/searchList/container'
import EfPagination from '@/components/pagination/index.vue'
import EfTable from '@/components/table/index.vue'
import { makeSearchList } from '@/components/searchList/utils'
import EfSearch from '@/components/search'

const list = []

for (let i = 0; i < 1000; i++) {
  list.push({
    id: i,
    name: 'item ' + i
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
  name: 'TestPage',
  components: {
    EfSearch,
    EfSearchListContainer,
    EfTable,
    EfPagination,
  },
  props: {
    msg: String
  },
  data() {
    const searchForm = {
      name: ''
    }
    return {
      searchForm,
      searchList: makeSearchList({
        fetchFn: this.fetchFn,
        initialSearchParams: searchForm
      })
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
    log(...args) {
      console.log(args)
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
