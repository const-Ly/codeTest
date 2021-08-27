<template>
  <div class="by-editor" ref="neditor">
    <upload class="none" action="/ueditorUploadLotteryImage" ref="upload" :has-cookie="true" @success="handleImgUpload($event)"></upload>
    <quill-editor ref="myEditor" :options="editOption" v-model="str" @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script type="text/javascript">
  /**
   * 插件 vue-quill-editor
   * 参考网址：https://quilljs.com/docs/api/#events
   */
  import Upload from '@/components/upload'
  export default {
    name:'new-editor',
    props:{
      content:{
        type: String,
        default: ""
      },
      disabled:{
        type: Boolean,
        default: false
      },
      editOption: {
        type: Object,
        default: function(){
          return {
          }
        }
      }
    },
    data() {
      return {
        editor:null,
        str:""
      }
    },
    components:{
      Upload
    },
    watch:{
      content (nv,ov) {
        this.str = nv
      }
    },
    mounted() {
      let self = this;
      this.editor = this.$refs.myEditor.quill
      if(this.disabled){
        this.editor.enable(false)
      }
      //修改图片上传
      this.editor.getModule('toolbar').addHandler('image', ( value )=>{
        if(this.disabled) return false;
        if (value) {
          this.$refs.upload.checkImg()
        } else {
          this.editor.format('image', false);
        }
      })
      document.addEventListener('paste',function(e){
        let data = e.clipboardData || e.originalEvent.clipboardData
        for (var i = 0, len = data.items.length; i < len; i++) {
          var item = data.items[i];
          if (item.kind === "file") {
            e.preventDefault();
          }
        }
      },true)
    },
    methods:{
      handleImgUpload (url) {
        //this.editor.format('image', url); 这种方法也行，同以下3行代码功能一样，但是浏览器会报错！但并不阻碍程序执行！
        let length = this.editor.getSelection().index;
        // 插入图片
        this.editor.insertEmbed(length, 'image', url)
        // 调整光标到最后
        this.editor.setSelection(length + 1)
      },
      onEditorChange (obj) {
        this.$emit('change', obj.html)
        let list = this.$refs.neditor.querySelectorAll('img[src^="data:image"]');
        for(let i=0,len = list.length; i<len; i++){
          list[i].remove()
        }
      }
    }
  }
</script>
<style>
  .by-editor {position: relative;}
  .by-editor .ql-container {min-height: 320px; max-height: 800px;overflow:auto;}
  .by-editor .ql-container .ql-editor.ql-blank::before {
      text-align: center;
      color: #ff3333;
      /*content: attr(data-placeholder);*/
      font-style: normal;
  }
  .ql-editor p{text-align: left;}
</style>
