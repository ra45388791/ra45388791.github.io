let app = new Vue({
    el: "#app",
    data: {
        area: '--請選擇--',     //選項地區
        chooseTime: 0,          //選項日期
        mapState: {
            zh: '基隆市',
            en: 'keelungCity'

        },
        citys: {                    //城市名
            northerns: [
                {
                    id: 1,
                    zhName: "基隆市",
                    enName: "keelungCity"
                },
                {
                    id: 2,
                    zhName: "臺北市",
                    enName: "TaipeiCity"
                },
                {
                    id: 3,
                    zhName: "新北市",
                    enName: "NewTaipeiCity"
                },
                {
                    id: 4,
                    zhName: "桃園市",
                    enName: "TaoyuanCity"
                },
                {
                    id: 5,
                    zhName: "新竹市",
                    enName: "HsinchuCity"
                },
                {
                    id: 6,
                    zhName: "新竹縣",
                    enName: "HsinchuCounty"
                },
                {
                    id: 7,
                    zhName: "宜蘭縣",
                    enName: "YilanCounty"
                },
            ],
            centrals: [
                {
                    id: 8,
                    zhName: "苗栗縣",
                    enName: "MiaoliCounty"
                },
                {
                    id: 9,
                    zhName: "臺中市",
                    enName: "TaichungCity"
                },
                {
                    id: 10,
                    zhName: "彰化縣",
                    enName: "ChanghuaCounty"
                },
                {
                    id: 11,
                    zhName: "南投縣",
                    enName: "NantouCounty"
                },
                {
                    id: 12,
                    zhName: "雲林縣",
                    enName: "YunlinCounty"
                },
            ],
            souths: [
                {
                    id: 13,
                    zhName: "嘉義市",
                    enName: "ChiayiCity"
                },
                {
                    id: 14,
                    zhName: "嘉義縣",
                    enName: "ChiayiCounty"
                },
                {
                    id: 15,
                    zhName: "臺南市",
                    enName: "TainanCity"
                },
                {
                    id: 16,
                    zhName: "高雄市",
                    enName: "KaohsiungCity"
                },
                {
                    id: 17,
                    zhName: "屏東縣",
                    enName: "PingtungCounty"
                },
                {
                    id: 18,
                    zhName: "澎湖縣",
                    enName: "PenghuCounty"
                },
            ],
            easts: [
                {
                    id: 19,
                    zhName: "花蓮縣",
                    enName: "HualienCounty"
                },
                {
                    id: 20,
                    zhName: "臺東縣",
                    enName: "TaitungCounty"
                },
            ],
            islands: [
                {
                    id: 21,
                    zhName: "金門縣",
                    enName: "KinmenCounty"
                },
                {
                    id: 22,
                    zhName: "連江縣",
                    enName: "LienchiangCounty"
                }
            ]
        },
        dataDescription: {
            title: '',              //標題 36小時內天氣預報
            times: [                //三段時間
                {
                    startTime: '',
                    endTime: ''
                },
                {
                    startTime: '',
                    endTime: ''
                },
                {
                    startTime: '',
                    endTime: ''
                },
            ],
            location: [             //各個城市的資料
            ]
        },
        hostData: {                 //目前使用的資料
            city: '',
            Wx: '',
            PoP: '',
            CI: '',
            MinT: '',
            MaxT: '',
            parameterValue: 0       //天氣代號

        },
        hostimg: '',
        showState: false,       //按下按鈕才秀出資料


    },
    beforeCreate: function () {
        this.$nextTick(function () {
            let vm = this;
            axios({
                method: "GET",
                url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-EC139BA3-6665-4AEE-9A2E-D3B8D1DF96DB&format=JSON"
            })
                .then(function (response) {
                    // console.log(response);
                    //原資料
                    const datas = response.data.records
                    //地點
                    const location = datas.location;
                    //標題
                    vm.dataDescription.title = datas.datasetDescription;
                    //把所有縣市推入陣列
                    location.forEach(function (event, index) {
                        vm.dataDescription.location.push(event);
                    })
                    return location;
                })
                .then(function (event) {
                    //設定三個時間段
                    event[0].weatherElement[0].time.forEach(function (e, index) {

                        vm.dataDescription.times[index].startTime = e.startTime;
                        vm.dataDescription.times[index].endTime = e.endTime;
                    })
                    // console.log(vm.dataDescription.location);
                    // console.log(vm.dataDescription.times);
                });

        })


    },
    methods: {
        setMap: function (e) {
            //選單更新時使用目前縣市的中英文名子更新資料



            this.hostMap(this.mapState.zh, this.mapState.en)

        },
        hostMap: function (zh, en) {
            // console.log($event);
            //設定中英文名狀態幫助時間選單更新資料
            this.mapState.zh = zh;
            this.mapState.en = en

            //用於解析用戶點選的縣市的資料，然後將其實現在畫面上。
            let vm = this;
            let host = this.hostData;

            //城市標題
            host.city = zh;

            // console.log(this.dataDescription.location);

            this.dataDescription.location.forEach(function (e) {
                if (e.locationName === zh) {
                    // console.log(e);
                    e.weatherElement.forEach(function (e) {
                        switch (e.elementName) {
                            case 'Wx':
                                console.log(e.time[vm.chooseTime]);
                                vm.hostData.Wx = e.time[vm.chooseTime].parameter.parameterName;
                                vm.hostData.parameterValue = parseInt(e.time[vm.chooseTime].parameter.parameterValue, 10);    //氣候代號
                                break;
                            case 'PoP':
                                vm.hostData.PoP = `${e.time[vm.chooseTime].parameter.parameterName}%`;
                                break;
                            case 'CI':
                                vm.hostData.CI = e.time[vm.chooseTime].parameter.parameterName;
                                break;
                            case 'MinT':
                                vm.hostData.MinT = `${e.time[vm.chooseTime].parameter.parameterName}°C`;
                                break;
                            case 'MaxT':
                                vm.hostData.MaxT = `${e.time[vm.chooseTime].parameter.parameterName}°C`;
                                break;
                        }
                    })
                }
            })


            // console.log(vm.hostData);
            this.showMap(en);
        },
        showMap: function (en) {
            //渲染地圖
            //秀出資訊區

            //取的天氣代號
            const int = this.hostData.parameterValue;

            document.querySelectorAll('path').forEach(event => {
                event.style = '';
            });
            document.querySelector(`#${en}`).style = 'fill : var(--color-gold); transform: translate(-5px, -5px);';

            if (int === 1) {
                this.hostimg = 'images/smallimg/sun.png'
            } else if (int > 1 && int <= 7) {
                this.hostimg = 'images/smallimg/cloudy.png'
            } else if (int > 7 && int <= 14) {
                this.hostimg = 'images/smallimg/rain.png'
            } else {
                this.hostimg = 'images/smallimg/storm.png'
            }
            console.log(int);

            this.showState = true;
        }
    },
    computed: {

    }
});