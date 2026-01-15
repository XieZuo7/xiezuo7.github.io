//=================================
// 登陆注册、个人信息
//=================================
//登陆注册ajax
var loginurl = "/Ajax/Ajax_Login.ashx";
var AccountType = "帐号";


/*#region ==========登陆注册==========*/
//登录提交
function Login_Sub() {
    var AccountName = $.trim($("#txt_AccountName").val());
    var AccountPassword = $.trim($("#txt_AccountPassword").val());
    var Check = $.trim($("#txt_Check").val());

    if (AccountName == "") {
        TipsForm("请填写正确的" + AccountType, "txt_AccountName", 3); return;
    }
    if (AccountPassword == "") {
        TipsForm("请输入密码", "txt_AccountPassword", 3); return;
    }
    if (Check == "") {
        SwitchCode(); TipsForm("请输入验证码", "txt_Check", 3); return;
    }

    var datastr = "type=UserLogin&AccountName=" + escape(AccountName) + "&AccountPassword=" + escape(AccountPassword) + "&Check=" + escape(Check);
    ajaxsend(loginurl, datastr, function (data) {
        switch (data.code) {
            case -3: SwitchCode(); Tips(data.msg); break;
            case 1: TipsGoto(data.msg, "LoginSuccess.aspx"); break;
            default: Tips(data.msg); break;
        }
    }, "json", true);
}

