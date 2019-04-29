var pageName = "judgeRound";
var vm = new Vue({
    el: ".index",
    data: function() {
        return {
            setModal: false,
            deleteModal: false,
            roundTitle: "",
            columns: [ //table列选项
                { title: '名称', key: 'roundName', align: 'center' },
                { title: '评委', key: 'judge', align: 'center',
                    render: (h, params) => {
                       return h('div', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                margin:"10px auto"
                            },
                        },this.thisRoundNameArr[params.index])
                    }
                },
                { title: '操作', key: 'opt', align: 'center', render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: { type: 'primary', size: 'small' },
                                style: { marginRight: '5px' },
                                on: { click: () => {
                                        this.setThisRoundJudges(params.index)
                                    }
                                }
                            }, '设置评委'),
                            h('Button', {
                                props: { type: 'primary', size: 'small' },
                                style: { marginRight: '5px' },
                                on: { click: () => {
                                        this.changeRound(params.index)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: { type: 'error', size: 'small' },
                                style: { marginRight: '5px' },
                                on: { click: () => {
                                        this.removeRound(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            judgeList: [],
            dataList: [],
            index: "",
            judgeRoundTitle: "",
            aoData1: {
                offset: 0,
                limit: 100
            },
            chooseJudgeNameArray:[],        //  该伦次所选中的评委名数组
            oldThisRoundJudgeIdArray:[],    //  该伦次已经确定的评委id数组
            oldThisRoundJudgeNameArray:[],  //  该伦次已经确定的评委name数组
            allJudgeWithRoundsNameArray:[], //  所有轮次对应评委name数组
            thisRoundNameArr:[],
            formItem:{
                judges:"",
                deleteJudges:"",
                addJudges:""
            },
        }
    },
    methods: {
        chooseJudgeOk(){
            let that = this;
            let chooseJudgeIdArray = [];
            let addJudgesArr = [];
            let delJudgesArr = [];
            if(this.oldThisRoundJudgeIdArray[0] != ""){   // 有
                for(let i = 0;i < this.chooseJudgeNameArray.length; i++){
                    for(let j = 0;j < this.judgeList.length; j++){
                        if(this.chooseJudgeNameArray[i] == this.judgeList[j].name){
                            chooseJudgeIdArray.push(this.judgeList[j].Id);
                        }
                    }
                }
                for(let i = 0;i < chooseJudgeIdArray.length; i++){
                    if(!this.oldThisRoundJudgeIdArray.includes(chooseJudgeIdArray[i].toString())){
                        addJudgesArr.push(chooseJudgeIdArray[i]);
                    }
                }
                for (let j = 0;j < this.oldThisRoundJudgeIdArray.length; j++) {
                    if(!chooseJudgeIdArray.includes(parseInt(this.oldThisRoundJudgeIdArray[j]))){
                        delJudgesArr.push(this.oldThisRoundJudgeIdArray[j]);
                    }
                }
                $.ajax({
                    type: "put",
                    url: config.ajaxUrls.updateBindJudge.replace(":id", this.dataList[this.index].Id),
                    data: {
                        judges:chooseJudgeIdArray.join(","),
                        deleteJudges:delJudgesArr.join(","),
                        addJudges:addJudgesArr.join(","),
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            that.$Loading.finish();
                            that.$Notice.success({ title: response.data });
                        } else {
                            that.$Notice.error({ title: response.data });
                        }
                    }
                });
            }else {                                 // 无
                for(let i = 0;i < this.chooseJudgeNameArray.length; i++){
                    for(let j = 0;j < this.judgeList.length; j++){
                        if(this.chooseJudgeNameArray[i] == this.judgeList[j].name){
                            chooseJudgeIdArray.push(this.judgeList[j].Id);
                        }
                    }
                }
                $.ajax({
                    type: "put",
                    url: config.ajaxUrls.bindJudge.replace(":id", this.dataList[this.index].Id),
                    data: {
                        judges:chooseJudgeIdArray.join(",")
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            that.$Loading.finish();
                            that.$Notice.success({ title: response.data });
                            chooseJudgeIdArray = [];
                        } else {
                            chooseJudgeIdArray = [];
                            that.$Notice.error({ title: response.data });
                        }
                    }
                });
            }
        },
        setThisRoundJudges(index){
            this.index = index;
            this.roundTitle = this.dataList[index].roundName;
            this.chooseJudgeNameArray = [];
            this.setModal = true;
            this.oldThisRoundJudgeIdArray = this.dataList[index].judge.split(",");
            for(let i = 0;i < this.oldThisRoundJudgeIdArray.length; i++){
                for(let j = 0;j < this.judgeList.length; j++){
                    if(this.oldThisRoundJudgeIdArray[i] == this.judgeList[j].Id){
                        this.chooseJudgeNameArray.push(this.judgeList[j].name);
                    }
                }
            }
        },
        changeRound(index) {
            var id = this.dataList[index].Id;
            window.location.href = config.viewUrls.judgeRoundUpdate.replace(":id", id);
        },
        removeRound(index) {
            this.judgeRoundTitle = this.dataList[index].roundName;
            this.deleteModal = true;
            this.index = index;
        },
        deleteOK() {
            this.deleteModal = false;
            var id = this.dataList[this.index].Id;
            var that = this;
            $.ajax({
                dataType: 'json',
                type: "delete",
                url: config.ajaxUrls.judgeRoundRemove.replace(":id", id),
                success: function(response) {
                    if (response.status == 200)  {
                        that.$Notice.success({title: response.data});



                    }else{
                        that.$Notice.error({ title: response.data });
                    }
                }
            });
        }
    },
    created() {
        var that = this;
        $.ajax({
            url: config.ajaxUrls.judgeRoundGetByPage,
            type: "get",
            data: that.aoData1,
            success: function(response) {
                if (response.status == 200) {
                    that.dataList = response.data.rows;
                    $.ajax({
                        url: config.ajaxUrls.judgeGetByPage,
                        type: "get",
                        data: { limit: 100, offset: 0, language: 1 },
                        success: function(response) {
                            if (response.status == 200) {
                                //筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                that.judgeList = response.data.rows;
                                let thisRoundIdArr = new Array();
                                let thisRoundNameArr = new Array();
                                for(let i=0;i<that.dataList.length;i++){
                                    thisRoundIdArr[i] = that.dataList[i].judge.split(",");
                                    thisRoundNameArr[i] = "";
                                    for(let j = 0;j<thisRoundIdArr[i].length;j++){
                                        for(let k = 0;k < that.judgeList.length;k++){
                                            if(that.judgeList[k].Id == thisRoundIdArr[i][j]){
                                                if(thisRoundNameArr[i] == ''){
                                                    thisRoundNameArr[i] = that.judgeList[k].name;
                                                }else{
                                                    thisRoundNameArr[i] = that.judgeList[k].name + "," + thisRoundNameArr[i];
                                                }
                                            }
                                        }
                                    }
                                }
                                that.thisRoundNameArr = thisRoundNameArr;
                            } else {
                                that.$Notice.error({ title: response.data });
                            }
                        }
                    });
                } else {
                    that.$Notice.error({ title: config.messages.networkError });
                }
            }
        });
    }
})
