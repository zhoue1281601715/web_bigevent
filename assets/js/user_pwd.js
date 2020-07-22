$(function() {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致';
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        // alert(111)
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(res) {
                // console.log(res);
                // alert(res)

                if (res.status !== 0) {
                    return layui.layer.msg('密码更新失败');
                }
                layui.layer.msg('密码更新成功');
                //重置密码
                $('.layui-form')[0].reset();
            }
        });
    });
});