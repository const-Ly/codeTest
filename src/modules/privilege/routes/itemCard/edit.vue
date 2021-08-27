<template>
  <div class="cms">
    <el-card>
      <el-form
        class="form-center"
        ref="form"
        :model="details"
        label-width="200px"
        style="width:100%;"
      >
        <el-form-item v-if="pageType !== 'add'" label="道具批次：">{{details.id}}</el-form-item>
        <el-form-item label="道具类型：">
          <el-radio-group :disabled="pageType === 'detail'" v-model="details.type">
            <el-radio :label="1">全民拼卡</el-radio>
            <el-radio :label="2">参团卡</el-radio>
            <el-radio :label="3">抽奖卡</el-radio>
            <el-radio :label="4">金币</el-radio>
            <!-- <el-radio :label="5">福袋</el-radio> -->
          </el-radio-group>
          <el-radio-group
            :disabled="pageType === 'detail'"
            v-model="details.type"
            style="display:block;margin-top:16px;margin-bottom:12px;"
          >
            <el-radio :label="6">立减金</el-radio>
            <el-radio :label="8">买二返一卡</el-radio>
            <el-radio :label="9">保护罩</el-radio>
            <el-radio :label="7">超级回馈卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="details.type === 4" label="来源名称：">
          <el-input class="w300" v-model.trim="details.sourceName" maxlength="10" :disabled="pageType === 'detail'"></el-input>
        </el-form-item>
        <el-form-item v-if="details.type === 4" class="text-label" label="金币面额：">
          <span>最小</span>
          <el-input
            :disabled="pageType === 'detail'"
            v-model="details.minNum"
            @input="$utils.onlyNum(details, 'minNum', details.minNum)"
            :maxlength="4"
            class="w100 ma-l-10 ma-r-20"
          ></el-input>
          <span>最大</span>
          <el-input
            :disabled="pageType === 'detail'"
            v-model="details.maxNum"
            @input="$utils.onlyNum(details, 'maxNum', details.maxNum)"
            :maxlength="4"
            class="w100 ma-l-10"
          ></el-input>
          <p class="tips">前端从最大最小区间内取随机整数值，若需固定面额金额请两值填写相等</p>
        </el-form-item>
        <el-form-item class="text-label" v-if="details.type != 4" label="道具名称：">
          <el-input
            :disabled="pageType === 'detail'"
            v-model="details.name"
            :minlength="1"
            :maxlength="10"
            class="w300"
          ></el-input>
          <p class="tips">展现在道具卡上的名称，请认真填写</p>
        </el-form-item>
        <el-form-item v-if="details.type != 4" label="道具说明：">
          <el-input
            :disabled="pageType === 'detail'"
            v-model="details.desc"
            :minlength="0"
            :maxlength="40"
            class="w300"
          ></el-input>
          <p class="tips">展现在道具卡上的说明，非必填</p>
        </el-form-item>
        <el-form-item label="补偿金币：" v-if="details.type === 1 || details.type === 2 || details.type === 3">
          <el-input class="w200" :disabled="pageType === 'detail'" v-model="details.compensateGold" v-only-num="details.compensateGold" :max-len="5"></el-input>
          <p class="font-info">本道具卡被偷后，补充给被偷者的金币数量</p>
        </el-form-item>
        <!-- 立减金金额 -->
        <el-form-item class="text-label" v-if="details.type === 6" label="权益金面额">
          <el-input
            :disabled="pageType === 'detail'"
            v-model.trim="details.rightsMoney"
            @input="$utils.onlyNum(details, 'rightsMoney', details.rightsMoney)"
            :maxlength="2"
            class="w300"
          ></el-input>
          <p class="tips">权益金对应的可抵扣面额（元）</p>
        </el-form-item>
        <!-- 回馈卡金额 -->
        <el-form-item class="text-label" v-if="details.type === 7" label="所需金额：">
          <el-input
            :disabled="pageType === 'detail'"
            v-model.trim="details.neededMoney"
            @input="$utils.onlyNum(details, 'neededMoney', details.neededMoney)"
            :maxlength="2"
            class="w300"
          ></el-input>
          <p class="tips">购买本超级回馈卡需要花费的金额（元）</p>
        </el-form-item>
        <el-form-item style="margin-bottom: 4px;" v-if="details.type === 9" label="保护期：">
          <el-radio-group :disabled="pageType === 'detail'" v-model="details.protectionStrategy">
            <el-radio :label="1">按天</el-radio>
            <el-radio :label="2">按时间计算</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label v-if="details.type === 9">
          <template v-if="details.protectionStrategy === 1">
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.protectionDays"
              v-only-num.integer="details.protectionDays"
              :max-len="3"
            ></el-input>天
          </template>
          <template v-else>
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.protectionHours"
              v-only-num.integer="details.protectionHours"
              :max-len="2"
            ></el-input>小时
            <span class="mar-right"></span>
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.protectionMinutes"
              v-only-num.integer="details.protectionMinutes"
              :max-len="2"
            ></el-input>分钟
          </template>
        </el-form-item>
        <el-form-item v-if="[1, 2, 3, 8, 9].indexOf(details.type) >= 0" label="是否限量：">
          <el-radio-group :disabled="pageType === 'detail'" v-model="details.limitStatus">
            <el-radio :label="0">不限量</el-radio>
            <el-radio :label="1">限量</el-radio>
          </el-radio-group>
          <el-input
            v-if="details.limitStatus"
            class="inline-input ma-l-10"
            :disabled="pageType === 'detail'"
            v-model="details.limitNum"
            v-only-num.integer="details.limitNum"
            :max-len="8"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 4px;" v-if="details.type != 4" label="有效期：">
          <el-radio-group :disabled="pageType === 'detail'" v-model="details.periodStrategy">
            <el-radio :label="1">按天</el-radio>
            <el-radio :label="2">按时间计算</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label v-if="details.type != 4">
          <template v-if="details.periodStrategy === 1">
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.periodDays"
              v-only-num.integer="details.periodDays"
              :max-len="3"
            ></el-input>天
          </template>
          <template v-else>
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.periodHours"
              v-only-num.integer="details.periodHours"
              :max-len="2"
            ></el-input>小时
            <span class="mar-right"></span>
            <el-input
              class="day-input"
              :disabled="pageType === 'detail'"
              v-model="details.periodMinutes"
              v-only-num.integer="details.periodMinutes"
              :max-len="2"
            ></el-input>分钟
          </template>
        </el-form-item>
        <!-- 回馈卡权益组 -->
        <template>
          <rewardsCardRightsGroup v-if="details.type == 7" :myDisabled="pageType === 'detail'"></rewardsCardRightsGroup>
        </template>
        <el-form-item style="margin-top: 32px;">
          <el-button v-if="pageType !== 'detail'" type="primary" @click="onSubmit">提交保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import rewardsCardRightsGroup from "./rewardsCardRightsGroup/index";
