<template>
  <div class="wrapper">
    <h3
      style="
        font-weight: 600;
        letter-spacing: 1.5px;
        font-size: 1.5vw;
        margin-bottom: 20px;
      "
    >
      输入成分，查看建议施肥量
    </h3>
    <!-- 头部查询组件 -->
    <div class="head-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col :span="4"
          ><div class="grid-content">
            <el-input
              id="MEN"
              name="MEN"
              placeholder="破解氮含量"
              type="text"
              v-model="mea_Effective_N"
            /></div
        ></el-col>

        <el-col :span="4" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGP"
              name="MGP"
              placeholder="有效磷含量"
              type="text"
              v-model="mea_Olsen_P"
            />
          </div>
        </el-col>

        <el-col :span="4" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGK"
              name="MGKMGM"
              placeholder="速效钾含量"
              type="text"
              v-model="mea_Olsen_K"
            />
          </div>
        </el-col>

        <el-col :span="4" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGM"
              name="MGM"
              placeholder="有机质含量"
              type="text"
              v-model="mea_Organic_matter"
            />
          </div>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-button
          type="primary"
          plain
          @click="commitInfo"
          style="margin-top: 10px"
          >提交</el-button
        >
      </el-row>

      <!-- 小屏幕响应式 -->
      <el-row :gutter="10" class="hidden-md-and-up">
        <el-col :span="22" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MEN"
              name="MEN"
              placeholder="破解氮含量"
              type="text"
              v-model="mea_Effective_N"
            /></div
        ></el-col>

        <el-col :span="22" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGP"
              name="MGP"
              placeholder="有效磷含量"
              type="text"
              v-model="mea_Olsen_P"
            />
          </div>
        </el-col>
        <el-col :span="22" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGK"
              name="MGKMGM"
              placeholder="速效钾含量"
              type="text"
              v-model="mea_Olsen_K"
            />
          </div>
        </el-col>
        <el-col :span="22" :offset="1"
          ><div class="grid-content">
            <el-input
              id="MGM"
              name="MGM"
              placeholder="有机质含量"
              type="text"
              v-model="mea_Organic_matter"
            />
          </div>
        </el-col>

        <el-col :span="22" :offset="1">
          <el-select v-model="crop" filterable placeholder="请选择作物">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-button
          type="primary"
          plain
          @click="commitInfo"
          style="margin-top: 10px"
          >提交</el-button
        >
      </el-row>
    </div>

    <!-- 查询结果展示组件 -->
    <div class="show-wrapper">
      <el-descriptions
        class="margin-top"
        title="查询结果"
        :column="2"
        size="medium"
        border
      >
        <el-descriptions-item>
          <template slot="label"> 碱解氮的参考值 </template>
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 有效磷的参考值 </template>
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 速效钾的参考值 </template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 有机质的参考值 </template>
          {{ sug_Organic_matter }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { sendInfo } from "../../api/api.js";
import store from "../../store/index.js";

export default {
  name: "Fun2",
  data() {
    return {
      shareState: store.state,
      mea_Effective_N: "",
      mea_Olsen_P: "",
      mea_Olsen_K: "",
      mea_Organic_matter: "",
      options: [
        {
          value: "大豆",
          label: "大豆",
        },
        {
          value: "玉米",
          label: "玉米",
        },
        {
          value: "小麦",
          label: "小麦",
        },
        {
          value: "香瓜",
          label: "香瓜",
        },
        {
          value: "糯玉米",
          label: "糯玉米",
        },
      ],
      crop: "大豆",
      sug_Effective_N: "",
      sug_Olsen_P: "",
      sug_Olsen_K: "",
      sug_Organic_matter: "",
    };
  },
  methods: {
    clearInfo() {
      this.sug_Effective_N = "";
      this.sug_Olsen_P = "";
      this.sug_Olsen_K = "";
      this.sug_Organic_matter = "";
    },

    // 检查数据格式
    checkDataRule(meaArr) {
      if (!Array.isArray(meaArr)) {
        return;
      }

      // 判断输入值的格式
      if (
        meaArr.some((item) => {
          // 如果有非空项
          return item === "" ? false : true;
        })
      ) {
        // 取到所有非空项
        let notEmptyItems = meaArr.filter((item) => {
          return item === "" ? false : true;
        });

        // 对所有非空项进行格式判断，只要有不合格的就进行提示
        if (
          notEmptyItems.some((item) => {
            return !/^\d+$|^\d*\.\d+$/g.test(item);
          })
        ) {
          this.$message({
            center: true,
            message: "请输入正确格式的值",
            type: "error",
            duration: 1500,
          });
          return false;
        }
        // 格式合格
        return true;
      }
      // 一项都没有输入，清空展示框
      else {
        this.clearInfo();
        return false;
      }
    },

    async commitInfo() {
      // 装进数组里，方便下面判断
      let meaArr = [
        this.mea_Effective_N,
        this.mea_Olsen_P,
        this.mea_Olsen_K,
        this.mea_Organic_matter,
      ];

      // 判断是否登录
      if (!this.shareState.isLogin) {
        this.$message({
          center: true,
          message: "请先登录",
          type: "error",
          duration: 1500,
        });
        return;
      }

      // 检测格式
      if(this.checkDataRule(meaArr)){
        // 检测完格式了，发送请求
        let res = await sendInfo(...meaArr, this.crop);
        // console.log(res.data);
        res = res.data.data;
        if (res) {
          this.sug_Effective_N = res.sug_Effective_N;
          this.sug_Olsen_P = res.sug_Olsen_P;
          this.sug_Olsen_K = res.sug_Olsen_K;
          this.sug_Organic_matter = res.sug_Organic_matter;
        }
      }
    },
  },
};
</script>

<style>
</style>