<template>
  <el-table-column :label="label" width="40">
    <template v-slot:header="_">
      <el-checkbox :value="allSelected" @input="handleAllSelect" :indeterminate="indeterminate" />
    </template>
    <template v-slot="{ row }">
      <el-checkbox :key="getKey(row)" :value="!!selected[getKey(row)]" @input="handleCheckboxInput(row)" />
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
    }
  },
  data() {
    return {
      cache: new WeakMap()
    }
  },
  mounted() {
    console.log('is mounted')
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
    indeterminate() {}
  },
  methods: {
    getKey(row) {
      if (this.owner) {
        const rowKey = this.owner.rowKey
        return this.getRowIdentity(row, rowKey)
      } else {
        return row.id
      }
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
        this.$emit('input', [...this.value, row])
      }
    },
    handleAllSelect() {
      for (const row of this.owner.data) {
        if (this.selected[this.getKey(row)]) {
          return false
        }
      }
    }
  }
}
</script>
