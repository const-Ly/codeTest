<template>
  <div class="cms">
    <el-form label-width="200px" size="small">
      <el-form-item label="旧版小程序卡片图：">
        <upload
          action="/image/uploadImage?width=500&height=400&fileSize=150"
          :size="150"
          :width="100"
          :height="80"
          :image-url="configInfo.smallCardUrl"
          @success="configInfo.smallCardUrl = $event"
        ></upload>
        <div class="font-info">支持jpg、png格式文件，尺寸500x400px，文件小于150k</div>
      </el-form-item>
      <el-form-item label="小程序卡片图：">
        <span class="ma-l-20 font-dark0">(支持jpg、png格式文件，建议尺寸750*1334px，文件小于300k)</span>
        <ul class="clearfix">
          <li
            v-for="(item,idx) in configInfo.smallCardUrlList"
            :key="idx"
            class="w100 fl align-center ma-r-20"
          >
            <upload
              class="inline-block"
              action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
              :size="300"
              :image-url="item"
              @success="configInfo.smallCardUrlList[idx] = $event"
            ></upload>
            <span
              v-if="configInfo.smallCardUrlList.length>1"
              class="font font-danger"
              @click="delCont(configInfo.smallCardUrlList,idx)"
            >删除</span>
          </li>
        </ul>
        <el-button
          type="text"
          class="font font-blue"
          v-show="configInfo.smallCardUrlList.length<10"
          @click="addCont(configInfo.smallCardUrlList)"
        >再添加一张</el-button>
      </el-form-item>
      <!-- 只有在白膜咖啡(3)里不区分店长和顾客 -->
      <el-form-item :label="configInfo.type ==3?'小程序分享标题：':'小程序店长分享标题：'">
        <dynamic-cell :list="configInfo.smallkeeperShareTitles">
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.title" :maxLength="40" class="w400"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>
      <!-- 只有在咖啡馆（1）和定制咖啡（4）里区分店长和用户 -->
      <el-form-item label="小程序顾客分享标题：" v-show="['1','4'].indexOf(configInfo.type) > -1">
        <dynamic-cell :list="configInfo.smallCustomerShareTitles">
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.title" :maxLength="40" class="w400"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>
      <el-form-item label="旧版海报背景图：">
        <upload
          action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
          :size="300"
          :image-url="configInfo.posterBgUrl"
          @success="configInfo.posterBgUrl = $event"
        ></upload>
        <div class="font-info">支持jpg、png格式文件，建议尺寸750*1334px，文件小于300k</div>
      </el-form-item>
      <el-form-item label="海报背景图：">
        <span class="ma-l-20 font-dark0">(支持jpg、png格式文件，建议尺寸750*1334px，文件小于300k)</span>
        <ul class="clearfix">
          <li
            v-for="(item,idx) in configInfo.posterBgUrlList"
            :key="idx"
            class="w100 fl align-center ma-r-20"
          >
            <upload
              class="inline-block"
              action="/image/uploadImage?verifyWidthStatus=false&verifyHeightStatus=false&fileSize=300"
              :size="300"
              :image-url="item"
              @success="configInfo.posterBgUrlList[idx] = $event"
            ></upload>
            <span
              v-if="configInfo.posterBgUrlList.length>1"
              class="font font-danger"
              @click="delCont(configInfo.posterBgUrlList,idx)"
            >删除</span>
          </li>
        </ul>
        <el-button
          type="text"
          class="font font-blue"
          v-show="configInfo.posterBgUrlList.length<10"
          @click="addCont(configInfo.posterBgUrlList)"
        >再添加一张</el-button>
      </el-form-item>
      <!-- 只有在白膜咖啡(3)里不区分店长和顾客 -->
      <el-form-item :label="configInfo.type ==3?'海报分享标题：':'海报店长分享标题：'">
        <dynamic-cell
          :list="configInfo.posterkeeperShareTitles"
          :conf="{'firstTitle':'','lastTitle':''}"
        >
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.firstTitle" :maxLength="9" class="w200"></el-input>
            <el-input v-model.trim="prop.cell.lastTitle" :maxLength="9" class="w200"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>
      <!-- 只有在咖啡馆（1）和定制咖啡（4）里区分店长和用户 -->
      <el-form-item label="海报顾客分享标题：" v-show="['1','4'].indexOf(configInfo.type) > -1">
        <dynamic-cell
          :list="configInfo.posterCustomerShareTitles"
          :conf="{'firstTitle':'','lastTitle':''}"
        >
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.firstTitle" :maxLength="9" class="w200"></el-input>
            <el-input v-model.trim="prop.cell.lastTitle" :maxLength="9" class="w200"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>
      <!-- 只有在白膜咖啡(3)里不区分店长和顾客 (分享标题2) -->
      <el-form-item :label="configInfo.type ==3?'海报分享标题2：':'海报店长分享标题2：'">
        <dynamic-cell
          :list="configInfo.posterkeeperShareTitles2"
          :conf="{'firstTitle':'','lastTitle':''}"
        >
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.firstTitle" :maxLength="100" class="w200"></el-input>
            <el-input v-model.trim="prop.cell.lastTitle" :maxLength="100" class="w200"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>
      <!-- 只有在咖啡馆（1）和定制咖啡（4）里区分店长和用户 (分享标题2) -->
      <el-form-item label="海报顾客分享标题2：" v-show="['1','4'].indexOf(configInfo.type) > -1">
        <dynamic-cell
          :list="configInfo.posterCustomerShareTitles2"
          :conf="{'firstTitle':'','lastTitle':''}"
        >
          <template slot-scope="prop" slot="cell">
            <el-input v-model.trim="prop.cell.firstTitle" :maxLength="100" class="w200"></el-input>
            <el-input v-model.trim="prop.cell.lastTitle" :maxLength="100" class="w200"></el-input>
          </template>
        </dynamic-cell>
      </el-form-item>

      <el-form-item label="方形图片：">
        <upload
          action="/image/uploadImage?width=300&height=300&fileSize=300"
          :size="300"
          :image-url="configInfo.hfUrl"
          @success="configInfo.hfUrl = $event"
        ></upload>
        <div class="font-info">支持jpg、png格式文件，尺寸300x300，文件小于300k</div>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleSave">提交保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import Upload from "@/components/upload";
