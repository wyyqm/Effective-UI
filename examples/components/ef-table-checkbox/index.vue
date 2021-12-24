<template>
  <el-table-column :label="label" width="40">
    <template v-slot:header="{}">
      <el-checkbox :value="allSelected" @input="handleAllSelect()" :indeterminate="indeterminate" />
    </template>
    <template v-slot="{ row }">
      <el-checkbox :key="getKey(row)" :value="!!selected[getKey(row)]" @input="handleCheckboxInput(row)" :disabled="row.disabled" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    },
    value: {
      type: Array,
      required: true
    },

    disabledData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 用weakmap优化getkey
      cache: new WeakMap()
    }
  },
  mounted() {
    const disabledData = this.disabledData()
    if (disabledData && disabledData.length > 0) {
      this.owner.data.forEach((ele) => {
        disabledData.forEach((v) => {
          if (this.getKey(ele) === this.getKey(v)) {
            ele.disabled = true
          }
        })
      })
    }
    console.log(disabledData)
  },
  computed: {
    owner() {
      let parent = this.$parent
      while (parent && !parent.tableId) {
        parent = parent.$parent
      }
      return parent
    },
    selected() {
      const map = {}
      for (const row of this.value) {
        map[this.getKey(row)] = true
      }
      return map
    },
    allSelected() {
      let val
      for (const row of this.owner.data) {
        if (!this.selected[this.getKey(row)]) {
          val = false
        } else {
          val = true
        }
      }
      return val
    },
    indeterminate() {
      let val
      const selectList = this.owner.data.filter((v) => {
        return Object.keys(this.selected).indexOf(this.getKey(v).toString()) !== -1
      })
      if (selectList.length === 0 || selectList.length === this.owner.data.length) {
        val = false
      } else {
        val = true
      }
      return val
    }
  },
  watch: {
    disabledData(val) {
      console.log(val)
    }
  },

  methods: {
    getKey(row) {
      // /**缓存中查找 */
      let key = this.cache.get(row)
      if (key) {
        return key
      }
      if (this.owner) {
        const rowKey = this.owner.rowKey
        key = this.getRowIdentity(row, rowKey)
      } else {
        key = row.id
      }
      this.cache.set(row, key)
      return key
    },

    getRowIdentity(row, rowKey) {
      if (!row) throw new Error('row is required when get row identity')
      if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
          return row[rowKey]
        }
        const key = rowKey.split('.')
        let current = row
        for (let i = 0; i < key.length; i++) {
          current = current[key[i]]
        }
        return current
      } else if (typeof rowKey === 'function') {
        return rowKey(row)
      }
    },
    handleCheckboxInput(row) {
      const key = this.getKey(row)
      const isSelected = !!this.selected[key]
      if (isSelected) {
        this.$emit(
          'input',
          this.value.filter((v) => this.getKey(v) !== key)
        )
      } else {
        // 选中事件
        this.$emit('input', [...this.value, row])
        // this.$emit('selectChange', row)
      }
    },
    handleAllSelect() {
      let flag = false
      let selectedList = []
      let useableData = []
      let temp = []
      for (const row of this.owner.data) {
        if (!this.selected[this.getKey(row)]) {
          flag = false
          useableData = this.owner.data.filter((v) => v.disabled !== true)
          temp = this.value.concat(useableData)
          const obj = {}
          // 对重复选中去重
          temp = temp.reduce((cur, next) => {
            if (!obj[this.getKey(next)]) {
              obj[this.getKey(next)] = true
              cur.push(next)
            }
            return cur
          }, [])
        } else {
          // 所有选中的和当前页取消选择的，取差集
          selectedList = this.value.filter((v) => {
            return this.owner.data.every((e) => this.getKey(e) !== this.getKey(v))
          })
          flag = true
        }
      }
      flag ? this.$emit('input', selectedList) : this.$emit('input', temp)
    }
  }
}
</script>
