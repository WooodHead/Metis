var pageName = "judgeRound";
//清空相关的数组
function initOtherData(lengthArray, checkAllGroup, dataL, oldJudgeData) {
    for (var i = 0; i < lengthArray.length; i++) {
        checkAllGroup[i] = [];
        dataL[i] = [];
        oldJudgeData[i] = [];
    }
}
//清空上传所需的参数
function initJudgeData(data1, data2) {
    data1.roundId = "";
    data1.judges = "";
    data1.deleteJudges = "";
    data1.addJudges = "";
    data2.id = "";
    data2.judge = "";
}
//拼接所有的评委id
function setJudgeDataX(newJudgeData, judgeList, setJudgeData, setJudgeData1) {
    for (var i = 0; i < newJudgeData.length; i++) {
        for (var j = 0; j < judgeList.length; j++) {
            if (newJudgeData[i] == judgeList[j].name) {
                setJudgeData.judges = setJudgeData.judges != "" ? setJudgeData.judges + "," + judgeList[j].Id : setJudgeData.judges + judgeList[j].Id;
                setJudgeData1.judges = setJudgeData1.judges != "" ? setJudgeData1.judges + "," + judgeList[j].Id : setJudgeData1.judges + judgeList[j].Id;
            }
        }
    };
}
//去重函数
function DuplicateRemoval(JudgeData1, JudgeData2) {
    var deleteResult = [];
    var delData = [];
    for (var i = 0; i < JudgeData1.length; i++) {
        if (deleteResult.indexOf(JudgeData1[i]) == -1) {
            deleteResult.push(JudgeData1[i])
        }
    }
    JudgeData1 = [];
    JudgeData1 = deleteResult;
    for (var i = 0; i < JudgeData1.length; i++) {
        if ($.inArray(JudgeData1[i], JudgeData2) == -1) {
            delData.push(JudgeData1[i]);
        }
    }
    return delData;
}
//拼接删除与添加的评委id方法
function spliceJudgeData(oldData, newData, judgeList) {
    if (oldData.length == 0) {
        newData = "";
    } else {
        for (var i = 0; i < oldData.length; i++) {
            for (var j = 0; j < judgeList.length; j++) {
                if (oldData[i] == judgeList[j].name) {
                    newData = newData != "" ? newData + "," + judgeList[j].Id : newData + judgeList[j].Id;
                }
            }
        };
    }
    return newData;
}
//数据请求后，将评委的id转为name显示在table中
function screenRoundJudge(that, checkAllGroup, oldJudgeData, dataL) {
    var ll = [];
    for (var i = 0; i < that.dataList.length; i++) { //轮次循环
        var judgeBox = "";
        ll = that.dataList[i].judge.split(","); //将每个轮次中的评委ID进行拆分成为数组
        for (var j = 0; j < ll.length; j++) { //循环每个轮次的评委ID
            for (var k = 0; k < that.judgeList.length; k++) { //循环所有的评委
                if (ll[j] == that.judgeList[k].Id) {
                    judgeBox = judgeBox != "" ? judgeBox + "," + that.judgeList[k].name : judgeBox + that.judgeList[k].name;
                    checkAllGroup[i].push(that.judgeList[k].name);
                    oldJudgeData[i].push(that.judgeList[k].name);
                }
            }
        }
        // that.dataList[i].judge = judgeBox;
  		dataL[i].judgeBox = judgeBox;
        /*
		=============强行改变datalist中judge的值，由id变为name=====================
  		dataL[i].judgeBox = judgeBox;
		 */
    }
}

