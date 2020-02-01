const comment = new Vue({
    el: "#comments",
    data: {
        blogId: -2,
        vcode: '',
        rightCode: '',
        commentName: '',
        commentEmail: '',
        commentContent: '',
        commentCode: '',
        total: 0,
        commentMsg: [],
        flag: true,
        parent: -1,
        parentName: 0
    },
    created() {
        this.changeCode();
        this.getComments();
        this.getViews();
    },
    methods: {
        subComment() {
            if (!this.commentName || !this.commentEmail || !this.commentContent || !this.commentCode) {
                alert('请将信息填写完整');
                return;
            }
            if (this.commentCode.toUpperCase() != this.rightCode) {
                this.commentCode = '';
                alert('验证码错误');
                this.changeCode();
                return;
            }
            if (!this.flag) {
                this.parent = 1;
            }
            // 一条博客评论不允许重复名字
            if (this.commentName == 'yimax') {
                alert('博主名称不可用');
            } else {
                axios.get('/queryCommentByName', {
                    params: {
                        blogId: this.blogId,
                        userName: this.commentName
                    }
                }).then((resp) => {
                    if (resp.data.data.length == 0) {
                        axios.post('/insertComment', {
                            blogId: this.blogId,
                            parent: this.parent,
                            parentName: this.parentName,
                            userName: this.commentName,
                            comments: this.commentContent,
                            email: this.commentEmail
                        }).then((resp) => {
                            this.commentCode = '';
                            this.commentContent = '';
                            this.commentEmail = '';
                            this.commentName = '';
                            this.getComments();
                            this.changeCode();
                            this.getViews();
                            alert(resp.data.msg);
                        }).catch((resp) => {
                            console.log('请求失败');
                        });
                    } else {
                        alert('该用户名已被申请');
                    }
                }).catch((resp) => {
                    console.log('请求失败');
                });
            }
        },
        changeCode() {
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then((resp) => {
                this.vcode = resp.data.data.data;
                this.rightCode = resp.data.data.text.toUpperCase();
            }).catch((resp) => {
                console.log('请求失败');
            });
        },
        getComments() {
            axios.get('/queryCommentByBlogId', {
                params: {
                    blogId: this.blogId
                }
            }).then((resp) => {
                let resultArr = resp.data.data;
                let tempArr = [];
                for (let i = 0; i < resultArr.length; i++) {
                    let temp = {
                        id: resultArr[i].id,
                        name: resultArr[i].user_name,
                        ctime: resultArr[i].ctime,
                        isReply: '',
                        comments: resultArr[i].comments
                    }
                    if (resultArr[i].parent != -1) {
                        temp.isReply = "@" + resultArr[i].parent_name;
                    }
                    tempArr.push(temp);
                }
                this.commentMsg = tempArr;
            }).catch((resp) => {
                console.log('请求失败');
            });
        },
        getViews() {
            axios.get('/queryTotal', {
                params: {
                    blogId: this.blogId
                }
            }).then((resp) => {
                this.total = resp.data.data[0].count;
            }).catch((resp) => {
                console.log('请求失败');
            });
        },
        cancelReply() {
            this.flag = true;
        },
        reply(name) {
            this.flag = false;
            this.parentName = name;
        }
    }
});