import DynamicCell from "@/components/dynamicCell";
export default {
  name: "configCell",
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configInfo: {
        smallCardUrlList: [""],
        posterBgUrlList: [""]
      }
    };
  },
  watch: {
    info(nv, ov) {
      this.configInfo = nv;
    }
  },
  components: { Upload, DynamicCell },
  methods: {
    // 校验参数
    justifyParam() {
      let smallkeeperShareTitlesRel = this.configInfo.smallkeeperShareTitles.filter(
        item => {
          return item.title === "";
        }
      );
      let smallCustomerShareTitlesRel = this.configInfo.smallCustomerShareTitles.filter(
        item => {
          return item.title === "";
        }
      );
      let posterkeeperShareTitlesRel = this.configInfo.posterkeeperShareTitles.filter(
        item => {
          return item.firstTitle === "";
        }
      );
      let posterkeeperShareTitles2Rel = this.configInfo.posterkeeperShareTitles2.filter(
        item => {
          return item.firstTitle === "";
        }
      );
      let posterCustomerShareTitlesRel = this.configInfo.posterCustomerShareTitles.filter(
        item => {
          return item.firstTitle === "";
        }
      );
      let posterCustomerShareTitles2Rel = this.configInfo.posterCustomerShareTitles2.filter(
        item => {
          return item.firstTitle === "";
        }
      );
      if (this.configInfo.smallCardUrl === "") {
        this.$message.warning("请上传旧版小程序卡片图");
        return false;
      }
      if (!this.configInfo.smallCardUrlList[0]) {
        this.$message.warning("请上传小程序卡片图，第一张必填，最多10张");
        return false;
      }
      // 小程序店长分享标题
      if (smallkeeperShareTitlesRel.length > 0) {
        const msg = this.configInfo.type == 3 ? "" : "店长";
        this.$message.warning("请输入1-40字小程序" + msg + "分享标题");
        return false;
      }
      // 小程序顾客分享标题  仅在咖啡馆(1) 定制咖啡(4)拦截
      if (
        ["1", "4"].indexOf(this.configInfo.type) > -1 &&
        smallCustomerShareTitlesRel.length > 0
      ) {
        this.$message.warning("请输入1-40字小程序顾客分享标题");
        return false;
      }
      if (this.configInfo.posterBgUrl === "") {
        this.$message.warning("请上传旧版海报背景图");
        return false;
      }
      if (!this.configInfo.posterBgUrlList[0]) {
        this.$message.warning("请上传海报背景图，第一张必填，至多10张");
        return false;
      }
      // 海报店长分享标题
      if (posterkeeperShareTitlesRel.length > 0) {
        const msg = this.configInfo.type == 3 ? "" : "店长";
        this.$message.warning("请输入1-9字海报" + msg + "分享标题");
        return false;
      }
      // 海报顾客分享标题
      if (
        ["1", "4"].indexOf(this.configInfo.type) > -1 &&
        posterCustomerShareTitlesRel.length > 0
      ) {
        this.$message.warning("请输入1-9字海报顾客分享标题");
        return false;
      }

      // 海报店长分享标题2
      if (posterkeeperShareTitles2Rel.length > 0) {
        const msg = this.configInfo.type == 3 ? "" : "店长";
        this.$message.warning("请输入海报" + msg + "分享标题2");
        return false;
      }
      // 海报顾客分享标题2
      if (
        ["1", "4"].indexOf(this.configInfo.type) > -1 &&
        posterCustomerShareTitles2Rel.length > 0
      ) {
        this.$message.warning("请输入海报顾客分享标题2");
        return false;
      }
      if (this.configInfo.hfUrl === "") {
        this.$message.warning("请上传方形图片");
        return false;
      }
      return true;
    },
    handleSave() {
      if (this.justifyParam()) {
        this.$emit("ok", this.configInfo);
      }
    },
    addCont(obj) {
      obj.push("");
    },
    delCont(obj, idx) {
      obj.splice(idx, 1);
    }
  }
};
</script>