export default {
  name: "itemCardEdit",
  data() {
    return {
      pageType: "add", // add edit detail
      id: 0,
      details: {
        id: "",
        type: 1,
        name: "",
        desc: "",
        compensateGold: '',
        limitStatus: 0,
        limitNum: "",
        periodStrategy: 1,
        periodDays: "",
        periodHours: "",
        periodMinutes: "",
        sourceName: '',
        minNum: "",
        maxNum: null,
        rightsMoney: "",
        neededMoney: "",
        rightsList: [],
        protectionStrategy: 1, // 保护期类型，1-按天；2-按时间
        protectionDays: '', // 保护期-天数
        protectionHours: '', // 保护期-小时数
        protectionMinutes: '' // 保护期-分钟数
      }
    };
  },
  components: {
    rewardsCardRightsGroup
  },
  mounted() {
    const pageType = this.$route.meta.type || "add";
    this.pageType = pageType;
    this.id = this.$route.params.id;
    if (pageType !== "add") {
      this.getDetail(this.id);
    } else {
      this.$store.state.rewardsCardRightsGroup.rightsList = [
        {
          cardType: 7,
          rightsType: "",
          rightsContent: ""
        }
      ];
    }
  },
  methods: {
    getDetail(id) {
      if (!id) {
        return false;
      }
      const params = { id };
      this.$service.privilege.itemCard.getCardInfo(params).then(res => {
        this.details = res;
        this.details.limitStatus =
          this.details.limitStatus === null ? 0 : this.details.limitStatus;
        this.details.periodStrategy =
          this.details.periodStrategy === null
            ? 1
            : this.details.periodStrategy;
        // 保护期默认值
        this.details.protectionStrategy =
          this.details.protectionStrategy === null
            ? 1
            : this.details.protectionStrategy;
        if (res.rightsList) {
          this.$store.state.rewardsCardRightsGroup.rightsList = res.rightsList;
        }
      });
    },
    onSubmit() {
      const details = this.details;
      const params = {
        type: details.type,
        name: details.name,
        desc: details.desc,
        compensateGold: details.compensateGold,
        limitStatus: details.limitStatus,
        limitNum: details.limitNum,
        periodStrategy: details.periodStrategy,
        periodDays: details.periodDays,
        periodHours: details.periodHours,
        periodMinutes: details.periodMinutes,
        sourceName: details.sourceName,
        minNum: details.minNum,
        maxNum: details.maxNum,
        rightsMoney: details.rightsMoney,
        neededMoney: details.neededMoney,
        protectionStrategy: details.protectionStrategy,
        protectionDays: details.protectionDays,
        protectionHours: details.protectionHours,
        protectionMinutes: details.protectionMinutes
      };
      // 金币类型
      if (params.type === 4) {
        if (params.sourceName === '' || params.sourceName === null) {
          return this.$message.warning('请输入来源名称')
        }
        if (
          !params.minNum ||
          !params.maxNum ||
          params.minNum == 0 ||
          params.maxNum == 0
        ) {
          return this.$message.warning("请输入1-9999金币面额");
        }
        if (parseInt(params.maxNum) < parseInt(params.minNum)) {
          return this.$message.warning("最大值必须大于等于最小值");
        }
      } else if (params.type === 9) {// 保护罩类型校验
        if (params.name === '' || params.name === null) {
          return this.$message.warning('请输入道具名称')
        }
        if (
          params.protectionStrategy === 1 &&
          (params.protectionDays === '' || params.protectionDays == 0 || params.protectionDays === null)
        ) {
          return this.$message.warning('请输入保护期天数，大于1小于999')
        }
        // 小时不为空同时分钟不为空同时小时分钟不同时为0同时小时小于等于23同时分钟小于等于59
        if (
          params.protectionStrategy === 2 &&
          (
            params.protectionHours === '' ||
            params.protectionHours === null ||
            params.protectionMinutes === '' ||
            params.protectionMinutes === null ||
            (params.protectionHours == 0 && params.protectionMinutes == 0) ||
            params.protectionHours > 23 ||
            params.protectionMinutes > 59
          )
        ) {
          return this.$message.warning('请输入有效的时间，小时0-23，分钟0-59，不可同为0')
        }
        if (
          params.limitStatus === 1 &&
          (params.limitNum === '' || params.limitNum == 0 || params.limitNum === null)
        ) {
          return this.$message.warning('请输入限制数量，大于1小于99999999的整数')
        }
        
        if (
          params.periodStrategy === 1 &&
          (params.periodDays === "" || params.periodDays === null)
        ) {
          this.$message.warning("请输入有效期天数");
          return false;
        }
        if (params.periodStrategy === 2) {
          // 小时不为空同时分钟不为空同时小时分钟不同时为0同时小时小于等于23同时分钟小于等于59
          if (
            params.periodHours === "" ||
            params.periodHours === null ||
            params.periodMinutes === "" ||
            params.periodMinutes === null ||
            (params.periodHours == 0 && params.periodMinutes == 0) ||
            params.periodHours > 23 ||
            params.periodMinutes > 59
          ) {
            this.$message.warning(
              "请输入有效的时间，小时0-23，分钟0-59，不可同为0"
            );
            return false;
          }
        }
      }else {
        if (params.name === "" || params.name === null) {
          this.$message.warning("请输入道具名称");
          return false;
        }
        if(params.compensateGold === 0){
          return this.$message.warning("补偿金币必须是1到99999的整数")
        }
        // 立减卡权益金面额
        params.rightsMoney = params.rightsMoney * 1;
        if (
          params.type === 6 &&
          (params.rightsMoney === "" || params.rightsMoney < 1)
        ) {
          this.$message.warning("请输入权益金面额，大于1小于99的整数");
          return false;
        }
        // 回馈卡所需金额
        params.neededMoney = params.neededMoney * 1;
        if (
          params.type === 7 &&
          (params.neededMoney === "" || params.neededMoney < 1)
        ) {
          this.$message.warning("请输入所需金额，大于1小于99的整数");
          return false;
        }
        if (
          params.limitStatus === 1 &&
          (params.limitNum === "" || params.limitNum === null)
        ) {
          this.$message.warning("请输入限制数量");
          return false;
        }
        if (
          params.periodStrategy === 1 &&
          (params.periodDays === "" || params.periodDays === null)
        ) {
          this.$message.warning("请输入有效期天数");
          return false;
        }
        if (params.periodStrategy === 2) {
          // 小时不为空同时分钟不为空同时小时分钟不同时为0同时小时小于等于23同时分钟小于等于59
          if (
            params.periodHours === "" ||
            params.periodHours === null ||
            params.periodMinutes === "" ||
            params.periodMinutes === null ||
            (params.periodHours == 0 && params.periodMinutes == 0) ||
            params.periodHours > 23 ||
            params.periodMinutes > 59
          ) {
            this.$message.warning(
              "请输入有效的时间，小时0-23，分钟0-59，不可同为0"
            );
            return false;
          }
        }
      }
      // 回馈卡校验，1.全部填写 2.至少一张“立减卡” 3.查重
      if (params.type === 7) {
        let rightsList = this.$store.state.rewardsCardRightsGroup.rightsList;
        let type_arr = [];
        let content_arr = [];
        let bol = true;
        let ind = "";
        let repeat1 = 0;
        let repeat2 = 0;
        for (let i = 0; i < rightsList.length; i++) {
          let both = rightsList[i].rightsType && rightsList[i].rightsContent;
          if (!both) {
            ind = i;
            bol = false;
            break;
          } else {
            type_arr.push(rightsList[i].rightsType);
            content_arr.push(rightsList[i].rightsContent);
          }
        }
        if (!bol) {
          this.$message.warning(`请填写权益${ind + 1}的权益类型和内容`);
          return false;
        }
        if (!type_arr.filter(item => item === 6).length) {
          this.$message.warning(`超级回馈卡的权益必须包含一张立减金`);
          return false;
        }
        // 查重
        rep: for (let i = 0; i < content_arr.length; i++) {
          for (let j = i + 1; j < content_arr.length; j++) {
            if (content_arr[i] === content_arr[j]) {
              repeat1 = i + 1;
              repeat2 = j + 1;
              break rep;
            }
          }
        }
        if (repeat1 && repeat2) {
          this.$message.warning(
            `同一道具批次（号），不可被多个权益选择，请检查权益${repeat1}、权益${repeat2}权益内容`
          );
          return false;
        }
      }
      params.rightsList = this.$store.state.rewardsCardRightsGroup.rightsList;
      if (this.pageType === "edit") {
        params.id = this.id;
        this.$service.privilege.itemCard.editCard(params).then(res => {
          this.$message.success("编辑成功");
          this.goBack();
        });
      } else {
        this.$service.privilege.itemCard.addCard(params).then(res => {
          this.$message.success("添加成功");
          this.goBack();
        });
      }
    },
    goBack() {
      this.$router.replace("/itemCard");
    }
  }
};
</script>

<style scoped>
.form-center {
  width: 600px;
}
.tips {
  font-size: 12px;
  color: #999;
}
.inline-input {
  display: inline-block;
  width: 140px;
}
.day-input {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.mar-right {
  display: inline-block;
  width: 30px;
}
</style>
