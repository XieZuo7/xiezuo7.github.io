//=================================
// 购物车、收藏
//=================================
//购物车、收藏ajax
var carturl = "/Ajax/Ajax_Car.ashx";


/*#region ==========商品属性操作==========*/
//选择商品自己的规格属性
function ChooseAtt(obj, ItemID) {
    $(obj).parent().find("a.aon").removeClass("aon");
    $(obj).addClass("aon");
    AttToSave(ItemID);
}

//目前选择的规格样式赋值
function AttToSave(ItemID) {
    var _AttIds = '';
    var attaon = $(".Att_link a.aon");
    for (var i = 0; i < attaon.length; i++) {
        _AttIds += $(attaon[i]).attr("data-id") + ",";
    }
    ajaxsend(carturl, "type=GetProductAtt&ItemID=" + ItemID + "&AttIds=" + escape(_AttIds), function (data) {
        if (data.code == 1) {
            $("#HF_AttId").val(data.attid);
            $("#HF_AttJson").val(JSON.stringify(data));
            $("#d_price").html("￥" + data.price.toFixed(2));
            $("#d_tuanprice").html("￥" + data.tuanprice.toFixed(2));
            $("#d_number").html(data.number);
            if (data.number < 0)
                $(".d_number").html("充足");
            else if (data.number == 0)
                $(".d_price").html("￥" + $("#d_price").attr("data-old"));
            var pic = data.picture != "" ? data.picture : $("#d_picture").attr("data-old");
            $("#d_picture").html("<img src=\"" + pic + "\" onclick=\"TipsImg('','" + pic + "')\">");
            $("#ChooseHtml").html(data.attr);//当前选择
            //pc大图
            var attimg = $("#attimg" + data.attid);
            if (attimg.length > 0)
                MagicZoom.switchTo('Zoom-1', attimg[0]);
        }
        else {
            $("#HF_AttId").val("0");
            $("#HF_AttJson").val("");
            $("#d_price").html("￥" + $("#d_price").attr("data-old"));
            $("#d_tuanprice").html("￥" + $("#d_tuanprice").attr("data-old"));
            $("#d_number").html("0");
            var pic = $("#d_picture").attr("data-old");
            $("#d_picture").html("<img src=\"" + pic + "\" onclick=\"TipsImg('','" + pic + "')\">");
            $("#ChooseHtml").html('');
        }
    }, 'json', false);

}

//商品详细页商品加减
function BugNum(type) {
    var NowNum = $("#txtNum").val();
    var IntNum = parseInt(NowNum);
    if (type == 1) {
        IntNum = IntNum + 1;
    }
    else if (type == 2) {
        IntNum = IntNum - 1;
    }
    if (IntNum > 0) {
        $("#txtNum").val(IntNum);
    }
}

//购物车动画
function CartAnimate(ImgUrl, left, top, endleft, endtop) {
    if (ImgUrl == "") { return; }
    var flyer = $('<img src="' + ImgUrl + '" style="display:block;width:50px;height:50px;border-radius:50px;position:fixed;z-index:9999;border:1px solid #ccc;">');
    flyer.fly({
        start: { left: left, top: top },
        end: { left: endleft, top: endtop, width: 25, height: 25 },
        onEnd: function () { this.destory(); }
    });
}
/*#endregion */


function AddBiao1() {
    var id = GetQS("id");

    var FirstWriter = $("#FirstWriter").val();
    var FirstSex = $("#FirstSex").val();
    var FirstBirthday = $("#FirstBirthday").val();
    var FirstNianJi = $("#FirstNianJi").val();
    var FirstMobilePhone = $("#FirstMobilePhone").val();
    var SecondWriter = $("#SecondWriter").val();
    var SecondSex = $("#SecondSex").val();
    var SecondBirthday = $("#SecondBirthday").val();
    var SecondNianJi = $("#SecondNianJi").val();
    var SecondMobilePhone = $("#SecondMobilePhone").val();


    var SanWriter = $("#SanWriter").val();
    var SanSex = $("#SanSex").val();
    var SanBirthday = $("#SanBirthday").val();
    var SanNianJi = $("#SanNianJi").val();
    var SanMobilePhone = $("#SanMobilePhone").val();


    var DanName = $("#DanName").val();

    var AreaIds = $("#AreaIds").val();
    var AreaName = "";
    var selects = $("#cityform select");
    for (var i = 0; i < selects.length; i++) {
        AreaName += $(selects[i]).find("option:selected").text() + " ";
    }

    var Address = $("#Address").val();
    var PostalCode = $("#PostalCode").val();
    var FuLaoShi = $("#FuLaoShi").val();
    var WebChat = $("#WebChat").val();
    var Telephone = $("#Telephone").val();
    var MobilePhone = $("#MobilePhone").val();
    var Email = $("#Email").val();
    var ZuoName = $("#ZuoName").val();
    var ZuoParID = $("#ZuoParID").val();
    var ZuoWanTime = $("#ZuoWanTime").val();
    var XiangKe = $("#XiangKe").val();
    var HuoKuang = $("#HuoKuang").val();
    var FuJian = $("#FuJian").val();


    var ZuoPicture = $("#ZuoPicture").val();
    var ShangZuo = $("#ShangZuo").val();
    var ZuoChang = $("#ZuoChang").val();
    var ZuoKuan = $("#ZuoKuan").val();
    var ZuoGao = $("#ZuoGao").val();

    var ZuoWeight = $("#ZuoWeight").val();
    var ZuoDianKuang = $("#ZuoDianKuang").val();
    var ShenBaoBiao = $("#ShenBaoBiao").val();
    var Conts = $("#Conts").val();


    var YaoMa = $("#YaoMa").val();

    if ($("#IsXuYao").val() == 1) {
        if (YaoMa == "") {
            Tips("请输入完整资料1");
            return false;
        }
    }




    if (FirstWriter == "" || FirstSex == 0 || FirstBirthday == "" || FirstNianJi == 0 || FirstMobilePhone == "" || DanName == "" || AreaName == "" || Address == "" || FuLaoShi == "" || WebChat == "") {
        Tips("请输入完整资料2");
        return false;
    }
    else if (Telephone == "" || MobilePhone == "" || ZuoName == "" || ZuoParID == 0 || ZuoWanTime == "" || ShangZuo == "" ) {
        Tips("请输入完整资料3");
        return false;
    }
    //else if (Telephone == "" || MobilePhone == "" || ZuoName == "" || ZuoParID == 0 || ZuoWanTime == "" || HuoKuang == "" || FuJian == "" || ZuoPicture == "" || ShangZuo == "" || ZuoChang == "") {
    //    Tips("请输入完整资料");
    //    return false;
    //}
    else if (/*ZuoKuan == "" || ZuoGao == "" || ZuoWeight == "" || ZuoDianKuang == "" || ZuoChang == "" ||*/ ShenBaoBiao == "") {
        Tips("请输入完整资料4");
        return false;
    }
    else {

        if (FirstMobilePhone != "" && !CheckMobile(FirstMobilePhone)) {
            TipsForm("请输入正确联系手机", "FirstMobilePhone", 3); return;
        }

        if (SecondMobilePhone != "" && !CheckMobile(SecondMobilePhone)) {
            TipsForm("请输入正确联系手机", "SecondMobilePhone", 3); return;
        }

        if (MobilePhone != "" && !CheckMobile(MobilePhone)) {
            TipsForm("请输入正确手机", "MobilePhone", 3); return;
        }

        if (Email != "" && !CheckEmail(Email)) {
            TipsForm("请输入电子邮箱", "Email", 3); return;
        }

        var aa = true;
        var arr = AreaIds.split(',');
        for (var i in arr) {
            if (arr[i] == "0") {
                aa = false;
            }
        }
        if (!aa) {
            Tips("请选择正确省市区");
            return;
        }

        var data = "type=AddBiao1&id=" + id + "&FirstWriter=" + (FirstWriter) + "&FirstSex=" + (FirstSex) + "&FirstBirthday=" + (FirstBirthday) + "&FirstNianJi=" + (FirstNianJi);
        data += "&FirstMobilePhone=" + (FirstMobilePhone) + "&SecondWriter=" + (SecondWriter) + "&SecondSex=" + (SecondSex);
        data += "&SecondBirthday=" + (SecondBirthday) + "&SecondNianJi=" + (SecondNianJi) + "&SecondMobilePhone=" + (SecondMobilePhone);
        data += "&DanName=" + (DanName) + "&AreaIds=" + (AreaIds) + "&AreaName=" + (AreaName);
        data += "&Address=" + (Address) + "&PostalCode=" + (PostalCode) + "&FuLaoShi=" + (FuLaoShi);
        data += "&WebChat=" + (WebChat) + "&Telephone=" + (Telephone) + "&MobilePhone=" + (MobilePhone);
        data += "&Email=" + (Email) + "&ZuoName=" + (ZuoName) + "&ZuoParID=" + (ZuoParID);

        data += "&ZuoWanTime=" + (ZuoWanTime) + "&XiangKe=" + (XiangKe) + "&HuoKuang=" + (HuoKuang);
        data += "&FuJian=" + (FuJian) + "&ZuoPicture=" + (ZuoPicture) + "&ShangZuo=" + (ShangZuo);
        data += "&ZuoChang=" + (ZuoChang) + "&ZuoKuan=" + (ZuoKuan) + "&ZuoGao=" + (ZuoGao);
        data += "&ZuoWeight=" + (ZuoWeight) + "&ZuoDianKuang=" + (ZuoDianKuang) + "&ShenBaoBiao=" + (ShenBaoBiao);
        data += "&Conts=" + (Conts);
        data += "&YaoMa=" + (YaoMa);

        data += "&SanWriter=" + (SanWriter) + "&SanSex=" + (SanSex);
        data += "&SanBirthday=" + (SanBirthday) + "&SanNianJi=" + (SanNianJi) + "&SanMobilePhone=" + (SanMobilePhone);

        ajaxsend(carturl, data, function (data) {
            ajaxback(data);
            if (data.code == 1) {

                $('.theme-mask').show();
                $('.theme-mask').height($(document).height());
                $('.popover1').slideDown(200);
            }
            else {
                Tips(data.msg);
            }
        }, 'json', false);
    }

}

