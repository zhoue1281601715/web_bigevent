$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length < 6) {
                return '昵称必须在1 ~ 6个字符之间';
            }
        }
    });
    inituser_info();

    function inituser_info() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        });
    }
    $('#btnRest').on('click', function(e) {
        e.preventDefault();
        // alert('11');
        inituser_info();
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败');
                }
                layer.msg('用户信息更新成功');
                window.parent.getUserInfo();
            }
        });
    });
});