// pages/comment/components/commentTextPhoto/commentTextPhoto.js

const UTIL = require('../../../../utils/util.js');

Component({
    behaviors: [require('../../../../utils/behaviors/public.js')],

    /**
     * 组件的属性列表
     */
    properties: {
        commentList: {
            type: Array,
        },
        commentItem: {
            type: Object,
        },
        commentIndex: {
            type: Number,
        },
        compressWidth: {
            type: Number,
            value: 1000
        },
        compressQuality: {
            type: Number,
            value: 0.75
        },
        areaText: {
            type: String
        }
    },

    data: {
        isAndroid: UTIL.isAndroid()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 输入文字时触发
        feedInput: function (e) {
            let data = e.currentTarget.dataset;
            let {
                commentIndex,
            } = data;
            this.$emit("feedInput", {
                inputValue: e.detail.value.length > 0 ? e.detail.value : "",
                inputNum: e.detail.value.length,
                commentIndex
            })
        },

        // 选择图片
        selectPhoto: function (e) {
            let _this = this;
            let data = e.currentTarget.dataset;
            let {
                commentIndex,
            } = data;
            let dataFilePaths = this.data.commentList[commentIndex].tempFilePaths;
            let count = 5 - dataFilePaths.length;
            wx.chooseImage({
                count: count,
                sizeType: ['compressed', 'original'],
                sourceType: ['album', 'camera'],
                success: function (res) {
                    _this.$showLoading();
                    _this.uploadImageArr = [];
                    console.info(res)

                    // let hasGif = _this.filterImage(res.tempFiles);
                    _this.filterImage(res.tempFiles).then(ss => {
                        console.info(_this.uploadImageArr)
                        _this.$emit("selectPhoto", {
                            tempFilePaths: dataFilePaths.concat(_this.uploadImageArr),
                            hasGif,
                            commentIndex
                        })
                    });
                },
            })
        },

        // 过滤图片
        filterImage: function (paths) {
            let regGif = /(\.gif)$/;
            let hasGif = false;
            // return new Promise((resolve, reject) => {
            for (let i = 0; i < paths.length; i++) {
                if (!regGif.test(paths[i].path.toLocaleLowerCase())) {
                    // 判断是否需要压缩图片，如需压缩，先根据宽度尺寸进行，在判断是否需要根据压缩质量再次压缩
                    if (paths[i].size > 1024 * 1024) {
                        this.getImageWidth(paths[i].path).then(width => {
                            if (width > 1000) {
                                this.widthCompress(paths[i].path, this.data.compressWidth).then(imagePath => {
                                    this.getImageSize(imagePath).then(size => {
                                        // 进行质量压缩
                                        if (size > 1024 * 1024) {
                                            this.qualityCompress(paths[i].path).then(imagePath => {
                                                this.uploadImageArr.push(imagePath);

                                            })
                                        }
                                    })
                                }, imagePath => {
                                    this.uploadImageArr.push(imagePath);
                                });
                            } else {
                                this.qualityCompress(paths[i].path).then(imagePath => {
                                    this.uploadImageArr.push(imagePath);
                                })
                            }
                        })

                        this.getImageWidth(paths[i].path).then(width => {
                            if (width > 1000) {
                                return this.widthCompress(paths[i].path, this.data.compressWidth);
                            } else {
                                return this.qualityCompress(paths[i].path, this.data.compressQuality);
                            }
                        }).then(obj => {
                            if (obj.type === "width-compress") {
                                return this.getImageSize(obj.imagePath);
                            } else {
                                return resolve()
                            }
                            return this.qualityCompress(paths[i].path);
                        }).then((imagePath) => {
                            resolve({
                                imagePath
                            })
                        }).catch(e => {
                            reject(0)
                        })
                    }
                } else {
                    if (!hasGif) {
                        hasGif = true
                    }
                }
            }
            // })
        },

        // 根据宽度压缩图片
        widthCompress: function (imagePath, compressWidth = 1000) {
            let _this = this;
            return new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: imagePath,
                    success: function (res) {
                        let myCanvas = wx.createCanvasContext('my_canvas', _this);
                        let imageOriginWidth = res.width;
                        let imageOriginHeight = res.height;
                        let compressHeight = (compressWidth * imageOriginHeight / imageOriginWidth) | 0;
                        _this.setData({
                            canvasWidth: compressWidth,
                            canvasHeight: compressHeight
                        }, function () {
                            myCanvas.drawImage(imagePath, 0, 0, imageOriginWidth, imageOriginHeight, 0, 0, compressWidth, compressHeight);
                            myCanvas.draw(false, function () {
                                wx.canvasToTempFilePath({
                                    canvasId: 'my_canvas',
                                    fileType: "jpg",
                                    width: compressWidth,
                                    height: compressHeight,
                                    destWidth: compressWidth,
                                    destHeight: compressHeight,
                                    success: function (res) {
                                        resolve({
                                            imagePath: res.tempFilePath,
                                            type: 'width-compress'
                                        });
                                    },
                                    fail: function (res) {
                                        resolve({
                                            imagePath,
                                            type: 'width-compress'
                                        });
                                    }
                                }, _this)
                            });
                        })
                    },
                    fail: function () {
                        resolve({
                            imagePath,
                            type: 'width-compress'
                        });
                    }
                })
            })
        },

        // 获取图片大小
        getImageSize: function (filePath) {
            return new Promise((resolve, reject) => {
                wx.getFileInfo({
                    filePath: filePath,
                    success: function (res) {
                        resolve(res.size);
                    },
                    fail: function () {
                        reject(0);
                    }
                })
            })
        },

        // 获取图片宽高
        getImageWidth: function (imagePath) {
            return new Promise((resolve, reject) => {
                wx.getImageInfo({
                    src: imagePath,
                    success: res => {
                        resolve(res.width)
                    },
                    fail: function () {
                        reject(0);
                    }
                })
            })
        },

        // 根据质量系数进行压缩图片
        qualityCompress: function (imagePath, quality = 0.75) {
            return new Promise((resolve, reject) => {
                if (wx.compressImage) {
                    wx.compressImage({
                        src: imagePath,
                        quality: quality,
                        success: function (res) {
                            resolve({
                                imagePath: res.tempFilePath,
                                type: 'quality-compress'
                            })
                        },
                        fail: function () {
                            resolve({
                                imagePath: imagePath,
                                type: 'quality-compress'
                            });
                        }
                    })
                } else {
                    reject({
                        imagePath: imagePath,
                        type: 'quality-compress'
                    });
                }
            })

        },

        //预览图片
        pictureView: function (e) {
            let data = e.currentTarget.dataset;
            let {
                commentIndex,
                src
            } = data;
            wx.previewImage({
                current: src,
                urls: this.data.commentList[commentIndex].tempFilePaths
            });
        },

        // 删除当前图片
        deleteCurrentImage: function (e) {
            let data = e.currentTarget.dataset;
            let {
                commentIndex,
                index
            } = data;
            let tempFilePaths = this.data.commentList[commentIndex].tempFilePaths;
            tempFilePaths.splice(index, 1);
            this.$emit('deleteCurrentImage', {
                tempFilePaths,
                commentIndex
            })
        },
    }
})