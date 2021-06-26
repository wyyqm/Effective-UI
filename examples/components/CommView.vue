<template>
    <span>{{ showValue }}</span>
</template>

<script>
import { ProItemMixin } from "../../packages/json-form/index"
const CommView = {
    name: "CommView",
    mixins: [ProItemMixin],
    props: {},
    data() {
        return {}
    },
    computed: {
        showValue() {
            if (this.item.showValue) {
                return this.item.showValue(this.item, this.formData)
            } else {
                return this.formData[this.item.prop]
            }
        },
    },
    watch: {},
    created() {
        console.log("CommView 组件创建")
    },
    updated() {
        console.log("CommView 组件更新")
    },
    methods: {},
}
CommView.install = function (Vue) {
    Vue.component(CommView.name, CommView)
}
export default CommView
</script>

<style lang="scss" scope></style>
