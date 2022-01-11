let data = {
    message: 'is true!',
    a: 1,
    divdom: '<div>這是一個測試的div</div>'
}
// 阻止修改現有屬性 指定某個屬性不能被修改
// Object.freeze(data);

let app = new Vue({
    el: '#app',
    data: data
});

//觀察 app.data.message中的值 
//會回傳兩個值 被賦予的新值 和 被取代的舊值
app.$watch('divdom', function (newValue, oldValue) {
    console.log(`新值: ${newValue}  舊值: ${oldValue}`);
});

app.$data.a = 995;


let item = document.querySelector('#isTrueOrFalse');

item.addEventListener('change', () => {
    // console.log(item.value);
    if (item.value === 'true') {
        data.message = item.value;
        // 傳進v-html 中的圖片tag
        data.divdom = '<img src="img/17d50c0.jpg" alt="">';
    } else if (item.value === 'false') {
        data.message = item.value;
        // 傳進v-html 中的圖片tag
        data.divdom = '<img src="img/1587963.jpg" alt="">';
    }
})