function EditBiao1() {
    var id = GetQS("id");

    var FirstWriter = $("#FirstWriter").val();
    var FirstSex = $("#FirstSex").val();
    var FirstBirthday = $("#FirstBirthday").val();
    var FirstNianJi = $("#FirstNianJi").val();
    var FirstMobilePhone = $("#FirstMobilePhone").val();
    var SecondWriter = $("#SecondWriter").val();
    var SecondSex = $("#SecondSex").val();
    var SecondBirthday = $("#SecondBirthday").val();
    var SecondNianJi = $("#SecondNianJi").val();
    var SecondMobilePhone = $("#SecondMobilePhone").val();


    var SanWriter = $("#SanWriter").val();
    var SanSex = $("#SanSex").val();
    var SanBirthday = $("#SanBirthday").val();
    var SanNianJi = $("#SanNianJi").val();
    var SanMobilePhone = $("#SanMobilePhone").val();

    var DanName = $("#DanName").val();

    var AreaIds = $("#AreaIds").val();
    var AreaName = "";
    var selects = $("#cityform select");
    for (var i = 0; i < selects.length; i++) {
        AreaName += $(selects[i]).find("option:selected").text() + " ";
    }

    var Address = $("#Address").val();
    var PostalCode = $("#PostalCode").val();
    var FuLaoShi = $("#FuLaoShi").val();
    var WebChat = $("#WebChat").val();
    var Telephone = $("#Telephone").val();
    var MobilePhone = $("#MobilePhone").val();
    var Email = $("#Email").val();
    var ZuoName = $("#ZuoName").val();


    var ZuoParID = $("#ZuoParID").val();
    var ZuoWanTime = $("#ZuoWanTime").val();
    var XiangKe = $("#XiangKe").val();
    var HuoKuang = $("#HuoKuang").val();
    var FuJian = $("#FuJian").val();


    var ZuoPicture = $("#ZuoPicture").val();
    var ShangZuo = $("#ShangZuo").val();
    var ZuoChang = $("#ZuoChang").val();
    var ZuoKuan = $("#ZuoKuan").val();
    var ZuoGao = $("#ZuoGao").val();

    var ZuoWeight = $("#ZuoWeight").val();
    var ZuoDianKuang = $("#ZuoDianKuang").val();
    var ShenBaoBiao = $("#ShenBaoBiao").val();
    var Conts = $("#Conts").val();

    var YaoMa = $("#YaoMa").val();

    if ($("#IsXuYao").val() == 1) {
        if (YaoMa == "") {
            Tips("请输入完整资料5");
            return false;
        }
    }

    if (FirstWriter == "" || FirstSex == 0 || FirstBirthday == "" || FirstNianJi == 0 || FirstMobilePhone == "" || DanName == "" || AreaName == "" || Address == "" || FuLaoShi == "" || WebChat == "") {
        Tips("请输入完整资料6");
        return false;
    }
    else if (Telephone == "" || MobilePhone == "" || ZuoName == "" || ZuoParID == 0 || ZuoWanTime == "" || ShangZuo == "" ) {
        Tips("请输入完整资料7");
        return false;
    }
    //else if (Telephone == "" || MobilePhone == "" || ZuoName == "" || ZuoParID == 0 || ZuoWanTime == "" || HuoKuang == "" || FuJian == "" || ZuoPicture == "" || ShangZuo == "") {
    //    Tips("请输入完整资料");
    //    return false;
    //}
    else if (/*ZuoKuan == "" || ZuoGao == "" || ZuoWeight == "" || ZuoDianKuang == "" || ZuoChang == "" ||*/ ShenBaoBiao=="") {
        Tips("请输入完整资料8");
        return false;
    }
    else {

        if (FirstMobilePhone != "" && !CheckMobile(FirstMobilePhone)) {
            TipsForm("请输入正确联系手机", "FirstMobilePhone", 3); return;
        }

        if (SecondMobilePhone != "" && !CheckMobile(SecondMobilePhone)) {
            TipsForm("请输入正确联系手机", "SecondMobilePhone", 3); return;
        }

        if (MobilePhone != "" && !CheckMobile(MobilePhone)) {
            TipsForm("请输入正确手机", "MobilePhone", 3); return;
        }

        if (Email != "" && !CheckEmail(Email)) {
            TipsForm("请输入电子邮箱", "Email", 3); return;
        }

        var aa = true;
        var arr = AreaIds.split(',');
        for (var i in arr) {
            if (arr[i] == "0") {
                aa = false;
            }
        }
        if (!aa) {
            Tips("请选择正确省市区");
            return;
        }

        var data = "type=EditBiao1&id=" + id + "&FirstWriter=" + (FirstWriter) + "&FirstSex=" + (FirstSex) + "&FirstBirthday=" + (FirstBirthday) + "&FirstNianJi=" + (FirstNianJi);
        data += "&FirstMobilePhone=" + (FirstMobilePhone) + "&SecondWriter=" + (SecondWriter) + "&SecondSex=" + (SecondSex);
        data += "&SecondBirthday=" + (SecondBirthday) + "&SecondNianJi=" + (SecondNianJi) + "&SecondMobilePhone=" + (SecondMobilePhone);
        data += "&DanName=" + (DanName) + "&AreaIds=" + (AreaIds) + "&AreaName=" + (AreaName);
        data += "&Address=" + (Address) + "&PostalCode=" + (PostalCode) + "&FuLaoShi=" + (FuLaoShi);
        data += "&WebChat=" + (WebChat) + "&Telephone=" + (Telephone) + "&MobilePhone=" + (MobilePhone);
        data += "&Email=" + (Email) + "&ZuoName=" + (ZuoName) + "&ZuoParID=" + (ZuoParID);

        data += "&ZuoWanTime=" + (ZuoWanTime) + "&XiangKe=" + (XiangKe) + "&HuoKuang=" + (HuoKuang);
        data += "&FuJian=" + (FuJian) + "&ZuoPicture=" + (ZuoPicture) + "&ShangZuo=" + (ShangZuo);
        data += "&ZuoChang=" + (ZuoChang) + "&ZuoKuan=" + (ZuoKuan) + "&ZuoGao=" + (ZuoGao);
        data += "&ZuoWeight=" + (ZuoWeight) + "&ZuoDianKuang=" + (ZuoDianKuang) + "&ShenBaoBiao=" + (ShenBaoBiao);
        data += "&Conts=" + (Conts);
        data += "&YaoMa=" + (YaoMa);


        data += "&SanWriter=" + (SanWriter) + "&SanSex=" + (SanSex);
        data += "&SanBirthday=" + (SanBirthday) + "&SanNianJi=" + (SanNianJi) + "&SanMobilePhone=" + (SanMobilePhone);

        ajaxsend(carturl, data, function (data) {
            ajaxback(data);
            if (data.code == 1) {
                TipsLink(data.msg, "/WebShop/member/M_BaoList.aspx");
            }
            else {
                Tips(data.msg);
            }
        }, 'json', false);
    }

}


