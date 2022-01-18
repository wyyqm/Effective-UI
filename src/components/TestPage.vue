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
        hello
      </el-button>
    </section>

    <main>
      <ef-table ref="table" @row-click="log" height="full">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="name" prop="name" />
      </ef-table>
    </main>

    <footer>
      <el-button>
        测试
      </el-button>
      <el-button>
        测试
      </el-button>
      <el-button>
        测试
      </el-button>
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
