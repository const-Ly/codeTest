<template>
  <div class="privacy">
    <div class="privacy-header">
      必要隐私政策
    </div>
    <div class="privacy-body">
      <el-card class="privacy-iOS">
        <div slot="header" class="clearfix">
          <span>隐私政策iOS</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="preview('privacyforIos')">预览</el-button>
        </div>
        <div class="cart-body">
          <new-editor :content="param.privacyforIos.content" :edit-option="editOption" @change="param.privacyforIos.content = $event"></new-editor>
          <el-button class="privacy-submit" @click="saveValid('privacyforIos', 2)">提交保存</el-button>
        </div>
      </el-card>

      <el-card class="privacy-Android">
        <div slot="header" class="clearfix">
          <span>隐私政策Android/PC</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="preview('privacyforAndroidPc')">预览</el-button>
        </div>
        <div class="cart-body">
          <new-editor :content="param.privacyforAndroidPc.content" :edit-option="editOption" @change="param.privacyforAndroidPc.content = $event"></new-editor>
          <el-button class="privacy-submit" @click="saveValid('privacyforAndroidPc', 1)">提交保存</el-button>
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
        privacyforIos: {},
        privacyforAndroidPc: {}
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
      this.$service.systemSetting.agreementCMS.getPrivacyPolicyInfo().then(res => {
        this.param = res
      })
    },
    
    preview(key) {
      let newWin = window.open('', '必要隐私政策', 'width=414,height=800,left=300,top=200'),
      style = '<style>.ql-size-huge{font-size:24px}.ql-size-large{font-size:20px}.ql-size-small{font-size:12px}</style>'
      newWin.document.write(style)
      newWin.document.write(this.param[key].content)
      newWin.document.title = '预览必要隐私政策'
      newWin.document.close()
    },
    saveValid(key, num) {
      let content = this.param[key].content;
      if(content.trim() === '') {
        this.$message.warning('请输入隐私政策');return
      } else if(content.trim().length > 100000) {
        this.$message.warning('富文本内容超出10W字符');return
      }
      this.save({
        content: content,
        osType: num
      })
    },
    save(param) {
      this.$service.systemSetting.agreementCMS.savePrivacyPolicy(param).then(res => {
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
.privacy-body {
  padding: 30px;
  background: #fff;
  margin-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
}
.privacy-Android {
  margin-top: 30px;
}
.privacy-header {
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
.privacy-submit {
  margin-top: 20px;
}
</style>


