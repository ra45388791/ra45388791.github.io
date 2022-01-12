let data = {
    isTrueOrFalse: '',                       //v-model 選項輸入測試
    message: 'is true!',                    //第一行訊息
    message2: '倒轉插值',                   //倒轉插值
    color: '',                              //顏色
    divdom: '<div>這是一個測試的div</div>', //圖片
    a: 1,                                   //watch測試
    seeIf: true,                            //v-if 測試
    vueInput: ''                            //v-model 表單輸入測試
}
// 阻止修改現有屬性 指定某個屬性不能被修改
// Object.freeze(data);

let app = new Vue({
    el: '#app',
    data: data,
    methods: {
        //v-on 選項切換監控
        vueSelect: function () {
            let d = app.$data.isTrueOrFalse;

            if (d === 'true') {
                data.message = d;
                //改變字體顏色
                data.color = 'testRed';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/17d50c0.jpg" alt="">';
            } else if (d === 'false') {
                data.message = d;
                //改變字體顏色
                data.color = 'testBlue';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/1587963.jpg" alt="">';
            }
        },
        //v-on 點擊事件監控
        appbtn: function () {
            app.$data.divdom = `<div>${app.$data.vueInput}</div>`

        }

    }
});

//觀察 app.data.message中的值 
//會回傳兩個值 被賦予的新值 和 被取代的舊值
app.$watch('divdom', function (newValue, oldValue) {
    console.log(`新值: ${newValue}  舊值: ${oldValue}`);
});

app.$data.a = 995;

// let item = document.querySelector('#isTrueOrFalse');
// item.addEventListener('change', () => {
//     // console.log(item.value);
//     if (item.value === 'true') {
//         data.message = item.value;
//         //改變字體顏色
//         data.color = 'testRed';
//         // 傳進v-html 中的圖片tag
//         data.divdom = '<img src="img/17d50c0.jpg" alt="">';
//     } else if (item.value === 'false') {
//         data.message = item.value;
//         //改變字體顏色
//         data.color = 'testBlue';
//         // 傳進v-html 中的圖片tag
//         data.divdom = '<img src="img/1587963.jpg" alt="">';
//     }
// })