function AddBiao2() {
    var id = GetQS("id");

    var DanName = $("#DanName").val();
    var DanZuoJi = $("#DanZuoJi").val();
    var LingName = $("#LingName").val();
    var LingMobile = $("#LingMobile").val();
    var Email = $("#Email").val();
    var WebChat = $("#WebChat").val();
    var AreaIds = $("#AreaIds").val();
    var AreaName = "";
    var selects = $("#cityform select");
    for (var i = 0; i < selects.length; i++) {
        AreaName += $(selects[i]).find("option:selected").text() + " ";
    }
    var Address = $("#Address").val();
    var UserName = $("#UserName").val();
    var FirstSex = $("#FirstSex").val();
    var FirstNianJi = $("#FirstNianJi").val();
    var Telephone = $("#Telephone").val();
    var JingSai = $("#JingSai").val();
    var XiangLei = $("#XiangLei").val();

    var SaiXing = $("#SaiXing").val();

    var ZuBie = $("#ZuBie").val();

    var FuLaoShi = $("#FuLaoShi").val();
    var MobilePhone = $("#MobilePhone").val();
    var FuJian = $("#FuJian").val();

    var Conts = $("#Conts").val();

    var TeamName = $("#TeamName").val();
    var FirstFuLaoShi = $("#FirstFuLaoShi").val();
    var FirstMobilePhone = $("#FirstMobilePhone").val();
    var SecondFuLaoShi = $("#SecondFuLaoShi").val();
    var SecondMobilePhone = $("#SecondMobilePhone").val();
    var ShenBaoBiao = $("#ShenBaoBiao").val();
    var ShangZuo = $("#ShangZuo").val();

    var YaoMa = $("#YaoMa").val();

    if ($("#IsXuYao").val() == 1) {
        if (YaoMa == "") {
            Tips("请输入完整资料9");
            return false;
        }
    }

    var ff = true;
    var ItemJson = "";
    $(".tb ul").each(function () {
        var MingZi = $(this).find("#MingZi").val();
        var XingBie = $(this).find("#XingBie").val();
        var DianHua = $(this).find("#DianHua").val();




        if (MingZi == "" || XingBie == "" || DianHua == "") {
            ff = false;
            return false;
        }

        ItemJson += "{\"MingZi\":\"" + MingZi + "\",\"XingBie\":\"" + XingBie + "\",\"DianHua\":\"" + DianHua + "\"},";
    })

    if (DanName == "" || DanZuoJi == "" || LingName == "" || LingMobile == 0 || Email == "" || WebChat == "" || AreaName == "" || Address == "") {
        Tips("请输入完整资料10");
        return false;
    }
    else if (UserName == "" || FirstSex == 0 || FirstNianJi == 0 || Telephone == "" || JingSai == 0 || XiangLei == 0 || ZuBie == 0) {
        Tips("请输入完整资料11");
        return false;
    }

    if (SaiXing == 0) {
        if (FuLaoShi == "" || MobilePhone == "" || FuJian == "" ) {
            Tips("请输入完整资料12");
            return false;
        }
    }
    else {
        if (!ff) {
            Tips("请输入完整资料13");
            return false;
        }

        if (TeamName == "" || FirstFuLaoShi == "" || FirstMobilePhone == "" || ShenBaoBiao == "" ) {
            Tips("请输入完整资料14");
            return false;
        }
    }

    if (LingMobile != "" && !CheckMobile(LingMobile)) {
        TipsForm("请输入正确领队手机", "LingMobile", 3); return;
    }

    if (Email != "" && !CheckEmail(Email)) {
        TipsForm("请输入正确电子邮箱", "Email", 3); return;
    }

    if (Telephone != "" && !CheckMobile(Telephone)) {
        TipsForm("请输入正确联系电话", "Telephone", 3); return;
    }

    if (MobilePhone != "" && !CheckMobile(MobilePhone)) {
        TipsForm("请输入正确手机", "MobilePhone", 3); return;
    }

    if (FirstMobilePhone != "" && !CheckMobile(FirstMobilePhone)) {
        TipsForm("请输入正确手机", "FirstMobilePhone", 3); return;
    }

    if (SecondMobilePhone != "" && !CheckMobile(SecondMobilePhone)) {
        TipsForm("请输入正确手机", "SecondMobilePhone", 3); return;
    }

    var aa = true;
    var arr = AreaIds.split(',');
    for (var i in arr) {
        if (arr[i] == "0") {
            aa = false;
        }
    }
    if (!aa) {
        Tips("请选择正确省市区");
        return;
    }



    var data = "type=AddBiao2&id=" + id + "&DanName=" + (DanName) + "&DanZuoJi=" + (DanZuoJi) + "&LingName=" + (LingName);
    data += "&LingMobile=" + (LingMobile) + "&Email=" + (Email) + "&WebChat=" + (WebChat);
    data += "&AreaIds=" + (AreaIds) + "&AreaName=" + (AreaName) + "&Address=" + (Address);
    data += "&UserName=" + (UserName) + "&FirstSex=" + (FirstSex) + "&FirstNianJi=" + (FirstNianJi);
    data += "&Telephone=" + (Telephone) + "&JingSai=" + (JingSai) + "&XiangLei=" + (XiangLei);
    data += "&SaiXing=" + (SaiXing) + "&ZuBie=" + (ZuBie);


    data += "&FuLaoShi=" + (FuLaoShi) + "&MobilePhone=" + (MobilePhone) + "&FuJian=" + (FuJian);
    data += "&Conts=" + (Conts) + "&TeamName=" + (TeamName) + "&FirstFuLaoShi=" + (FirstFuLaoShi); 
    data += "&FirstMobilePhone=" + (FirstMobilePhone) + "&SecondFuLaoShi=" + (SecondFuLaoShi) + "&SecondMobilePhone=" + (SecondMobilePhone);
    data += "&ShenBaoBiao=" + (ShenBaoBiao) + "&ShangZuo=" + (ShangZuo) + "&ItemJson=" + (ItemJson);
    data += "&YaoMa=" + (YaoMa);

    //alert(XiangLei);
    //return false;
    ajaxsend(carturl, data, function (data) {
        ajaxback(data);
        if (data.code >0) {

            $(".jixu").attr("href", "BaoBiao2.aspx?id=" + id + "&bid=" + data.key);
            $('.theme-mask').show();
            $('.theme-mask').height($(document).height());
            $('.popover1').slideDown(200);

        }
        else {
            Tips(data.msg);
        }
    }, 'json', false);
    

}