var vm = new Vue({
    el: ".index",
    data: function() {
        return {
            setModal: false,
            deleteModal: false,
            roundTitle: "",
            dataL: [],
            judgeBox: [],
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
                        // },this.dataL[params.index].judgeBox)thisRoundNameArr
                        },this.thisRoundNameArr[params.index])
                    }
                },
                { title: '操作', key: 'opt', align: 'center', render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: { type: 'primary', size: 'small' },
                                style: { marginRight: '5px' },
                                on: { click: () => {
                                        // this.setJudge(params.index)
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
            checkAll: false,
            indeterminate: true,
            checkAllGroup: [],
            oldJudgeData: [],
            newJudgeData: [],
            setJudgeUrl: "",
            index: "",
            judgeRoundTitle: "",
            aoData1: {
                offset: 0,
                limit: 100
            },
            setJudgeData: {
                roundId: 0, //轮次id		0
                judges: "", //确定好的评委id		1
                deleteJudges: "", //改动评委id(删除)	2
                addJudges: "",
                roundName: "",
                describes: ""
            },
            setJudgeData1: {
                id: 0, //轮次id		0
                judges: ""
            },


            chooseJudgeNameArray:[],        //  该伦次所选中的评委名数组
            chooseJudgeIdArray:[],          //  该伦次所选中的评委id数组
            oldThisRoundJudgeIdArray:[],    //  该伦次已经确定的评委id数组
            oldThisRoundJudgeNameArray:[],  //  该伦次已经确定的评委name数组
            allJudgeWithRoundsNameArray:[], //  所有轮次对应评委name数组
            thisRoundNameArr:[],
            deleteJudgesArr:[],
            addJudgesArr:[],
            formItem:{
                judges:"",
                deleteJudges:"",
                addJudges:""
            },
            addJudgesArr:[],                //该伦次添加评委id数组
            delJudgesArr:[],
        }
    },
    methods: {
        // chooseJudgeEvent(data){
        //     console.log(data);
        //     console.log(this.chooseJudgeArray);
        // },
        chooseJudgeOk(){
            let that = this;
            if(this.oldThisRoundJudgeIdArray[0] != ""){   // 有
                console.log("111");
                for(let i = 0;i < this.chooseJudgeNameArray.length; i++){
                    for(let j = 0;j < this.judgeList.length; j++){
                        if(this.chooseJudgeNameArray[i] == this.judgeList[j].name){
                            this.chooseJudgeIdArray.push(this.judgeList[j].Id);
                        }
                    }
                }
                for(let i = 0;i < this.chooseJudgeIdArray.length; i++){
                    if(!this.oldThisRoundJudgeIdArray.includes(this.chooseJudgeIdArray[i])){
                        this.addJudgesArr.push(this.chooseJudgeIdArray[i]);
                    }
                }
                for (let j = 0;j < this.oldThisRoundJudgeIdArray.length; j++) {
                    if(!this.chooseJudgeIdArray.includes(this.oldThisRoundJudgeIdArray[j])){
                        this.delJudgesArr.push(this.oldThisRoundJudgeIdArray[j]);
                    }
                }
                $.ajax({
                    type: "put",
                    url: config.ajaxUrls.updateBindJudge.replace(":id", this.dataList[this.index].Id),
                    data: {
                        judges:this.chooseJudgeIdArray.join(","),
                        deleteJudges:this.delJudgesArr.join(","),
                        addJudges:this.addJudgesArr.join(","),
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            that.$Loading.finish();
                            that.$Notice.success({ title: response.data });
                            that.chooseJudgeIdArray = [];
                            that.chooseJudgeNameArray = [];

                        } else {
                            that.$Notice.error({ title: response.data });
                            that.chooseJudgeIdArray = [];
                            that.chooseJudgeNameArray = [];
                        }
                    }
                });
            }else {                                 // 无
                for(let i = 0;i < this.chooseJudgeNameArray.length; i++){
                    for(let j = 0;j < this.judgeList.length; j++){
                        if(this.chooseJudgeNameArray[i] == this.judgeList[j].name){
                            this.chooseJudgeIdArray.push(this.judgeList[j].Id);
                        }
                    }
                }
                $.ajax({
                    type: "put",
                    url: config.ajaxUrls.bindJudge.replace(":id", this.dataList[this.index].Id),
                    data: {
                        judges:this.chooseJudgeIdArray.join(",")
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            that.$Loading.finish();
                            that.$Notice.success({ title: response.data });
                            that.chooseJudgeIdArray = [];
                            that.chooseJudgeNameArray = [];

                        } else {
                            that.chooseJudgeIdArray = [];
                            that.chooseJudgeNameArray = [];
                            that.$Notice.error({ title: response.data });
                        }
                    }
                });
            }
        },
        chooseJudgeCancel(){

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
        choosejudgeChange(data){

        },




        setJudge: function(index) {
            this.setModal = true;
            this.setJudgeData.roundId = this.dataList[index].Id;
            this.setJudgeData1.id = this.dataList[index].Id;
            this.roundTitle = this.dataList[index].roundName;
            this.index = index;
            if (this.checkAllGroup[this.index].length == this.judgeList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (this.checkAllGroup[this.index].length == 0) {
                this.checkAll = false;
                this.indeterminate = false;
            } else {
                this.indeterminate = true;
                this.checkAll = false;
            }
        },
        changeRound: function(index) {
            var id = this.dataList[index].Id;
            window.location.href = config.viewUrls.judgeRoundUpdate.replace(":id", id);
        },
        removeRound: function(index) {
            this.judgeRoundTitle = this.dataList[index].roundName;
            this.deleteModal = true;
            this.index = index;
        },
        deleteOK: function() {
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
                        $.ajax({
                            url: config.ajaxUrls.judgeRoundGetByPage,
                            type: "get",
                            data: that.aoData1,
                            success: function(response) {
                                if (response.status == 200) {
                                    that.dataList = response.data.rows;
                                    initOtherData(response.data.rows, that.checkAllGroup, that.dataL, that.oldJudgeData);
                                    $.ajax({
                                        url: config.ajaxUrls.judgeGetByPage,
                                        type: "get",
                                        data: { limit: 100, offset: 0, language: 1 },
                                        success: function(response) {
                                            if (response.status == 200) {
                                                //	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                                that.judgeList = response.data.rows;
                                                screenRoundJudge(that, that.checkAllGroup, that.oldJudgeData, that.dataL);
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
                    }else{
                        that.$Notice.error({ title: response.data });
                    }
                }
            });
        },
        ok: function() {
            this.$Loading.start();
            var that = this;
            //				拼接setJudgeData.judge
            setJudgeDataX(this.newJudgeData, this.judgeList, this.setJudgeData, this.setJudgeData1);
            var delData = [];
            var deleteResult = [];
            var addData = [];
            var addResult = [];
            //				去重
            delData = DuplicateRemoval(this.oldJudgeData[this.index], this.newJudgeData);
            //				拼接删除的评委
            this.setJudgeData.deleteJudges = spliceJudgeData(delData, this.setJudgeData.deleteJudges, this.judgeList);
            //				去重
            addData = DuplicateRemoval(this.newJudgeData, this.oldJudgeData[this.index]);
            //				拼接添加的评委
            this.setJudgeData.addJudges = spliceJudgeData(addData, this.setJudgeData.addJudges, this.judgeList);
            //		                判断url的值
            var urlData = "";
            if (this.dataList[this.index].judge != "") {
                console.log("1111111");
                this.setJudgeUrl = config.ajaxUrls.judgeRoundUpdate.replace(":id", this.dataList[this.index].Id);
                urlData = this.setJudgeData;
            } else {
                console.log("2222222");
                this.setJudgeUrl = config.ajaxUrls.judgeRoundBindJudge.replace(":id", this.dataList[this.index].Id);
                urlData = this.setJudgeData1;
            }
            console.log(this.setJudgeUrl, urlData);
            $.ajax({
                type: "put",
                url: that.setJudgeUrl,
                data: urlData,
                success: function(response) {
                    if (response.status == 200) {
                        that.$Loading.finish();
                        that.$Notice.success({ title: response.data });
                        $.ajax({
                            url: config.ajaxUrls.judgeRoundGetByPage,
                            type: "get",
                            data: that.aoData1,
                            success: function(response) {
                                if (response.status == 200) {
                                    that.dataList = response.data.rows;
                                    initOtherData(response.data.rows, that.checkAllGroup, that.dataL, that.oldJudgeData);
                                    $.ajax({
                                        url: config.ajaxUrls.judgeGetByPage,
                                        type: "get",
                                        data: { limit: 100, offset: 0, language: 1 },
                                        success: function(response) {
                                            if (response.status == 200) {
                                                //筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                                that.judgeList = response.data.rows;
                                                screenRoundJudge(that, that.checkAllGroup, that.oldJudgeData, that.dataL);
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
                    } else {
                        that.$Notice.error({ title: response.data });
                    }
                }
            });
        },
        cancel: function() {
            this.setModal = false;
            var that = this;
            $.ajax({
                url: config.ajaxUrls.judgeRoundGetByPage,
                type: "get",
                data: that.aoData1,
                success: function(response) {
                    if (response.status == 200) {
                        that.dataList = response.data.rows;
                        initOtherData(response.data.rows, that.checkAllGroup, that.dataL, that.oldJudgeData);
                        $.ajax({
                            url: config.ajaxUrls.judgeGetByPage,
                            type: "get",
                            data: { limit: 100, offset: 0, language: 1 },
                            success: function(response) {
                                if (response.status == 200) {
                                    //	               	筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                    that.judgeList = response.data.rows;
                                    screenRoundJudge(that, that.checkAllGroup, that.oldJudgeData, that.dataL);
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
        },
        handleCheckAll: function() { //是否全选
            this.newJudgeData = [];
            this.checkAllGroup[this.index] = [];
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                for (var i = 0; i < this.judgeList.length; i++) {
                    this.checkAllGroup[this.index].push(this.judgeList[i].name);
                    this.newJudgeData.push(this.judgeList[i].name);
                }
            } else {
                this.checkAllGroup[this.index] = [];
                this.newJudgeData = [];
            }
        },
        checkAllGroupChange: function(data) {
            this.newJudgeData = [];
            this.checkAllGroup[this.index] = [];
            this.newJudgeData = data;
            this.checkAllGroup[this.index] = data;
            if (data.length === this.judgeList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }

        }
    },
    created: function() {
        var that = this;
        $.ajax({
            url: config.ajaxUrls.judgeRoundGetByPage,
            type: "get",
            data: that.aoData1,
            success: function(response) {
                if (response.status == 200) {
                    that.dataList = response.data.rows;
                    initOtherData(response.data.rows, that.checkAllGroup, that.dataL, that.oldJudgeData);
                    $.ajax({
                        url: config.ajaxUrls.judgeGetByPage,
                        type: "get",
                        data: { limit: 100, offset: 0, language: 1 },
                        success: function(response) {
                            if (response.status == 200) {
                                //筛选出该轮次有哪些评委,并将id转为name 放在that.dataL中
                                that.judgeList = response.data.rows;
                                // screenRoundJudge(that, that.checkAllGroup, that.oldJudgeData, that.dataL);
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
