<template>
  <div class="wrapper">
    <!-- 大屏幕响应式 -->
    <div class="hidden-sm-and-down">
      <el-row type="flex" justify="center" style="margin: 3px 0">
        <el-col :span="23">
          <!-- 通过数字来确定高亮元素 -->
          <div
            :class="{
              active: shareState.currEl === 1,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
          >
            <a href="javascript:;" @click="toFun1(1)">查成分</a>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="23">
          <div
            :class="{
              active: shareState.currEl === 2,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
          >
            <a href="javascript:;" @click="toFun2(2)">建议量</a>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 小屏幕响应式 -->
    <div class="hidden-md-and-up">
      <el-row type="flex" justify="center" style="margin: 3px 0">
        <el-col :span="23">
          <!-- 通过数字来确定高亮元素 -->
          <div
            :class="{
              active: shareState.currEl === 1,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
            style="min-height: 48px"
          >
            <a href="javascript:;" @click="toFun1(1)" style="line-height: 48px">查成分</a>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="23">
          <div
            :class="{
              active: shareState.currEl === 2,
              'grid-content': true,
              'bg-purple': true,
              'fun1-wrapper': true,
            }"
            style="min-height: 48px"
          >
            <a href="javascript:;" @click="toFun2(2)" style="line-height: 48px">建议量</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入 store
import store from "../store/index.js";
export default {
  name: "SideBar",
  data() {
    return {
      // 使 store.state 变成响应式数据
      shareState: store.state,
    };
  },
  methods: {
    toFun1(num) {
      // 设置高亮元素
      store.setCurrEl(num);
      // 路由跳转
      this.$router.push("/fun1").catch((e) => e);
    },
    toFun2(num) {
      // 设置高亮元素
      store.setCurrEl(num);
      // 路由跳转
      this.$router.push("/fun2").catch((e) => e);
    },
  },
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #e9eef3;
}

.grid-content {
  border-radius: 5px;
  min-height: 36px;
}

.grid-content > a {
  display: inline-block;
  width: 100%;
  line-height: 36px;
}

.grid-content:hover a {
  transition: all 150ms;
  color: #409eff;
}

.active {
  background-color: #b5c0ce;
}

.active a {
  color: #409eff;
}
</style>