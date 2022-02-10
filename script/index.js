data = {
    welcomeMyGit: {
        Title: '',
        arrTitle: '歡迎來到_張榮展_的GitHub'.split(''),
        count: 0
    }
};

let app1 = new Vue({
    el: '#VueAppLication',
    data: data,
    mounted: function () {
        //等到畫面全部渲染完成時才執行
        this.$nextTick(function () {
            this.myGitH1();
        })
    },
    methods: {

        myGitH1: function () {
            let vm = this;
            //縮短關鍵字不然太長
            let arrTitle = this.welcomeMyGit.arrTitle;
            let count = this.welcomeMyGit.count;

            //如果 計數小於字符長度
            if (count < arrTitle.length) {
                //觸發計算屬性
                this.h1Updata = arrTitle[count];
                //原始coutn屬性++
                this.welcomeMyGit.count++;

                setTimeout(function () {
                    //重新觸發
                    vm.myGitH1();
                }, parseInt(Math.random() * 200));
            }
        },
        changeAbouMyPage: function () {
            location.href = '我的履歷/index.html';
        },
        changeVuePage: function () {
            location.href = 'vue練習/index.html';
        },

    },
    computed: {
        h1Updata: {
            //title set
            get() {
                return this.welcomeMyGit.Title
            },
            set(value) {
                this.welcomeMyGit.Title += value;
            }
        }
    }

})

