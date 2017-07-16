// 兼容的placeHolder
function jsPlaceHolder(oTxtId,option){
    var _this=this;
    if(!oTxtId) return false;
    var  _test = "placeholder" in document.createElement("input");
    if(_test) return false;
    //以下代码是不支持的情况
    option=option||{};
    var oTxt=null;
    var setting={
        focusColor:"#333",
        blurColor:"#999"
    };
    for(var key in setting){
        if(!option[key]){
            option[key] = setting[key];
        }
    };
    if(typeof(oTxtId)!="string" && oTxtId.nodeType==1){
        oTxt = oTxtId;
        oTxtId=oTxt.id;
    }
    if(!oTxt){
        oTxt = document.getElementById(oTxtId);
    }
    var blurTxt = oTxt.getAttribute("placeholder");//.replace(/^\s+|\s+$/,"");
    oTxt.value = blurTxt;
    if (oTxtId == "loginPwd") {
        if (oTxtId.value != '请输入密码') {
            oTxt.setAttribute("data-status","true");
        }else{
            oTxt.setAttribute("data-status","false");
        }
   }else{
       oTxt.setAttribute("data-status","false");
   }
    oTxt.style.color=setting.blurColor;
    _this.addListener(oTxt,"focus",function(){
        if(oTxt.value.replace(/^\s+|\s+$/,"")==blurTxt){
            oTxt.value="";
            oTxt.style.color=setting.focusColor;
            oTxt.setAttribute("data-status","true");
        }
    });
    _this.addListener(oTxt,"blur",function(){
        if(oTxt.value.replace(/^\s+|\s+$/,"")==blurTxt || oTxt.value.replace(/^\s+|\s+$/,"")==""){
            oTxt.value=blurTxt;
            oTxt.style.color=setting.blurColor;
            oTxt.setAttribute("data-status","false");
        }
    });
}

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
function stopPropagation(ev){
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
}
// 页面的表单验证
function verifyForm(oForm,isalert){
   var isalert=isalert||false;
    var allVerifyE = $(oForm).find(".verify_e");
    var len = allVerifyE.length;
    var succ = true;
    for (var i=0;i<len;i++){
        if(!verUnit(allVerifyE[i],isalert)){
            succ = false;
            break;
        }
    }
    return succ;
};
//单个元素验证
function verUnit(oEle,isalert){
    // console.log(33);
    if(!oEle){
        return false;
    }
    var verifyArr = eval("("+oEle.getAttribute("data-ver")+")");
    if(!verifyArr || Object.prototype.toString.call(verifyArr)!="[object Array]"){
        return false;
    }
    var isPass = true;
    for(var i=0;i<verifyArr.length;i++){
        var regExp = eval(verifyArr[i].pattern);
        //去除空格后的val
        // var val = oEle.value.replace(/^\s+|\s+$/g,"");
        //不去除空格
        var val = oEle.value;
        var infor = verifyArr[i].tit;
        //PlaceHolder处理
        // console.log(val);
        var infor = verifyArr[i].tit;
        if (oEle.getAttribute("data-status") == "false") {
            $(oEle).parent().find(".ico").css("display","none");
            $(oEle).parent().parent().next().html("");
            $(oEle).parent().parent().removeClass("border").addClass("error");
            $(oEle).parent().parent().next().html("<i class='ico error_ico'></i>"+ infor +"");
            isPass = false;
            break;
        }else{
            if(!verifyArr[i].isReverse){
                if(!regExp.test(val)){
                    if(!isalert){
                        $(oEle).parent().find(".ico").css("display","none");
                        $(oEle).parent().parent().next().html("");
                        $(oEle).parent().parent().removeClass("border").addClass("error");
                        $(oEle).parent().parent().next().html("<i class='ico error_ico'></i>"+ infor +"");
                    }
                    isPass = false;
                    break;
                }
            } else if(verifyArr[i].notReverse){
                //console.log(regExp,regExp.test(val));
                if(regExp.test(val)){
                    if(!isalert){
                        $(oEle).parent().find(".ico").css("display","none");
                        $(oEle).parent().parent().next().html("");
                        $(oEle).parent().parent().removeClass("border").addClass("error");
                        $(oEle).parent().parent().next().html("<i class='ico error_ico'></i>"+ infor +"");
                    }
                    isPass = false;
                    break;
                }
            }else{
                if(!regExp.test(val)){
                    if(!isalert){
                        $(oEle).parent().find(".ico").css("display","none");
                        $(oEle).parent().parent().next().html("");
                        $(oEle).parent().parent().removeClass("border").addClass("error");
                        $(oEle).parent().parent().next().html("<i class='ico error_ico'></i>"+ infor +"");
                    }
                    isPass = false;
                    break;
                }

            }
        }
    }
    return isPass;
};

