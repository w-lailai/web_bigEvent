$(function () {
    getList();

})
// 渲染分类列表
function getList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            var htmlStr = template('template', res);
            $('tbody').html(htmlStr);
        }
    })

}