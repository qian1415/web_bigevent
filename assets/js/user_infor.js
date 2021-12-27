$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度需要在0-6个字符之间'
            }

        }
    })

    initUserInfor ()

    function initUserInfor (){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formuser',res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfor ()

    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfor()

            }
        })

    })
})