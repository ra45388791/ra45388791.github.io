data1 = {
    h1text: 'width:0%;',
    h2text1: 'width:0%;',
    h2text2: 'width:0%;',

    

}


let headerVue = new Vue({
    el: '#headerVue',
    data: data1,
    mounted: function () {
        window.addEventListener("scroll", this.watchScroll);
        // console.log(this);
        this.$nextTick(function () {
            let vm = this;
            this.titleOpacity = 'opacity: 1;'
            setTimeout(function () {
                vm.h2text1 = 'animation: titleWidth 2s ease-in-out forwards';
                setTimeout(function () {
                    vm.h2text2 = 'animation: titleWidth 2s ease-in-out forwards';
                    setTimeout(function () {
                        vm.h1text = 'animation: titleWidth 2s ease-out forwards';
                    }, 1300)
                }, 200);
            }, 500)
        })
    },
    methods: {

    }


})
let widgetVue = new Vue({
    el: '#widgetVue',
    data: {
        scrollCount: 0,
        buttonAni: {
            buttonState: false,
            buttonAnimation: ''
        }

    },
    created: function () {
        this.$nextTick(function () {
            //監聽滾動條
            window.addEventListener("scroll", this.watchScroll);
        })
    },
    methods: {
        watchScroll: function (e) {
            //scrollCount賦值
            this.scrollCount = document.documentElement.scrollTop;
        }

    },
    watch: {
        scrollCount: function (newval, old) {
            //如果滾動條超過400就插入按鈕進入動畫
            if (newval > 400 && this.buttonAni.buttonState === false) {
                this.buttonAni.buttonState = true;
                this.buttonAni.buttonAnimation = 'animation: pushButtonIn 0.2s ease forwards'

                // console.log(this.buttonAni.buttonState);
            }
            //相反則插入退出動畫
            if (newval < 400 && this.buttonAni.buttonState === true) {
                this.buttonAni.buttonState = false;
                this.buttonAni.buttonAnimation = 'animation: pushButtonOut 0.2s ease forwards'

                // console.log(this.buttonAni.buttonState);
            }

        }
    }

})