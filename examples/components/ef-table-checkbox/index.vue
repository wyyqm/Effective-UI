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
      for (const row of this.owner.data) {
        if (!this.selected[this.getKey(row)]) {
          return false
        }
      }
      return true
    },
    indeterminate() {
      let value = null
      // console.log(this.owner.data.length)
      // console.log(Object.keys(this.selected))
      // // for (const row of Object.keys(this.selected)) {
      // for (const item of this.owner.data) {
      // if (row === this.getKey(item)) {
      // console.log(this.getKey(item))
      // }
      // }
      // // }
      if (Object.keys(this.selected).length >= this.owner.data.length || Object.keys(this.selected).length === 0) {
        value = false
      } else {
        value = true
      }
      return value
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
    getDisabled(row) {
      const current = this.owner.data.find((ele) => {
        return ele.id === row.id
      })
      if (current) return current.disabled
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
        this.$emit('selectChange', row)
      }
    },
    handleAllSelect() {
      for (const row of this.owner.data) {
        if (this.selected[this.getKey(row)]) {
          this.$emit('input', [])
          this.$emit('allSelectChange', [])
        } else {
          const useableData = this.owner.data.filter((v) => v.disabled !== true)
          const temp = JSON.parse(JSON.stringify(useableData))

          this.$emit('input', [...this.value, ...temp])
          // this.$emit('allSelectChange', [...this.value, useableData])
        }
      }
    }
  }
}
</script>
