<template>
  <div class="cms">
    <el-card v-if="this.pageType !== 'show'">
      <!-- 添加、重发 -->
      <el-form class="form-center" label-width="200px">
        <el-form-item label="预警信息">
          <span>演示</span>
        </el-form-item>
        <el-form-item class="text-label" label="预警接收人">
          <el-select v-model="param.receiverType" class="w150">
            <el-option label="全部白名单" value="2"></el-option>
            <el-option label="单个白名单" value="1"></el-option>
          </el-select>
          <el-button
            @click="onChoose"
            type="primary"
            v-if="param.receiverType==='1'&& chooseWhiteList.phone.length !== 0 "
          >{{chooseWhiteList.phone}}</el-button>
          <span
            v-if="param.receiverType==='1'&&chooseWhiteList.phone.length === 0"
            @click="onChoose"
            class="ma-l-10 cursor-pointer font-blue"
          >+选择白名单</span>
        </el-form-item>
        <el-form-item class="text-label" label="预警编号">
          <el-input
            v-if="this.pageType !== 'edit'"
            v-only-num="param.eventId"
            v-model="param.eventId"
            :disabled="pageType === 'edit'"
            maxlength="10"
            class="w150"
          ></el-input>
          <span v-if="this.pageType === 'edit'">{{param.eventId}}</span>
        </el-form-item>
        <el-form-item class="text-label" label="发震时刻">
          <el-date-picker
            v-model="param.startAt"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="text-label" label="震中位置">
          <el-input v-model.trim="param.longitude" maxlength="9" class="w150"></el-input>
          <span>（经度）</span>
          <el-input v-model.trim="param.latitude" maxlength="9" class="w150 ma-l-20"></el-input>
          <span>（纬度）</span>
        </el-form-item>
        <el-form-item class="text-label" label="预警等级">
          <el-input v-model.trim="param.magnitude" class="w150"></el-input>
        </el-form-item>
        <el-form-item class="text-label" label="震源深度">
          <el-input v-only-num="param.depth" v-model="param.depth" maxlength="8" class="w150"></el-input>
          <span>KM</span>
        </el-form-item>
        <el-form-item class="text-label" label="震中地名">
          <el-input v-model="param.epicenter" maxlength="80" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="署名列表">
          <el-input v-model="param.signature[0]" maxlength="80" class="w150"></el-input>
          <span>（署名1）</span>
          <el-input v-model="param.signature[1]" maxlength="80" class="w150 ma-l-20"></el-input>
          <span>（署名2）</span>
        </el-form-item>
        <el-form-item class="ma-t-20">
          <el-button type="primary" @click="onSubmit">确认预警</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查看 -->
    <el-form class="form-center" label-width="200px" v-if="this.pageType === 'show'">
      <el-form-item label="预警信息">
        <span>演示</span>
      </el-form-item>
      <el-form-item class="text-label" label="预警接收人">{{receiverType}}</el-form-item>
      <el-form-item class="text-label" label="预警编号">{{parmaFromParent.eventId}}</el-form-item>
      <el-form-item class="text-label" label="发震时刻">{{parmaFromParent.startAt}}</el-form-item>
      <el-form-item class="text-label" label="震中位置">
        {{parmaFromParent.longitude}}
        <span class="dark0">（经度）</span>
        {{parmaFromParent.latitude}}
        <span class="dark0">（纬度）</span>
      </el-form-item>
      <el-form-item class="text-label" label="预警等级">{{parmaFromParent.magnitude}}</el-form-item>
      <el-form-item class="text-label" label="震源深度">
        {{parmaFromParent.depth}}
        <span>KM</span>
      </el-form-item>
      <el-form-item class="text-label" label="震中地名">{{parmaFromParent.epicenter}}</el-form-item>
      <el-form-item label="署名列表">
        <template v-if="onOffSignature===0">
          {{parmaFromParent.signature[0]}}
          <span class="dark0">（署名1）</span>
          {{parmaFromParent.signature[1]}}
          <span class="dark0">（署名2）</span>
        </template>
      </el-form-item>
    </el-form>
    <!-- 选择白名单弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogFormWhiteList" width="30%">
      <whiteList pageTypeFromParent="choose" v-model="cache_chooseWhiteList"></whiteList>
      <div class="ma-t-20 align-center">
        <el-button type="primary" @click="onSubmitWhiteList">确认选择</el-button>
        <el-button @click="onClose">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import whiteList from "./whiteList";
