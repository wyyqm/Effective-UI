<template>
  <el-table-column :label="label" width="40">
    <template v-slot:header="{}">
      <el-checkbox :value="allSelected" @input="handleAllSelect()" :indeterminate="indeterminate" />
    </template>
    <template v-slot="{ row }">
      <el-checkbox :key="getKey(row)" :value="!!selected[getKey(row)]" @input="handleCheckboxInput(row)" :disabled="disabledMap[getKey(row)]" />
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

    disabledBy: {
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      // 用weakmap优化getkey
      cache: new WeakMap()
    }
  },

  computed: {
    disabledMap() {
      const map = {}
      for (let i = 0; i < this.owner.data.length; i++) {
        const item = this.owner.data[i]
        map[this.getKey(item)] = this.disabledBy(item, i, this.owner.data)
      }
      return map
    },
    canUsedList() {
      if (JSON.stringify(this.disabledMap) !== '{}') {
        const canUsedLists = []
        for (const key in this.disabledMap) {
          if (!this.disabledMap[key]) {
            canUsedLists.push(key)
          }
        }
        const canUsed = this.owner.data.filter((v) => {
          return canUsedLists.indexOf(this.getKey(v).toString()) !== -1
        })

        return canUsed
      } else {
        return this.owner.data
      }
    },
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
      // for (const row of this.owner.data) {
      //   if (!this.selected[this.getKey(row)]) {
      //     val = false
      //   }  else {
      //     val = true
      //   }
      // }
      let selectedAll = false
      let count = 0
      if (this.value.length > 0) {
        for (let i = 0; i < this.canUsedList.length; i++) {
          for (let j = 0; j < this.value.length; j++) {
            if (this.getKey(this.value[j]) === this.getKey(this.canUsedList[i])) {
              count++
              if (count === this.canUsedList.length) {
                selectedAll = true
              } else {
                selectedAll = false
              }
            }
          }
        }
      } else {
        selectedAll = false
      }
      return selectedAll
    },
    indeterminate() {
      let val
      const isSelected = Object.keys(this.selected)
      const selectList = this.canUsedList.filter((v) => {
        return isSelected.indexOf(this.getKey(v).toString()) !== -1
      })
      if (selectList.length === 0 || selectList.length === this.canUsedList.length) {
        val = false
      } else {
        val = true
      }
      return val
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
      let checkedList = []
      if (this.allSelected) {
        // 所有选中的和当前页取消选择的，取差集
        checkedList = this.value.filter((v) => {
          return this.canUsedList.every((e) => this.getKey(e) !== this.getKey(v))
        })
        this.$emit('input', checkedList)
      } else {
        for (const item of this.canUsedList) {
          if (!this.selected[this.getKey(item)]) {
            checkedList.push(item)
          }
        }
        this.$emit('input', this.value.concat(checkedList))
      }
    }
  }
}
</script>
