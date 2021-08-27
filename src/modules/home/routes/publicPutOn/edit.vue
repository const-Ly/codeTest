<template>
  <div class="cms">
    <el-card>
      <el-form label-width="200px">
        <el-form-item class="text-label" label="推荐商品ID：">
          <span v-if="pageType==='detail'">{{local.recommendId}}</span>
          <el-input
            v-else
            class="w300"
            placeholder="限40个数字"
            v-model="local.recommendId"
            v-only-num.string="local.recommendId"
            maxlength="40"
            @blur="onBlur"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">{{local.productName}}</el-form-item>
        <el-form-item class="text-label" label="可见人群：">{{peopleMap(local.scope)}}</el-form-item>
        <el-form-item class="text-label" label="商品推荐图：">
          <img-view
            v-if="pageType==='detail'"
            style="width:750px;height:260px;"
            :src="local.recommendImg"
          ></img-view>
          <template v-else>
            <upload
              action="/image/uploadImage?width=750&height=260&fileSize=160"
              :size="160"
              :width="750"
              :height="260"
              :image-url="local.recommendImg"
              @success="local.recommendImg = $event"
            ></upload>
            <div class="font-info">图片尺寸750*260，支持jpg、png格式文件，文件小于160k</div>
          </template>
        </el-form-item>
        <el-form-item class="text-label" label="启用时间：">
          <span v-if="pageType==='detail'">{{local.enableTime}}</span>
          <el-date-picker
            v-else
            class="w300"
            v-model="local.enableTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="text-label" label="禁用时间：">
          <span v-if="pageType==='detail'">{{local.disableTime}}</span>
          <el-date-picker
            v-else
            class="w300"
            v-model="local.disableTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="text-label" label="排序位置：">
          <span v-if="pageType==='detail'">{{local.seq}}</span>
          <el-input
            v-else
            class="w300"
            v-model="local.seq"
            v-only-num.string="local.seq"
            maxlength="3"
          ></el-input>
        </el-form-item>
        <template v-if="pageType==='detail'">
          <el-form-item label="创建者：">{{local.createBy}}</el-form-item>
          <el-form-item label="创建时间：">{{local.createTime}}</el-form-item>
          <el-form-item label="修改者：">{{local.updateBy}}</el-form-item>
          <el-form-item label="修改时间：">{{local.updateTime}}</el-form-item>
        </template>
        <el-form-item style="margin-top: 32px;">
          <el-button v-if="pageType!=='detail'" type="primary" @click="onSubmit">提交保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 此页面使用了vuex作状态提升和逻辑分离，具体路径见 "../../store/modules/reduceMoneyBag"
import { mapState, mapActions } from "vuex";
import Upload from "@/components/upload";
export default {
  data() {
    return {
      pageType: "add",
      local: {
        id: "",
        recommendId: "",
        productName: "",
        scope: 1,
        recommendImg: "",
        enableTime: "",
        disableTime: "",
        seq: "",
        createTime: "",
        createBy: "",
        updateTime: "",
        updateBy: ""
      }
    };
  },
  components: {
    Upload
  },
  methods: {
    ...mapActions({
      getInfo: "publicPutOn_getInfo",
      add: "publicPutOn_add",
      edit: "publicPutOn_edit",
      searchProductById: "publicPutOn_searchProductById"
    }),
    // 推荐商品ID失焦
    onBlur() {
      this.searchProductById({
        productId: this.local.recommendId
      }).then(() => {
        this.local.productName = this.publicPutOn.formParam.productName;
      });
    },
    // 可见人群映射
    peopleMap(status) {
      const map = {
        1: "新用户"
      };
      return map[status];
    },
    // 提交保存
    onSubmit() {
      // 推荐商品为空校验
      if (!this.local.recommendId) {
        this.$message.warning("请输入推荐商品SPU ID");
        return;
      }
      // 商品推荐图为空校验
      if (!this.local.recommendImg) {
        this.$message.warning("请上传商品推荐图");
        return;
      }
      // 启用时间为空校验
      if (!this.local.enableTime) {
        this.$message.warning("请输入启用时间");
        return;
      }
      // 禁用时间为空校验
      if (!this.local.disableTime) {
        this.$message.warning("请输入禁用时间");
        return;
      }
      // 启用时间与禁用时间的校验
      if (this.local.enableTime > this.local.disableTime) {
        this.$message.warning("启用时间不能大于禁用时间");
        return;
      }
      // 排序位置为空校验
      if (!this.local.seq) {
        this.$message.warning("请输入排序位置");
        return;
      }
      // 排序位置超出范围的校验
      if (this.local.seq * 1 < 1 || this.local.seq * 1 > 100) {
        this.$message.warning("仅能输入[1-100]整数");
        return;
      }
      if (this.pageType === "add") {
        this.add(this.local).then(() => {
          this.$message.success("保存成功");
          this.goBack();
        });
      } else {
        this.edit(this.local).then(() => {
          this.$message.success("保存成功");
          this.goBack();
        });
      }
    },
    // 返回
    goBack() {
      this.$router.replace("/publicPutOn");
    }
  },
  mounted() {
    this.pageType = this.$route.meta.type;
    if (this.pageType !== "add") {
      this.getInfo({
        id: this.$route.params.id
      }).then(() => {
        this.local.id = this.publicPutOn.formParam.id;
        this.local.recommendId = this.publicPutOn.formParam.recommendId;
        this.local.productName = this.publicPutOn.formParam.productName;
        this.local.scope = this.publicPutOn.formParam.scope;
        this.local.recommendImg = this.publicPutOn.formParam.recommendImg;
        this.local.enableTime = this.publicPutOn.formParam.enableTime;
        this.local.disableTime = this.publicPutOn.formParam.disableTime;
        this.local.seq = this.publicPutOn.formParam.seq;
        this.local.createTime = this.publicPutOn.formParam.createTime;
        this.local.createBy = this.publicPutOn.formParam.createBy;
        this.local.updateTime = this.publicPutOn.formParam.updateTime;
        this.local.updateBy = this.publicPutOn.formParam.updateBy;
      });
    }
  },
  computed: {
    ...mapState({
      publicPutOn: state => state.publicPutOn
    })
  }
};
</script>

<style scoped>
</style>
