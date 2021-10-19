vw = Math.max(document.documentElement.clientWidth);  //取得視口寬度

// 等待視窗全部載好才執行
window.onload = function () {
    // **hader橫版面動畫 開始**
    setTimeout(() => {
        let bannerMask = document.getElementById('bannerMask');
        bannerMask.style.animation = 'banner 2s ease forwards';

    }, 300)
    // **hader橫版面動畫 結束**


    // **服務項目淡入淡出動畫 開始**

    //!動畫物件OOP 開始
    function BannerAnimetion(sectionId, className, article1Class, article2Class, bannerMaskClass, opacityCss1, opacityCss2) {

        this.sectionId = sectionId;         //動畫所在的section id
        this.className = className;         //需要跑動畫的div class(如果是以委託觸發方式 此參數要設undefined 並在target宣告後加入參數)
        this.introduction = {               //介紹
            article1Class,                  //mask隱藏(前)介紹文字
            article2Class                   //mask隱藏(後)介紹文字
        };
        this.bannerMaskClass = bannerMaskClass; //動畫遮罩
        this.opacityCss1 = opacityCss1;         //透明化動畫1(變透明)
        this.opacityCss2 = opacityCss2;         //透明化動畫1(變不透明)
    }
    BannerAnimetion.prototype.fadein = function () {
        //取得遮罩相關的元素
        let article1 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article1Class}`);
        let article2 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article2Class}`);
        let bannerMask = document.querySelector(`#${this.sectionId} .${this.className} .${this.bannerMaskClass}`);
        //加入透明動畫class
        article1.classList.add(this.opacityCss1);
        bannerMask.classList.add(this.opacityCss1);
        article2.classList.add(this.opacityCss2);
    }
    BannerAnimetion.prototype.fadeout = function () {
        //取得目標class
        let article1 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article1Class}`);
        let article2 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article2Class}`);
        let bannerMask = document.querySelector(`#${this.sectionId} .${this.className} .${this.bannerMaskClass}`);
        //把指定class刪除
        article1.classList.remove(this.opacityCss1);
        bannerMask.classList.remove(this.opacityCss1);
        article2.classList.remove(this.opacityCss2);
    }
    //!動畫物件OOP 結束

    if (vw >= 1024) {
        const serviceItems = document.getElementById('serviceItems');

        //實例化banner物件
        let bannerAnimetion = new BannerAnimetion('serviceItems', undefined, 'article1', 'article2', 'bannerMask', 'opacityOpaque', 'opacityTransparent');

        //監視進入事件
        serviceItems.addEventListener('mouseover', e => {

            const getDivEvente = e.target;                                  //當下移入的元素
            const getDivFather = getDivEvente.parentNode;                   //動畫遮罩父元素
            const getDivFatherClass = getDivEvente.parentNode.classList;    //取得該元素的class名稱
            let getClassName;                                             //用來存取找到的class用來檢查(如果是指定參數 就把該參數加入物件中)

            for (let i = 0; i < getDivFatherClass.length; i++) {
                if (getDivFatherClass[i] === 'SoundEngineer') {
                    getClassName = getDivFatherClass[i];
                    //在物件中加入指定目標class名稱
                    bannerAnimetion.className = getClassName;
                    break;  //跳出迴圈

                } else if (getDivFatherClass[i] === 'Light') {
                    getClassName = getDivFatherClass[i];
                    //在物件中加入指定目標class名稱
                    bannerAnimetion.className = getClassName;
                    break;  //跳出迴圈
                }
            }

            if (getClassName === 'SoundEngineer') {
                bannerAnimetion.fadein();

                getDivFather.addEventListener('mouseout', function deletListen() {
                    bannerAnimetion.fadeout();
                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })
            } else if (getClassName === 'Light') {
                bannerAnimetion.fadein();

                getDivFather.addEventListener('mouseout', function deletListen() {
                    bannerAnimetion.fadeout();
                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })
            }
        })
    }
    // **服務項目淡入淡出動畫 結束**
}





//**歷年實績區 開始 */
//滾動條區
const scrollLeftDiv = document.getElementById('scrollLeftDiv');  //照片按紐區
//內容區
const navDiv = document.querySelector('#scrollLeftDiv>nav');
//幻燈片位置
let divPosition = 0;
let slideUl = document.querySelector('#slideButton>ul');

