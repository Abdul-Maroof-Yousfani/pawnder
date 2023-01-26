var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    function viewMainMenuTitleList(){
        $('#viewMainMenuTitleList').html('<tr><td colspan="4"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"><div class="loader"></div></div></div></div></td><tr>');
        $.ajax({
            url: baseUrl+'/udc/viewMainMenuTitleList',
            type: "GET",
            success:function(data) {
                setTimeout(function(){
                    $('#viewMainMenuTitleList').html(data);
                },1000);
            }
        });
    }
    viewMainMenuTitleList();


    $(function(){
        $('#addMainMenuTitleForm').on('submit',function(e){
            $.ajaxSetup({
                header:$('meta[name="_token"]').attr('content')
            })
            e.preventDefault(e);

            $.ajax({
                type:"POST",
                url:baseUrl+'/uad/addMainMenuTitleDetail',
                data:$(this).serialize(),
                dataType: 'json',
                success: function(data){
                    console.log(data);
                },
                error: function(data){
                }
            })
            $("#reset").click();
            viewMainMenuTitleList();
        });
    });
});