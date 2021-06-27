<template>
    <el-form v-bind="elFormConfig" :ref="elFormRef" :model="jsonFormData">
        <template v-for="(item, idx) in formItemArrConfig">
            <el-form-item v-if="itemShow(item)" :label="item.label" :prop="item.prop" :key="item.prop + '-' + idx + '-' + item.compName" :rules="getRules(item)">
                <component v-bind="getCompVbind(item)" v-on="getCompVon(item)" v-model="jsonFormData[item.prop]" :is="item.compName" :item="item" :form-data="jsonFormData" />
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
import { deepCopy } from './utils/JsonFormUtils'

export default {
    name: 'JsonForm',
    components: {},
    props: {
        /**
         * 表单数据
         */
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
         * 表单配置
         */
        elFormConfig: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
        表单项配置
        <pre>
        [
            {
                prop:string, // 该值将用于el-form-item的props和key
                compName:string, // 组件名称
                label:string, // 该值将用于el-form-item的label
                rules:array,  // 验证规则, 默认为空数组
                show:boolean|function, // 默认为true, 表示当前表单项是否显示
                cusData:any, // 存放组件需要的额外数据, 如: select的下拉选项值
                cusProps:object, // 用于配置自定义组件额外的prop(如果直接使用的element-ui组件,那么请将element-ui组件支持的prop写在该对象)
                cusEvents:object, // 用于配置自定义组件额外的event事件监听(如果直接使用的element-ui组件,那么请将element-ui组件支持的event写在该对象)
            }
        ]
        </pre>
        */
        formItemArrConfig: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            jsonFormData: this.formData ? deepCopy(this.formData) : {},
            elFormRef: 'jsonForm'
        }
    },
    watch: {
        formData(newData) {
            // 避免内部修改jsonFormData数据时, 影响外部的formData, 保持prop的单项数据流
            this.jsonFormData = deepCopy(newData)
        }
    },
    computed: {},
    created() {
        console.log('组件 JsonForm 创建!')
    },
    updated() {
        console.log('组件 JsonForm 更新!')
    },
    methods: {
        /**
         * 获取表单项验证规则
         */
        getRules(item) {
            return item.rules || []
        },
        /**
         * 获取组件所有自定义prop
         * @param {*} item 配置项
         * @return {*}
         */
        getCompVbind(item) {
            return item.cusProps || {}
        },
        /**
         * 获取组件所有自定义事件
         * @param {*} item 配置项
         * @return {*}
         */
        getCompVon(item) {
            return item.cusEvents || {}
        },
        /**
         * 判断当前表单项是否需要显示
         * @param {*} item 配置项
         * @return {*}
         */
        itemShow(item) {
            if (typeof item.show === 'function') {
                return item.show(item, this.formData)
            } else if (typeof item.show === 'boolean') {
                return item.show
            } else {
                return true
            }
        },
        /**
         * 执行表单验证
         */
        validate() {
            const formInstance = this.getElFormInstance()
            const validateResult = {
                // 表单验证是否通过
                valid: false,
                // 校验未通过字段
                errorFields: null
            }
            return new Promise((resolve) => {
                formInstance.validate((valid, errorFields) => {
                    if (valid) {
                        validateResult.valid = valid
                        resolve(validateResult)
                    } else {
                        validateResult.errorFields = errorFields
                        resolve(validateResult)
                        return false
                    }
                })
            })
        },
        /**
         * 重置表单
         * @param {*}
         * @return {*}
         */
        resetFields() {
            const formInstance = this.getElFormInstance()
            formInstance.resetFields()
        },
        /**
         * 清除表单错误信息
         * @param {*} props 表单项的prop值. 类型: string | array
         * @return {*}
         */
        clearValidate(props) {
            const formInstance = this.getElFormInstance()
            if (props) {
                formInstance.clearValidate()
            } else {
                formInstance.clearValidate(props)
            }
        },
        /**
         * 获取表单数据
         * @param {*}
         * @return {*}
         */
        getData() {
            // 避免外部修改该表单返回数据时, 影响内部jsonFormData
            return deepCopy(this.jsonFormData)
        },
        /**
         * 设置表单项值
         */
        setPropValue(prop, value) {
            const tmpObj = { ...this.jsonFormData }
            tmpObj[prop] = value
            this.jsonFormData = tmpObj
        },
        /**
         * 给表单项设置自定义错误提示信息
         */
        setFieldErrorMsg() {},
        /**
         * 获取element ui的表单实例
         * @param {*}
         * @return {*}
         */
        getElFormInstance() {
            return this.$refs[this.elFormRef]
        }
    }
}
</script>

<style lang="scss" scoped></style>