function EditBiao2() {
    var id = GetQS("id");

    var DanName = $("#DanName").val();
    var DanZuoJi = $("#DanZuoJi").val();
    var LingName = $("#LingName").val();
    var LingMobile = $("#LingMobile").val();
    var Email = $("#Email").val();
    var WebChat = $("#WebChat").val();
    var AreaIds = $("#AreaIds").val();
    var AreaName = "";
    var selects = $("#cityform select");
    for (var i = 0; i < selects.length; i++) {
        AreaName += $(selects[i]).find("option:selected").text() + " ";
    }
    var Address = $("#Address").val();
    var UserName = $("#UserName").val();
    var FirstSex = $("#FirstSex").val();
    var FirstNianJi = $("#FirstNianJi").val();
    var Telephone = $("#Telephone").val();
    var JingSai = $("#JingSai").val();
    var XiangLei = $("#XiangLei").val();

    var SaiXing = $("#SaiXing").val();

    var ZuBie = $("#ZuBie").val();

    var FuLaoShi = $("#FuLaoShi").val();
    var MobilePhone = $("#MobilePhone").val();
    var FuJian = $("#FuJian").val();

    var Conts = $("#Conts").val();

    var TeamName = $("#TeamName").val();
    var FirstFuLaoShi = $("#FirstFuLaoShi").val();
    var FirstMobilePhone = $("#FirstMobilePhone").val();
    var SecondFuLaoShi = $("#SecondFuLaoShi").val();
    var SecondMobilePhone = $("#SecondMobilePhone").val();
    var ShenBaoBiao = $("#ShenBaoBiao").val();
    var ShangZuo = $("#ShangZuo").val();

    var YaoMa = $("#YaoMa").val();

    if ($("#IsXuYao").val() == 1) {
        if (YaoMa == "") {
            Tips("请输入完整资料15");
            return false;
        }
    }


    var ff = true;
    var ItemJson = "";
    $(".tb ul").each(function () {
        var MingZi = $(this).find("#MingZi").val();
        var XingBie = $(this).find("#XingBie").val();
        var DianHua = $(this).find("#DianHua").val();

        if (MingZi == "" || XingBie == "" || DianHua == "") {
            ff = false;
            return false;
        }

        ItemJson += "{\"MingZi\":\"" + MingZi + "\",\"XingBie\":\"" + XingBie + "\",\"DianHua\":\"" + DianHua + "\"},";
    })

    if (DanName == "" || DanZuoJi == "" || LingName == "" || LingMobile == 0 || Email == "" || WebChat == "" || AreaName == "" || Address == "") {
        Tips("请输入完整资料16");
        return false;
    }
    else if (UserName == "" || FirstSex == 0 || FirstNianJi == 0 || Telephone == "" || JingSai == 0 || XiangLei == 0 || ZuBie == 0) {
        Tips("请输入完整资料17");
        return false;
    }

    if (SaiXing == 0) {
        if (FuLaoShi == "" || MobilePhone == "" || FuJian == "" ) {
            Tips("请输入完整资料18");
            return false;
        }
    }
    else {
        if (!ff) {
            Tips("请输入完整资料19");
            return false;
        }

        if (TeamName == "" || FirstFuLaoShi == "" || FirstMobilePhone == "" || ShenBaoBiao == "" ) {
            Tips("请输入完整资料20");
            return false;
        }
    }


    if (LingMobile != "" && !CheckMobile(LingMobile)) {
        TipsForm("请输入正确领队手机", "LingMobile", 3); return;
    }

    if (Email != "" && !CheckEmail(Email)) {
        TipsForm("请输入正确电子邮箱", "Email", 3); return;
    }

    if (Telephone != "" && !CheckMobile(Telephone)) {
        TipsForm("请输入正确联系电话", "Telephone", 3); return;
    }

    if (MobilePhone != "" && !CheckMobile(MobilePhone)) {
        TipsForm("请输入正确手机", "MobilePhone", 3); return;
    }

    if (FirstMobilePhone != "" && !CheckMobile(FirstMobilePhone)) {
        TipsForm("请输入正确手机", "FirstMobilePhone", 3); return;
    }

    if (SecondMobilePhone != "" && !CheckMobile(SecondMobilePhone)) {
        TipsForm("请输入正确手机", "SecondMobilePhone", 3); return;
    }

    var aa = true;
    var arr = AreaIds.split(',');
    for (var i in arr) {
        if (arr[i] == "0") {
            aa = false;
        }
    }
    if (!aa) {
        Tips("请选择正确省市区");
        return;
    }


    var data = "type=EditBiao2&id=" + id + "&DanName=" + (DanName) + "&DanZuoJi=" + (DanZuoJi) + "&LingName=" + (LingName);
    data += "&LingMobile=" + (LingMobile) + "&Email=" + (Email) + "&WebChat=" + (WebChat);
    data += "&AreaIds=" + (AreaIds) + "&AreaName=" + (AreaName) + "&Address=" + (Address);
    data += "&UserName=" + (UserName) + "&FirstSex=" + (FirstSex) + "&FirstNianJi=" + (FirstNianJi);
    data += "&Telephone=" + (Telephone) + "&JingSai=" + (JingSai) + "&XiangLei=" + (XiangLei);
    data += "&SaiXing=" + (SaiXing) + "&ZuBie=" + (ZuBie);


    data += "&FuLaoShi=" + (FuLaoShi) + "&MobilePhone=" + (MobilePhone) + "&FuJian=" + (FuJian);
    data += "&Conts=" + (Conts) + "&TeamName=" + (TeamName) + "&FirstFuLaoShi=" + (FirstFuLaoShi);
    data += "&FirstMobilePhone=" + (FirstMobilePhone) + "&SecondFuLaoShi=" + (SecondFuLaoShi) + "&SecondMobilePhone=" + (SecondMobilePhone);
    data += "&ShenBaoBiao=" + (ShenBaoBiao) + "&ShangZuo=" + (ShangZuo) + "&ItemJson=" + (ItemJson);
    data += "&YaoMa=" + (YaoMa);

    ajaxsend(carturl, data, function (data) {
        ajaxback(data);
        if (data.code > 0) {

            TipsLink(data.msg, "/WebShop/member/M_BaoList.aspx");

        }
        else {
            Tips(data.msg);
        }
    }, 'json', false);


}

