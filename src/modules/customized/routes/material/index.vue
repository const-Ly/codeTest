<template>
  <el-collapse v-model="collapseMod">
    <el-collapse-item title="分享我的定制" name="1">
      <el-form label-width="260px" size="small">
        <el-form-item label="小程序卡片图" class="mar-t-30">
          <upload class="upload" action="/image/uploadImage?width=500&height=400&fileSize=150"
            :image-url="myMaterial.miniAppPicUrl"
            @success="myMaterial.miniAppPicUrl = $event"
            :size="150">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸500x400，文件小于150k
          </span>
        </el-form-item>
        <el-form-item label="小程序定制用户分享标题">
          <label class="write" v-for="(item,index) in myMaterial.customTitalList" :key="index">
          <el-input type="text" v-model="myMaterial.customTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="myMaterial.customTitalList && myMaterial.customTitalList.length > 1"
              @click="delWrite(myMaterial.customTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="myMaterial.customTitalList && myMaterial.customTitalList.length < 10"
            @click="addWrite(myMaterial.customTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="小程序非定制用户分享标题">
          <label class="write" v-for="(item,index) in myMaterial.nonCustomTitalList" :key="index">
            <el-input type="text" v-model="myMaterial.nonCustomTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="myMaterial.nonCustomTitalList && myMaterial.nonCustomTitalList.length > 1"
              @click="delWrite(myMaterial.nonCustomTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="myMaterial.nonCustomTitalList && myMaterial.nonCustomTitalList.length < 10"
            @click="addWrite(myMaterial.nonCustomTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="H5方形图">
          <upload class="upload" action="/image/uploadImage?width=300&height=300&fileSize=150"
            @success="myMaterial.squarePicUrl = $event"
            :image-url="myMaterial.squarePicUrl"
            :size="150">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸300x300，文件小于300k
          </span>
        </el-form-item>
      </el-form>
      <el-button class="mar-l200" @click="saveShore('myMaterial', 'my')">提交保存</el-button>
    </el-collapse-item>
    
		<el-collapse-item title="分享定制商品" name="2">
      <el-form label-width="260px" size="small" v-if="productMaterial.customTitalList">
        <el-form-item label="小程序卡片图" class="mar-t-30">
          <upload class="upload" action="/image/uploadImage?width=500&height=400&fileSize=150"
            @success="productMaterial.miniAppPicUrl = $event"
            :size="150"
						:image-url="productMaterial.miniAppPicUrl">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸500x400，文件小于150k
          </span>
        </el-form-item>
        <el-form-item label="小程序定制用户分享标题">
          <label class="write" v-for="(item,index) in productMaterial.customTitalList" :key="index">
            <el-input type="text" v-model="productMaterial.customTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="productMaterial.customTitalList.length > 1"
              @click="delWrite(productMaterial.customTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productMaterial.customTitalList.length < 10"
            @click="addWrite(productMaterial.customTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="小程序非定制用户分享标题">
          <label class="write" v-for="(item,index) in productMaterial.nonCustomTitalList" :key="index">
            <el-input type="text" v-model="productMaterial.nonCustomTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="productMaterial.nonCustomTitalList.length > 1"
              @click="delWrite(productMaterial.nonCustomTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productMaterial.nonCustomTitalList.length < 10"
            @click="addWrite(productMaterial.nonCustomTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="H5方形图">
          <upload class="upload" action="/image/uploadImage?width=300&height=300&fileSize=150"
						:image-url="productMaterial.squarePicUrl"
            @success="productMaterial.squarePicUrl = $event"
            :size="150">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸300x300，文件小于300k
          </span>
        </el-form-item>
				<el-form-item label="定制商品海报图(推荐750x1334)">
					<upload class="upload" action="/image/uploadImage?verifyHeightStatus=false&verifyWidthStatus=false&fileSize=300"
						:image-url="productMaterial.posterPicUrl"
            @success="productMaterial.posterPicUrl = $event"
            :size="300">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，文件小于300k。
          </span>
				</el-form-item>
				<el-form-item label="海报定制用户分享标题">
					<label class="write" v-for="(item,index) in productMaterial.posterCustomTitalList" :key="index">
            <el-input type="text" v-model.trim="productMaterial.posterCustomTitalList[index]" :maxlength="13" class="input-w200"></el-input>
            <span v-show="productMaterial.posterCustomTitalList.length > 1"
              @click="delWrite(productMaterial.posterCustomTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productMaterial.posterCustomTitalList.length < 10"
            @click="addWrite(productMaterial.posterCustomTitalList)" class="add-write">再加一条</div>
				</el-form-item>
				<el-form-item label="海报非定制用户分享标题">
					<label class="write" v-for="(item,index) in productMaterial.posterNonCustomTitalList" :key="index">
            <el-input type="text" v-model.trim="productMaterial.posterNonCustomTitalList[index]" :maxlength="13" class="input-w200"></el-input>
            <span v-show="productMaterial.posterNonCustomTitalList.length > 1"
              @click="delWrite(productMaterial.posterNonCustomTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productMaterial.posterNonCustomTitalList.length < 10"
            @click="addWrite(productMaterial.posterNonCustomTitalList)" class="add-write">再加一条</div>
				</el-form-item>
      </el-form>
      <el-button class="mar-l200" @click="saveShore('productMaterial', 'product')">提交保存</el-button>
    </el-collapse-item>

		<el-collapse-item title="商品频道页素材" name="3">
      <el-form label-width="260px" size="small" v-if="productChannelMaterial.customTitalList">
        <el-form-item label="小程序卡片图" class="mar-t-30">
          <upload class="upload" action="/image/uploadImage?width=500&height=400&fileSize=150"
            @success="productChannelMaterial.miniAppPicUrl = $event"
            :size="150"
						:image-url="productChannelMaterial.miniAppPicUrl">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸500x400，文件小于150k
          </span>
        </el-form-item>
        <el-form-item label="小程序定制用户分享标题">
          <label class="write" v-for="(item,index) in productChannelMaterial.customTitalList" :key="index">
            <el-input type="text" v-model="productChannelMaterial.customTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="productChannelMaterial.customTitalList.length > 1"
              @click="delWrite(productChannelMaterial.customTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productChannelMaterial.customTitalList.length < 10"
            @click="addWrite(productChannelMaterial.customTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="小程序非定制用户分享标题">
          <label class="write" v-for="(item,index) in productChannelMaterial.nonCustomTitalList" :key="index">
            <el-input type="text" v-model="productChannelMaterial.nonCustomTitalList[index]" :maxlength="40" class="input-w200"></el-input>
            <span v-show="productChannelMaterial.nonCustomTitalList.length > 1"
              @click="delWrite(productChannelMaterial.nonCustomTitalList, index)" class="del-write">删除</span>
          </label>
          <div v-show="productChannelMaterial.nonCustomTitalList.length < 10"
            @click="addWrite(productChannelMaterial.nonCustomTitalList)" class="add-write">再加一条</div>
        </el-form-item>
        <el-form-item label="H5方形图">
          <upload class="upload" action="/image/uploadImage?width=300&height=300&fileSize=300"
						:image-url="productChannelMaterial.squarePicUrl"
            @success="productChannelMaterial.squarePicUrl = $event"
            :size="350">
					</upload>
          <span>
            <i>*</i>支持jpg、png格式文件，尺寸300x300，文件小于300k
          </span>
        </el-form-item>
      </el-form>
      <el-button class="mar-l200" @click="saveShore('productChannelMaterial', 'productChannel')">提交保存</el-button>
    </el-collapse-item>

		<el-collapse-item title="新手引导页素材" name="4">
      <el-form label-width="260px" size="small">
        <el-form-item label="新手引导弹窗图片" class="mar-t-30">
          <upload class="upload" action="/image/uploadImage?verifyHeightStatus=false&verifyWidthStatus=false&fileSize=300"
            @success="newCustomerMaterial = $event"
            :size="300"
						:image-url="newCustomerMaterial">
					</upload>
          <span>
            <i>*</i>图片小于300k
          </span>
        </el-form-item>
      </el-form>
      <el-button class="mar-l200" @click="saveShore('newCustomerMaterial', 'newCustomer')">提交保存</el-button>
    </el-collapse-item>
  </el-collapse>
