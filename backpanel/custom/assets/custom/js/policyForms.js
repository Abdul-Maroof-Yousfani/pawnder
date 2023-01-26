var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    $(".btn-success").click(function(e){
        var employee = new Array();
        var val;
        $("input[name='HrSection[]']").each(function(){
            employee.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in employee) {
            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }
    });
    $("#category_id").select2();

});