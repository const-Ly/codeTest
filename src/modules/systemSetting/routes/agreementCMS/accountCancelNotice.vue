<template>
  <div class="notice">
    <div class="notice-header">
      账号注销须知
    </div>
    <div class="notice-body">
      <el-card class="notice-iOS">
        <div slot="header" class="clearfix">
          <span>账号注销须知</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="preview()">预览</el-button>
        </div>
        <div class="cart-body">
          <new-editor :edit-option="editOption" :content="param.content" @change="param.content = $event">
          </new-editor>
          <el-button class="notice-submit" @click="saveValid(2)">提交保存</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import newEditor from '@/components/newEditor'
export default {
  data(){
    return {
      param: {},
      editOption: {
        theme: 'snow', //试试bubble风格
        debug: false, // 可以使用info来查看信息
        placeholder: '暂无数据',
        readOnly:true,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image'],
            ['link']
          ]
        }
      }
    }
  },
  components: {
    newEditor
  },
  methods: {
    request() {
      this.$service.systemSetting.agreementCMS.getAccountCancelNotice().then(res => {
        this.param = res
      })
    },
    
    preview() {
      let newWin = window.open('', '账号注销须知', 'width=414,height=800,left=300,top=200'),
      style = '<style>.ql-size-huge{font-size:24px}.ql-size-large{font-size:20px}.ql-size-small{font-size:12px}</style>'
      newWin.document.write(style)
      newWin.document.write(this.param.content)
      newWin.document.title = '预览账号注销须知'
      newWin.document.close()
    },
    saveValid(num) {
      let content = this.param.content;
      if(content.trim() === '') {
        this.$message.warning('请输入账号注销须知');return
      } else if(content.trim().length > 100000) {
        this.$message.warning('富文本内容超出10W字符！');return
      }
      this.save({
        content: content
      })
    },
    save(param) {
      this.$service.systemSetting.agreementCMS.saveAccountCancelNotice(param).then(res => {
        this.$message.success('提交保存成功')
      })
    }
  },
  mounted() {
    this.request()
  }
}
</script>

<style scoped>
.notice-body {
  padding: 30px;
  background: #fff;
  margin-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.notice-Android {
  margin-top: 30px;
}
.notice-header {
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding-left: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.cart-body {
  text-align: center;
}
.notice-submit {
  margin-top: 20px;
}
</style>


