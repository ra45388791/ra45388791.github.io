let data = {
    vueDomShow: 1,
    isTrueOrFalse: '',                       //v-model 選項輸入測試
    message: '---請選擇---',                    //第一行訊息
    message2: 50,                   //倒轉插值
    color: '',                              //顏色
    divdom: '<div>這是一個測試圖片的div</div>', //圖片
    a: 1,                                   //watch測試
    seeIf: '',                            //v-if 測試
    vueInput: '',                           //v-model 表單輸入測試

    vueForItems1: [
        { forMessage: 'for1' },
        { forMessage: 'for2' },
        { forMessage: 'for3' }
    ],
    vueForItems2: {
        title: 'for 的 title測試1',
        author: 'for 的 author測試2',
        publishedAt: '2022-01-17'
    },

    vueColorData: '',                           //變色表單 
    vueBgColor: 'background-color: #ffffff;',   //變色區域

    //2號頁 node.js
    getSetData2: 'local',
    formItem: '',
    formAjaxGet: '按下按鈕至後端取資料',

    //3號頁 登入
    getSetData3: 'local',
    loginPage: '',
    loginButton: false,
    loginShow: true,

    //4號頁 取得sql資料
    sqldata: '',

    //5號頁 組件
    counters: [{
        title: 'Counter',
        plusBtnName: '+',
        minusBtnName: '-'
    }, {
        title: 'Counter',
        plusBtnName: 'Plus',
        minusBtnName: 'Minus'
    }, {
        title: '計數器',
        plusBtnName: '加',
        minusBtnName: '減'
    }],
    forPhotos: [
        { imgName: '/img/1587963.jpg' },
        { imgName: '/img/17d50c0.jpg' }
    ],
    basecheck: false



}
// 阻止修改現有屬性 指定某個屬性不能被修改
// Object.freeze(data);

const componentC = {    //區域註冊組件
    template: `
        <div>564</div>
    `
}

//$emit 觸發 click-plus 屬性中 填入的父組件方法
Vue.component('button-first', {
    data: function () {
        return {
            count: 0
        }
    },
    template: `
        <button @click="clickPlus"> Click Me {{count}} </button>
    `,
    methods: {
        clickPlus: function () {
            this.count += 1;
            this.$emit('click-plus', this.count);
        }
    }
})
//子組件使用 v-model 
Vue.component('custom-input', {
    template: `
    <div>
        <h3>{{title}}</h3>
        <input :value="value"                                   
                @input="$emit('input', $event.target.value)">   
        
    </div>
    `,
    props: ['title', 'value'],                                  //設定從外面傳入的 value 值
});

