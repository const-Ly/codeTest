<template>
  <div class="cms">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="分享咖啡馆" name="1">
        <config-cell :info="materialInfo.coffeeShop" @ok="saveOrUpdateMaterial($event)"></config-cell>
      </el-collapse-item>
      <el-collapse-item title="分享白膜咖啡" name="3">
        <config-cell :info="materialInfo.cleanCoffee" @ok="saveOrUpdateMaterial($event)"></config-cell>
      </el-collapse-item>
      <el-collapse-item title="分享定制咖啡" name="4">
        <config-cell :info="materialInfo.customizedCoffee" @ok="saveOrUpdateMaterial($event)"></config-cell>
      </el-collapse-item>
      <el-collapse-item title="新手引导页配置" name="5">
        <el-form label-width="150px" size="small">
          <el-form-item label="新手引导弹窗文案：">
            <el-input v-model.trim="materialInfo.guideURL" :maxLength="20" class="w400"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveOrUpdateGuideURL">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="个人中心配置" name="6">
        <el-form label-width="120px" size="small">
          <el-form-item label="展示开关：">
            <el-radio-group v-model="materialInfo.disSwitch">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveOrUpdatePersonConf">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="杯套二维码" name="7">
        <el-form label-width="120px" size="small">
          <el-form-item label="二维码长链接：">
            <el-input
              v-model.trim="materialInfo.qrCodeLconnection"
              type="textarea"
              :maxLength="500"
              class="w400"
            ></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveOrUpdateQrCodeLconnection">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="海报图案" name="8" v-if="materialInfo.posterImg">
        <el-form label-width="120px" size="small">
          <el-form-item label="展示图案：">
            <el-radio-group v-model="materialInfo.posterImg.showImgType">
              <el-radio :label="1">小程序</el-radio>
              <el-radio :label="2">二维码</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="二维码链接：">
            <el-input
              v-model.trim="materialInfo.posterImg.qrCodeLink"
              type="textarea"
              :maxLength="500"
              class="w400"
            ></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="saveOrUpdatePosterImg">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="text/javascript">
import Upload from "@/components/upload";
import ConfigCell from "./configCell";
export default {
  name: "materialManage",
  data() {
    return {
      activeName: "",
      materialInfo: {}
    };
  },
  components: { Upload, ConfigCell },
  created() {
    this.getPrivateCoffeeHome();
  },
  methods: {
    // 咖啡管素材首页查询
    getPrivateCoffeeHome() {
      this.$service.activity.cafe.getPrivateCoffeeHome({}).then(res => {
        if (res.cleanCoffee.posterBgUrlList.length === 0) {
          res.cleanCoffee.posterBgUrlList.push("");
        }
        if (res.coffeeShop.posterBgUrlList.length === 0) {
          res.coffeeShop.posterBgUrlList.push("");
        }
        if (res.customizedCoffee.posterBgUrlList.length === 0) {
          res.customizedCoffee.posterBgUrlList.push("");
        }
        this.materialInfo = res;
      });
    },
    // 咖啡馆素材新增/修改
    saveOrUpdateMaterial(obj) {
      this.$service.activity.cafe.saveOrUpdateMaterial(obj).then(res => {
        this.$message.success("提交成功");
      });
    },
    // 新手引导页配置新增/修改
    saveOrUpdateGuideURL() {
      if (this.materialInfo.guideURL === "") {
        this.$message.warning("请输入1-20字新手引导弹窗文案");
        return false;
      }
      this.$service.activity.cafe
        .saveOrUpdateGuideURL({ guideURL: this.materialInfo.guideURL })
        .then(res => {
          this.$message.success("提交成功");
        });
    },
    // 杯套二维码新增/修改
    saveOrUpdateQrCodeLconnection() {
      // 二维码长链接
      if (this.materialInfo.qrCodeLconnection === "") {
        this.$message.warning("请输入1-500字二维码长链接");
        return false;
      }
      this.$service.activity.cafe
        .saveOrUpdateQrCodeLconnection({
          qrCodeLconnection: this.materialInfo.qrCodeLconnection
        })
        .then(res => {
          this.$message.success("提交成功");
        });
    },
    // 海报图案
    saveOrUpdatePosterImg() {
      // 二维码链接
      if (this.materialInfo.posterImg.qrCodeLink === "") {
        this.$message.warning("请输入1-500字二维码链接");
        return false;
      }
      this.$service.activity.cafe
        .saveOrUpdatePosterImg(this.materialInfo.posterImg)
        .then(res => {
          this.$message.success("提交成功");
        });
    },
    // 个人中心配置
    saveOrUpdatePersonConf() {
      this.$service.activity.cafe
        .saveOrUpdPcConfig({ disSwitch: this.materialInfo.disSwitch })
        .then(res => {
          this.$message.success("提交成功");
        });
    }
  }
};
</script>
<style>
.cms .el-textarea__inner {
  height: 100px;
}
</style>
