data1 = {
    h1text: 'width:0%;',
    h2text1: 'width:0%;',
    h2text2: 'width:0%;',



}


let headerVue = new Vue({
    el: '#headerVue',
    data: data1,
    mounted: function () {
        console.log(this);
        this.$nextTick(function () {
            let vm = this;
            setTimeout(function () {
                vm.h2text1 = 'animation: titleWidth 2s ease-in-out forwards';
                setTimeout(function () {
                    vm.h2text2 = 'animation: titleWidth 2s ease-in-out forwards';
                    setTimeout(function () {
                        vm.h1text = 'animation: titleWidth 2s ease-out forwards';
                    }, 1300)
                }, 200);
            }, 500)
        })
    },
    methods: {

    }


})