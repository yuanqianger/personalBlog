const randomTags = new Vue({
    el: '#random-tags',
    data: {
        tags: []
    },
    created () {
        this.getTags();  
    },
    methods: {
        getTags () {
            axios({
                method: 'get',
                url: '/queryRandomTags'
            }).then((resp) => {
                let result = resp.data.data;
                let tempArr = [];
                for(let i = 0; i < result.length; i++){
                    let temp = {
                        link: '?tagId=' + result[i].id,
                        tag: result[i].tag
                    }
                    tempArr.push(temp);
                }
                this.tags = tempArr;
            }).catch((resp) => {
                console.log('请求失败');
            });
        }  
    },
    computed: {
        randomColor () {
            return function () {
                const red = Math.random() * 255;
                const green = Math.random() * 255;
                const blue = Math.random() * 255;
                return `rgb(${red}, ${green}, ${blue})`;
            }
        },
        randomSize () {
            return function () {
                return (Math.random() * 20 + 10 + 'px');
            }
        }
    }
});

const newHot = new Vue({
    el: '#new-hot',
    data: {
        titleList: [
            {
                title: '这是一个链接哈哈哈哈1',
                link: '',
            }
        ]
    },
    created () {
        this.getNewHot();
    },
    methods: {
        getNewHot () {
            axios({
                method: 'get',
                url: '/queryNewHot'
            }).then((resp) => {
                let result = resp.data.data;
                let tempArr = [];
                for(let i = 0; i < result.length; i++){
                    let temp = {
                        title: result[i].title,
                        link: 'blog_detail.html?blogId=' + result[i].id
                    }
                    tempArr.push(temp);
                }
                this.titleList = tempArr;
            }).catch((resp) => {
                console.log('请求失败');
            });
        }
    }
});

const newComment = new Vue({
    el: '#new-comment',
    data: {
        commentList: []
    },
    created () {
        this.getNewComment();
    },
    methods: {
        getNewComment () {
            axios({
                method: 'get',
                url: '/queryNewComment'
            }).then((resp) => {
                let result = resp.data.data;
                let tempArr = [];
                for(let i = 0; i < result.length; i++){
                    let temp = {
                        author: result[i].user_name,
                        time: result[i].ctime,
                        comment: result[i].comments,
                        link: 'blog_detail.html?blogId=' + result[i].blog_id
                    }
                    tempArr.push(temp);
                }
                this.commentList = tempArr;
            }).catch((resp) => {
                console.log('请求失败');
            });
        }
    }
});

const oInp = new Vue({
    el: "header",
    data: {
        inpT: '',
        link: ''
    },
    methods: {
        handleClick () {
            if(this.inpT != ''){
                axios.get('/queryTagIdByTag', {
                    params: {
                        tag: this.inpT
                    }
                }).then((resp) => {
                    let result = resp.data.data;
                    if(result.length == 0){
                        alert('没有此标签');
                    }else{
                        location.href = "http://127.0.0.1:12306/?tagId=" + result[0].id;
                        this.inpT = '';
                    }
                }).catch((resp) => {
                    console.log('请求失败');
                });

            }
        }
    }
});