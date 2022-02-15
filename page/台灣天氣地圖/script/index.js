let app = new Vue({
    el: "#app",
    data: {
        dataDescription: '',

        meteorologicalData: [

        ],
        citys: [
            {
                zhName: "基隆市",
                enName: "keelungCity"
            },
            {
                zhName: "臺北市",
                enName: "TaipeiCity"
            },
            {
                zhName: "新北市",
                enName: "NewTaipeiCity"
            },
            {
                zhName: "桃園市",
                enName: "TaoyuanCity"
            },
            {
                zhName: "新竹市",
                enName: "HsinchuCity"
            },
            {
                zhName: "新竹縣",
                enName: "HsinchuCounty"
            },
            {
                zhName: "苗栗縣",
                enName: "MiaoliCounty"
            },
            {
                zhName: "臺中市",
                enName: "TaichungCity"
            },
            {
                zhName: "彰化縣",
                enName: "ChanghuaCounty"
            },
            {
                zhName: "南投縣",
                enName: "NantouCounty"
            },
            {
                zhName: "雲林縣",
                enName: "YunlinCounty"
            },
            {
                zhName: "嘉義市",
                enName: "ChiayiCity"
            },
            {
                zhName: "嘉義縣",
                enName: "ChiayiCounty"
            },
            {
                zhName: "臺南市",
                enName: "TainanCity"
            },
            {
                zhName: "高雄市",
                enName: "KaohsiungCity"
            },
            {
                zhName: "屏東縣",
                enName: "PingtungCounty"
            },
            {
                zhName: "宜蘭縣",
                enName: "YilanCounty"
            },
            {
                zhName: "花蓮縣",
                enName: "HualienCounty"
            },
            {
                zhName: "臺東縣",
                enName: "TaitungCounty"
            },
            {
                zhName: "澎湖縣",
                enName: "PenghuCounty"
            },
            {
                zhName: "金門縣",
                enName: "KinmenCounty"
            },
            {
                zhName: "連江縣",
                enName: "LienchiangCounty"
            }
        ],
        showState: false,   //按下按鈕才秀出資料
        showData: {
            cityName: '',            //城市名稱
            Wx: [
                {
                    startTime: '',          //開始時間
                    endTime: '',            //結束時間
                    parameter: {
                        parameterName: '',  //氣候
                        parameterValue: ''  //代號
                    }
                },
                {
                    startTime: '',          //開始時間
                    endTime: '',            //結束時間
                    parameter: {
                        parameterName: '',  //氣候
                        parameterValue: ''  //代號
                    }
                },
                {
                    startTime: '',          //開始時間
                    endTime: '',            //結束時間
                    parameter: {
                        parameterName: '',  //氣候
                        parameterValue: ''  //代號
                    }
                }
            ],
            PoP: [
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                }
            ],
            MinT: [
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                }
            ],
            CI: [
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterValue: ''
                    }
                }
            ],
            MaxT: [
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                },
                {
                    startTime: '',
                    endTime: '',
                    parameter: {
                        parameterName: '',
                        parameterUnit: ''
                    }
                }
            ]

        }


    },
    mounted: function () {
        this.$nextTick(function () {
            let vm = this;
            axios({
                method: "GET",
                url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-EC139BA3-6665-4AEE-9A2E-D3B8D1DF96DB&format=JSON"
            })
                .then(function (response) {
                    // console.log(response);
                    //提取資料
                    const datas = response.data.records
                    vm.dataDescription = datas.datasetDescription;
                    console.log(datas);

                    //對每個縣市做迴圈處理
                    datas.location.forEach(event => {
                        {
                            let box = {
                                locationName: event.locationName,       //地點名
                                weatherElement: event.weatherElement    //天氣因素數據
                            }
                            vm.meteorologicalData.push(box);
                        }
                    });
                })
        })

    },
    methods: {
        hostMap: function (zh, en) {
            //用於解析用戶點選的縣市的資料，然後將其實現在畫面上。
            let vm = this;
            // console.log(zh);

            this.meteorologicalData.forEach(function (event) {
                if (event.locationName === zh) {
                    // console.log(event);
                    vm.showData.cityName = event.locationName;    //城市
                    // console.log(event.weatherElement);
                    event.weatherElement.forEach(function (event) {
                        //解析資料
                        switch (event.elementName) {
                            case 'Wx':
                                event.time.forEach(function (event, index) {
                                    //開始時間
                                    vm.showData.Wx[index].startTime = event.startTime;
                                    //結束時間
                                    vm.showData.Wx[index].endTime = event.endTime;
                                    //天氣狀況
                                    vm.showData.Wx[index].parameter.parameterName = event.parameter.parameterName;
                                    //天氣參數
                                    vm.showData.Wx[index].parameter.parameterValue = event.parameter.parameterValue;

                                })
                                break;
                            case 'PoP':
                                event.time.forEach(function (event, index) {
                                    vm.showData.PoP[index].startTime = event.startTime;
                                    vm.showData.PoP[index].endTime = event.endTime;
                                    vm.showData.PoP[index].parameter.parameterName = event.parameter.parameterName;
                                    vm.showData.PoP[index].parameter.parameterValue = event.parameter.parameterValue;
                                })
                                break;
                            case 'MinT':
                                event.time.forEach(function (event, index) {
                                    vm.showData.MinT[index].startTime = event.startTime;
                                    vm.showData.MinT[index].endTime = event.endTime;
                                    vm.showData.MinT[index].parameter.parameterName = event.parameter.parameterName;
                                    vm.showData.MinT[index].parameter.parameterUnit = `°${event.parameter.parameterUnit}`;
                                })
                                break;
                            case 'CI':
                                event.time.forEach(function (event, index) {
                                    vm.showData.CI[index].startTime = event.startTime;
                                    vm.showData.CI[index].endTime = event.endTime;
                                    vm.showData.CI[index].parameter.parameterName = event.parameter.parameterName;
                                    vm.showData.CI[index].parameter.parameterValue = event.parameter.parameterValue;
                                })
                                break;
                            case 'MaxT':
                                event.time.forEach(function (event, index) {
                                    vm.showData.MaxT[index].startTime = event.startTime;
                                    vm.showData.MaxT[index].endTime = event.endTime;
                                    vm.showData.MaxT[index].parameter.parameterName = event.parameter.parameterName;
                                    vm.showData.MaxT[index].parameter.parameterUnit = `°${event.parameter.parameterUnit}`;
                                })
                                break;
                        }

                    })

                }
            })

            // console.log(this.showData.MinT);
            document.querySelectorAll('path').forEach(event => {
                event.style = '';
            });
            document.querySelector(`#${en}`).style = 'fill : var(--color-gold); transform: translate(-5px, -5px);';

            //秀出資訊區
            this.showState = true;

        }
    }

});