function CertAdd() {

    var QuShi = $("#QuShi").val();
    var ClumnID = $("#ClumnID").val();
    var XueName = $("#XueName").val();
    var UserName = $("#UserName").val();
    var ShiShi = $("#ShiShi").val();
    var ShengShi = $("#ShengShi").val();

    if (QuShi == 0) {
        Tips("请选择参赛名称"); return;
    }

    if (XueName == "") {
        Tips("请输入学校名称"); return;
    }

    if (UserName == "") {
        Tips("请输入姓名"); return;
    }
    if (ClumnID == 669) {
        if (ShiShi == 0) {
            Tips("请选择竞赛赛事"); return;
        }
        if (ShengShi == 0) {
            Tips("请选择项目类别"); return;
        }
    }

    ajaxsending(carturl, 'type=CertAdd&QuShi=' + QuShi + '&ClumnID=' + ClumnID + '&XueName=' + XueName + '&UserName=' + UserName + '&ShiShi=' + ShiShi + '&ShengShi=' + ShengShi, function (data) {
        ajaxback(data);
        if (data.code > 0) {
            TipsLink(data.msg, "/WebShop/member/M_CertList.aspx");
        }
        else {
            Tips(data.msg);
        }

    }, 'json', false);
}


function DiyTu(bindName) {
    var id = GetQS("id")
    ajaxsending(carturl, 'type=DiyTu&id='+id+'&bindName=' + bindName, function (data) {
        ajaxback(data);
        if (data.code == 1) {
            $("#" + bindName + " .weui-uploader__files").html(data.key);
        }

    }, 'json', false);
}


function DelTu(tai, bindName) {
    var id = $(tai).attr('data-url');

    TipsConfirm("确定删除该图片?", function () {
        $("#HF_" + bindName).val('');
        var num = 0;
        $("#" + bindName + ' .weui-uploader__files').find("li").each(function () {
            if ($(this).attr("data-url") == id) {
                $(this).remove();
            } else {
                $("#HF_" + bindName).val($("#HF_" + bindName).val() + $(this).attr("data-url") + "|");
            }
        });
    });
}

/*#region ==========商品收藏==========*/
//添加收藏商品
function CollectionAdd(id) {
    ajaxsend(carturl, 'type=CollectionAdd&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1: Tips(data.msg); break;
            case 0: Tips(data.msg); break;
        }
    }, 'json', false);
}
//取消收藏商品
function CollectionDel(id) {
    TipsConfirm("你确定要删除吗？", function () {
        ajaxsend(carturl, 'type=CollectionDel&id=' + id, function (data) {
            ajaxback(data);
            switch (data.code) {
                case -2: TipsGoto(data.msg, data.key); break;
                case 1: $("#tablerow" + id).remove(); Tips(data.msg); break;
                case 0: Tips(data.msg); break;
            }
        }, 'json', false);
    });
}


//添加收藏商品【内页】
function CollInfoAdd(id) {
    ajaxsend(carturl, 'type=CollectionAdd&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1:
                $("#d_collbtn").html("<a onclick=\"CollInfoDel(" + id + ")\"><i class=\"iconfont ion\">&#xe7ec;</i><span>收藏</span></a>");
                $("#collbtnpc").html("<a onclick=\"CollInfoDel(" + id + ")\"><i class=\"iconfont ion\">&#xe7ec;</i><span>收藏</span></a>");
                Tips(data.msg); break;
            case 0: Tips(data.msg); break;
        }
    }, 'json', false);
}
//取消收藏商品【内页】
function CollInfoDel(id) {
    ajaxsend(carturl, 'type=CollectionDel&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1:
                $("#d_collbtn").html("<a onclick=\"CollInfoAdd(" + id + ")\"><i class=\"iconfont\">&#xe7e1;</i><span>收藏</span></a>");
                $("#collbtnpc").html("<a onclick=\"CollInfoAdd(" + id + ")\"><i class=\"iconfont\">&#xe7e1;</i><span>收藏</span></a>");
                Tips(data.msg); break;
            case 0: Tips(data.msg); break;
        }
    }, 'json', false);
}


//添加收藏商品【列表】
function CollListAdd(id) {
    ajaxsend(carturl, 'type=CollectionAdd&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1:
                $("#collbtnpc" + id).html('<a class="a1" onclick="CollListDel(' + id + ')"><i class="iconfont ion">&#xe62c;</i><span>收藏</span></a>');
                break;
            case 0: Tips(data.msg); break;
        }
    }, 'json', false);
}
//取消收藏商品【列表】
function CollListDel(id) {
    ajaxsend(carturl, 'type=CollectionDel&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1:
                $("#collbtnpc" + id).html('<a class="a1" onclick="CollListAdd(' + id + ')"><i class="iconfont">&#xe605;</i><span>收藏</span></a>');
                break;
            case 0: Tips(data.msg); break;
        }
    }, 'json', false);
}

//添加或取消收藏商品【列表】
function CollectionList(obj, id) {
    ajaxsend(carturl, 'type=Collection&id=' + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case -2: TipsGoto(data.msg, data.key); break;
            case 1: $(obj).html('<i class="iconfont icon-shoucang"></i><span>Collect</span>'); break;
            case 2: $(obj).html('<i class="iconfont icon-shoucang1"></i><span>Collect</span>'); break;
        }
    }, 'json', false);
}
/*#endregion */

/*#region ==========商品信息==========*/
//检测商品状态、点击量、库存等
function CheckProduct(id) {
    ajaxsend(carturl, "type=CheckProduct&id=" + id, function (data) {
        ajaxback(data);
        if (data.code == -1) {
            TipsGoto(data.msg, data.key); return;
        }
        //库存和价格
        if (data.Number < 0) { $(".d_number").html("充足"); }
        else { $(".d_number").html(data.Number); }
        $(".d_price").html("￥" + data.Price.toFixed(2));
        $(".d_sales").html(data.Sales);
        $(".d_coll").html(data.Collections);
        //商品收藏
        if (data.IsColl == 1) {
            $("#d_collbtn").html("<a onclick=\"CollInfoDel(" + data.ID + ")\"><i class=\"iconfont ion\">&#xe7ec;</i><span>收藏</span></a>");
        }
        //商品状态
        var State = data.State;
        if (State == -1) {
            $("#profoot_btn").html('<li class="nobtn"><a>商品已下架</a></li>');
        }
        else if (State == -2) {
            $("#profoot_btn").html('<li class="nobtn"><a>商品已售罄</a></li>');
        }
        //限时活动
        if (data.LimitType > 0) {
            $("#infopro_limit").removeClass("hidden");
            $(".limit_num").html('<span>剩余量：</span><em><b style="width:' + data.LimitPercen + '%"></b></em><span>' + data.LimitPercen + '%</span>');
            $(".limit_time b.StartTime").html(data.PromotionStart);
            $(".limit_time b.EndTime").html(data.PromotionEnd);
            $.getScript("/scripts/jquery.downCount.js", function () {
                TimeCountStart($(".downcount")[0]);
            });
            if (data.LimitType == 1) { $("#infopro_limit i").html("限时促销"); }
            else if (data.LimitType == 2) { $("#infopro_limit i").html("限时秒杀"); }
        }
    }, "json", false);
}

//检测商品状态、点击量、库存等
function CheckProduct_pc(id) {
    ajaxsend(carturl, "type=CheckProduct&id=" + id, function (data) {
        ajaxback(data);
        if (data.code == -1) {
            TipsGoto(data.msg, data.key); return;
        }
        //库存和价格
        if (data.Number == -1) { $("#d_number").html("充足"); }
        else { $("#d_number").html(data.Number); }
        $(".d_price").html("￥" + data.Price.toFixed(2));
        $(".d_sales").html(data.Sales);
        $(".d_coll").html(data.Collections);
        //商品收藏
        if (data.IsColl == 1) {
            $("#collbtnpc").html("<a onclick=\"CollInfoDel(" + data.ID + ")\"><i class=\"iconfont ion\">&#xe7ec;</i><span>收藏</span></a>");
        }
        //商品状态
        var State = data.State;
        if (State == -1) {
            $(".probtn").html('<a class="a3">商品已下架</a>');
        }
        else if (State == -2) {
            $(".probtn").html('<a class="a3">商品已售罄</a>');
        }
        //限时活动
        if (data.LimitType > 0) {
            $(".limittime").removeClass("hidden");
            $("b.StartTime").html(data.PromotionStart);
            $("b.EndTime").html(data.PromotionEnd);
            $.getScript("/scripts/jquery.downCount.js", function () {
                TimeCountStart($(".downcount")[0]);
            });
        }
    }, "json", false);
}