</template>

<script type="text/javascript">
import upload from "@/components/upload";
export default {
  data() {
    return {
			collapseMod: [],
      myMaterial: {
			},
			productMaterial: {
			},
			productChannelMaterial: {
			},
			newCustomerMaterial: ''
    }
  },
  methods: {
    delWrite(arr, index) {
      arr.splice(index, 1);
    },
    addWrite(arr, other) {
			let obj;
			if(other) {
				obj = {firstTitle: '', secondTitle: ''}
			} else {
				obj = ''
			}
      arr.push(obj);
    },
    init() {
      this.$service.customized.material.getMaterial().then(res => {
        // this.myMaterial = res.myMaterial
        // this.productMaterial = res.productMaterial;
        // this.productChannelMaterial = res.productChannelMaterial;
        // this.newCustomerMaterial = res.newCustomerMaterial;
        this.redata(res)
      });
    },
    redata(res) {
      for(let key in res) {
        if(res[key].customTitalList && res[key].customTitalList.length === 0) {
          this.addWrite(res[key].customTitalList)
        }
        if(res[key].nonCustomTitalList && res[key].nonCustomTitalList.length === 0) {
          this.addWrite(res[key].nonCustomTitalList)
        }
        if(res[key].posterCustomTitalList && res[key].posterCustomTitalList.length === 0) {
          this.addWrite(res[key].posterCustomTitalList)
        }
        if(res[key].posterNonCustomTitalList && res[key].posterNonCustomTitalList.length === 0) {
          this.addWrite(res[key].posterNonCustomTitalList)
        }
        this[key] = res[key]
      }
    },
		reParam(key){
      let param = this[key],result = {},
      customTitalState = false, 
      nonCustomTitalState = false,
      posterNonCustomTitalState = false,
      posterCustomTitalList = [],
      posterNonCustomTitalList = [],
      posterCustomTitalState = false;
      
			if(key === 'newCustomerMaterial') {
        if(param.length < 5){
					this.$message.warning("请上传新手引导弹窗图片！");return
				}else {
					return {
            popupPicUrl: param
          };
				}
      } else {
         param.customTitalList.forEach(item => {
          if(item.trim() === '') {
            customTitalState = true;
          }
        })
        param.nonCustomTitalList.forEach(item => {
          if(item.trim() === '') {
            nonCustomTitalState = true;
          }
        })
      }
      if(param.miniAppPicUrl.length < 5) {
				this.$message.warning("请上传小程序卡片图！");return
      }
      if(customTitalState) {
				this.$message.warning("请输入小程序定制用户分享标题！");return
			}
			if(nonCustomTitalState) {
				this.$message.warning("请输入小程序非定制用户分享标题！");return
			}
			if(param.squarePicUrl.length < 5) {
				this.$message.warning("请上传H5方形图片！");return
      }	
      if(param.posterPicUrl !== undefined) {
				param.posterNonCustomTitalList.forEach(item => {
          posterNonCustomTitalList.push(item);
					if(item.trim() === '') {
						posterNonCustomTitalState = true;
					}
				})
				param.posterCustomTitalList.forEach(item => {
          posterCustomTitalList.push(item);
					if(item.trim() === '') {
						posterCustomTitalState = true;
					}
				})
				if(param.posterPicUrl.length < 5) {
					this.$message.warning("请上传定制商品海报图！");return
        }
        result.posterCustomTitalList = posterCustomTitalList;
        result.posterNonCustomTitalList = posterNonCustomTitalList;
        result.posterPicUrl = param.posterPicUrl;
			}
			if(posterCustomTitalState) {
				this.$message.warning('请输入海报定制用户分享标题！');return
			}
			if(posterNonCustomTitalState) {
				this.$message.warning('请输入海报非定制用户分享标题！');return
      }
      result.miniAppPicUrl = param.miniAppPicUrl;
      result.nonCustomTitalList = param.nonCustomTitalList;
      result.customTitalList = param.customTitalList;
      result.squarePicUrl = param.squarePicUrl;
			return result;
		},
		saveShore(key, url) {
			let params = this.reParam(key);
			if(params) {
				this.$service.customized.material[url](params).then(item => {
          this.$message.success('保存成功');
        })
			}
    }
  },
  mounted() {
		this.init();
  },
  components: {
    upload
  }
};
</script>
<style scoped>
.mar-l200 {
  margin-left: 250px;
}
.input-w200 {
  width: 200px;
}
.input-w60 {
  width: 120px;
}
.write {
  display: block;
  max-width: 280px;
  line-height: 40px;
}
.mar-t-30 {
  margin-top: 30px;
}
.el-form-item span i {
	color: red;
	padding: 0 5px;
}
.upload {
	display: block;
	float: left;
}
.upload + span {
	display: block;
	line-height: 100px;
	float: left;
	padding-left: 10px;
}
.add-write, .del-write {
	color: #409EFF;
	cursor: pointer;
  width: 60px;
}
.add-write:hover, .del-write:hover {
	color: #3a8ee6;
}
</style>

