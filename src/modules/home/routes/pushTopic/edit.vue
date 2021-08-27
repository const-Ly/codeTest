<template>
  <el-card>
    <el-form label-width="150px">
      <el-form-item label="*专题标题 ">
        <el-input class="w300" placeholder="10字以内" v-model.trim="detail.title" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="备注 ">
        <el-input class="w300" placeholder="25字以内" v-model.trim="detail.remark" maxlength="25"></el-input>
      </el-form-item>
      <el-form-item label="*开始生效时间 ">
        <el-date-picker class="w200" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" v-model="detail.enableTime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptionsStart" @change="startTimeStatus"></el-date-picker>
    
      </el-form-item>
      <el-form-item label="失效时间 ">
        <el-date-picker class="w200" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" v-model="detail.disableTime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" @change="endTimeStatus"></el-date-picker>
      </el-form-item>
      <el-form-item label="banner图 ">
        <upload  class="inline-block fl" action="/image/uploadImage?width=-1&height=-1&fileSize=1024" :size='1024' :image-url="detail.bannerImage" @success="detail.bannerImage = $event"></upload>
        <span class="font-info ma-t-20 ma-l-20 fl">大小上限为1M，支持jpg和png</span>
      </el-form-item>
      <el-form-item label="商品导入 ">
        <template>
          <el-button type="primary" @click="openDialog">选择标签</el-button>
          <el-button  @click="emptyList">清空</el-button>
        </template>
        <el-table class="ma-t-20 tagTable" :data="detail.tags" border style="width: 500px">
          <el-table-column prop="tagName" label="标签名称"></el-table-column>
          <el-table-column prop="type" label="标签类型"></el-table-column>
          <el-table-column prop="onSaleProductNum" label="在售商品数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="font-blue" @click="delet(scope.row, scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="排序选择 ">
        <el-radio-group v-model="detail.orderRule">
          <el-radio :label="1">默认排序</el-radio>
          <el-radio :label="2">周销量排序</el-radio>
          <el-radio :label="3">月销量排序</el-radio>
        </el-radio-group><br>
        <span class="font-info">默认排序仅展示前100个在售商品 </span>
      </el-form-item>
      <el-form-item label="插入固定位置商品 ">
        <ul class="clearfix">
          <li class="ma-b-10 ma-r-20 fl" v-for="(item, i) in detail.placeholders" :key="i">
            <label>第{{i + 1}}位 </label>
            <el-input class="w160  ma-r-20 ma-l-10" @input="onlyNum(i)" v-model.trim="detail.placeholders[i]" placeholder="请输入商品spu_id"></el-input>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" class="sub-btn" @click="submit">提交保存</el-button>
      </el-form-item>
    </el-form>
    <tag-dialog ref="dialog" @syncData="addList" :echoList="detail.tags"></tag-dialog>
  </el-card>
</template>
<script>
import upload from '@/components/upload'
import TagDialog from './tagDialog'
export default {
  name: "deit",
  data () {
    return {
      detail: { // 编辑回显的数据
        id: '',
        title: '',
        remark: '',
        enableTime: '',
        disableTime: '',
        bannerImage: '',
        orderRule: 1, // 商品排序，1默认排序，2周销量排序 3月销量
        tags: [],
        // 八个固定商品
        placeholders: ['','','','','','','','']
      },
      pickerOptionsStart: {
        disabledDate: time => {
          // 结束时间
          let endDateVal = this.detail.disableTime;
          if (endDateVal) {
            return  time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          // 开始时间
          let beginDateVal = this.detail.enableTime;
          if (beginDateVal) {
            return  time.getTime() <= new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
          }
        }
      }
    }
  },
  methods: {
    // 时间开始选择器
    startTimeStatus:function(value){
        this.detail.enableTime = value
    },
    // 时间结束选择器
    endTimeStatus:function(value){
        this.detail.disableTime = value
    },
    // 获取编辑数据
    getDetail (id) {
      this.$service.home.pushTopic.topicDetail({
        'id': id 
      }).then(res => {
        res.enableTime && (res.enableTime += ':00')
        res.disableTime && (res.disableTime += ':00')
        this.detail = res
      })
    },
    // 删除
    delet (row,idx) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.detail.tags.splice(idx,1)
      }).catch(() => {
      	// 取消             
      });
      
    }, 
    emptyList () {
      this.$confirm('是否确认清空？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.detail.tags = []
      }).catch(() => {
      	// 取消             
      });
      
    },
    // 打开弹窗
    openDialog () {
      this.$refs.dialog.dialogShow = true
      this.$refs.dialog.dialogInit(this.detail.tags)
    },
    // 将选中的标签放到暂存变量，从子级组件传过来的
    addList (arr) {
      this.detail.tags = arr
    },
    // 提交保存
    submit () {
      if (!this.detail.title) {
        return this.$message.warning('请输入专题标题')
      }
      if (!this.detail.enableTime) {
        return this.$message.warning('请设置开始生效时间')
      }
      if (this.detail.disableTime && (new Date(this.detail.enableTime).getTime() > new Date(this.detail.disableTime).getTime())) {
        return this.$message.warning('失效时间必须大于开始时间！')
      }
       this.$service.home.pushTopic.save(this.detail).then(res => {
        this.$router.push({path: '/pushTopic'})
      })
    },

    onlyNum (i) {
      this.$nextTick(() => {
        this.detail.placeholders.splice(i, 1, this.detail.placeholders[i].replace(/\D/g, ''))
      })
    }
  },
  components: {upload, TagDialog},
  mounted () {
    let route  = this.$route
    if (route.name == 'edit') {
      this.detail.id = route.params.id
      this.getDetail(route.params.id)
    }
  }
}
</script>

<style scoped>
.page-content {
  margin-left: 40px;
}
.sort {
  margin-top: 35px;
}
.insert-title {
  margin-top: 35px;
}
.insert-content {
  display: flex;
  width: 600px;
  flex-wrap: wrap;
}
.insert-content li {
  margin-top: 25px;
}
.insert-content li:nth-child(even) {
  margin-left: 30px;
}
.w160 {
  width: 170px;
}
.insert-content li label {
  padding-right: 15px;
}
.sub-btn {
  margin-left: 400px;
  margin-top: 35px;
}
.page-content tr td span {
  cursor: pointer;
}
.tagTable{
  max-height: 441px;
  overflow-y: auto;
}
</style>

