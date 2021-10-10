

const leftButton = document.getElementById('leftButton');       //左按紐
const rightButton = document.getElementById('rightButton');     //右按紐
let scrollLeftDiv = document.querySelector('#asdfgqwert>div');  //滾動條區
let scrollLeftWidth = document.documentElement.clientWidth;     //滾動條區寬度
let navDiv = document.querySelector('#asdfgqwert>div>nav');     //內容區

let box1 = 200;         //物件數量
let divPosition = 0;    //指定物件位置

for (let i = 0; i <= box1; i++) {
    //創造div
    let photoBox = document.createElement('div');
    //取代內容文字
    photoBox.innerHTML = `測試${i}`;
    //指定位置
    photoBox.style.left = `${divPosition}px`;
    //將位置參數+250
    divPosition += 250;

    //如果是單數用淡藍色 雙數用酒紅色
    if (i % 2 === 0) {
        photoBox.style.backgroundColor = 'aqua';
    } else {
        photoBox.style.backgroundColor = 'brown';
    }

    //插入指定navDiv元素下
    navDiv.append(photoBox);
}


console.log(scrollLeftWidth);

//左右按紐
leftButton.addEventListener('click', () => {
    //按下按鈕後先將按鈕關起來
    leftButton.disabled = true;

    //滾動條的位置 -= 視窗寬度
    scrollLeftDiv.scrollLeft -= scrollLeftWidth;

    setTimeout(() => {
        leftButton.disabled = false;
    }, 600);
})

rightButton.addEventListener('click', () => {

    rightButton.disabled = true;

    scrollLeftDiv.scrollLeft += scrollLeftWidth;

    setTimeout(() => {
        rightButton.disabled = false;
    }, 600);
})
