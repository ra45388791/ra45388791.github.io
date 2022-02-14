data = {
    welcomeMyGit: {
        Title: '',
        arrTitle: '歡迎來到_張榮展_的GitHub'.split(''),
        count: 0
    },
    gitImage: "",
    htmlContentAni: "",
    axiosResData: "",
    axiosResDataStyle: ""



};

let app1 = new Vue({
    el: '#VueAppLication',
    data: data,
    mounted: function () {

        //等到畫面全部渲染完成時才執行
        this.$nextTick(function () {
            let vm = this;
            setTimeout(function () {
                vm.gitImage = 'animation: gitCatOpacity 2s ease-in-out forwards;'
                setTimeout(function () {
                    vm.myGitH1();
                }, 2200);
            }, 500)
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
            } else if (count === arrTitle.length) {

                this.htmlContentAni = "animation: buttonBoxOpacity 1.5s cubic-bezier(0.42, 0, 0.34, 0.96) forwards; ";

            }
        },
        submitLogin: function (e) {
            const url = `https://hidden-escarpment-17052.herokuapp.com/?gitUser=orange`
            // url = `http://localhost:5000/?gitUser=orange`;

            this.axiosResData = '<div>請稍後...</div>'
            this.axiosResDataStyle = ''

            let formData = new FormData();
            formData.append('username', e.target.username.value);
            formData.append('password', e.target.password.value);


            axios({
                method: 'POST',
                url: url,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            }).
                then((e) => {
                    if (e.request.responseURL !== url) {
                        location.href = e.request.responseURL;
                    } else {

                        this.axiosResData = e.data;
                        this.axiosResDataStyle = "color:red"
                    }
                    console.log(e);
                    console.log('回傳網址' + e.request.responseURL);
                }).
                catch((err) => {
                    throw new Error(err);
                })


        },
        changeAbouMyPage: function () {
            location.href = 'myResume/index.html';
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

