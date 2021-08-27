<template>
  <div class="agreement">
    <div class="agreement-header">
      用户服务协议
    </div>
    <div class="agreement-body">
      <el-card class="agreement-iOS">
        <div slot="header" class="clearfix">
          <span>用户服务协议iOS</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="preview('agreementforIos')">预览</el-button>
        </div>
        <div class="cart-body">
          <new-editor :edit-option="editOption" :content="param.agreementforIos.content" @change="param.agreementforIos.content = $event"></new-editor>
          <el-button class="agreement-submit" @click="saveValid('agreementforIos', 2)">提交保存</el-button>
        </div>
      </el-card>

      <el-card class="agreement-Android">
        <div slot="header" class="clearfix">
          <span>用户服务协议Android/PC</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="preview('agreementforAndroidPc')">预览</el-button>
        </div>
        <div class="cart-body">
          <new-editor :edit-option="editOption" :content="param.agreementforAndroidPc.content" @change="param.agreementforAndroidPc.content = $event"></new-editor>
          <el-button class="agreement-submit" @click="saveValid('agreementforAndroidPc', 1)">提交保存</el-button>
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
      param: {
        agreementforIos: {},
        agreementforAndroidPc: {}
      },
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
      this.$service.systemSetting.agreementCMS.getServiceAgreement().then(res => {
        this.param = res
      })
    },
    
    preview(key) {
      let newWin = window.open('', '用户服务协议', 'width=414,height=800,left=300,top=200'),
      style = '<style>.ql-size-huge{font-size:24px}.ql-size-large{font-size:20px}.ql-size-small{font-size:12px}</style>'
      newWin.document.write(style)
      newWin.document.write(this.param[key].content)
      newWin.document.title = '预览用户服务协议'
      newWin.document.close()
    },
    saveValid(key, num) {
      let content = this.param[key].content;
      if(content.trim() === '') {
        this.$message.warning('请输入用户服务协议');return
      } else if(content.trim().length > 100000) {
        this.$message.warning('富文本内容超出10W字符！');return
      }
      this.save({
        content: content,
        osType: num
      })
    },
    save(param) {
      this.$service.systemSetting.agreementCMS.saveServiceAgreement(param).then(res => {
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
.agreement-body {
  padding: 30px;
  background: #fff;
  margin-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.agreement-Android {
  margin-top: 30px;
}
.agreement-header {
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
.agreement-submit {
  margin-top: 20px;
}
</style>