//相片內容存放區位置
const modalStorageArea = document.getElementById('modalStorageArea');
let slidePhotoCount;        //幻燈片中同時顯示照片的數量
let slideCount = 0;         //按鈕編號

// 幻燈片按鈕物件
//!歷年實績OOP 開始
function SlideObject(scrollDiv, id, idNumber, ulElement, slidePosition) {
    /**
     * 指定參數 (需要移動滾動條的父div元素, 按鈕id, id編號, 要放入按鈕的父ul元素, 幻燈片位移參數)
     */
    this.scrollDiv = scrollDiv;        //幻燈片區域最底層div
    this.id = id;                           //幻燈片按鈕id屬性
    this.idNumber = idNumber;               //id編號 (如果有多個按鈕)
    this.ulElement = ulElement;             //要放入按鈕的ul標籤 
    this.slidePosition = slidePosition;     // 位移位置 //如果要位移則要額外增加 例如:(原位置 += 位移參數;) 
}
SlideObject.prototype.createButton = function () {
    /**
     * 指定參數 (需要移動滾動條的父div元素, 按鈕id, id編號, 要放入按鈕的父ul元素)
     */

    //用按鈕物件的參數製作 ol 和 button元素
    let ol = document.createElement('ol');
    let olButton = document.createElement('button');

    //指定 id class type 等參數 
    ol.classList.add('p-0');

    olButton.type = 'button';
    olButton.setAttribute('id', `${this.id}${this.idNumber + 1}`);
    olButton.classList.add('d-block', 'p-0', 'm-0');
    //第一個按鈕需要變色
    if (this.idNumber === 0) {
        olButton.style.backgroundColor = 'red';
    }

    //放入html
    ol.append(olButton);
    this.ulElement.append(ol);

    // 監控按鈕按下事件
    olButton.addEventListener('click', () => {
        //取得所有按鈕id把所有按鈕顏色去除
        // const bElement = document.querySelectorAll();
        for (let i = 0; i < slideCount; i++) {
            const e = document.getElementById(`${this.id}${(i + 1)}`);
            e.style.backgroundColor = '';
        }
        //指定這個按鈕變色
        olButton.style.backgroundColor = 'red'

        //移動到指定位置
        this.scrollDiv.scrollLeft = this.slidePosition;

    })
}
//!歷年實績OOP 結束

//判斷幻燈片中的同時顯示照片數量

if (vw < 768) {
    slidePhotoCount = 1;
} else {
    slidePhotoCount = 3;
}


//取得相片名子 json
function getPhotoNameString() {
    let url = '../JSON/photoData.json';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';


    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                window.onload = function () {
                    let jsonData = xhr.response;
                    makePhotoDiv(jsonData);
                }
            }
        }
    }
    xhr.send()
}
getPhotoNameString();


