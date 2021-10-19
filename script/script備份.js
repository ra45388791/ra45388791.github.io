let vw = Math.max(document.documentElement.clientWidth)  //取得視口寬度

// 等待視窗全部載好才執行
window.onload = function () {
    // **hader橫版面動畫 開始**
    setTimeout(() => {
        let bannerMask = document.getElementById('bannerMask');
        bannerMask.style.animation = 'banner 2s ease forwards';

    }, 300)
    // **hader橫版面動畫 結束**

    // **服務項目淡入淡出動畫 開始**
    if (vw >= 1024) {
        const serviceItems = document.getElementById('serviceItems');

        //監視進入事件
        serviceItems.addEventListener('mouseover', e => {

            const getDivEvente = e.target;                                  //當下移入的元素
            const getDivFather = getDivEvente.parentNode;                   //動畫遮罩父元素
            const getDivFatherClass = getDivEvente.parentNode.classList;    //取得該元素的class名稱
            let getClassName;                                               //用來存取找到的class用來檢查

            for (let i = 0; i < getDivFatherClass.length; i++) {
                if (getDivFatherClass[i] === 'SoundEngineer') {
                    getClassName = getDivFatherClass[i];
                    break;  //跳出迴圈

                } else if (getDivFatherClass[i] === 'Light') {
                    getClassName = getDivFatherClass[i];
                    break;  //跳出迴圈

                } else if (i === getDivFatherClass.length - 1) {
                    break;

                }
            }

            if (getClassName === undefined) {
                //檢查進來的資料是不是字串
                return;

            } else if (getClassName === 'SoundEngineer') {
                //取得遮罩相關的元素
                let article1 = document.querySelector('#serviceItems .SoundEngineer .article1');
                let bannerMask = document.querySelector('#serviceItems .SoundEngineer .bannerMask');
                let article2 = document.querySelector('#serviceItems .SoundEngineer .article2');

                //加入透明動畫class
                article1.classList.add('opacityOpaque');
                bannerMask.classList.add('opacityOpaque');
                article2.classList.add('opacityTransparent');

                //加入滑鼠移出監視器
                getDivFather.addEventListener('mouseout', function deletListen() {
                    article1.classList.remove('opacityOpaque');
                    bannerMask.classList.remove('opacityOpaque');
                    article2.classList.remove('opacityTransparent');

                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })

            } else if (getClassName === 'Light') {

                let article1 = document.querySelector('#serviceItems .Light .article1');
                let bannerMask = document.querySelector('#serviceItems .Light .bannerMask');
                let article2 = document.querySelector('#serviceItems .Light .article2');

                article1.classList.add('opacityOpaque');
                bannerMask.classList.add('opacityOpaque');
                article2.classList.add('opacityTransparent');

                getDivFather.addEventListener('mouseout', function deletListen() {
                    article1.classList.remove('opacityOpaque');
                    bannerMask.classList.remove('opacityOpaque');
                    article2.classList.remove('opacityTransparent');

                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })

            }
        })
    }
    // **服務項目淡入淡出動畫 結束**
}





//**歷年實績區 開始 */
//取得相片按鈕的div位置
const resultsPhotoButton = document.getElementsByClassName('resultsPhotoButton');
const modalStorageArea = document.getElementById('modalStorageArea');

//取得相片名子
function getPhotoNameString() {
    let url = '../JSON/photoData.json';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let protoDataArray = xhr.response;
                makePastExperiencePhotoDiv(protoDataArray);
                // console.log(protoDataArray);
            }
        }
    }
    xhr.send()
}
getPhotoNameString();



//製作相片按鈕
function makePastExperiencePhotoDiv(event) {
    /**
     * 製造字串動態更改 img 元素中的相片編號
     * 把每一次結果都加入dataArray中
     * 把dataArray的內容變成string
     * 再把變成字串的內容加入javaTestClass 的class標籤之下
    */

    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中

    //圖片大小
    let photoSize;              //決定圖片大小
    if (vw <= 767) {            //檢查裝置大小 決定圖片大小
        photoSize = 200;
    } else {
        photoSize = 400;
    };

    event.forEach(function (item, index) {
        if (index == 0) {
            // 檢查是否為第一個 如果是要加入active標籤
            dataBox = `
                <div class="carousel-item text-center active">
                    <button type="button" class="btn shadow-none " data-bs-toggle="modal"
                        data-bs-target="#${item.englishName}">
                        <img src="images/logo/${item.chineseName}.${item.photoExtension}" style="width: ${photoSize}px; height: ${photoSize}px;" alt="">
                        <p>${item.chineseName}</p>
                    </button>
                </div>
            `;
            dataArray.push(dataBox);        //把結果推入陣列中
        } else {
            dataBox = `
                <div class="carousel-item text-center">
                    <button type="button" class="btn shadow-none " data-bs-toggle="modal"
                        data-bs-target="#${item.englishName}">
                        <img src="images/logo/${item.chineseName}.${item.photoExtension}" style="width: ${photoSize}px; height: ${photoSize}px;" alt="">
                        <p>${item.chineseName}</p>
                    </button>
                </div>
            `;
            dataArray.push(dataBox);         //把結果推入陣列中
        }
    });



    let getStringData = dataArray.join('');                 //把陣列資料轉成字串給getStringData
    resultsPhotoButton[0].innerHTML = getStringData;    //把getStringData的內容取代javaTestClass中的內容


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
        let idName = item.englishName + 'Id';
        let getId = document.getElementById(idName);        //取得ID

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






