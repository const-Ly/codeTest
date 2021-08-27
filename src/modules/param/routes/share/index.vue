<template>
  <div class="cms">
		<div class="share">
	  	<el-card v-for="(shareCont,idx) in list" :key="idx" class="box-card" >
			  <div slot="header" class="clearfix">
			    <span>{{shareCont.sharePageName}}</span>
			  </div>
			  <div class="shareBody">
			   	 分享方式：
			   	 <span v-for="ShareWay in shareCont.shareChannelNameList">{{ShareWay}}、</span>
			  </div>
			  <template>
			  	<div class="link">
			  		<router-link class="font-blue"  :to="{ path: 'share/detail/'+shareCont.sharePageId }">编辑</router-link>
			  	</div>
	      </template>
			</el-card>
		</div>
  </div>
</template>

<script type="text/javascript">
  export default {
      data() {
        let self = this
        return {
          list:[],
          breadcrumbBtn: {
            name: '分享方式设置',
            fullPath: '/share',
            callback () {
              self.$router.push({path:'/share/setShareInfo'})
            }
          },
        }
      },
      methods:{
          getList(val) {
            let self = this
            self.$service.param.share.getSharePageList().then(res => {
              self.list = res
           })
          }
      },
      beforeMount() {
        this.$store.commit('updateBreadcrumbBtn', this.breadcrumbBtn)
      },
      mounted () {
        this.getList()
      }
  }
</script>
<style scoped>
	.right{ text-align: right; margin-bottom: 10px;}
	.share .box-card{ width: 300px; display: inline-block; margin: 10px;}
	.share .shareBody{ height: 100px;}
	.share .link{ text-align: center;}
</style>
