
// totop
function addListener(e, n, o, u){
    if(e.addEventListener){
        e.addEventListener(n, o, u);
        return true;
    } else if(e.attachEvent){
        e.attachEvent('on' + n, o);
        return true;
    }
    return false;
}
function removeListener(e, n, o, u){
    if(!e){
        return false;
    }
    if(e.removeEventListener){
        e.removeEventListener(n, o, u);
        return true;
    } else if(e.detachEvent){
        e.detachEvent('on' + n, o);
        return true;
    }
    return false;
}
function preDefault(ev){
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        ev.returnValue = false;
    }
}

// 页面的表单验证
function verifyForm(oForm,otherFn,type){
    var allVerifyE = oForm.querySelectorAll(".verify_e");
    var len = allVerifyE.length;
    var succ = true;
    for (var i=0;i<len;i++){
        if(!verUnit(allVerifyE[i],otherFn,type)){
            succ = false;
            break;
        }
    }
    if(succ && otherFn){
        succ = otherFn();
    }
    return succ;
}
//单个元素验证
function verUnit(oEle,fn,type){
    if(!oEle){
        return false;
    }
    var verifyArr = eval("("+oEle.getAttribute("data-ver")+")");
    //var errDiv = eval("("+oEle.getAttribute("data-errDiv")+")");
    if(!verifyArr || Object.prototype.toString.call(verifyArr)!="[object Array]"){
        return false;
    }
    var isPass = true;
    for(var i=0;i<verifyArr.length;i++){
        var regExp = eval(verifyArr[i].pattern);
        //var val = oEle.value.replace(/^\s+|\s+$/g,"");
        var val = oEle.value;
        var infor = verifyArr[i].tit;
        if(!verifyArr[i].isReverse){
            if(regExp.test(val)){
                if(oEle.parentNode.getElementsByTagName("span")[0]){
                    oEle.parentNode.getElementsByTagName("span")[0].innerHTML=infor;
                }else{
                    // alert(infor);
                    if(type){
                        $(oEle).parents(".weui_cell").addClass("weui_cell_warn");
                    }else{
                        $(oEle).parents(".weui_cell").addClass("weui_cell_warn");
                        $.alert(infor);
                    }
                }

                isPass = false;
                break;
            }else{
                if($(oEle).attr("data-reg")!="false"){
                    $(oEle).parents(".weui_cell").removeClass("weui_cell_warn");
                }
            }
        }else{
            if(!regExp.test(val)){
                if(oEle.parentNode.getElementsByTagName("span")[0]){
                    oEle.parentNode.getElementsByTagName("span")[0].innerHTML=infor;
                }else{
                    // alert(infor);
                    if(type){
                        $(oEle).parents(".weui_cell").addClass("weui_cell_warn");
                    }else{
                        $(oEle).parents(".weui_cell").addClass("weui_cell_warn");
                        $.alert(infor);
                    }
                }
                isPass = false;
                break;
            }else{
                if($(oEle).attr("data-reg")!="false"){
                    $(oEle).parents(".weui_cell").removeClass("weui_cell_warn");
                }
            }
        }
    }
    if(isPass && fn){
        if(oEle.parentNode.getElementsByTagName("span")[0]){
            oEle.parentNode.getElementsByTagName("span")[0].innerHTML="";
        }
        return fn();
    }else if(isPass){
        if(oEle.parentNode.getElementsByTagName("span")[0]){
            oEle.parentNode.getElementsByTagName("span")[0].innerHTML="";
        }
        return isPass;
    }else{
        return isPass;
    }
}

function toLoader(callback){
    // console.log(document.body.clientHeight,window.screen.height);
    if(document.body.clientHeight-44>=window.screen.height){
        $(".weui-infinite-scroll").children("span").html("正在加载... ");
        $(".weui-infinite-scroll").children(".infinite-preloader").show();
        callback();
    }else{
        $(".weui-infinite-scroll").children("span").html("已全部加载");
        $(".weui-infinite-scroll").children(".infinite-preloader").hide();
        return;
    }
}
function bindTab(id){
    $("#"+id).children("a").bind("click",function(){
        var content=$(this).data("id");
        $("#"+content).show().siblings(".tabDiv_content").hide();
        $(this).addClass("active").siblings("a").removeClass("active");
    })
}

$("input.verify_e").bind("blur",function(){
    verUnit(this,null,true);
})
function showInput(obj,callback){
    $(".showAlert").each(function(){
        if($(this).data("type")==obj){
            var type=$(this).data("type");
            $(this).unbind("touchend").bind("touchend",function(){
                $.prompt({
                    title: $(this).find(".weui_label").text(),
                    // title:"test",
                    text: '',
                    input: $(this).find(".weui_cell_bd span").text(),
                    empty: false, // 是否允许为空
                    onOK: function (input) {
                        callback(type,$("#weui-prompt-input").val());
                    },
                    onCancel: function () {
                        //点击取消
                    }
                });
            })
        }
    })
}
var defaultSex="";
function showRaio(obj,callback){
    $(".showAlert").each(function(){
        if($(this).data("type")==obj){
            var radioObj=this;
            $(this).select({
                title: "选择性别",
                closeText:'取消',
                items: [{
                    title: "男",
                    value: "0",
                }, {
                    title: "女",
                    value: "1",
                }],
                onOpen: function(){
                    popup = 1;
                    var values=$(radioObj).attr("value");
                    defaultSex=values;
                    if(values){
                        values=values.split(",")
                        for(var id in values){
                            $("#weui-select-id-"+values[id]).prop("checked",true);
                        }
                    }
                },
                onClose: function() {
                    if(popup<0){
                        return false;
                    }
                    popup = -1;
                    if($(radioObj).attr("value")==defaultSex){
                        return false;
                    }
                    var values=$(radioObj).attr("data-values");
                    callback(obj,values);
                }
            });
            $(this).unbind("click").bind("touchend",function(){
                $(this).select("open")
            })
        }
    })
}
var defaultDate="";
function showDate(obj,callback){
    $(".showAlert").each(function(){
        if($(this).data("type")==obj){
            var type=$(this).data("type");
            $("#js_date").calendar({
                value:[$("#js_date").val()],
                onOpen:function(){
                    defaultDate=$("#js_date").val();
                },
                onClose:function(){
                    if($("#js_date").val()==defaultDate){
                        return true;
                    }
                    callback(obj,$("#js_date").val());
                }
            });
            // $("#js_date").unbind("click").unbind("touchend").bind("touchend",function(){
            //     $("#js_date").calendar("open");
            // })
        }
    })
}
var defaultAdd="";
function showAdd(obj,callback){
    $(".showAlert").each(function(){
        if($(this).data("type")==obj){
            var type=$(this).data("type");
            $("#js_add").cityPicker({
                showDistrict: true,//地区
                onOpen:function(){
                    defaultAdd=$("#js_add").val();
                },
                onClose:function(){
                    if($("#js_add").val()==defaultAdd){
                        return true;
                    }
                    callback(obj,$("#js_add").val());
                }
            });
            // $("#js_add").unbind("click").unbind("touchend").bind("touchend",function(){
            //     $("#js_add").picker("open");
            // })
        }
    })
}

//切换
function changeTab(index){
    $("#js_tab").children("a").eq(index).addClass("active").siblings().removeClass("active");
    $("#"+$("#js_tab").children("a").eq(index).data("id")).show().siblings(".tabDiv_content").hide();
}