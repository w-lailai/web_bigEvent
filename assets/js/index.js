$(function () {
    getUserinfo();
    var layer = layui.layer;
    // 点击退出
    $('#btnLogout').on('click', function () {
        layer.confirm('您确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 清除token
            localStorage.removeItem('token');
            // 跳转到登录页
            location.href = './login.html';
            layer.close(index);
        });
    })

})
// 获取用户信息
function getUserinfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        header: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败!')
            }
            userAvatar(res.data)
        }
    })
}
// 渲染用户信息
function userAvatar(data) {
    // 判断昵称是否为空
    if (data.nickname == "") {
        $('#welcome').html('欢迎! &nbsp&nbsp&nbsp' + data.username);
        var avatar = data.username.substr(0, 1).toUpperCase();
    } else {
        $('#welcome').html('欢迎! &nbsp&nbsp&nbsp' + data.nickname);
        var avatar = data.nickname.substr(0, 1).toUpperCase();
    }
    // 判断头像
    if (data.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(avatar);
    } else {
        $('.layui-nav-img').show().src(data.user_pic);
        $('.text-avatar').hide();
    }
}
