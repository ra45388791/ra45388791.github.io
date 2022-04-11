
const data = {

    // !主資料
    articleDataArray: [],
    calendarData: { // 行事曆相關屬性
        days: [], // 選中月的日期
        oldDaysBefore: [], // 上個月用來填充的日期
        oldDaysAfter: [], // 上個月用來填充的日期
        weekdays: [ // 星期幾
            {text: '一'}, {text: '二'}, {text: '三'}, {text: '四'}, {text: '五'}, {text: '六'}, {text: '日'},
        ],
        chooseDate: {
            year: 2022,
            month: 3,
        },
    },
    axiosUrl: 'https://tranquil-gorge-87619.herokuapp.com/',
    // axiosUrl: 'http://localhost:3000/',
    viewScroll: '',

    UI: {// UI相關屬性
        plusButton: { // 新增文章按鈕
            width: 0,
            height: 0,
        },
        appliedArea: 'allItem', // ui選中項目 預設allItem [article /radio / articlePlus]
        UIShow: true, // 介面顯示
        articleShow: false, // 完整文章淡入
        articleForm: false, // 新增、修改清單區域淡入淡出
        loading: true, // 讀取
        setArticleMask: false, // 遮罩
    },

    // 用於新增、修改、顯示全文章的區域。
    form: {
        editArticleH2: '添加代辦事項', // 修改或新增文章區的標題
        edit: false,
        id: '',
        title: '',
        content: '',
        setDate: '',
        date: '',
    },
};