//注册提交
function Reg_Sub() {
    var AccountName = $.trim($("#txt_AccountName").val());
    var AccountPassword1 = $.trim($("#txt_AccountPassword1").val());
    var AccountPassword2 = $.trim($("#txt_AccountPassword2").val());
    var Verify = $.trim($("#txt_Verify").val());

    if (!CheckEmail(AccountName) && !CheckMobile(AccountName)) {
        TipsForm("请填写正确的" + AccountType, "txt_AccountName", 3); return;
    }
    if (6 > AccountPassword1.length || AccountPassword1.length > 20) {
        TipsForm("密码必须由6-20个字符组成", "txt_AccountPassword1", 3); return;
    }
    if (AccountPassword1 != AccountPassword2) {
        TipsForm("两次密码输入不相同", "txt_AccountPassword2", 3); return;
    }
    if (Verify == "") {
        TipsForm("请输入验证码", "txt_Verify", 3); return;
    }

    if (!($('#regruler').is(':checked'))) {
        Tips("请阅读并同意《用户注册协议》"); return;
    }

    var datastr = "type=Register&AccountName=" + escape(AccountName) + "&AccountPassword=" + escape(AccountPassword1) + "&Verify=" + escape(Verify);
    ajaxsend(loginurl, datastr, function (data) {
        if (data.code == 1) {
            TipsGoto(data.msg, "User_WanShan.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}


function WanShan_Sub() {
    
    var DanName = $.trim($("#txt_DanName").val());
    var Name = $.trim($("#txt_Name").val());
    var Sex = $.trim($("#txt_Sex").val());
    var NianJi = $.trim($("#txt_NianJi").val());
    var MobilePhone = $.trim($("#txt_MobilePhone").val());

    if (DanName == "") {
        TipsForm("请输入单位名称", "txt_DanName", 3); return;
    }
    if (Name == "") {
        TipsForm("请输入姓名", "txt_Name", 3); return;
    }
    if (Sex == 0) {
        Tips("请选择性别"); return;
    }
    //if (NianJi == 0) {
    //    Tips("请选择年级"); return;
    //}
    if (MobilePhone == "") {
        TipsForm("请输入联系手机", "txt_MobilePhone", 3); return;
    }



    var datastr = "type=WanShan&DanName=" + escape(DanName) + "&Name=" + escape(Name) + "&Sex=" + escape(Sex) + "&NianJi=" + escape(NianJi) + "&MobilePhone=" + escape(MobilePhone);
    ajaxsend(loginurl, datastr, function (data) {
        if (data.code == 1) {
            TipsGoto(data.msg, "/WebShop/index.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}



//找回密码
function ResetPass() {
    var AccountName = $.trim($("#txt_AccountName").val());
    var AccountPassword1 = $.trim($("#txt_AccountPassword1").val());
    var AccountPassword2 = $.trim($("#txt_AccountPassword2").val());
    var Verify = $.trim($("#txt_Verify").val());
    
    if (!CheckEmail(AccountName) && !CheckMobile(AccountName)) {
        TipsForm("请填写正确的" + AccountType, "txt_AccountName", 3); return;
    }
    if (6 > AccountPassword1.length || AccountPassword1.length > 20) {
        TipsForm("密码必须由6-20个字符组成", "txt_AccountPassword1", 3); return;
    }
    if (AccountPassword1 != AccountPassword2) {
        TipsForm("两次密码输入不相同", "txt_AccountPassword2", 3); return;
    }
    if (Verify == "") {
        TipsForm("请输入验证码", "txt_Verify", 3); return;
    }

    var datastr = "type=ResetPass&AccountName=" + escape(AccountName) + "&AccountPassword=" + escape(AccountPassword1) + "&Verify=" + escape(Verify);
    ajaxsend(loginurl, datastr, function (data) {
        ajaxback(data);
        if (data.code == 1) {
            TipsGoto(data.msg, "User_Login.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}

//修改密码
function UpdatePass() {
    var oldpass = $.trim($("#txt_oldpass").val());
    var updatepass1 = $.trim($("#txt_updatepass1").val());
    var updatepass2 = $.trim($("#txt_updatepass2").val());
    
    if (6 > updatepass1.length || updatepass1.length > 20) {
        TipsForm("密码必须由6-20个字符组成", "txt_updatepass1", 3); return;
    }
    if (updatepass1 != updatepass2) {
        TipsForm("两次密码输入不相同", "txt_updatepass2", 3); return;
    }

    var datastr = "type=UpdatePass&oldpass=" + escape(oldpass) + "&updatepass=" + escape(updatepass1);
    ajaxsend(loginurl, datastr, function (data) {
        ajaxback(data);
        if (data.code == 1) {
            TipsGoto(data.msg, "../user/User_Login.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}

//绑定手机邮箱
function UserBindMobile() {
    var AccountName = $.trim($("#txt_AccountName").val());
    var AccountPassword = $.trim($("#txt_AccountPassword").val());
    var Verify = $.trim($("#txt_Verify").val());

    if (!CheckEmail(AccountName) && !CheckMobile(AccountName)) {
        TipsForm("请填写正确的" + AccountType, "txt_AccountName", 3); return;
    }
    if (6 > AccountPassword.length || AccountPassword.length > 20) {
        TipsForm("密码必须由6-20个字符组成", "txt_AccountPassword", 3); return;
    }
    if (Verify == "") {
        TipsForm("请输入验证码", "txt_Verify", 3); return;
    }

    var datastr = "type=UserBindMobile&AccountName=" + escape(AccountName) + "&AccountPassword=" + escape(AccountPassword) + "&Verify=" + escape(Verify);
    ajaxsend(loginurl, datastr, function (data) {
        ajaxback(data);
        if (data.code == 1) {
            TipsGoto(data.msg, "LoginSuccess.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}

//快捷登陆
function FastLogin() {
    var AccountName = $.trim($("#txt_AccountName").val());
    var Verify = $.trim($("#txt_Verify").val());
    if (!CheckEmail(AccountName) && !CheckMobile(AccountName)) {
        TipsForm("请填写正确的" + AccountType, "txt_AccountName", 3); return;
    }
    if (Verify == "") {
        TipsForm("请输入验证码！", "txt_Verify", 3); return;
    }

    var datastr = "type=FastLogin&AccountName=" + escape(AccountName) + "&Verify=" + escape(Verify);
    ajaxsend(loginurl, datastr, function (data) {
        if (data.code == 1) {
            TipsGoto(data.msg, "LoginSuccess.aspx");
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}
/*#endregion */


/*#region ==========上传头像==========*/
// 使用方法：
// 1、页面html：     <a id="updatebtn"><img class="img" src="" /></a>
// 2、引用上传控件： <script type="text/javascript" src="/scripts/plupload_2_1_2/plupload.full.min.js" charset="UTF-8"></script>
// 3、调用方法：     $(document).ready(function () { PluploadTouX("updatebtn"); });

//头像上传
function PluploadTouX(FormId) {
    //实例化一个plupload上传对象
    var uploader = new plupload.Uploader({
        browse_button: FormId,                        //触发文件选择对话框的按钮id
        runtimes: 'html5,flash,silverlight,html4',                //用什么技术引擎
        url: '/Ajax/TouX.ashx',                   //服务端上传接口路径
        flash_swf_url: '/scripts/plupload_2_1_2/Moxie.swf',       //plupload.flash.swf的所在路径
        silverlight_xap_url: '/scripts/plupload_2_1_2/Moxie.xap', //silverlight所在路径
        max_file_size: "10240kb",                         //文件上传最大限制。
        max_retries: 1,            //当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
        prevent_duplicates: false, //不允许选取重复文件
        dragdrop: true,            //启用文件到小部件能够拖放(操作)(目前唯一HTML5支持)
        multi_selection: false,    //是否可以在文件浏览对话框中选择多个文件
        //裁剪图片
        resize: { width: 120, height: 120, crop: true, quality: 80, preserve_headers: false },
        //这个数组是选择器，就是上传文件时限制的上传文件类型
        filters: [{ title: "上传图片", extensions: "png,jpg,jpeg"}]
    });
    //在实例对象上调用init()方法进行初始化
    uploader.init();

    //添加文件时触发
    uploader.bind('FilesAdded', function (uploader, files) {
        uploader.start(); //开始上传
    });
    //发生错误时触发
    uploader.bind('Error', function (uploader, errObject) {
        ErrObjectTips(errObject);
    });
    //单个文件上传完成时触发
    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
        //上传后返回的路径
        var imgpath = responseObject.response;
        var t = Math.random().toString();
        $("#updateimg").html("<img class='img' src='" + imgpath + "?" + t + "' />");
        Tips("用户头像已更新，刷新页面生效");
    });
}

function PluploadGe(FormId,InputId) {
    //实例化一个plupload上传对象
    var uploader = new plupload.Uploader({
        browse_button: FormId,                        //触发文件选择对话框的按钮id
        runtimes: 'html5,flash,silverlight,html4',                //用什么技术引擎
        url: '/Ajax/TouX.ashx?FormId=' + FormId + 'Picture',                  //服务端上传接口路径
        flash_swf_url: '/scripts/plupload_2_1_2/Moxie.swf',       //plupload.flash.swf的所在路径
        silverlight_xap_url: '/scripts/plupload_2_1_2/Moxie.xap', //silverlight所在路径
        max_file_size: "20480kb",                         //文件上传最大限制。
        max_retries: 1,            //当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
        prevent_duplicates: false, //不允许选取重复文件
        dragdrop: true,            //启用文件到小部件能够拖放(操作)(目前唯一HTML5支持)
        multi_selection: false,    //是否可以在文件浏览对话框中选择多个文件
        filters: [{ title: "", extensions: "pdf,png,jpg,jpeg,rar,zip" }]

    });
    //在实例对象上调用init()方法进行初始化
    uploader.init();

    //添加文件时触发
    uploader.bind('FilesAdded', function (uploader, files) {
        uploader.start(); //开始上传
    });
    //发生错误时触发
    uploader.bind('Error', function (uploader, errObject) {
        ErrObjectTips(errObject);
    });
    //单个文件上传完成时触发
    uploader.bind('FileUploaded', function (uploader, file, responseObject) {
        //上传后返回的路径
        var imgpath = responseObject.response;
        $("#" + InputId).val(imgpath);
        $("#Shang" + InputId).val(imgpath);
        //$("." + FormId + " p img").attr("src", imgpath);
        //$("#" + FormId + "Picture").val(imgpath);
        Tips("上传成功");
    });
}


//上传有误时提示的信息
function ErrObjectTips(errObject) {
    switch (errObject.code.toString()) {
        case "-600":
            Tips("文件大小不能超过20M"); break;
        case "-601":
            Tips("服务器不支持上传的格式文件"); break;
        case "-602":
            Tips("上传的文件中含有重复"); break;
        default:
            Tips("错误信息：" + errObject.message); break;
    }
}
/*#endregion */


/*#region ==========会员签到==========*/
//每日签到
function ClickToday() {
    ajaxsend(loginurl, "type=ClickToday", function (data) {
        ajaxback(data);
        if (data.code == 1) {
            TipsRefresh(data.msg);
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}
/*#endregion */