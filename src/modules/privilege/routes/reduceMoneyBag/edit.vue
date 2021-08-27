<template>
  <div class="cms">
    <el-card>
      <el-form label-width="200px">
        <el-form-item v-if="pageType!=='add'" label="批次号：">{{id}}</el-form-item>
        <el-form-item class="text-label" label="立减金总额：">
          <span v-if="pageType==='detail'">{{minValue}} — {{maxValue}}</span>
          <template v-else>
            <el-input
              class="w100 ma-b-10"
              v-model="minValue"
              v-only-num.string="minValue"
              maxlength="3"
            ></el-input>
            <span>———</span>
            <el-input
              class="w100 ma-b-10"
              v-model="maxValue"
              v-only-num.string="maxValue"
              maxlength="3"
            ></el-input>
            <p style="color:#909399">立减金总额金额区间（元），区间值前包含后不包含</p>
          </template>
        </el-form-item>
        <el-form-item label="文案说明：">
          <span v-if="pageType==='detail'">{{remark}}</span>
          <template v-else>
            <el-input class="w300 ma-b-10" v-model.trim="remark" maxlength="10"></el-input>
            <p style="color:#909399">用于前端页面展示，非必填</p>
          </template>
        </el-form-item>
        <el-form-item label="立减金数量：">{{reduceMoneyBag.vuexTerms.length}}</el-form-item>
        <el-form-item label="立减金比例说明：" v-if="pageType!=='detail'">
          <span style="color:#F56C6C">所有立减金比例之和须为100%，若不足100%，将在最后一条补至和为100%，大于100%不可提交</span>
        </el-form-item>
        <el-form-item
          class="text-label"
          :label="labelStr(index)"
          v-for="(item,index) in reduceMoneyBag.vuexTerms"
          :key="index"
        >
          <!-- 单个立减金小组件 -->
          <reduceMoney :dataFromParent="item" :indFromParent="index" :typeFromParent="pageType"></reduceMoney>
          <div class="fl" v-if="pageType!=='detail'">
            <i
              style="font-size:24px;"
              class="el-icon-delete font-info"
              @click="delReduceMoney(index)"
              v-if="reduceMoneyBag.vuexTerms.length!==1"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label=" " v-if="pageType!=='detail'">
          <el-button
            type="text"
            icon="el-icon-circle-plus-outline"
            @click="addReduceMoney"
            v-if="reduceMoneyBag.vuexTerms.length!==10"
          >再添加一条立减金</el-button>
        </el-form-item>
        <el-form-item style="margin-top: 32px;">
          <el-button type="primary" @click="onSubmit" v-if="pageType!=='detail'">提交保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 此页面使用了vuex作状态提升和逻辑分离，具体路径见 "../../store/modules/reduceMoneyBag"
