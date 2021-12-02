<template>
  <div class="search">
    <el-form :inline="true" size="small" :model="searchForm">
      <el-form-item label="订单编号：">
        <el-input v-model="searchForm.id" clearable />
      </el-form-item>
      <el-form-item label="查询时间：">
        <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
      </el-form-item>
      <el-form-item label="查询时间：">
        <el-date-picker clearable v-model="searchForm.date" type="month" placeholder="选择月"> </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker
          clearable
          v-model="searchForm.times"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width: 250px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单地区：">
        <el-select size="small" placeholder="请选择" v-model="searchForm.billArea">
          <el-option v-for="status in billArea" :key="status.value" :label="status.label" :value="status.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="searchForm.searchVal" placeholder="请输入" class="input-select-value" clearable>
          <el-select v-model="searchForm.searchKey" slot="prepend" style="width: 100px" @change="selectChange">
            <el-option label="签约方账号" value="userName"></el-option>
            <el-option label="合同编号" value="servedId"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" icon="el-icon-search"> 搜索 </el-button>
        <el-button type="primary" @click="reset" plain icon="el-icon-refresh-right"> 重置 </el-button>
        <!-- <el-button type="primary" @click="add" icon="el-icon-plus"> 新建 </el-button>
        <el-button type="primary" @click="educed" :loading="exportLoading" plain icon="el-icon-download"> 导出 </el-button>

        <el-button type="primary" @click="dialogVisible = true" plain> 批量删除 </el-button> -->
        <slot name="handleBtn"></slot>
        <el-button type="text" v-if="hasMore" @click="toggleExpend"> {{ expend ? '展开' : '收起' }} </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ef-search',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.search {
  display: flex;
  flex-wrap: wrap;
  .el-form {
    text-align: left;
  }
  .el-input {
    width: 180px;
  }
  .input-select-value {
    width: 280px;
  }
  .input-select-value .el-input {
    width: 100px;
  }
  .el-date-editor--month {
    // width: 150px;
  }
  .el-form-item__label {
    padding: 0 5px 0 0;
  }
  .el-button [class*='el-icon-'] + span {
    margin-left: 0px;
  }
  .el-tag.el-tag--info {
    background-color: #ecf5ff;
    border-color: #b3d8ff;
    color: #409eff;
  }
  .el-tag.el-tag--info .el-tag__close {
    color: #409eff;
    background-color: #c5daf3;
    border-color: #b3d8ff;
  }
}
</style>
