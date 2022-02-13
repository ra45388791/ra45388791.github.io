// ****************************************************************
//                             組件
// ****************************************************************
Vue.component('technology-card', {
    data: function () {
        return {
            cardSampData: ''
        }
    },
    template: `
        <div class=" col-12 col-md-6 col-lg-4">
            <div class="card mx-auto my-3 pt-5 pb-3 shadow" style="width: 18rem;">

                <div :class="bsStyle" class="imgBox d-flex justify-content-center">
                    <img :src="imgPath" :style="imgWidth">
                </div>

                <div class="card-body" :class="cardBsStyle">
                    <h5 class="card-title">{{h5Title}}</h5>
                    <p  class="card-text">{{cardContent}}
                        <samp :style="sampStyle"></br>{{cardSamp}}</samp>
                    </p>
                </div>
            </div>
        </div>
    `,
    props: {
        bsStyle: String,    //bootstrap 樣式

        imgPath: {          //圖片路徑
            type: String,
            required: true
        },
        imgWidth: String,   //圖片寬度

        cardBsStyle: String,//卡片bs樣式
        h5Title: {          //小標題
            type: String,
            required: true,
            default: '請輸入標題'
        },
        cardContent: {      //卡片內容
            type: String,
            required: true,
            default: '請輸入內容'
        },
        cardSamp: String,   //卡片特殊敘述
        sampStyle: String   //敘述文字顏色
    }

})


// ****************************************************************
//                             資料
// ****************************************************************
let headerVueData = {
    h1text: 'width:0%;',
    h2text1: 'width:0%;',
    h2text2: 'width:0%;',
}

let technologyData = {
    cardItem: [
        {
            bsStyle: '',
            imagePath: 'images/HTML.png',
            imgWidth: '',
            cardBsStyle: '',
            h5Title: 'Html5',
            cardContent: '熟悉大部分DOM的使用方式、Form表單、簡易的SEO等。',
            cardSamp: 'test',
            sampStyle:'color:red;'
        }
    ]
}




// ****************************************************************
//                             程式
// ****************************************************************
let headerVue = new Vue({
    el: '#headerVue',
    data: headerVueData,
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

let technology = new Vue({
    el: '#technology',
    data: technologyData,
    methods: {}
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