// eslint-disable-next-line no-unused-vars
const app = Vue.createApp({
    data () {
        return data;
    },
    computed: {
        toDoData: function () {
            return this.articleDataArray.filter(function (e) {
                return e.state === false;
            });
        },
        getThingsDoneData: function () {
            return this.articleDataArray.filter(function (e) {
                return e.state === true;
            });
        },
        chooseDateRes: {
            //   行事曆年月份
            get () {
                const year = this.calendarData.chooseDate.year;
                const month = this.calendarData.chooseDate.month;

                // 大於12換到下一年
                if (month >= 13) {
                    this.calendarData.chooseDate.year += 1;
                    this.calendarData.chooseDate.month = 1;

                    const year = this.calendarData.chooseDate.year;
                    const month = this.calendarData.chooseDate.month;

                    this.calendarDays(year, month);

                    return `${String(year)}-01`;
                }
                // 小於1換到上一年
                if (month <= 0) {
                    this.calendarData.chooseDate.year -= 1;
                    this.calendarData.chooseDate.month = 12;

                    const year = this.calendarData.chooseDate.year;
                    const month = this.calendarData.chooseDate.month;

                    this.calendarDays(year, month);

                    return `${String(year)}-12`;
                }

                this.calendarDays(year, month);

                if (month >= 10) {
                    return `${String(year)}-${String(month)}`;
                }
                return `${String(year)}-0${String(month)}`;
            },
            set (e) {
                // 依照畫面上的input回傳的value更新資料中的 年月資料
                // 順便更新要顯示的天數。
                const value = e.target.value;
                console.log(value);

                const numberYear = parseInt(value.slice(0, 4));
                const numberMonth = parseInt(value.slice(5, 7));


                this.calendarDays(numberYear, numberMonth);

                // 轉成數字後賦值
                this.calendarData.chooseDate.year = numberYear;
                this.calendarData.chooseDate.month = numberMonth;
            },
        },

    },
    watch: {
        'viewScroll': function (newValue, oldValue) {
            if (newValue > oldValue && this.UI.plusButton.width === 0) {
                this.UI.plusButton.width = 70;
                this.UI.plusButton.height = 70;
            } else if (newValue < oldValue && this.UI.plusButton.width !== 0) {
                this.UI.plusButton.width = 0;
                this.UI.plusButton.height = 0;
            }
        },
    },
    created: function () {
        this.$nextTick(async function () {
            // 行事曆資料
            const date = new Date();
            const dateYear = date.getFullYear();
            const dateMonth = date.getMonth() + 1;
            // 設定行事曆顯示日期
            this.calendarDays(dateYear, dateMonth);

            this.calendarData.chooseDate.year = dateYear;
            this.calendarData.chooseDate.month = dateMonth;

            // 清單資料
            const ajaxData = await axios.get(this.axiosUrl);

            this.updateArticle(ajaxData.data);

            this.UI.loading = false;
        });
    },
    mounted () {
        const vm = this;
        this.$nextTick(function () {
            // console.log(document.cookie);
            const viewSize = window.innerWidth;

            if (viewSize < 1024) {
                vm.UI.plusButton.width = 70;
                vm.UI.plusButton.height = 70;
                window.addEventListener('scroll', function () {
                    vm.viewScroll = window.scrollY;
                });
            } else {
                vm.UI.plusButton.width = 200;
                vm.UI.plusButton.height = 60;
            }
        });
    },
    methods: {
        /*
    ********************************貼文設定按鈕********************************
    */
        // 設定貼文
        editArticle: function (id) {
            const vm = this;
            vm.UI.articleForm = true; // 顯示修改區
            vm.form.edit = true; // 修改模式 on
            vm.form.editArticleH2 = '修改清單'; // 變更標題
            for (const event of vm.articleDataArray) {
                if (event.id === id) {
                    vm.form.id = event.id; // 用來找是哪個id要被修改
                    vm.form.title = event.title; // 修改前的標題
                    vm.form.content = event.content; // 修改前的內容
                    vm.form.date = event.date; //
                    break; // 如果id符合就跳出
                }
            }
        },

        // 設定貼文事項是否完成
        setArticleState: function (id, state, stateImg) {
            if (typeof id !== 'string' && typeof state !== 'boolean' && typeof stateImg !== 'string') {
                return;
            }

            const vm = this;

            for (const event of vm.articleDataArray) {
                if (event.id === id) {
                    if (event.state === state && event.stateImg === stateImg) {
                        return;
                    }
                    event.state = state;
                    event.stateImg = stateImg;
                    break; // 如果id符合就跳出
                }
            }
            const box = {
                id: id,
                state: state,
                stateImg: stateImg,
            };

            this.axiosSubmit('POST', 'chengeState', box);
        },

        removeArticle: function (id) { // 刪除功能
            // 呼叫axios方法
            this.axiosSubmit('DELETE', 'DELETE', {id: id});
        },

        /*
        *******************************閱讀功能*******************************
        */
        //  開啟全文章閱讀區
        articleState: function (title, content, setDate, date) {
            const uiBl = this.UI.UIShow;
            const articleBl = this.UI.articleShow;

            if (uiBl === true &&
                articleBl === false) {
                // 是否顯示UI
                this.UI.UIShow = false;
                // 是否顯示文章
                this.UI.articleShow = true;
                this.form.editArticleH2 = '待辦事項';
            } else if (uiBl === false &&
                articleBl === true) {
                this.UI.UIShow = true;
                this.UI.articleShow = false;
                // 清空顯示區
                this.closeEditArticle();
                return;
            }
            this.form.title = title;
            this.form.content = content;
            this.form.setDate = setDate;
            this.form.date = date;
        },


        /*
        *******************************修改貼文*******************************
        */
        updataArticle: function () { // 將修改好的內容推入陣列
            // !取得傳入的參數 再去articleDataArray 用id找對應的資料修改
            const vm = this;
            const id = vm.form.id;
            const title = vm.form.title;
            const content = vm.form.content;
            const date = vm.form.date;


            for (const event of vm.articleDataArray) { //
                if (event.id === id) {
                    event.title = title; // 修改前的標題
                    event.content = content; // 修改前的內容
                    event.date = date;
                    break; // 如果id符合就跳出
                }
            }
            const box = {
                id: id,
                title: title,
                content: content,
                date: date,
            };

            // 呼叫axios方法
            this.axiosSubmit('POST', 'reviseArticle', box);

            vm.closeEditArticle(); // 清空顯示區
        },
        /*
        *******************************新增貼文*******************************
        */
        formSubmit: function () {
            if (this.form.edit === true) { // 檢查如果是修改狀態就調用修改方法
                this.updataArticle(); // 下方不執行
                return;
            }

            // 新增待辦事項方法
            const vm = this;
            const todayDate = new Date();

            const idData = this.uuid();
            const formTitle = this.form.title;
            const formContent = this.form.content;
            const formDate = this.form.date;

            // !在 created 鉤子修改取得的日期
            const formSetDate = {
                setY: parseInt(todayDate.getFullYear()),
                setM: parseInt(todayDate.getMonth() + 1),
                setD: parseInt(todayDate.getDate()),
            };

            if (formTitle === '' || formContent === '' || typeof formDate !== 'string') {
                // alert('標題、內文或日期不能為空。');
                return;
            }

            // !在 created 鉤子修改取得的日期
            const dateData = {
                y: parseInt(formDate.slice(0, 4)),
                m: parseInt(formDate.slice(5, 7)),
                d: parseInt(formDate.slice(8)),
            };

            // 檢查年份是否為過去
            if (dateData.y < todayDate.getFullYear()) {
                alert('日期不能是過去');
                return;
            }

            // 檢查輸入日期是否是過去
            if (dateData.m < todayDate.getMonth() + 1) {
                alert('日期不能是過去');
                return;
            } else if (dateData.m === todayDate.getMonth() + 1) {
                if (dateData.d < todayDate.getDate()) {
                    alert('日期不能是過去');
                    return;
                }
            }

            // 如果月份 日期是一位數會出bug
            formSetDate.setY = String(formSetDate.setY);
            formSetDate.setM = String(formSetDate.setM);
            formSetDate.setD = String(formSetDate.setD);
            if (formSetDate.setM.length === 1) {
                formSetDate.setM = `0${formSetDate.setM}`;
            }
            if (formSetDate.setD.length === 1) {
                formSetDate.setD = `0${formSetDate.setD}`;
            }

            // !也許儲存成 mysql 時要使用 /n 格式
            // 取得內文 然後把 \n 替換成</br>
            const contentData = formContent.replace(/\r?\n/g, '<br>');

            // 包裝成object
            const box = {
                id: idData,
                itemShow: true, // 刪除文章淡出
                state: false, // 預設false
                stateImg: './images/close.png', // 預設待辦
                title: formTitle, // 取得標題
                content: contentData, // 取得處裡過後的內容
                setDate: `${formSetDate.setY}-${formSetDate.setM}-${formSetDate.setD}`,
                date: formDate, // 上傳格式 yyyy-mm-dd
            };

            // 包裝form
            // 呼叫axios方法

            this.axiosSubmit('POST', 'addArticle', box);

            vm.closeEditArticle(); // 清空顯示區
        },

        //  關閉設定或添加文章區
        closeEditArticle: function () {
            const vm = this;
            // 將v-model的內容清空
            setTimeout(function () {
                vm.form.id = '';
                vm.form.title = '';
                vm.form.content = '';
                vm.form.date = '';
                vm.form.editArticleH2 = '添加代辦事項';
            }, 300);
            vm.UI.articleForm = false; // 修改文章區關閉
            vm.form.edit = false; // 修改文章狀態false
        },

        /*
        *******************************其他功能*******************************
        */
        updateArticle: function (datas) {
            if (!datas) return;
            const vm = this;

            vm.articleDataArray = [];

            vm.$nextTick(function () {
                datas.forEach(function (data) {
                    // vm.articleDataArray[vm.articleDataArray.length] = data;
                    vm.articleDataArray.push(data);
                });
            });
        },
        // axios取得資料
        axiosSubmit: async function (method, func, data) {
            // 顯示讀取畫面
            this.UI.loading = true;
            axios({
                method: method,
                url: this.axiosUrl,
                // headers: {},
                data: {
                    func: func,
                    data: data,
                },
            }).then((e) => {
                // 隱藏讀取
                this.UI.loading = false;

                // if (!e.data) return; // 如果data沒東西就跳出
                this.updateArticle(e.data);
            }).catch((err) => {
                throw err;
            });
        },
        // 產生uuid方法
        uuid: function () {
            let time = Date.now();

            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                time += performance.now();
            }

            // 回傳經過替換的 x 。 y要經過特殊處裡
            // x代表要被替換的每個字元
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, function (c) {
                    time = Math.floor(time / 16);
                    const random = (time + Math.random() * 16) % 16 | 0;

                    // 如果處裡的字串是x 回傳 random 。
                    // 如果是 y 回傳16位元數 0x3 or 0x8 相當於 3 or 8
                    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
                });
        },
        // 行事曆日期解析
        calendarDays: function (year, monthData) { // data月份參數吃原始資料 也就是 0~11
            // ! Data 月份吃原始參數 也就是 0 ~ 11 表示 1~12 月
            // ! 也就是說 要取得3月 傳入參數必須是 2
            const month = (monthData - 1);

            const arrayDays = []; // 選定月份天數
            const arrayOldDaysBefore = [];// 用來填充空格的上個月天數
            const arrayOldDaysAfter = [];

            // 取得本月最後一天
            const totalLastDate = new Date(year, month + 1, 0);
            const totalDate = totalLastDate.getDate();

            // 取得本月星期幾
            const firstDate = new Date(year, month, 1);
            let firstDayWeek = firstDate.getDay();

            // 前一個月的最後一天
            const lastDay = new Date(year, month, 0);
            let oldDaysBefore = lastDay.getDate();

            let oldDaysAfter = NaN;

            if (firstDayWeek === 0) {
                firstDayWeek = 7; // 如果是禮拜天 星期參數會是0
                oldDaysBefore -= 5;
            } else {
                oldDaysBefore -= (firstDayWeek - 2);
            }

            // 選中月份天數
            for (let i = 0; i < totalDate; i++) {
                arrayDays.push(i + 1);
            }
            // 填充空格的上個月天數
            for (let i = 0; i < firstDayWeek - 1; i++) {
                arrayOldDaysBefore.push(oldDaysBefore);
                oldDaysBefore++;
            }

            // 7 * 6 = 42 最多顯示42天  42 - ( 總天數 + 上個月顯示天數 ) = 要填充的天數
            oldDaysAfter = 42 - (arrayDays.length + arrayOldDaysBefore.length);
            for (let i = 0; i < oldDaysAfter; i++) {
                arrayOldDaysAfter.push(i + 1);
            }

            // 設定顯示日期
            this.calendarData.days = arrayDays;
            this.calendarData.oldDaysBefore = arrayOldDaysBefore;
            this.calendarData.oldDaysAfter = arrayOldDaysAfter;
        },
    },
});

