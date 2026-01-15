// 2015-5-25
// .addClass .removeClass .css .mousemove .mouseleave [.tablelist tr:odd]

$(document).ready(function () {
    //流量统计
    ajaxsending('/Ajax/Ajax_Web.ashx', 'type=PageView', function (data) { }, '', false);
});

//window.onload = function () { }


/*#region ==========搜索功能==========*/
//产品搜索
function SearchPro() {
    $("#search_btn").click(function () {
        var keyword = $.trim($("#search_txt").val());
        if (keyword != "")
            window.location.href = "/WebShop/ProductList.aspx?keyword=" + escape(keyword);
    });
    $("#search_txt").keydown(function (e) {
        e = (e) ? e : ((window.event) ? window.event : "")
        var keyword = e.keyCode ? e.keyCode : e.which;
        if (keyword == 13 && $("#search_txt").val() != "") {
            keyword = $.trim($("#search_txt").val());
            window.location.href = "/WebShop/ProductList.aspx?keyword=" + escape(keyword);
            return false;
        }
    });
    $(".search_link a").click(function () {
        var keyword = $.trim($(this).html());
        if (keyword != "") {
            window.location.href = "/WebShop/ProductList.aspx?keyword=" + escape(keyword);
        }
    });
}
/*#endregion */


/*#region ==========页面展示==========*/
//打开关闭二级分类
function ClassOpen(obj){
	if($(obj).hasClass("aon")){
		$(obj).removeClass("aon");
		$(obj).parent().find('div.menuchild').hide(300);
	}
	else{
		$(obj).addClass("aon");
		$(obj).parent().find('div.menuchild').show(300);
	}
}

//打开工具栏购物车
function ToolCart(){
	if($("#toolbar_cart").hasClass("close")){
		$("#toolbar_cart").animate({right:"40px"});
		$("#toolbar_cart").removeClass("close");

		var t = Math.random().toString();
		var bodyheight = $(window).height() - 45;
		$("#bcart_iframe").html('<iframe src="/WebShop/pay/SmallCart.aspx?' + t + '" width="200" height="' + bodyheight + '" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>');
	}
	else{
		$("#toolbar_cart").animate({right:"-300px"});
		$("#toolbar_cart").addClass("close");
	}
}

//特定页面隐藏工具栏
function CloseToolbar() {
    var _PageName = PageName();
    if (_PageName == "M_Car" || _PageName == "M_CarDown") {
        $(".toolbar").addClass("hidden");
    }
}

//首页的导航默认显示
function IndexNav() {
    try {
        if ($("#nav" + navid).length > 0)
            $("#nav" + navid).addClass("aon");
        else
            $("#nav1").addClass("aon");
    }
    catch (e) { $("#nav1").addClass("aon"); }
}

//设置评论框架高度
function SetAssessHeight(height) {
    $("#AssessIframe").css("height", height + "px");
}
/*#endregion */


/*#region ==========数据读取==========*/
//读取会员登录信息
function CheckLoginHtml() {
    ajaxsending('/Ajax/Ajax_Login.ashx', 'type=CheckLoginHtml', function (data) {
        if (data.code == 1) {
            $(".ix-header .yideng").show();
            $(".ix-header .yideng em").text(data.Name);
        } else {
            $(".ix-header .deng").show();
        }
    }, 'json', false);
}

//文章添加点击数
function AddHits(ColumnID, DataId) {
    $.ajax({
        type: "POST", dataType: "text", url: "/Ajax/Ajax_Web.ashx",
        data: "type=AddHits&ColumnID=" + ColumnID + "&DataId=" + DataId,
        success: function (data) {
            if (data != "") { $("#hits").html(data); }
        }
    });
}
/*#endregion */


/*#region ==========读取分页数据==========*/
//通用分页读取数据
//必备条件：HF_Count表单、HF_SqlWhere表单、#layuipage容器、#tablelist列表并隐藏、字段规则{a}、同目录Ajax.ashx里使用GetPageList方法
function CommonPage(ajaxurl, ajaxtype, datacount, pagelimit, method) {
    var listreg = /(\{){1}(\w)+\}/g; //替换字段的正则
    var listdemo = $("#tablelist").html(); //读取列表模板
    var listfield = listdemo.match(listreg); //匹配全部字段
    $("#tablelist").html(""); //清楚模板内容
    $("#tablelist").removeClass("hidden"); //显示列表

    layui.use(['laypage'], function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'layuipage', count: datacount, groups: 1, limit: pagelimit, hash: 'p', curr: location.hash.replace('#!p=', ''),
            theme: '#f26000', prev: '<i class="layui-icon">&#xe603;</i>', next: '<i class="layui-icon">&#xe602;</i>',
            layout: ['prev', 'page', 'next'], skip: true,
            jump: function (obj, first) {
                //没有数据不加载
                if (datacount == 0) {
                    $("#layuipage").html('<p class="NodataTips">~查找不到您所需要的信息~</p>');
                    return;
                }
                DatatoLaypage(ajaxurl, ajaxtype, obj, listdemo, listfield, method, first);
            }
        });
    });

    //滚动记录当前页面位置
    window.addEventListener('scroll', function () {
        sessionStorage.setItem("postion_" + PageName(), document.documentElement.scrollTop);
    });
}

//读取数据并显示
function DatatoLaypage(ajaxurl, ajaxtype, obj, listdemo, listfield, method, first) {
    var parameter = $("#HF_Parameter").val(); //自定义参数
    $.ajax({
        async: true, type: "POST", dataType: "json",
        url: ajaxurl, data: "type=" + ajaxtype + "&curr=" + obj.curr + "&limit=" + obj.limit + "&" + parameter,
        beforeSend: function (data) {
            layer.load(2, { shade: false, time: 5000 }); //初始化加载动画
        },
        success: function (data) {
            layer.closeAll('loading'); //关闭加载动画
            var listhtml = '';
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var rowhtml = listdemo; //先读取模板，把模板中的匹配字段全部替换成json的内容
                    for (var f = 0; f < listfield.length; f++) {
                        var enfield = listfield[f].substr(1, listfield[f].length - 2); //去除{}号
                        var envalue = data[i][enfield];
                        if (envalue == null) { envalue = ""; }
                        rowhtml = rowhtml.replace(listfield[f], envalue); //替换内容
                    }
                    listhtml += rowhtml; //追加到列表html
                }
            }
            $("#tablelist").html(listhtml); //赋值到列表
            method(data);
            window.scrollTo(0, first ? sessionStorage.getItem("postion_" + PageName()) : 0); //定位到历史位置
        },
        error: function (data) {
            layer.closeAll('loading'); //关闭加载动画
            layer.msg("加载发生错误");
        }
    });
}

//保存排序id
function OrderSelect(obj) {
    var id = $(obj).attr("data-id");
    ajaxsend("/WebShop/ProductList.aspx", "t=saveoid&oid=" + id, function (data) {
        window.location.reload();
    }, "json", true);
}
/*#endregion */