//页面表单验证
function checkForm(oForm){
   $(oForm).find(".verify_e").each(function(){
        var _this = $(this);
        var msg;
        if (_this.attr("data-msg")) {
            msg = _this.attr("data-msg");
        }
        _this.focus(function(){
            if(msg){
                _this.parent().parent().next().html("<i class='ico msg_ico'></i> "+msg+"");
            }
       }).blur(function(){
            var that;
            for(var i=0;i < 1;i++){
                that = _this[i];
                if(verUnit(that,true)){
                    if (msg) {
                        _this.parent().parent().next().html("<i class='ico msg_ico'></i> "+msg+"");
                    }else{
                        _this.parent().parent().next().html("");
                    }
                    _this.parent().find(".ico").css("display","inline-block");
                    _this.parent().parent().removeClass("error").addClass("border");
                }else{
                    verUnit(that);
                }
            }
       });
   });
};

//发送验证码
//function bindYZbtn(obj,ajax,time){
//  var time=time||6;
//  $(obj).bind("click",);
//};
var bindYZbtn = function(obj){
    var otels=document.getElementById("otels");
    if ($(obj).attr("data-type")) {
        if($(obj).hasClass("dx")){
            return true;
        }else{
            return false;
        }
    }else{
        if(verUnit(otels,true)){
            if($(obj).hasClass("dx")){
                return true;
            }else{
                return false;
            }
        }else{
            $("#otels").parent().parent().removeClass("border").addClass("error");
            $("#otels").parent().parent().next().html("<i class='ico error_ico'></i>手机号不能为空");
            return false;
        }
    }
};

var startTime = function(that){
    var time=time||60;
    $(that).css("font-size","14px");
    $(that).removeClass("dx").data("time",time).html(time+"秒后重新发送");
    timer=window.setInterval(function(){
        var t=parseInt($(that).data("time"));
        if(t>0){
            $(that).html(t+"秒后重新发送");
            t--;
            $(that).data("time",t);
        }else{
            $(that).html("获取").addClass("dx");
            clearInterval(timer);
        }
    },1000);
}

// //计算窗口高度
// function scrollHeight(id, status, num) {
//     var id = id || ".js_height";
//     var status = status || height;
//     var num = num || 0;
//     var height = $(window).height();

//     $("" + id + "").css("" + status + "", height - num);
// };

//select onchage事件
//function select_input(id,callback){
//    $(id).children("option").each(function(){
//        $(this).text($(this).data("obj").text);
//    });
//    $(id).change(function () {
//        callback($(this).find("option:selected").data("obj"));
//    });
//};

$(".js_close").click(function(){
    $(".fc").hide();
});

function js_bind(callback){
    $(".js_bind").unbind("click").bind("click",function(){
        var msg = $(this).data("obj").msg;
        jsDialog(msg,callback,this);
        // $("#js_cancle").remove();
    });
};

function jsDialog(text,callback,bindobj){
    $('#js_alert').remove();
    var str='<div class="fc" id="js_alert">\
            <div class="alert clearfix">\
                <div class="alert_head">重要提醒</div>\
                <div class="alert_cont">'+text+'</div>\
                <div class="alert_action">\
                    <span class="btn btn_default" id="js_cancle" onclick=$("#js_alert").remove();>取消</span>\
                    <span class="btn btn_primary js_alert_ok">确定</span>\
                </div>\
            </div>\
        </div>';
    $("body").append(str);

    if(callback){
        $('#js_alert').find(".js_alert_ok").bind("click",function(){
            callback.call(bindobj);
            $('#js_alert').remove();
        });
    }else{
        $('#js_alert').find(".js_alert_ok").bind("click",function(){
            $('#js_alert').remove();
        });
    }
    // $('#js_alert').show();
};

