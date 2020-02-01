const everyDay = new Vue({
    el: "#every-day",
    data: {
        year: null,
        month: null,
        day: null,
        curDate: null,
        content: '',
    },
    created () {
        this.getInitTime();
        // 向后端请求数据
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then((resp) => {
            this.content = resp.data.data[0].content;
        }).catch((resp) => {
            console.log('请求失败');
        });
    },
    methods: {
        getInitTime () {
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.day = new Date().getDate();
            this.curDate = `${this.year}-${this.month}-${this.day}`
        }
    }
});

const articleList = new Vue({
    el: '#article-list',
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        iconCount: 5,
        pageNumList: [],
        articleList: [],
        tagId: -1
    },
    created () {
        // 向后端发送请求
        let searcheUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (!searcheUrlParams) {
            this.tagId = -1;
        }else{
            for (let i = 0; i < searcheUrlParams.length; i++) {
                if (searcheUrlParams[i].split('=')[0] == 'tagId') {
                    try {
                        this.tagId = parseInt(searcheUrlParams[i].split('=')[1]);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
        this.getPage(this.page, this.pageSize);
    },
    methods: {
        generatePageTool () {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let iconCount = this.iconCount;
            let pageCount = parseInt((totalCount + pageSize - 1) / pageSize);
            let result = [];
            if(totalCount == 0){
                return;
            }
            if(nowPage <= 3){
                if(nowPage != 1){
                    result.push({text: '上一页', page: nowPage - 1});
                }
                for(let i = 1; i <= nowPage; i++){
                    result.push({text: i, page: i});
                }
                let term = (pageCount - nowPage) < (iconCount - nowPage) ? (pageCount - nowPage) : (iconCount - nowPage);
                for(let i = 1; i <= term; i++){
                    result.push({text: nowPage + i, page: nowPage + i});
                }
            }else{
                result.push({text: '上一页', page: nowPage - 1});
                result.push({text: nowPage - 2, page: nowPage - 2});
                result.push({text: nowPage - 1, page: nowPage - 1});
                result.push({text: nowPage, page: nowPage});
                if(nowPage + 1 <= pageCount){
                    result.push({text: nowPage + 1, page: nowPage + 1});
                }
                if(nowPage + 2 <= pageCount){
                    result.push({text: nowPage + 2, page: nowPage + 2});
                }
            }
            if(nowPage != pageCount){
                result.push({text: '下一页', page: nowPage + 1});
            }
            this.pageNumList = result;
        },
        getPage (page, pageSize) {
            if(this.tagId < 0){
                axios({
                    method: 'get',
                    url: `/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`
                }).then((resp) => {
                    let result = resp.data.data;
                    let list = [];
                    for(let i = 0; i < result.length; i++){
                        let temp = {
                            title: result[i].title,
                            content: result[i].content,
                            time: result[i].utime,
                            liu: result[i].views,
                            tags: result[i].tags,
                            id: result[i].id,
                            link: '/blog_detail.html?blogId=' + result[i].id
                        }
                        list.push(temp);
                    }
                    this.articleList = list;
                }).catch((resp) => {
                    console.log('请求错误');
                });
                axios({
                    method: 'get',
                    url: '/queryBlogByCount'
                }).then((resp) => {
                    this.count = resp.data.data[0].count;
                    this.generatePageTool();
                }).catch((resp) => {
                    console.log('请求错误');
                });
            }else{
                axios.get('/queryBlogByTag', {
                    params: {
                        tagId: this.tagId,
                        page: page - 1,
                        pageSize: pageSize
                    }
                }).then((resp) => {
                    let result = resp.data.data;
                    let list = [];
                    for(let i = 0; i < result.length; i++){
                        let temp = {
                            title: result[i].title,
                            content: result[i].content,
                            time: result[i].utime,
                            liu: result[i].views,
                            tags: result[i].tags,
                            id: result[i].id,
                            link: '/blog_detail.html?blogId=' + result[i].id
                        }
                        list.push(temp);
                    }
                    this.articleList = list;
                }).catch((resp) => {
                    console.log('请求错误');
                });
                axios.get('/queryBlogCountByTag', {
                    params: {
                        tagId: this.tagId
                    }
                }).then((resp) => {
                    this.count = resp.data.data[0].count;
                    this.generatePageTool();
                }).catch((resp) => {
                    console.log('请求错误');
                });
            }
        },
        jumpTo (page) {
            this.getPage(page, this.pageSize);
            this.page = page;
            this.generatePageTool();
        }
    }
});