//製作相片按鈕
function makePhotoDiv(event) {
    event.forEach(function (item, index) {
        //製作存放box元素
        let divBox = document.createElement('div');
        //按紐
        let buttonBox = document.createElement('button');
        //圖片 內文
        let imgBox = document.createElement('img');
        let pDivBox = document.createElement('div');
        let pType = document.createElement('p');
        let pBox = document.createElement('p');

        //外框divBox
        divBox.classList.add('navClass', 'carousel-item', 'p-0', 'text-center');

        // 設定最後一個圖片的右邊寬度
        if (index + 1 === event.length) {
            let positionSet = document.createElement('div');
            positionSet.style.position = 'absolute';
            positionSet.style.right = '-23px';      //參數與圖片之間的寬度配合
            positionSet.style.padding = '0.1px'
            divBox.append(positionSet);
        }

        //照片按紐
        buttonBox.type = 'button';
        buttonBox.classList.add('d-flex', 'flex-column', 'justify-content-start', 'align-items-center', 'btn', 'shadow-none', 'p-0');
        buttonBox.setAttribute('data-bs-toggle', 'modal');
        buttonBox.setAttribute('data-bs-target', `#${item.englishName}`);
        //圖片
        imgBox.src = `images/logo/${item.chineseName}.${item.photoExtension}`;
        imgBox.alt = `${item.chineseName}圖片按紐`;

        //活動類型
        pType.innerHTML = item.activityType;

        //照片敘述
        // pDivBox.classList.add('mb-3');
        pBox.innerHTML = item.chineseName;
        pBox.classList.add('fs-6');

        //依序插入 divBox>按紐>內文>圖片
        divBox.append(buttonBox);

        buttonBox.append(imgBox);
        buttonBox.append(pDivBox);

        pDivBox.append(pType);
        pDivBox.append(pBox);

        // navDiv元素 > divBox
        navDiv.append(divBox);



        // slideButton位移按鈕製作
        const scrollContantBox = document.querySelector('#scrollLeftDiv .navClass');
        //取得本體寬度
        const navClassBodyWidth = scrollContantBox.clientWidth;
        //取得 左右margin寬度 並將字串轉換成數字
        const navClassMarginLeft = getComputedStyle(scrollContantBox).marginLeft;
        const navClassMarginRight = getComputedStyle(scrollContantBox).marginRight;
        const navClassMarginX = Number(navClassMarginLeft.replace('px', '')) + Number(navClassMarginRight.replace('px', ''));

        //照片按鈕本體x軸大小+上 margin大小
        const navClassWidth = navClassBodyWidth + navClassMarginX;

        if (index % slidePhotoCount === 0) {
            //製作按鈕物件
            // let slideObject = new SlideObject(divPosition);
            // slideObject.createButton(scrollLeftDiv, 'slideMoveButton', slideCount, slideUl);

            let slideObject = new SlideObject(scrollLeftDiv, 'slideMoveButton', slideCount, slideUl, divPosition);

            slideObject.createButton();

            //按鈕id編號++
            slideCount++;
            //給每個按鈕指定位置
            divPosition += navClassWidth * slidePhotoCount;


        }
    });



    makeModalStorageAreaDiv(event);
}



//歷年實績互動視窗內容
function makeModalStorageAreaDiv(event) {

    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中
    let getStringData;      //取得dataArray中轉換成字串的資料

    //製作用於抓取的ID名稱


    //互動視窗相片是特規
    let ModalphotoSize;         //決定圖片大小
    if (vw <= 767) {            //檢查裝置大小 決定圖片大小
        ModalphotoSize = 150;
    } else if (vw <= 1023) {
        ModalphotoSize = 200;
    } else {
        ModalphotoSize = 350;
    }

    event.forEach(function (item) {
        let idName = item.englishName + 'Id';   //統一化id命名否則有機率出bug


        dataBox = `
            <div class="modal fade" id="${item.englishName}" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div class="testCss achievementContent modal-content border border-1">

                        <div class="modal-header ">
                            <h5 class="modal-title text-light" id="staticBackdropLabel">${item.chineseName}</h5>
                            <button type="button" class="btn-close shadow-none bg-light border border-4"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body py-5">
                            <div class="container-fluid">
                                <div id="${idName}" class =" row gy-4 text-center">
                                    <!-- 相片內容放置區 用id抓div -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dataArray.push(dataBox);
    });

    getStringData = dataArray.join('');
    modalStorageArea.innerHTML = getStringData; //先將殼推入html

    dataBox = '';                               //上方動作都做完了才清空儲存區防止bug
    dataArray = [];
    getStringData = '';



    //製作互動視窗內容相片
    event.forEach(function (item) {
        /**
         *  巢狀迴圈 
         *      第一層抓JSON的資料數 決定要執行幾次
         *          第二層抓指定的相片數量來製作對應數量的div DOM
         * 
         *  抓取英文名子後方 + 上'Id'來對應上方相片按鈕的id名稱
         *  只有上方做出來之後才能抓到id名稱所以doc寫在這
         */
        const idName = item.englishName + 'Id';
        const getId = document.getElementById(idName);        //取得ID

        for (let a = 0; a < item.numberOfPhotos; a++) {     //根據當下item的相片數量製造幾次裝相片的div
            dataBox = `
                <div class="col-6">
                    <img src="images/photo/${item.chineseName}/${item.chineseName}${a}.${item.photoExtension}" style="width: ${ModalphotoSize}px;" alt="">
                </div>
            `
            dataArray.push(dataBox);                //推至dataArray
        }

        getStringData = dataArray.join('');         //取得做好的dataBox
        getId.innerHTML = getStringData;            //把dataBox推入getId

        dataBox = '';                               //清空儲存區防止bug
        dataArray = [];
        getStringData = '';
    });

}

//**歷年實績區 結束 */






