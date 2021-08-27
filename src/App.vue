<template>
  <div id="app"
    v-loading="$store.state.loading"
    :element-loading-text="$store.state.loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-color="#fff"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <layout>
      <transition name="el-fade-in-linear">
        <router-view />
      </transition>
    </layout>
  </div>
</template>

<script>
import '@/elementUI-reset.css'
import layout from '@/components/layout'
export default {
  name: 'App',
  components: {
    layout
  },
  watch:{
  	$route () {
  		document.title = this.$route.meta.title || this.$route.meta.pathName
  	}
  }
}
</script>

<style>
* { margin: 0; padding: 0;}
html,body{width:100%;height:100%;min-width:1350px;}
body { background: #f5f5f5}
a{text-decoration: none;}
li {list-style: none;}
.padding-none { padding: 0}
.bg-black { background: #272a33}

.font-blue {color:#409EFF;cursor: pointer;}
.font-success {color:#67C23A;cursor: pointer;}
.font-danger {color:#F56C6C !important;cursor: pointer;}
.font-warning {color:#E6A23C;cursor: pointer;}
.font-info {color:#909399;cursor: pointer;}

.font-dark0 {color:#C0C4CC;cursor: pointer;}
.font-dark1 {color:#909399;cursor: pointer;}
.font-dark2 {color:#606266;cursor: pointer;}
.font-dark4 {color:#303133;cursor: pointer;}


/* 分页 */
.cms-pagination {
	text-align: center;
	margin-top: 10px;
}
/* 排序箭头 */
.sortArrow {
	display: block;
	font-size: 20px;
  line-height: 15px;
}
/* 工具类 */
.align-center {
	text-align: center;
}
.align-right {
	text-align: right;
}
.align-top{
  vertical-align: top !important;
}
.none{  display: none; }
/*顺序：上右下左*/
.ma-t-10 {margin-top: 10px;}
.ma-t-20{ margin-top: 20px; }
.ma-t-40{ margin-top: 40px; }
.ma-r-10{margin-right: 10px;}
.ma-r-15{margin-right: 15px;}
.ma-r-20{margin-right: 20px;}
.ma-b-10{margin-bottom: 10px;}
.ma-b-20{margin-bottom: 20px;}
.ma-b-40{margin-bottom: 40px;}
.ma-l-10{margin-left: 10px;}
.ma-l-15{margin-left: 15px;}
.ma-l-20{margin-left: 20px;}
.ma-l-40{margin-left: 40px;}
.ma-l-85{margin-left: 85px;}

.ma-tb-10{margin:10px 0;}
.ma-ls-10 {margin-left: -10px;}
.ma-ls-20 {margin-left: -20px;}



.pa-b-10 {padding-bottom: 10px;}
.pa-b-20{padding-bottom: 20px;}
.pa-b-30{padding-bottom: 30px;}
.pa-b-100{padding-bottom:100px;}
.pa-l-60{padding-left: 60px;}

.line-30 {line-height: 30px;}
.line-32{line-height: 32px;}
.line-50{line-height: 50px;}

/* 尺寸*/
.w50{width:50px!important;}
.w80{width:80px!important;}
.w100{width:100px!important;}
.w120{width:120px!important;}
.w150{width:150px!important;}
.w200{width: 200px!important;}
.w300{width:300px!important;}
.w400{width: 400px!important;}
.w600{width: 600px!important;}


/* 字体 */
.font-18{font-size:18px;}

/* 鼠标形状 */
.cursor-default{cursor: default;}
.cursor-pointer {cursor: pointer;}


/*浮动*/

.clearfix:after{
  display: block;
  width:0;
  height:0;
  content:"";
  clear:both;
}
.fl {
  float: left;
}
.fr {
  float:right;
}

.relative{position: relative;}
.inline-block{display: inline-block;}

/* 其它 */
/* 分割线 */
.split-line {
  border-top:1px solid #ccc;
  padding:10px 0;
}
.input-mini {width:60px!important;}

/*loading加载*/
.vue-loading {
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0,0,0,.6);
}
.vue-loading  .tip-txt,.tip-loading {
  position: absolute;
  left:50%;
  top:50%;
  color:#fff;
  font-size: 20px;
  letter-spacing:5px;
  -webkit-transform:translate3d(-50%,-50%,0);
          transform:translate3d(-50%,-50%,0);
}
.tip-loading {
  letter-spacing: 0;
  font-size:50px;
}
.fixed{position:fixed;}
.fixed-full{position: fixed;left:0;top:0;width:100%;height:100%;}


.dialog-img-enlargement{ text-align: center;}
.dialog-img-enlargement .el-dialog{ display: inline-block; width: auto;}


/* 滚动条样式 (只针对谷歌生效) */
*::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
*::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #737373;
}
*::-webkit-scrollbar-track {/*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #ddd;
}

</style>
