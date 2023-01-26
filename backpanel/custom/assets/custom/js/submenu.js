var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    $('#main_navigation_name').select2();
    function viewSubMenuList(){
        $('#viewSubMenuList').html('<tr><td colspan="4"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"><div class="loader"></div></div></div></div></td><tr>');
        $.ajax({
            url: baseUrl+'/udc/viewSubMenuList',
            type: "GET",
            success:function(data) {
                setTimeout(function(){
                    $('#viewSubMenuList').html(data);
                },1000);
            }
        });
    }
    viewSubMenuList();


    $(function(){
        $('#addSubMenuForm').on('submit',function(e){
            jqueryValidationCustom();
            if(validate==0){
                $.ajaxSetup({
                    header:$('meta[name="_token"]').attr('content')
                })
                e.preventDefault(e);

                $.ajax({
                    type:"POST",
                    url:baseUrl+'/uad/addSubMenuDetail',
                    data:$(this).serialize(),
                    dataType: 'json',
                    success: function(data){
                        alert(data);
                        console.log(data);
                    },
                    error: function(data){
                    }
                })
                $("#reset").click();
                viewSubMenuList();
            }
            else{
                return false;
            }

        });
    });
});
