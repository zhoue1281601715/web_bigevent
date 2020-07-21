$(function() {
    $('#link').on('click', function() {
        // alert('11');
        $('.login-box').hide();
        $('.reg-box').show();

    });
    $('#link1').on('click', function() {
        // alert('11');
        $('.reg-box').hide();
        $('.login-box').show();
    });
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    // var data = ;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();

        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                // layer.msg('注册失败');
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            layer.msg('注册成功，请登录');
            $('#link1').click();
        })
    });
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                }
                layer.msg('登录成功');
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });

});