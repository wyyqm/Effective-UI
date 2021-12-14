<template>
  <div>
    <slot name="tableOperate"> </slot>
  </div>
</template>
<script>
export default {
  props: {
    // text: {
    //   type: String,
    //   default: '',
    //   require: true
    // }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$slots.tableOperate)
  }
}
</script>
<style lang="less" scoped></style>
