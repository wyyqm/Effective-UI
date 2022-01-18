<template>
  <el-form
      class="ef-search"
      ref="innerForm"
      v-bind="$props"
      :inline="true"
      @validate="$emit('validate', $event)"
      @submit.native.prevent="handleSubmit"
      @reset.native.prevent="handleReset"
  >
    <div class="ef-search-inner">
      <div class="ef-search-fields">
        <slot />
      </div>
      <div class="ef-search-action">
        <el-button native-type="submit">搜索</el-button>
        <el-button native-type="reset">重置</el-button>
      </div>
    </div>

  </el-form>
</template>

<script>

import { Form } from 'element-ui'
import { injectSearchListMixin } from '@/components/searchList/utils'

export default {
  name: 'ef-search',
  props: Form.props,
  mixins: [injectSearchListMixin],
  methods: {
    handleSubmit() {
      this.$refs.innerForm.validate(() => {
        if (this.searchList) {
          this.searchList.handleSearch(this.model)
        }
        this.$emit('submit', this.model)
      })
    },
    handleReset() {
      if (this.searchList) {
        const searchParams = this.searchList.handleReset()
        this.$emit('update:model', searchParams)
      }
      this.$emit('reset')
      this.$refs.innerForm.clearValidate()
    },
    ...Object.keys(Form.methods).reduce((acc, name) => {
      acc[name] = function (...args) {
        return this.$refs.innerForm[name](...args)
      }
      return acc
    }, {})
  }
}
</script>

<style>
.ef-search-inner {
  display: flex;
}

.ef-search-fields {
  flex-grow: 1;
}
</style>
