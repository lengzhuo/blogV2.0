var page = 1;
var key;
var is_jing;
$(function () {
    getArticleList();
});

/**
 * 获取文章列表
 */
function getArticleList() {
    $.get('/article', {page: page, key: key, is_jing: is_jing}, function (data) {
        console.log(data);
        if (data.status == 1) {
            var articleList = data.result;
            var html = '';
            for (var i = 0; i < articleList.length; i++) {
                html += "<li class=\"col-md-4\">";
                html += "<div class=\"excerpt-minic\">";
                html += "<div class=\"manage-list-box1\"><img src=\"/uploads/" + articleList[i].img + "\" class=\"img-responsive\">";
                html += "<h3><a href=\"#\">" + articleList[i].title + "</a></h3>";
                html += "<p>" + articleList[i].content + "</p>";
                html += "</div>";
                html += "<div class=\"cat\"><span><a href=\"#\">" + articleList[i].f_create_at + "</a></span><span class=\"fr\"><i\n" +
                    "class=\"glyphicon glyphicon-pencil\"></i><a onclick=\"pubboxshow(\'" + articleList[i]._id + "\')\">编辑</a></span>";
                html += "<span class=\"fr\"><i class=\"glyphicon glyphicon-trash\"></i><a href=\"javascript:;\" onclick=\"deleteArticle(\'" + articleList[i]._id + "\')\">删除</a></span>";
                html += "</div>";
                html += "</div>";
                html += "</li>";
            }
            $("#articleList").html(html);
            var pageHtml = '';
            page = data.page;
            $("#page").html('');
            if (data.totalPage > 1) {
                pageHtml += "<ul class=\"pagination my-pagination\">";
                if (page > 1) {
                    pageHtml += "<li><a href=\"javascript:;\" onclick=\"setPage(\'" + (parseInt(page) - 1) + "\')\">&laquo;</a></li>";
                }
                pageHtml += "<li><a href=\"#\">第" + page + "页/共" + data.totalPage + "页</a></li>";
                if (page < data.totalPage) {
                    pageHtml += "<li><a href=\"javascript:;\" onclick=\"setPage(\'" + (parseInt(page) + 1) + "\')\">&raquo;</a></li>";
                }
                pageHtml += "</ul>";
            }
            $("#page").html(pageHtml);
        }
    });
}

/**
 *设置翻页
 */
function setPage(p) {
    page = p;
    getArticleList();
}

/**
 * 设置key
 */
function setKey() {
    key = $('#key').val();
    getArticleList();
}

function setJing() {

    is_jing = $('#checkbox1').val();
    if (is_jing == 1) {
        is_jing = 1;
        $('#checkbox1').val("0");
    } else {
        is_jing = null;
        $('#checkbox1').val("1");
    }
    //alert(is_jing);
    getArticleList();
}

/**
 * 更新文章
 */
function updateArticle(id) {
    $.get('/article/' + id, function (data) {
        if (data.status == 1) {
            var article = data.result;
            var article_is_jing = "";
            if (article.is_jing == 1){
                article_is_jing += "<div class=\"radio-inline\">";
                article_is_jing += "<input class=\"magic-radio\" type=\"radio\" name=\"is_jing\" id=\"r1\" value=\"1\" checked>";
                article_is_jing += "<label for=\"r1\">是</label>";
                article_is_jing += "</div>";
                article_is_jing += "<div class=\"radio-inline\">";
                article_is_jing += "<input class=\"magic-radio\" type=\"radio\" name=\"is_jing\" id=\"r2\" value=\"0\">";
                article_is_jing += "<label for=\"r2\">否</label>";
                article_is_jing += "</div>";
            }else {
                article_is_jing += "<div class=\"radio-inline\">";
                article_is_jing += "<input class=\"magic-radio\" type=\"radio\" name=\"is_jing\" id=\"r1\" value=\"1\">";
                article_is_jing += "<label for=\"r1\">是</label>";
                article_is_jing += "</div>";
                article_is_jing += "<div class=\"radio-inline\">";
                article_is_jing += "<input class=\"magic-radio\" type=\"radio\" name=\"is_jing\" id=\"r2\" value=\"0\" checked>";
                article_is_jing += "<label for=\"r2\">否</label>";
                article_is_jing += "</div>";
            }
            $("#article_img").attr({src:"/uploads/"+article.img});
            $("[name=article_title]").val(article.title);
            $("[name=article_author]").val(article.author);
            $("[name=article_category]").val(article.category_id);
            $("#article_is_jing").html(article_is_jing);
            $("[name=article_content]").val(article.content);
        }
    });
}

/**
 * 删除文章
 */
function deleteArticle(id) {
    layer.confirm('是否删除？', {
        btn: ["是", "否"]
    }, function () {
        $.get("/article/delete/" + id, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                getArticleList();
            } else {
                layer.msg(data.msg);
            }
        });
    });


}