//检测礼品信息
function CheckGift(id) {
    ajaxsend(carturl, "type=CheckProduct&id=" + id, function (data) {
        ajaxback(data);
        if (data.code == -1) {
            TipsGoto(data.msg, data.key); return;
        }
        //库存和价格
        if (data.Number < 0) { $(".d_number").html("充足"); }
        else { $(".d_number").html(data.Number); }
        $(".d_price").html("￥" + data.Price.toFixed(2));
        $(".d_sales").html(data.Sales);
        $(".d_coll").html(data.Collections);
        $(".d_inte").html(data.IntegralFull);
        //商品收藏
        if (data.IsColl == 1) {
            $("#d_collbtn").html("<a onclick=\"CollInfoDel(" + data.ID + ")\"><i class=\"iconfont ion\">&#xe7ec;</i><span>收藏</span></a>");
        }
        //商品状态
        var State = data.State;
        if (State == -1) {
            $("#profoot_btn").html('<li class="nobtn"><a>商品已下架</a></li>');
        }
        else if (State == -2) {
            $("#profoot_btn").html('<li class="nobtn"><a>商品已售罄</a></li>');
        }
    }, "json", false);
}
/*#endregion */

/*#region ==========倒计时　==========*/
//开始的计时
function TimeCountStart(obj) {
    var timestr = $(obj).find(".StartTime").html();
    $(obj).find("span").html("距开始：");
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        TimeCountEnd(obj);
        $(obj).find("span").html("距结束：");
        $(obj).parent().find("a.btn").removeClass("hidden");
    });
}
//结束的计时
function TimeCountEnd(obj) {
    var timestr = $(obj).find(".EndTime").html();
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        $(obj).parent().remove();
    });
}


//开始的计时
function TuanTimeStart(obj) {
    var timestr = $(obj).find(".StartTime").html();
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        TuanTimeEnd(obj);
        $(".tuan_dmsg .tips").html("距结束还剩");
    });
}
//结束的计时
function TuanTimeEnd(obj) {
    var timestr = $(obj).find(".EndTime").html();
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        $(obj).remove();
    });
}


//开始的计时
function BargainTimeStart(obj) {
    var Processing = $(obj).find(".Processing").html();
    if (Processing == "0") {
        var timestr = $(obj).find(".CountTime").html();
        $(obj).downCount({
            date: timestr,
            offset: +10
        }, function () {
            $(obj).find(".text").html("已结束");
            $(obj).parent().find(".btn").html("查看结果");
        });
    }
    else {
        $(obj).remove();
    }
}


//首页开始的计时
function TimeIndexStart(obj) {
    var now = new Date();
    var timestr = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    console.log(timestr);
    $(obj).find("span").html("距开始：");
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        TimeIndexEnd(obj);
        $(obj).find("span").html("距结束：");
    });
}
//结束的计时
function TimeIndexEnd(obj) {
    var now = new Date();
    var timestr = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " 23:59:59";
    console.log(timestr);
    $(obj).downCount({
        date: timestr,
        offset: +10
    }, function () {
        $(obj).find("span").html("已结束");
    });
}
/*#endregion */



/*#region ==========商品下单==========*/
//详细页加入购物车
function InfoAddCar(DataId, HaveAttribute) {
    if (HaveAttribute == "0") {
        AddCar(DataId);
    }
    else {
        ProductBuyHtml(DataId);
    }
}
//详细页立即购买
function InfoAddFast(DataId, HaveAttribute, Url) {
    if (HaveAttribute == "0") {
        AddFast(DataId, Url);
    }
    else {
        ProductBuyHtml(DataId);
    }
}


//关闭购买窗口
function ProductBuyClose() {
    $(".mask").remove();
    $(".prochoose").stop();
    $(".prochoose").animate({ bottom: "-100%" }, "fast", function () {
        $(".prochoose").remove();
    });
}


//首页列表加入购物车
function OpenBuyDialog(DataId, HaveAttribute, Picture) {
    if (DataId == null || DataId == "") { return; }
    if (HaveAttribute != "1") {
        ListItemPlus(DataId, Picture);
    }
    else {
        ProductBuyHtml(DataId);
    }
}
//打开购买窗口
function ProductBuyHtml(DataId) {
    $.ajax({
        type: "GET", dataType: "html", data: "",
        url: "/WeixinShop/ProductBuy.aspx?id=" + DataId,
        success: function (data) {
            if (data != "") {
                $(".body").append(data);
                $(".prochoose").stop();
                $(".prochoose").animate({ bottom: "0%" });
                $(".body").append('<div class="mask" onclick="ProductBuyClose()"></div>');
            }
        }
    });
}


//首页列表加入购物车
function OpenBuyDialog_PC(DataId, HaveAttribute, Picture) {
    if (DataId == null || DataId == "") { return; }
    if (HaveAttribute != "1") {
        ListItemPlus(DataId, Picture);
    }
    else {
        ProductBuyHtml_PC(DataId);
    }
}
//打开购买窗口
function ProductBuyHtml_PC(DataId) {
    $.ajax({
        type: "GET", dataType: "html", data: "",
        url: "/WebShop/ProductBuy.aspx?id=" + DataId,
        success: function (data) {
            if (data != "") {
                $(".body").append(data);
                $(".prochoose").stop();
                $(".prochoose").animate({ bottom: "0%" });
                $(".body").append('<div class="mask" onclick="ProductBuyClose()"></div>');
            }
        }
    });
}
/*#endregion */

