<template>
  <!-- select下拉框 -->
  <div class="all">
    <h2>常用<b>下拉框</b>合集</h2>

    <div class="search">
      <div class="search_input">
        <el-form :inline="true" size="small" :model="selectForm">
          <!-- 默认： -->
          <el-form-item label="默认：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 禁用： -->
          <el-form-item label="禁用：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable disabled>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>

          <!-- 可搜索：  -->

          <el-form-item label="可搜索：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.billArea" clearable filterable>
              <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 多选：  -->
          <el-form-item label="多选：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.multipleOpt" multiple>
              <el-option v-for="status in multipleOpt" :key="status.value" :label="status.label" :value="status.value"></el-option>
            </el-select>
          </el-form-item>

          <!-- 分组：  -->

          <el-form-item label="分组：">
            <el-select size="small" placeholder="请选择" v-model="selectForm.options" clearable>
              <el-option-group v-for="group in options" :key="group.value" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'selectUnion',
  data() {
    return {
      selectForm: {
        billArea: 'AZ'
      },
      options: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海'
            },
            {
              value: 'Beijing',
              label: '北京'
            }
          ]
        },
        {
          label: '其他城市',
          options: [
            {
              value: 'Chengdu',
              label: '成都'
            },
            {
              value: 'Shenzhen',
              label: '深圳'
            },
            {
              value: 'Guangzhou',
              label: '广州'
            },
            {
              value: 'Dalian',
              label: '大连'
            }
          ]
        }
      ],
      billArea: [
        {
          label: '美国区',
          value: 'AZ'
        },
        {
          label: '中欧区',
          value: 'EU'
        },
        {
          label: '印度区',
          value: 'IN'
        },
        {
          label: '美东区',
          value: 'UE'
        },
        {
          label: '西欧区',
          value: 'WE'
        }
      ],
      multipleOpt: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped></style>
