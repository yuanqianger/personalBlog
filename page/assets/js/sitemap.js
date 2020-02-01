const content = new Vue({
    el: '#content',
    data: {
        blogList: []
    },
    created () {
        this.getBlogList();
    },
    methods: {
        getBlogList () {
            axios({
                method: 'get',
                url: '/queryAllBlog'
            }).then((resp) => {
                let result = resp.data.data;
                let tempArr = [];
                for(let i = 0; i < result.length; i++){
                    let temp = {
                        id: 'blog_detail.html?blogId=' + result[i].id,
                        title: result[i].title
                    };
                    tempArr.push(temp);
                }
                this.blogList = tempArr;
            }).catch((resp) => {
                console.log('请求错误');
            });
        }
    }
});