/*#region ==========购物车下单==========*/
//商品详细页加入商品到购物车
function AddCar(ItemID) {
    var Num = $("#txtNum").val();
    var Attid = $("#HF_AttId").val();
    var datastr = "type=ItemPlus&ItemID=" + escape(ItemID) + "&Num=" + escape(Num) + "&Attid=" + escape(Attid);
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                ProductBuyClose();
                $(".CarItemNum").removeClass("hidden");
                Tips(data.msg);
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品详细页加入商品到购物车
function AddCar_PC(ItemID, ImgUrl) {
    var left = 0, top = 0, endleft = 0, endtop = 0;
    try {
        if (IsFromMobile()) {
            left = event.clientX; top = event.clientY;
            endleft = $(window).width() * 0.62; endtop = $(window).height();
        }
        else {
            left = event.clientX; top = event.clientY;
            endleft = $(window).width(); endtop = 300;
        }
    }
    catch (e) { }

    var Num = $("#txtNum").val();
    var Attid = $("#HF_AttId").val();
    var datastr = "type=ItemPlus&ItemID=" + escape(ItemID) + "&Num=" + escape(Num) + "&Attid=" + escape(Attid);
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                var model = JSON.parse(data.key);
                $(".CarItemNum").html(model.num);
                CartAnimate(ImgUrl, left, top, endleft, endtop); //动画
                ProductBuyClose();
                Tips(data.msg);
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//快速下单支付
function AddFast(ItemID, Url) {
    var Num = $("#txtNum").val();
    var Attid = $("#HF_AttId").val();
    var datastr = "type=FastAddOrder&ItemID=" + escape(ItemID) + "&Num=" + escape(Num) + "&Attid=" + escape(Attid);
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1: window.location.href = Url; break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品列表数量加一
function ListItemPlus(ItemID, ImgUrl) {
    var left = 0, top = 0, endleft = 0, endtop = 0;
    try {
        if (IsFromMobile()) {
            left = event.clientX; top = event.clientY;
            endleft = $(window).width() * 0.62; endtop = $(window).height();
        }
        else {
            left = event.clientX; top = event.clientY;
            endleft = $(window).width(); endtop = 300;
        }
    }
    catch (e) { }

    var datastr = "type=ItemPlus&ItemID=" + ItemID + "&Num=1&Attid=0";
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                var model = JSON.parse(data.key);
                $(".CarItemHtml").html(model.num);
                $(".CarItemNum").removeClass("hidden");
                CartAnimate(ImgUrl, left, top, endleft, endtop); //动画
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品列表数量减一
function ListItemLess(ItemID) {
    var datastr = "type=ItemLess&ItemID=" + ItemID + "&Num=1&Attid=0";
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                var model = JSON.parse(data.key);
                $(".CarItemHtml").html(model.num);
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}
/*#endregion */

/*#region ==========购物车操作==========*/
//绑定购物车列表
function CartListBind() {
    var CartCookie = $("#HF_CartCookie").val();
    var model = JSON.parse(CartCookie);

    var listreg = /(\{){1}(\w)+\}/g; //替换字段的正则
    var listdemo = $("#cartdemo").html(); //读取列表模板
    var listfield = listdemo.match(listreg); //匹配全部字段
    $("#cartlist").html(""); //清空模板内容

    var listhtml = '';
    if (model.item != null && model.item.length > 0) {
        for (var i = 0; i < model.item.length; i++) {
            var rowhtml = listdemo; //先读取模板，把模板中的匹配字段全部替换成json的内容
            for (var f = 0; f < listfield.length; f++) {
                var enfield = listfield[f].substr(1, listfield[f].length - 2); //去除{}号
                var envalue = model.item[i][enfield];
                if (envalue == null) { envalue = ""; }

                if (enfield == "index") { envalue = i.toString(); }
                if (enfield == "checked" && model.item[i]["buy"]) { envalue = "checked"; }
                if (enfield == "lion" && model.item[i]["buy"]) { envalue = "lion"; }
                //if (enfield == "checked" && model.item[i]["ontime"]) { envalue += " disabled"; }

                rowhtml = rowhtml.replace(listfield[f], envalue); //替换内容
            }
            listhtml += rowhtml; //追加到列表html
        }
        $(".carnone").addClass("hidden");
    }
    else {
        $(".carnone").removeClass("hidden");
    }
    $("#SelectNumber").html(model._num);
    $("#SelectPrices").html("￥" + model._total.toFixed(2));
    if (model._total > 0) {
        $("#SelectInteYuan").html("+￥" + model._total.toFixed(2));
    }
    else {
        $("#SelectInteYuan").html("");
    }
    $("#SelectInte").html(model._intetotal)
    $("#AllPrices").html("￥" + model.total.toFixed(2));
    $(".CarItemNum").html(model.num);
    $("#cartlist").html(listhtml); //赋值到列表

    //是否全选
    var checknum = $("#cartlist .car_checkbox:checked").length;
    if (checknum == model.item.length) {
        $("#allcheck").prop("checked", "checked");
    }
    else {
        $("#allcheck").prop("checked", "");
    }
    //图片正方形
    var wid = $("#cartlist .img").width();
    $.getScript("/scripts/jqthumb.min.js", function () { $('#cartlist .img img').jqthumb({ width: wid, height: wid }); });
}

//商品数量加一
function ItemPlus(ItemID, Attid) {
    var datastr = 'type=ItemPlus&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=1';
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品数量减一
function ItemLess(ItemID, Attid) {
    var datastr = 'type=ItemLess&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=1';
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品数量更改
function ItemUpdate(obj, ItemID, Attid) {
    var val = $(obj).val();
    layer.prompt({ title: '请填写数量', formType: 0, value: val, shadeClose: true },
        function (value, index) {
            layer.close(index);

            var datastr = 'type=ItemUpdate&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=' + escape(value);
            ajaxsend(carturl, datastr, function (data) {
                ajaxback(data);
                switch (data.code) {
                    case 1:
                        $("#HF_CartCookie").val(data.key);
                        CartListBind();
                        break;
                    case -2: TipsGoto(data.msg, data.key); break;
                    default: Tips(data.msg); break;
                }
            }, 'json', true);
        });
}

//删除购物车某一商品
function ItemDel(ItemID, Attid) {
    TipsConfirm("你确定要删除吗？", function () {
        var datastr = "type=ItemDel&ItemID=" + ItemID + "&Attid=" + Attid;
        ajaxsend(carturl, datastr, function (data) {
            ajaxback(data);
            switch (data.code) {
                case 1:
                    $("#HF_CartCookie").val(data.key);
                    CartListBind();
                    break;
                case -2: TipsGoto(data.msg, data.key); break;
                default: Tips(data.msg); break;
            }
        }, 'json', true);
    });
}

//清空购物车
function ItemClear() {
    TipsConfirm("你确定要清空吗？", function () {
        ajaxsend(carturl, 'type=ItemClear', function (data) {
            ajaxback(data);
            switch (data.code) {
                case 1:
                    Tips(data.msg);
                    $("#HF_CartCookie").val(data.key);
                    CartListBind();
                    break;
                case -2: TipsGoto(data.msg, data.key); break;
                default: Tips(data.msg); break;
            }
        }, 'json', true);
    });
}



//选中购物车某个物品
function ItemChange(obj) {
    var ItemID = $(obj).attr("data-id");
    var Attid = $(obj).attr("data-attid");
    var isbuy = $(obj).prop("checked") ? 1 : 0;
    var datastr = "type=ItemSelect&isbuy=" + isbuy + "&ItemID=" + ItemID + "&Attid=" + Attid;
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', false);
}

//选中购物车全部物品
function AllChange() {
    var isbuy = $("#allcheck").prop("checked") ? 1 : 0;
    ajaxsend(carturl, 'type=ItemSelect&isbuy=' + isbuy, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                if (isbuy == 1) {
                    $(".itemrow").addClass("lion");
                    $(".car_checkbox").prop("checked", "checked");
                }
                else {
                    $(".itemrow").removeClass("lion");
                    $(".car_checkbox").prop("checked", "");
                }
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', false);
}
/*#endregion */



/*#region ==========积分下单==========*/
//商品详细页加入商品到购物车
function Int_AddCar(ItemID) {
    var Num = $("#txtNum").val();
    var Attid = $("#HF_AttId").val();
    var datastr = "type=Int_ItemPlus&ItemID=" + escape(ItemID) + "&Num=" + escape(Num) + "&Attid=" + escape(Attid);
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $(".CarItemNum").removeClass("hidden");
                Tips(data.msg);
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//快速下单支付【先添加到购物车，然后跳转】
function Int_AddFast(ItemID, Url) {
    var Num = $("#txtNum").val();
    var Attid = $("#HF_AttId").val();
    var datastr = "type=Int_FastAddOrder&ItemID=" + escape(ItemID) + "&Num=" + escape(Num) + "&Attid=" + escape(Attid);
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1: window.location.href = Url; break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}
/*#endregion */

/*#region ==========积分操作==========*/
//商品数量加一
function Int_ItemPlus(ItemID, Attid) {
    var datastr = 'type=Int_ItemPlus&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=1';
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品数量减一
function Int_ItemLess(ItemID, Attid) {
    var datastr = 'type=Int_ItemLess&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=1';
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', true);
}

//商品数量更改
function Int_ItemUpdate(obj, ItemID, Attid) {
    var val = $(obj).val();
    layer.prompt({ title: '请填写数量', formType: 0, value: val, shadeClose: true },
        function (value, index) {
            layer.close(index);

            var datastr = 'type=Int_ItemUpdate&ItemID=' + ItemID + '&Attid=' + Attid + '&Num=' + escape(value);
            ajaxsend(carturl, datastr, function (data) {
                ajaxback(data);
                switch (data.code) {
                    case 1:
                        $("#HF_CartCookie").val(data.key);
                        CartListBind();
                        break;
                    case -2: TipsGoto(data.msg, data.key); break;
                    default: Tips(data.msg); break;
                }
            }, 'json', true);
        });
}

//删除购物车某一商品
function Int_ItemDel(ItemID, Attid) {
    TipsConfirm("你确定要删除吗？", function () {
        var datastr = "type=Int_ItemDel&ItemID=" + ItemID + "&Attid=" + Attid;
        ajaxsend(carturl, datastr, function (data) {
            ajaxback(data);
            switch (data.code) {
                case 1:
                    $("#HF_CartCookie").val(data.key);
                    CartListBind();
                    break;
                case -2: TipsGoto(data.msg, data.key); break;
                default: Tips(data.msg); break;
            }
        }, 'json', true);
    });
}

//清空购物车
function Int_ItemClear() {
    TipsConfirm("你确定要清空吗？", function () {
        ajaxsend(carturl, 'type=Int_ItemClear', function (data) {
            ajaxback(data);
            switch (data.code) {
                case 1:
                    Tips(data.msg);
                    $("#HF_CartCookie").val(data.key);
                    CartListBind();
                    break;
                case -2: TipsGoto(data.msg, data.key); break;
                default: Tips(data.msg); break;
            }
        }, 'json', true);
    });
}



//选中购物车某个物品
function Int_ItemChange(obj) {
    var ItemID = $(obj).attr("data-id");
    var Attid = $(obj).attr("data-attid");
    var isbuy = $(obj).prop("checked") ? 1 : 0;
    var datastr = "type=Int_ItemSelect&isbuy=" + isbuy + "&ItemID=" + ItemID + "&Attid=" + Attid;
    ajaxsend(carturl, datastr, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', false);
}

//选中购物车全部物品
function Int_AllChange() {
    var isbuy = $("#allcheck").prop("checked") ? 1 : 0;
    ajaxsend(carturl, 'type=Int_ItemSelect&isbuy=' + isbuy, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                if (isbuy == 1) {
                    $(".itemrow").addClass("lion");
                    $(".car_checkbox").prop("checked", "checked");
                }
                else {
                    $(".itemrow").removeClass("lion");
                    $(".car_checkbox").prop("checked", "");
                }
                $("#HF_CartCookie").val(data.key);
                CartListBind();
                break;
            case -2: TipsGoto(data.msg, data.key); break;
            default: Tips(data.msg); break;
        }
    }, 'json', false);
}
/*#endregion */



/*#region ==========拼团下单==========*/
//拼团下单
function GroupToBuy(id, haveatt) {
    if (haveatt == "0") {
        window.location.href = "TuanDown.aspx?id=" + id;
    }
    else {
        BuyInfoHtml(id);
    }
}

//单独购买
function GroupAddFast(id, haveatt, url) {
    if (haveatt == "0") {
        AddFast(id, url);
    }
    else {
        BuyInfoHtml(id);
    }
}

//选择窗口确认
function GroupToBuyDialog(id) {
    var attid = $("#HF_AttId").val();
    window.location.href = "TuanDown.aspx?id=" + id + "&attid=" + attid;
}

//打开规格选择
function BuyInfoHtml(id) {
    $.ajax({
        type: "GET", dataType: "html", data: "",
        url: "/WeixinShop/group/BuyInfo.aspx?id=" + id,
        success: function (data) {
            if (data != "") {
                $(".body").append(data);
                $(".prochoose").stop();
                $(".prochoose").animate({ bottom: "0%" });
                $(".body").append('<div class="mask" onclick="ProductBuyClose()"></div>');
            }
        }
    });
}

//参团提交
function TuanJoinDialog(id, haveatt) {
    if (haveatt == "0") {
        TuanJoin();
    }
    else {
        $.ajax({
            type: "GET", dataType: "html", data: "",
            url: "/WeixinShop/group/BuyDown.aspx?id=" + id,
            success: function (data) {
                if (data != "") {
                    $(".body").append(data);
                    $(".prochoose").stop();
                    $(".prochoose").animate({ bottom: "0%" });
                    $(".body").append('<div class="mask" onclick="ProductBuyClose()"></div>');
                }
            }
        });
    }
}

//参团确定
function TuanJoin() {
    ajaxsend('', $('#form1').serialize(), function (data) {
        ajaxback(data);
        if (data.code == 1 || data.code == 2) {
            window.location.href = data.key;
        }
        else {
            Tips(data.msg);
        }
    }, 'json', true);
}

/*#endregion */

/*#region ==========砍价下单==========*/
//砍价下单
function BargainDown(id) {
    ajaxsend("/Ajax/Ajax_Car.ashx", "type=BargainDown&id=" + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                window.location.href = "/WeixinShop/bargain/bargaininfo.aspx?id=" + data.key;
                break;
            case 2:
                TipsGoto(data.msg, "/WeixinShop/bargain/bargaininfo.aspx?id=" + data.key)
                break;
            default:
                Tips(data.msg);
                break;
        }
    }, "json", true);
}

//砍价一下
function BargainKnife(id) {
    ajaxsend("/Ajax/Ajax_Car.ashx", "type=BargainKnife&id=" + id, function (data) {
        ajaxback(data);
        switch (data.code) {
            case 1:
                TipsRefresh(data.msg);
                break;
            default:
                Tips(data.msg);
                break;
        }
    }, "json", true);
}
/*#endregion */



/*#region ==========生成二维码==========*/
//打开海报
function OpenGetCode() {
    $(".body").append('<div class="mask" onclick="CloseGetCode()"></div>');
    $("#shareposter_box").removeClass("hidden");
}
//关闭海报
function CloseGetCode() {
    $(".mask").remove();
    $("#shareposter_box").addClass("hidden");
}

//生成商品海报
function GetCode_ProPoster(id) {
    $('html,body').animate({ scrollTop: 0 }, 100);
    CloseShare(); //先关闭分享
    ajaxsend(carturl, "type=GetPageCode&page=wxpro&id=" + id, function (data) {
        ajaxback(data);
        if (data.code != 1) {
            Tips(data.msg); return;
        }

        OpenGetCode();
        $("#poster_name").html('我是' + data.name + '，我为你推荐好物');
        $("#poster_head").attr('src', data.img);
        $("#poster_img").attr('src', data.qrcode);
        $("#saveposter").addClass('hidden');//有问题先停用

        if (checkiphone()) { return; }
        setTimeout(function () {
            html2canvas(document.querySelector("#shareposter"), { allowTaint: true, useCORS: true }).then(canvas => {
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                $('#shareposter_box').html(image);
                $("#saveposter").attr('href', canvas.toDataURL());
            });
        }, 500);
    }, "json", true);
}
//生成商品二维码
function GetCode_ProCode(id) {
    CloseShare(); //先关闭分享
    ajaxsend(carturl, "type=GetPageCode&page=wxpro&id=" + id, function (data) {
        ajaxback(data);
        if (data.code == 1) {
            TipsImg('', data.qrcode);
        }
        else {
            Tips(data.msg);
        }
    }, "json", true);
}

//检测部分不兼容设备
function checkiphone() {
    var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
    return isIPhoneXR;
}
/*#endregion */