import { mapState, mapActions } from "vuex";
// 引入单个立减金小组件
import reduceMoney from "./reduceMoney";
export default {
  data() {
    return {
      pageType: "add",
      id: "",
      minValue: "",
      maxValue: "",
      remark: "",
      terms: [
        {
          proportion: 100,
          expireType: 1
        }
      ]
    };
  },
  components: {
    reduceMoney
  },
  methods: {
    ...mapActions({
      getInfo: "reduceMoneyBag_getInfo",
      add: "reduceMoneyBag_add",
      edit: "reduceMoneyBag_edit"
    }),
    labelStr(index) {
      return "立减金" + (index * 1 + 1) + "：";
    },
    onSubmit() {
      // 两个立减金区间为空校验
      if (!this.minValue) {
        this.$message.warning("请输入立减金包金额区间");
        return false;
      }
      if (!this.maxValue) {
        this.$message.warning("请输入立减金包金额区间");
        return false;
      }
      // 立减金区间，前值不可大于后值的校验
      if (this.minValue * 1 >= this.maxValue * 1) {
        this.$message.warning("立减金包金额前值不可大于等于后值");
        return;
      }
      // 单个立减金比例为空的校验
      if (
        this.reduceMoneyBag.vuexTerms.some(item => {
          return !item.proportion;
        })
      ) {
        this.$message.warning("请输入[1-100]立减金比例");
        return false;
      }
      // 单个立减金比例超出范围的校验
      if (
        this.reduceMoneyBag.vuexTerms.some(item => {
          return item.proportion * 1 < 1 || item.proportion * 1 > 100;
        })
      ) {
        this.$message.warning("比例仅可输入[1-100]整数");
        return false;
      }
      // 有效期天数为空，超出范围的校验
      if (
        this.reduceMoneyBag.vuexTerms.some(item => {
          if (item.expireType === 1) {
            return (
              !item.expireDay ||
              item.expireDay * 1 < 1 ||
              item.expireDay * 1 > 999
            );
          }
        })
      ) {
        this.$message.warning("请输入[1-999]的有效期天数");
        return false;
      }
      // 有效期小时分钟，为空，超出范围，同为0的校验
      if (
        this.reduceMoneyBag.vuexTerms.some(item => {
          if (item.expireType === 2) {
            let boolean1 = !(item.expireHour + '') 
            let boolean2 = !(item.expireMinute + '') 
            let boolean3 = item.expireHour * 1 > 23;
            let boolean4 = item.expireMinute * 1 > 59;
            let boolean5 =
              item.expireHour * 1 === 0 && item.expireMinute * 1 === 0;
            return boolean1 || boolean2 || boolean3 || boolean4 || boolean5;
          }
        })
      ) {
        this.$message.warning(
          "请输入有效的时间，小时0-23，分钟0-59，不可同为0"
        );
        return false;
      }
      // 多条立减金比例之和大于100的校验
      let arr = [];
      this.reduceMoneyBag.vuexTerms.forEach(item => {
        arr.push(item.proportion * 1);
      });
      let num = 0;
      arr.forEach(item => {
        num += item;
      });
      if (num > 100) {
        this.$message.warning("立减金比例之和不可大于100%，请重新分配");
        return false;
      }
      // 只有一条立减金时,以及多条立减金时对最后一条比例的数据处理
      let length = this.reduceMoneyBag.vuexTerms.length;
      if (length === 1) {
        this.reduceMoneyBag.vuexTerms[0].proportion = 100;
      } else {
        let dValue = 100 - num;
        this.reduceMoneyBag.vuexTerms[length - 1].proportion += dValue;
      }
      // 请求接口
      const param = {
        id: this.id,
        minValue: this.minValue,
        maxValue: this.maxValue,
        remark: this.remark,
        terms: this.reduceMoneyBag.vuexTerms
      };
      if (this.pageType === "add") {
        this.add(param).then(() => {
          this.$message.success("保存成功");
          this.goBack();
        });
      } else {
        this.edit(param).then(() => {
          this.$message.success("保存成功");
          this.goBack();
        });
      }
    },
    goBack() {
      this.$router.replace("/reduceMoneyBag");
    },
    addReduceMoney() {
      this.reduceMoneyBag.vuexTerms.push({
        proportion: "",
        expireType: 1
      });
    },
    delReduceMoney(index) {
      this.reduceMoneyBag.vuexTerms.splice(index, 1);
    }
  },
  mounted() {
    this.pageType = this.$route.meta.type;
    if (this.pageType !== "add") {
      this.getInfo({
        id: this.$route.params.id
      }).then(() => {
        this.id = this.reduceMoneyBag.formParam.id;
        this.minValue = this.reduceMoneyBag.formParam.minValue;
        this.maxValue = this.reduceMoneyBag.formParam.maxValue;
        this.remark = this.reduceMoneyBag.formParam.remark;
        this.reduceMoneyBag.vuexTerms = this.reduceMoneyBag.formParam.terms;
      });
    } else {
      this.reduceMoneyBag.vuexTerms = [
        {
          proportion: 100,
          expireType: 1
        }
      ];
    }
  },
  computed: {
    ...mapState({
      reduceMoneyBag: state => state.reduceMoneyBag
    })
  }
};
</script>

<style scoped>
</style>
