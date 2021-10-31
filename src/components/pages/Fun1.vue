<template>
  <div class="wrapper">
    <!-- 头部查询组件 -->
    <div class="head-wrapper">
      <!-- 大屏幕响应式 -->
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col :span="7">
          <div class="grid-content jingdu-box">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="jingwei.jing"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="7" :offset="1">
          <div class="grid-content weidu-box">
            <el-input
              id="weidu"
              name="weidu"
              placeholder="请输入纬度"
              type="text"
              v-model.trim="jingwei.wei"
              clearable
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
            ></el-option>
          </el-select>
        </el-col>

        <el-button type="primary" plain @click="commitJingWei">提交</el-button>
      </el-row>

      <!-- 小屏幕响应式 -->
      <el-row :gutter="10" class="hidden-md-and-up">
        <el-col :span="22" :offset="1">
          <div class="grid-content jingdu-box">
            <el-input
              id="jingdu"
              name="jingdu"
              placeholder="请输入经度"
              type="text"
              v-model.trim="jingwei.jing"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="22" :offset="1">
          <div class="grid-content weidu-box">
            <el-input
              id="weidu"
              name="weidu"
              placeholder="请输入纬度"
              type="text"
              v-model.trim="jingwei.wei"
              clearable
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
            ></el-option>
          </el-select>
        </el-col>

        <el-button type="primary" plain @click="commitJingWei">提交</el-button>
      </el-row>
    </div>
    <!-- 地图组件 -->
    <div class="map-wrapper">
      <div id="map-container"></div>
    </div>
    <!-- 查询结果展示组件 -->
    <div class="show-wrapper">
      <el-descriptions
        class="margin-top"
        title="查询结果"
        :column="3"
        size="medium"
        border
      >
        <el-descriptions-item>
          <template slot="label">乡/镇名称</template>
          {{ name_countryside }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">村名称</template>
          {{ name_village }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">土壤碱解氮含量</template>
          {{ mea_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">土壤有效磷含量</template>
          {{ mea_getOlsen_P }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">土壤速效钾含量</template>
          {{ mea_getOlsen_K }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">土壤有机质含量</template>
          {{ mea_getOrganic_matter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">碱解氮的参考施肥量</template>
          {{ sug_Effective_N }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">有效磷的参考施肥量</template>
          {{ sug_Olsen_P }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">速效钾的参考施肥量</template>
          {{ sug_Olsen_K }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">有机质的参考施肥量</template>
          {{ sug_Organic_matter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">有机质的参考施肥量</template>
          {{ sug_Organic_matter }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">代替测量点的经度</template>
          {{ min_Longitude }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">代替测量点的纬度</template>
          {{ min_Latitude }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
import { sendJingWei } from "../../api/api.js";

let map = null,
  markers = null;

export default {
  name: "Fun1",
  data() {
    return {
      // 点击地图的经纬度
      jingwei: {
        jing: "",
        wei: "",
      },
      // Store
      shareState: store.state,
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
      crop: "玉米",
      name_countryside: "",
      name_village: "",
      mea_Effective_N: "",
      mea_getOlsen_P: "",
      mea_getOlsen_K: "",
      mea_getOrganic_matter: "",
      sug_Effective_N: "",
      sug_Olsen_P: "",
      sug_Olsen_K: "",
      sug_Organic_matter: "",
      // 代替测量点
      min_Longitude: "",
      min_Latitude: "",
    };
  },
  methods: {
    clearInfo() {
      this.name_countryside = "";
      this.name_village = "";
      this.mea_Effective_N = "";
      this.mea_getOlsen_P = "";
      this.mea_getOlsen_K = "";
      this.mea_getOrganic_matter = "";
      this.sug_Effective_N = "";
      this.sug_Olsen_P = "";
      this.sug_Olsen_K = "";
      this.sug_Organic_matter = "";
      this.min_Longitude = "";
      this.min_Latitude = "";
    },

    // 抽离提示语句
    message(type, msg, duration = 1500) {
      this.$message({
        center: true,
        message: msg,
        type,
        duration,
      });
    },

    // 抽离赋值语句
    assignResult(res) {
      this.name_countryside = res.name_countryside;
      this.name_village = res.name_village;
      this.mea_Effective_N = res.mea_Effective_N;
      this.mea_getOlsen_P = res.mea_getOlsen_P;
      this.mea_getOlsen_K = res.mea_getOlsen_K;
      this.mea_getOrganic_matter = res.mea_getOrganic_matter;
      this.sug_Effective_N = res.sug_Effective_N;
      this.sug_Olsen_P = res.sug_Olsen_P;
      this.sug_Olsen_K = res.sug_Olsen_K;
      this.sug_Organic_matter = res.sug_Organic_matter;
      this.min_Longitude = res.min_Longitude;
      this.min_Latitude = res.min_Latitude;
    },

    // 抽离检查语句
    checkJingWeiRule(jing, wei) {
      // 判断是否输入了经纬度
      if (jing === "") {
        if (wei !== "") {
          this.message("warning", "请输入经度");
          return false;
        } else {
          this.clearInfo();
          this.message("warning", "请先选择一个点，或填写经纬度", 2000);
          return false;
        }
      } else {
        if (wei === "") {
          this.message("warning", "请输入纬度");
          return false;
        }
      }

      // 判断经纬度格式
      if (
        /^\d+$|^\d*\.\d+$/g.test(jing) !== true ||
        /^\d+$|^\d*\.\d+$/g.test(wei) !== true
      ) {
        this.message("error", "经纬度格式不正确");
        return false;
      }

      // 判断经纬度数值大小
      if (
        parseFloat(jing) < 0 ||
        parseFloat(jing) >= 180 ||
        parseFloat(wei) < 0 ||
        parseFloat(wei) >= 90
      ) {
        this.message("error", "请输入正确的经纬度");
        return false;
      }

      // 检查完返回true
      return true;
    },

    // 发送 fun1 查询
    async commitJingWei() {
      // 检查经纬度格式
      if (!this.checkJingWeiRule(this.jingwei.jing, this.jingwei.wei)) {
        return;
      }

      // 判断是否登录
      if (!this.shareState.isLogin) {
        this.message("error", "请先登录");
        return;
      }

      // 清除展示框内的信息
      this.clearInfo();

      // 发送查询请求
      let res = await sendJingWei(
        this.jingwei.jing,
        this.jingwei.wei,
        this.crop
      );
      res = res.data.data;
      // console.log(res);

      // 展示提示
      if (res.isDirectMeasured === "false") {
        this.message(
          "warning",
          "暂无该地点的参考值，已为您寻找最近的参考点",
          4000
        );
      }

      // 在地图上标记出来
      let min_point = new window.TMap.LatLng(
        Number.parseFloat(res.min_Latitude),
        Number.parseFloat(res.min_Longitude)
      );
      markers.remove(["min_Marker"]);
      markers.add([
        {
          id: "min_Marker",
          styleId: "redMarker",
          position: min_point,
        },
      ]);

      // 数据赋值
      this.assignResult(res);
    },

    // 初始化地图
    initMap() {
      let TMap = window.TMap;

      //定义地图中心点坐标
      let center = new TMap.LatLng(45.904913, 125.316286);

      let mapContainer = document.getElementById("map-container");

      //定义map变量，调用 TMap.Map() 构造函数创建地图
      map = new TMap.Map(mapContainer, {
        center: center, //设置地图中心点坐标
        zoom: 8, //设置地图缩放级别
        pitch: 20, //设置俯仰角
        rotation: 0, //设置地图旋转角度
      });

      // 点击任何位置添加一个蓝色标记点
      map.on("click", (evt) => {
        markers.remove(["userMarker"]);
        markers.add([
          {
            id: "userMarker",
            styleId: "blueMarker",
            position: evt.latLng,
          },
        ]);
        // 拿到点击的经纬度
        this.jingwei.jing = evt.latLng.getLng().toFixed(6);
        this.jingwei.wei = evt.latLng.getLat().toFixed(6);

        // 在这里要进行校验，判断经纬度是否超出范围

        // console.log(jingwei)
      });

      // 标记点层
      markers = new TMap.MultiMarker({
        id: "marker-layer", //图层id
        map,
        styles: {
          //点标注的相关样式
          // 红色标记点样式
          redMarker: new TMap.MarkerStyle({
            width: 25,
            height: 25,
            anchor: { x: 16, y: 32 },
            // src: "public/img/map-marker-red.png",
          }),
          // 蓝色标记点样式
          blueMarker: new TMap.MarkerStyle({
            width: 25,
            height: 25,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
          }),
        },
        geometries: [],
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.wrapper {
  line-height: 18px;
}

.map-wrapper {
  width: 100%;
  height: 400px;
  margin-top: 15px;
  background-color: rgb(141, 148, 168);
}

#map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.show-wrapper {
  margin-top: 15px;
}
</style>
