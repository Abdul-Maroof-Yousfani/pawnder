var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(".btn-success").click(function(e){
    var workingHoursSection = new Array();
    var val;
    // $("input[name='workingHoursSection[]']").each(function(){
    //     employee.push($(this).val());
    // });
    var _token = $("input[name='_token']").val();
    // for (val in workingHoursSection) {
        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    // }
});


$(document).ready(function() {

    var table = $('#workingHoursPolicList').DataTable({
        "dom": "t",
        "bPaginate" : false,
        "bLengthChange" : true,
        "bSort" : false,
        "bInfo" : false,
        "bAutoWidth" : false

    });

    $('#emp_id_search').keyup( function() {
        table.search(this.value).draw();
    });




});


function change_status(m,id,status,tableName){
    $.ajax({
        type:'GET',
        url:baseUrl+'/cdOne/change_status',
        data:{m:m,id:id,status:status},
        success:function(res){
            location.reload()
        }
    });
}