var url = function () {
  var scripts = document.scripts;
  var script = scripts[ scripts.length - 1 ];

  var url = script.hasAttribute ?
    script.src :
    // hack for IE8-
    // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
    script.getAttribute( "src", 4 );
    url = url.substr(0, url.lastIndexOf("/"));
    url = url.substr(0, url.lastIndexOf("/"));
    return url;
}();
function load(){
    if ($("#load").length > 0) {
        $("#load").remove();
    }else{
        var str='<div class="fc load" id="load">\
        <img src="'+url+'/img/loading.gif" alt="" class="load_img">\
        <p class="fz16 load_tit">数据加载中</p>\
    </div>';
    }
    $("body").append(str);
}

//地区三级联动
//省选
$(".js_select").change(function(cont){
    $(".js_select1").find("option").remove();
    cityArr = getCity($(this).val());
    for(var i = 0;i < cityArr.length;i++){
        var str='<option data-obj={"sub":"'+ cityArr[i].sub +'","ssub":"'+cityArr[i].ssub+'","code":"'+ cityArr[i].code +'","text":"'+cityArr[i].name+'"} >'+cityArr[i].name+'</option>';

        $(".js_select1").append(str);
    }
    if($(this).val() != '请选择省'){
        tmp($(".js_select1").find("option:selected").data("obj"));
    } else {
        $(".js_select1").html('<option checked="checked">请选择市</option>');
        $(".js_select2").html('<option checked="checked">请选择区</option>');
    }
});
// 市选
$(".js_select1").change(function(){
    tmp($(this).find("option:selected").data('obj'));
});

// 获取市区
var getCity = function(city){
    var cityArr = [];
    for (var i = 0 ; i < $.rawCitiesData.length; i++) {
        if($.rawCitiesData[i].name == city){
            for (var j =  0; j < $.rawCitiesData[i].sub.length; j++) {
                cityArr.push({
                    name:$.rawCitiesData[i].sub[j].name,
                    sub:i,
                    ssub:j,
                    code:$.rawCitiesData[i].sub[j].code
                });
            }
        }
    }
    return cityArr;
};

var tmp = function(that){
    var areaArr = $.rawCitiesData[that.sub].sub[that.ssub].sub;
    $(".js_select2").html("");
    for (var j = 0;j < areaArr.length;j++) {
        var str1='<option data-obj={"code":"'+ areaArr[j].code +'","text":"'+areaArr[j].name+'"} >'+areaArr[j].name+'</option>';
        $(".js_select2").append(str1);
    }
}

//上传图片
function change(picId,fileId) {
    var pic = $(".js_showtx");
    var file = document.getElementById(fileId);
    if(window.FileReader){//chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
        oFReader = new FileReader();
        oFReader.readAsDataURL(file.files[0]);
        oFReader.onload = function (oFREvent) {pic.attr("src",oFREvent.target.result)};
    }else if (document.all) {//IE8-
        file.select();
	file.blur();
        var reallocalpath = document.selection.createRange().text//IE下获取实际的本地文件路径
        if (window.ie6) pic.attr("src",reallocalpath); //pic.src = reallocalpath; IE6浏览器设置img的src为本地路径可以直接显示图片
        else { //非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现，IE10浏览器不支持滤镜，需要用FileReader来实现，所以注意判断FileReader先
            // pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
            pic.css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")");

            pic.attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
            // pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';//设置img的src为base64编码的透明图片，要不会显示红xx
        }
    }else if (file.files) {//firefox6-
        if (file.files.item(0)) {
            url = file.files.item(0).getAsDataURL();
            // pic.src = url;
            pic.attr("src",url);
        }
    }
}