//父組件傳入資料
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <div>
        <h3>{{title}}</h3>
        <button @click="count+=1">{{plusBtnName}}</button>
        <button @click="count-=1">{{minusBtnName}}</button>
        Count: {{count}}
    </div>
    `,
    props: ['title', 'plusBtnName', 'minusBtnName']
});

//透過父組件傳入圖片地址 並指定傳入資料型態為string
Vue.component('photo-counter', {
    data: function () {
        return {
        }
    },
    template: `
    <div class="test">
        <img :src="srcshow" alt="">
    </div>
    `,
    props: {
        'srcshow': String
    }
});

//客製組件
// 客製 checkBox 事件
Vue.component('base-checkbox', {
    model: {
        prop: 'checked', // 預設為 value
        event: 'change' // 預設為 input
    },
    props: ['checked', 'label'], // 跟 value 一樣， v-model 的 prop : cheked 要設定在 props 中
    template: `
        <label>
        <input
            type="checkbox"
            :checked="checked"
            @change="$emit('change', $event.target.checked)"
        >
        {{label}}
        </label>
    `
});

//不需要 v-model 雙向綁定 但節點被div包住時
Vue.component('base-input', {
    template: `
        <div>
            <input v-on="$listeners" @click="logssssAbc"></input>
            <slot>
            
            </slot>
        </div>
            `,
    methods: {
        logssssAbc: function () {
            console.log(this.$listeners);
        }
    }
});

//合併父子組件的事件
Vue.component('base-input-with-label', {
    template: `
    <label >
        {{label}}
            <input 
                v-on="inputListeners"
                :value="value"
                @click="logs"
            >
    </label>
    `,
    computed: {
        inputListeners: function () {
            let vm = this;
            return Object.assign({},                        //用 Object.assign 合併物件
                this.$listeners, {                          //$listeners 當作預設值
                input: function (event) {                   //覆蓋 $listeners 中的input事件
                    vm.$emit('input', event.target.value);  //等於往空物件中加入 input 方法

                },

            })
        }
    },
    methods: {
        logs: function () {
            console.log(this.$listeners);
        }
    },
    props: ['value', 'label']


});

//子組件雙向綁定屬性
Vue.component('base-button', {
    props: ['title'],
    template: `
        <button @click="click">{{title}}</button>
    `,
    methods: {
        click() {
            const newTitle = this.title.split("").reverse().join("");
            this.$emit('update:title', newTitle);
        }
    }
});

//插槽 and 父組件直接操作子組件屬性
Vue.component('base-layout', {
    data: function () {
        return {
            calculateCount: 2
        }
    },
    template: `
        <div class="container">
            {{title}}

            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot name="main"></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
            <div>
                <slot v-bind:soltelement="calculateCount">22</slot>
            </div>
        </div>
    `,
    props: ['title']
})




let app = new Vue({
    el: '#app',
    data: data,
    test: {
        and: 1324324
    },
    created() {


        //實例創造時會執行的

        //在實例創造後新增資料進data中
        //修改第1筆陣列資料
        this.$set(this.vueForItems1, 0, { forMessage: 564646 });
        //新增在索引3號位置的資料
        this.$set(this.vueForItems1, 3, { forMessage: 564646 });
        this.vueForItems1.push({ forMessage: 564646 });
        //過濾陣列資料
        this.vueForItems1 = this.vueForItems1.filter((item) => { return typeof item.forMessage === 'number' });

    },
    components: {
        'component-c': componentC
    },
    methods: {
        //v-on 點擊事件監控
        appbtn: function () {
            this.divdom = `<div>${this.vueInput}</div>`;
            this.vueInput = '';
            this.reset();
            console.log(this.vueForItems2.b);
        },
        //顏色跟著表單一起便色
        vueColorF: function () {
            this.vueBgColor = `background-color: ${this.vueColorData};`;
        },
        reset: function () {
            //取得自訂義屬性值
            // console.log(this.$options.test);
        },
        testBtn: function (btx) {
            console.log(btx.target.outerText);
        },
        nodeJsGet: function (event) {
            // let form = event.target.parentNode;
            let url;
            if (this.getSetData2 === 'local') {
                url = axios.get(`http://localhost:5000/?${event}&pagenumber=2`);
            } else if (this.getSetData2 === 'heroku') {
                url = axios.get(`https://hidden-escarpment-17052.herokuapp.com/?${event}&pagenumber=2`);
            }


            this.formAjaxGet = '等待資料...';
            //!網址記得換
            url.then((res) => {
                console.log('取得資料原型');
                console.log(res);
                return res.data
            }).then((res) => {
                console.log(`提取data文字:${res}`);
                this.formAjaxGet = res;
            }).catch((err) => {
                console.log(err);
            });
        },
        formSubmit: function (e) {
            console.log(e.target);

            let url1;
            if (this.getSetData3 === 'local') {
                url1 = `http://localhost:5000/?pagenumber=3`;
            } else if (this.getSetData3 === 'heroku') {
                url1 = `https://hidden-escarpment-17052.herokuapp.com/?pagenumber=3`;
            }
            let formData = new FormData();
            formData.append('username', e.target.username.value);
            formData.append('password', e.target.password.value);

            this.loginShow = false;                 //登入畫面隱藏
            this.loginPage = '<div>等待後端回應...</div>';

            axios({
                method: 'POST',
                url: url1,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            })
                .then(function (res) {
                    let appThis = app;              //指向vue axios會把this指向變成windows

                    appThis.loginButton = true;        //顯示返回按鈕
                    appThis.loginPage = res.data;   //替換成回傳資料
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        getSqlData: function (e) {
            let vm = this;
            //sql資料
            let url1;
            if (location.href === 'http://localhost:5500/') {
                url1 = `http://localhost:5000/?pagenumber=4`;
            } else {
                url1 = `https://hidden-escarpment-17052.herokuapp.com/?pagenumber=4`;
            }
            this.sqldata = '<div>等待資料回應...</div>';

            axios({
                method: 'GET',
                url: url1,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
                .then(function (response) {
                    console.log(response);
                    // console.log(`資料類型:${typeof response}`);
                    return response.data[0];
                }).then(function (response) {
                    console.log(response);
                    let id = response.data_id;
                    let name = response.data_name;
                    vm.sqldata = `<div>員工id: ${id} </br> 員工姓名: ${name}</div>`
                })
                .catch(function (error) {
                    console.log(error);
                })


        },
        vueEmitTest: function (count) {
            console.log('子組件測試成功');
            this.message = count;
        },
        onFocus() {
            console.log('focus');
        }
    },
    computed: {
        //寫法1
        reversedMessage: {
            get() {
                //然後偵測到message2 被修改後回傳 message2 到指定的位置。
                console.log('觸發get');
                return this.message2;
            },
            set(value) {
                //button 傳入 0.5 參數後用來修改 message2 
                console.log('觸發set' + value);
                this.message2 = this.message2 * value;
            }
        }

        //寫法2
        // reversedMessage: function () {
        //     return this.message2.split('').reverse().join('')
        // }
    },
    watch: {
        isTrueOrFalse: function () {
            let d = this.isTrueOrFalse;
            if (d === 'true') {
                data.message = d;
                //改變字體顏色
                data.color = 'testRed';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/17d50c0.jpg" alt="">';

                this.seeIf = true;
            } else if (d === 'false') {
                data.message = d;
                //改變字體顏色
                data.color = 'testBlue';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/1587963.jpg" alt="">';

                this.seeIf = false;
            } else {
                data.message = '---請選擇---'
                data.color = '';
                data.divdom = '<div>這是一個測試圖片的div</div>';
                this.seeIf = '';
            }
        },

        //將 watch寫在vue中的方法
        a: function (newValue, oldValue) {
            console.log(`新值: ${newValue}  舊值: ${oldValue}`);
        }
    },



});

//觀察 app.data.message中的值 
//會回傳兩個值 被賦予的新值 和 被取代的舊值
// app.$watch('a', function (newValue, oldValue) {
//     console.log(`新值: ${newValue}  舊值: ${oldValue}`);
// });
app.$data.a = 995;







