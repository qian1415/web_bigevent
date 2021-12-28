$(function(){
    var layer = layui.layer
    initArtCateList()
    function initArtCateList (){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                console.log(res);
               var htmlStr = template('tpl-table',res)
               $('tbody').html(htmlStr)

            }
        })
    }
    var index2 = null
    $('#btnAddCate').on('click',function(){
        index2 = layer.open({
            type:'1',
            area:['600px','500px'],
            title:'添加文章分类',
            content:$('#tpl-table2').html()
        })

    })
    $('body').on('submit','.form2',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败')
                }
                initArtCateList ()
                layer.msg('新增分类成功')
                layer.close(index2)


            }
        })

    })
    var index3 = null
    var form = layui.form
    $('tbody').on('click','.btn-edit',function(){
        index3 = layer.open({
            type:'1',
            area:['600px','500px'],
            title:'修改文章分类',
            content:$('#tpl-table3').html()
        })

        var id =$(this).attr('data-id')
        console.log(id);
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit',res.data)

            }
        })
    })

    $('body').on('submit','#from2',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close()
            }
        })

    })

    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除分类失败')
                }
                layer.msg('删除分类成功')
                layer.close(index);
                initArtCateList()
            }

        })
            
            
          });


    })
})