export default {
  props: ["pageTypeFromParent", "parmaFromParent"],
  data() {
    return {
      id: 0,
      pageType: "",
      cache_chooseWhiteList: {
        id: "",
        phone: ""
      },
      chooseWhiteList: {
        id: "",
        phone: ""
      },
      dialogFormWhiteList: false,
      reselection: false,
      param: {
        receiverType: "2",
        whiteList: [],
        eventId: "",
        startAt: "",
        longitude: "",
        latitude: "",
        magnitude: "",
        depth: "",
        epicenter: "",
        signature: ["", ""]
      }
    };
  },
  components: {
    whiteList
  },
  methods: {
    onSubmit() {
      const param = this.param;
      const params = JSON.parse(JSON.stringify(param));
      // 预警接收人
      if (
        params.receiverType === "1" &&
        this.chooseWhiteList.phone.length === 0
      ) {
        this.$message.warning("预警接收人无效");
        return false;
      } else {
        params.receiverType = params.receiverType * 1;
        if (this.chooseWhiteList.id.length !== 0) {
          params.whiteList[0] = this.chooseWhiteList.id;
        }
      }

      // 预警编号
      const eventIdReg = /^[0-9]\d*$/;
      if (params.eventId === "" || !eventIdReg.test(params.eventId)) {
        this.$message.warning("请输入预警编号");
        return false;
      } else {
        params.eventId = params.eventId + "";
      }
      // 发震时刻
      if (params.startAt === "") {
        this.$message.warning("请输入发震时刻");
        return false;
      }
      // 震中位置
      const eqPositonReg = /^(0|-?[1-9]\d*)(\s|$|\.\d{1,2}\b)/;
      if (params.longitude === "" || params.latitude === "") {
        this.$message.warning("请输入震中位置");
        return false;
      } else if (
        !(
          eqPositonReg.test(params.longitude) &&
          eqPositonReg.test(params.latitude)
        )
      ) {
        this.$message.warning("请输入9位以内经纬度，支持及小数点后2位及负值");
        return false;
      }
      // 预警等级
      const warningLevelReg = /^(0|-?[1-9]\d*)(\s|$|\.\d\b)/;
      if (
        params.magnitude < 1.0 ||
        params.magnitude > 100.0 ||
        !warningLevelReg.test(params.magnitude)
      ) {
        this.$message.warning("请输入1.0-100.0间数字预警等级,支持小数点后1位");
        return false;
      }
      // 震源深度
      const depthReg = /^[1-9]\d*$/;
      if (params.depth === "" || !depthReg.test(params.depth)) {
        this.$message.warning("请输入0-99999999KM间整数震源深度");
        return false;
      } else {
        params.depth = params.depth + "";
      }
      // 震中地名
      if (params.epicenter === "") {
        this.$message.warning("请输入震中地名");
        return false;
      }
      // 署名
      let boolean1 = params.signature[0] === "" && params.signature[1] !== "";
      let boolean2 = params.signature[0] !== "" && params.signature[1] === "";
      if (boolean1 || boolean2) {
        this.$message.warning("2个署名列表必须同时填写或者同时不填写");
        return false;
      }

      this.$service.operate.earlyWarning.saveOrUpd(params).then(res => {
        this.goBack();
      });
    },
    goBack() {
      this.$router.replace("/earlyWarning");
    },
    onChoose() {
      this.dialogFormWhiteList = true;
    },
    onSubmitWhiteList() {
      if (this.cache_chooseWhiteList.phone.length === 0) {
        this.$message.warning("请选择白名单");
      } else {
        this.chooseWhiteList.id = this.cache_chooseWhiteList.id;
        this.chooseWhiteList.phone = this.cache_chooseWhiteList.phone;
        this.dialogFormWhiteList = false;
      }
    },
    onClose() {
      this.dialogFormWhiteList = false;
    }
  },
  // mounted里做三种pageType判断
  mounted() {
    const pageType = this.$route.meta.type || "show";
    this.pageType = pageType;
    if (pageType !== "add" && pageType !== "show") {
      this.id = this.$route.params.id;
      this.$service.operate.earlyWarning
        .getEQwarningDetail({ id: this.id })

        .then(res => {
          if (res.signature === null) res.signature = [];
          if (res.whiteList === null) res.whiteList = [];
          if (res.warningReceiver === "全部白名单") res.warningReceiver = "";
          res.receiverType = res.receiverType + "";
          // this.chooseWhiteList.id = res.whiteList[0];
          this.chooseWhiteList.id = res.whiteList.length
            ? res.whiteList[0]
            : "";
          this.chooseWhiteList.phone = res.warningReceiver;
          this.param = res;
        });
    }
  },

  computed: {
    receiverType: function() {
      let result;
      if (this.parmaFromParent.receiverType === 2) {
        result = "全部白名单";
      } else {
        result = this.parmaFromParent.warningReceiver;
      }
      return result;
    },
    onOffSignature: function() {
      if (this.parmaFromParent.signature.length === 0) return 2;
      let signature = this.parmaFromParent.signature.filter(item => {
        return item === "";
      });
      return signature.length;
    }
  }
};
</script>

<style scoped>
.dark0 {
  color: #c0c4cc;
}
</style>