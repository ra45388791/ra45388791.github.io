// ****************************************************************
//                             組件
// ****************************************************************

//*技術卡片區*
Vue.component('technology-card', {
    template: `
            <div class="card mx-auto my-3 pt-5 pb-3 shadow" style="width: 18rem;">

                <div :class="bsStyle" class="imgBox d-flex justify-content-center">
                    <img :src="imgPath" :style="imgWidth">
                </div>

                <div class="card-body">
                    <h5 class="card-title">{{h5Title}}</h5>

                    <slot>
                        <p  class="card-text">{{cardContent}}
                            <samp :style="sampStyle"></br>{{cardSamp}}</samp>
                        </p>
                    </slot>

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

//卡片內容列表樣式
Vue.component('technology-card-ol', {
    data: function () {
        return {
            olItemsDatas: this.olItems
        }
    },
    template: `
        <ol class="card-text">
            <li v-for="olItemsData in olItemsDatas">{{olItemsData}}</li>
        </ol>
    `,
    props: {
        olItems: {
            type: Array,
            required: true,
            default: ['請輸入資料']
        }
    }
})

//*自傳區*
Vue.component('autobiography-template', {
    data: function () {
        return {
            domId: this.domIdNumber,
            forward: "justify-content-center",
            reverse: "flex-column-reverse flex-lg-row justify-content-lg-center"
        }
    },
    template: `
        <div :class="div1Style" class=" textBox row mb-5 align-items-center">
            <slot name="slota"></slot>
            <slot name="slotb"></slot>
        </div>
    `,
    props: {
        domIdNumber: {
            type: Number,
            required: true
        }
    },
    computed: {
        div1Style: function () {
            if (this.domId === 1 || this.domId % 3 === 0) {
                return this.forward;
            } else {
                return this.reverse;
            }
        }
    }
})

Vue.component('autobiography-template-a', {
    template: `
        <div class="d-flex flex-column justify-content-around col-10 col-lg-6 col-xl-5 mb-3 text-center text-lg-start">
            <h3 class="mb-4 display-6 fw-bold">{{smallTitle}}</h3>
            <p class="autobiographicalText fs-4 px-3 ps-lg-0 pe-lg-5">
                {{content}}
            </p>
        </div>
    `,
    props: {
        smallTitle: {
            type: String,
            required: true,
            default: '請輸入標題'
        },
        content: {
            type: String,
            required: true,
            default: '請輸入內容'
        }

    }
})

Vue.component('autobiography-template-b', {
    template: `
        <div class="col-10 col-lg-5 text-center">
            <img :src="imagePath" :style="imageStyle" alt="">
            <p class="photoDescription text-center pt-1">{{imageText}}</p>
        </div>
    `,
    props: {
        imagePath: {
            type: String,
            required: true,
            default: '請輸入標題'
        },
        imageStyle: {
            type: String,
            required: true,
            default: '請輸入內容'
        },
        imageText: {
            type: String,
            required: true,
            default: '請輸入內容'
        }

    }
})


// ****************************************************************
//                             資料
// ****************************************************************
const headerVueData = {
    h1text: 'width:0%;',
    h2text1: 'width:0%;',
    h2text2: 'width:0%;',
}

const technologyData = {
    frontEndCardItems: [
        {
            bsStyle: '',
            imagePath: 'images/HTML.png',
            imgWidth: '',
            h5Title: 'Html5',
            cardContent: '熟悉大部分DOM的使用方式、Form表單、簡易的SEO等。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/css.png',
            imgWidth: '',
            h5Title: 'CSS',
            cardContent: '能將網頁以指定的方式切版。</br>熟悉Flex排版、元素定位、簡易Animation、選擇器使用方式。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/javascript.png',
            imgWidth: '',
            h5Title: 'JavaScript',
            cardContent: '能使用原生javascript對頁面元素直接操作，處理由html表單提交的資料等。重視程式的易讀性。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/bootsrtape.png',
            imgWidth: '',
            h5Title: 'BootStrap',
            cardContent: '針對不同元件客製化修改成適合該網頁的內容。',
            cardSamp: '本網頁使用BootStrap製作。',
            sampStyle: 'color:#7511F6;'
        },
        {
            bsStyle: '',
            imagePath: 'images/vue.svg',
            imgWidth: '',
            h5Title: 'Vue.js',
            cardContent: '目前正在學習中，知道基本使用方法，組件使用方式，能夠製作小型專案。',
            cardSamp: '本網頁使用Vue製作',
            sampStyle: 'color:#41B883;'
        },
        {
            bsStyle: '',
            imagePath: 'images/RWD.png',
            imgWidth: '',
            h5Title: 'RWD設計',
            cardContent: '使用css對不同裝置的尺寸進行動態修改，達成符合不同裝置都能使用的效果。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/rest_api.png',
            imgWidth: '',
            h5Title: 'RESTful / Api',
            cardContent: '使用GET、POST、PUT、DELETE等方法對API接口發送請求。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/AJAX.png',
            imgWidth: 'width: 250px;',
            h5Title: 'AJAX',
            cardContent: '使用RESTful對API接口取得想要的資料後單獨渲染該資料，而不對整個網頁進行重整。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/git.png',
            imgWidth: '',
            h5Title: 'git',
            cardContent: '目前會基本操作init、add、commit、push等。',
            cardSamp: '',
            sampStyle: ''
        }

    ],
    backEndCardItems: [
        {
            bsStyle: '',
            imagePath: 'images/nodejs.webp',
            imgWidth: '',
            h5Title: 'Node.js',
            cardContent: '可以製作簡單的接口與前端溝通。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: 'p-2',
            imagePath: 'images/MySQL.png',
            imgWidth: '',
            h5Title: 'MySQL',
            cardContent: '知道基本語法、如何搜尋、條件搜尋、插入資料等。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: '',
            imagePath: 'images/heroku.jpg',
            imgWidth: '',
            h5Title: 'heroku',
            cardContent: '用來運算的雲端平台，建置將前兩項Node.js與MySQL的平台。',
            cardSamp: '',
            sampStyle: ''
        },
        {
            bsStyle: 'p-4',
            imagePath: 'images/npm.png',
            imgWidth: '',
            h5Title: 'npm',
            cardContent: '用來建置node.js第三方api的工具。',
            cardSamp: '',
            sampStyle: '',
        },

    ],
    otherCardItems: [
        {
            bsStyle: '',
            imagePath: 'images/office365.png',
            imgWidth: '',
            h5Title: '微軟 office365',
            cardContent: '',
            cardSamp: '',
            sampStyle: '',
            olItemArray: ['Word', 'PowerPoint', 'Excel']
        },
        {
            bsStyle: '',
            imagePath: 'images/adobe.jpg',
            imgWidth: '',
            h5Title: 'adobe',
            cardContent: '',
            cardSamp: '',
            sampStyle: '',
            olItemArray: ['Photoshop', 'Dreamweaver']
        },
        {
            bsStyle: '',
            imagePath: 'images/computer.gif',
            imgWidth: '',
            h5Title: '其他',
            cardContent: '',
            cardSamp: '',
            sampStyle: '',
            olItemArray: ['虛擬機:VirtualBox', '遊戲引擎:Unity', '3D建模:blender', '繪圖:Krita', 'SVG:inkscape']
        }
    ]
}

const autobiographyData = {
    data: [
        {
            id: 1,
            title: '關於我',
            content: '我來自一個平凡家庭，但我有不平凡的成長經歷，我畢業於台北城市科技大學，我是一名樂觀上進有耐心的人，對於任何事情總是保持著認真的態度面對。',
            image: '/images/全身照.jpg',
            imageStyle: 'width: 300px;',
            imageText: '畢業全身照'
        },
        {
            id: 2,
            title: '成長經歷',
            content: '在成長的過程中我父親常帶我出門和他工作，而因為這份工作的性質特殊能讓我在求學階段就見識到這個世界的不同樣貌，我印象最深的是我曾看過一間公司的座右銘『今天的小錯，是明天的災難⠀』。我認為這句話十分受用，也讓我在之後不管生活還是工作上都時常保持著注意細節。',
            image: 'images/憲兵指揮部.jpg',
            imageStyle: '',
            imageText: '憲兵指揮部89周年慶'
        },
        {
            id: 3,
            title: '大學時期',
            content: '在大學四年的日子裡我過得相當充實且快樂，也認識了幾位知心好友，影響我最深的是畢業專題製作的那段日子，我分配到的工作是負責撰寫程式，可以說是整個小組專題的核心所在，所以我當時不分日夜的撰寫程式，最終成功拿到這門學分，也因此打下了我的程式基礎。',
            image: 'images/畢業專題.jpg',
            imageStyle: '',
            imageText: '畢業專題截圖'
        },
        {
            id: 4,
            title: '高中時期',
            content: '高中時曾代表校隊參加全國電子競技比賽，可惜雖然我們從入圍賽打入BO5階段時就敗下陣來，但這段時間讓我學到很多東西，像是如何在高壓環境下執行團隊戰術，以及如何與隊友配合達成目標。',
            image: 'images/熊武士.png',
            imageStyle: 'width: 300px;',
            imageText: '熊武士Logo'
        },
        {
            id: 5,
            title: '未來展望',
            content: '從大學畢業後我因為家業需求而開始接觸前端技術，在學習的過程我發現我對於這門技術的熱情高得超乎我的想像，每一次完成一個功能，每一次學到新的技術都讓我有很高的成就感，所以我想繼續走這條路，因為我對於這門技術的熱情能讓我長久的走下去。',
            image: 'images/第一個專案.jpg',
            imageStyle: '',
            imageText: '第一個專案'
        },
    ]
}


// ****************************************************************
//                             程式
// ****************************************************************

//*頂部區*
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

//*技術卡片區*
let technology = new Vue({
    el: '#technology',
    data: technologyData,
    methods: {}
})

let autobiography = new Vue({
    el: '#autobiography',
    data: autobiographyData,

})



//*小元件區*
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