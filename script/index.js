let data = {
    vueDomShow: 3,
    isTrueOrFalse: '',                       //v-model 選項輸入測試
    message: '---請選擇---',                    //第一行訊息
    message2: '倒轉插值',                   //倒轉插值
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
    formItem: '',
    formAjaxGet: '按下按鈕至後端取資料',

    //3號頁 登入
    loginPage: '',
    loginButton: false,
    loginShow: true,
}
// 阻止修改現有屬性 指定某個屬性不能被修改
// Object.freeze(data);


let app = new Vue({
    el: '#app',
    data: data,
    test: {
        and: 1324324
    },
    created() {
        //實例創造時會執行的

        //修改第1筆陣列資料
        this.$set(this.vueForItems1, 0, { forMessage: 564646 });
        //新增在索引3號位置的資料
        this.$set(this.vueForItems1, 3, { forMessage: 564646 });
        this.vueForItems1.push({ forMessage: 564646 });
        //過濾陣列資料
        this.vueForItems1 = this.vueForItems1.filter((item) => { return typeof item.forMessage === 'number' });

    },
    methods: {
        //v-on 選項切換監控
        vueSelect: function () {
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
            this.formAjaxGet = '等待資料...';

            const url = axios.get(`https://hidden-escarpment-17052.herokuapp.com/?${event}`);
            // const url = axios.get(`http://localhost:5000/?${event}`);
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

            const url1 = `https://hidden-escarpment-17052.herokuapp.com`;
            // const url1 = `http://localhost:5000/`;
            let formData = new FormData();
            formData.append('username', e.target.username.value);
            formData.append('password', e.target.password.value);
            // console.log(formData);

            axios({
                method: 'POST',
                url: url1,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            })
                .then(function (res) {
                    let appThis = app;              //指向vue axios會把this指向變成windows

                    appThis.loginPage = res.data;
                    appThis.loginShow = false;
                    appThis.loginButton = true;
                })
                .catch(function (err) {
                    console.log(err);

                });

        }
    },
    computed: {
        //寫法1
        reversedMessage() {
            return this.message2.split('').reverse().join('')
        }

        //寫法2
        // reversedMessage: function () {
        //     return this.message2.split('').reverse().join('')
        // }
    },
    watch: {
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