// vue3要寫在下方
app.component('article-box', {
    // props: {
    //     articleData: {
    //         type: Object,
    //         required: true,
    //     },

    // },
    props: ['id', 'itemShow', 'state', 'stateImg', 'title', 'content', 'setDate', 'date'],
    emits: ['item-button-temp', 'item-class-temp', 'article-state-temp', 'set-article-state-temp', 'edit-article-temp', 'remove-article-temp'],
    data: function () {
        return {
            // articleDatas: this.articleData, // 取得主資料
            articleDatas: {// 取得主資料
                id: this.id,
                itemShow: this.itemShow,
                state: this.state,
                stateImg: this.stateImg,
                title: this.title,
                content: this.content,
                setDate: this.setDate,
                date: this.date,
            },
            articleSet: [
                {text: '待辦'},
                {text: '結案'},
                {text: '修改'},
                {text: '刪除'},
            ],
            menuSet: {
                show: false,
                opacity: false,
            },
        };
    },
    computed: {
        setDateParse: function () {
            const d = {
                setY: parseInt(this.articleDatas.setDate.slice(0, 4)),
                setM: parseInt(this.articleDatas.setDate.slice(5, 7)),
                setD: parseInt(this.articleDatas.setDate.slice(8)),
            };
            return d;
        },
        dateParse: function () {
            const d = {
                y: parseInt(this.articleDatas.date.slice(0, 4)),
                m: parseInt(this.articleDatas.date.slice(5, 7)),
                d: parseInt(this.articleDatas.date.slice(8)),
            };
            return d;
        },
    },
    watch: {
        'articleData.state' (newV, oldV) {
            this.articleDatas.state = newV;
        },
        'articleData.stateImg' (newV, oldV) {
            this.articleDatas.stateImg = newV;
        },

    },
    created () {
        // console.log(this.articleData);
        // console.log(this.$parent); // 取得父組件
    },
    methods: {
        changeArticleState: function (e) { // 開啟全文章
            const title = this.articleDatas.title;
            const content = this.articleDatas.content;
            const setDate = this.articleDatas.setDate;
            const date = this.articleDatas.date;

            this.$emit('article-state-temp', title, content, setDate, date);
        },
        setItem: function (e) { // 展開選單
            // !父組件的UI.itemButton
            this.menuSet.show = !this.menuSet.show;
            this.menuSet.opacity = !this.menuSet.opacity;
        },

        clickButton: function (e) { // 按下選單按鈕時
            const vm = this;
            const textx = e.srcElement.outerText; // 取得文字

            switch (textx) {
                case '待辦':
                    vm.$emit('set-article-state-temp', vm.articleDatas.id, false, './images/close.png');
                    break;
                case '結案':
                    vm.$emit('set-article-state-temp', vm.articleDatas.id, true, './images/check.png');
                    break;
                case '修改':
                    vm.$emit('edit-article-temp', vm.articleDatas.id);
                    break;
                case '刪除':
                    if (vm.articleDatas.state === false) {
                        const check = confirm('此清單尚未結案，確定要刪除嗎?');
                        if (check === false) return;
                    }

                    // this.articleDatas.itemShow = false;

                    vm.$emit('remove-article-temp', vm.articleDatas.id);
                    break;
            }

            this.setItem();
        },
    },
    template: `
    
        
        <transition>
            <div v-if="articleDatas.itemShow" @click.self="changeArticleState"
                class="article d-flex flex-column justify-content-between text-start col-12 mb-3 px-3 pb-3">
                <div>

                    <h3 @click.self="changeArticleState" class="mb-4 px-1">{{articleDatas.title}}</h3>
                    <p @click.self="changeArticleState" v-html="articleDatas.content" class="px-1"></p>
                </div>
                <div class="itemList">

                    <button @click.stop="setItem" class="setButton" type="button">
                    </button>

                    <ul :class="menuSet.show ? 'openItem':'closeItem' " @click.stop="clickButton"
                        class="d-flex flex-column justify-content-center py-2 px-3">

                        <li v-for="item of articleSet">
                            <button>{{item.text}}</button>
                        </li>
                    </ul>
                </div>
                <div @click="changeArticleState" class="d-flex justify-content-around">

                    <div id="add" class="listState d-flex justify-content-center align-items-center">
                        <span>{{setDateParse.setM}}/{{setDateParse.setD}}</span>
                    </div>

                    <div class="listState">
                        <img :src="articleDatas.stateImg" alt="">
                    </div>

                    <div id="end" class="listState d-flex justify-content-center align-items-center">
                        <span>{{dateParse.m}}/{{dateParse.d}}</span>
                    </div>

                </div>
                
                <div v-show="menuSet.show"
                    class="mask" 
                    @click="setItem" >
                </div>
                
            </div>
        </transition>

    `,
});

// 把vue掛到app上
app.mount('#app');


