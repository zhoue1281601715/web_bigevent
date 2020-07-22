$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    var layer = layui.layer;
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })
    $('#file').on('change', function(e) {

        var filelist = e.target.files;
        //   console.log(files);
        if (filelist.length === 0) {
            return layer.msg('请上传图片');
        }
        var file = e.target.files[0];
        var imgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })
    $('#btnUpload').on('click', function() {
        alert(111)
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('更换图片失败');
                }
                layer.msg('更换图片成功');
                window.parent.getUserInfo();
            }
        });
    });
})