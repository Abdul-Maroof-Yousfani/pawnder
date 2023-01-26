var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$('#viewUploadAttendanceFileForm').click(function() {
    $(".attendance-area").css({"display": "block"});
    $('#attendance-area').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    $.ajax({
        url: baseUrl+"/hdc/viewUploadAttendanceFileForm",
        type: 'GET',
        data: {m : m},
        success: function (response){

            $('#attendance-area').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class=""></div></div></div>');
            $('#attendance-area').html(response);


        }
    });
});
$('#viewManualAttendanceForm').click(function() {
    $(".attendance-area").css({"display": "block"});
    $('#attendance-area').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    $.ajax({
        url: baseUrl+"/hdc/viewManualAttendanceForm",
        type: 'GET',
        data: {m : m},
        success: function (response){
            $('#attendance-area').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class=""></div></div></div>');
            $('#attendance-area').html(response);

        }
    });
});
function viewAttendanceProgress(){

    var department_id = $('#department_id').val();
    var sub_department_id = $('#sub_department_id').val();
    var employee_id = $('#emp_id').val();
    var month_year = $('#month_year').val();
    var from_date = $('#from_date').val();
    var to_date = $('#to_date').val();
    var show_all = $('#show_all').val();
    var data = '';
    if ($("#show_all").is(":checked")) {
        var data = {show_all:show_all,month_year:month_year,m:m,employee_id:employee_id,department_id:department_id,from_date:from_date,to_date:to_date,sub_department_id:sub_department_id}
    }
    else{
        var data = {month_year:month_year,m:m,employee_id:employee_id,department_id:department_id,from_date:from_date,to_date:to_date,sub_department_id:sub_department_id}
    }

    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl+'/hdc/viewAttendanceProgress',
            type: "GET",
            data: data,
            success:function(data) {
                $('#loader').html('');
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+data+'</div>');
            }
        });
    }else{
        return false;
    }
}
$(document).ready(function(){
    $("#department_id").select2();
    $("#sub_department_id").select2();
    $("#emp_id").select2();
});
$("#show_all").change(function(){
    if($('#show_all').is(':checked')){
        $('#department_id').prop("disabled", true);
        $('#sub_department_id').prop("disabled", true);
        $('#emp_id').prop("disabled", true);
    }
    else{
        $('#department_id').prop("disabled", false);
        $('#sub_department_id').prop("disabled", false);
        $('#emp_id').prop("disabled", false);
    }

});

function approveProgress(){
    //$('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    //var check = $('.ads_Checkbox').val();

    var favorite = [];
    $.each($("input:checkbox[name='check_list']:checked"), function(){
        favorite.push($(this).val());
    });
    //alert(favorite);


    jqueryValidationCustom();
    if(validate == 0){
        $.ajax({
            url: baseUrl+'/hedbac/approveEmployeePayrollDetail',
            type: "GET",
            data: {m:m,val:favorite},
            success:function(data) {
                attendanceProgressFilteredList();
                //location.reload();

            }
        });
    }else{
        return false;
    }
}

function rejectProgress(){
    //$('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    //var check = $('.ads_Checkbox').val();

    var favorite = [];
    $.each($("input:checkbox[name='check_list']:checked"), function(){
        favorite.push($(this).val());
    });
    //alert(favorite);


    jqueryValidationCustom();
    if(validate == 0){
        $.ajax({
            url: baseUrl+'/hedbac/rejectEmployeePayrollDetail',
            type: "GET",
            data: {m:m,val:favorite},
            success:function(data) {
                attendanceProgressFilteredList();
                //location.reload();

            }
        });
    }else{
        return false;
    }
}

$(function(){
    $('select[name="department_id"]').on('change', function() {

        $('#emp_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

        var department_id = $(this).val();

        if(department_id) {
            $.ajax({
                url: baseUrl+'/slal/MachineEmployeeListDeptWise',
                type: "GET",
                data: { department_id:department_id,m:m},
                success:function(data) {

                    $('#emp_loader').html('');
                    $('select[name="employee_id"]').empty();
                    $('select[name="employee_id"]').html(data);


                }
            });
        }else{
            $('select[name="employee_id"]').empty();
        }
    });
});
$(function(){
    $("#check_all").click(function(){

        if($("#check_all").prop("checked") == true)
        {
            $(".ads_Checkbox").prop("checked",true);
        }
        else
        {
            $(".ads_Checkbox").prop("checked",false);
        }


    });
});




function attendanceProgressFilteredList() {

    var month_year = $('#month_year').val();
    var m = $('#company_id').val();
    var accType = $('#accType').val();
    var acc_emp_id = $('#acc_emp_id').val();
    jqueryValidationCustom();
    if(validate == 0) {
        $('#employee-list').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl + "/hdc/attendanceProgressFilteredList",
            type: 'GET',
            data: {m: m, month_year: month_year,accType:accType,acc_emp_id:acc_emp_id},
            success: function (response) {

                $('#employee-list').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class=""></div></div></div>');
                var result = response;
                $('#employee-list').append(result);
            }
        });
    }else{
        return false;
    }
}


function showAttendanceReport(){

    $("#employeeAttendenceReportSection").css({"display": "none"});
    var department_id = $('#department_id').val();
    var sub_department_id = $('#sub_department_id').val();
    var employee_id = $('#emp_id').val();
    var from_date = $('#from_date').val();
    var to_date = $('#to_date').val();
    var employee_project_id = $('#employee_project_id').val();


    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl+'/hdc/viewAttendanceReport',
            type: "GET",
            data: {from_date:from_date,to_date:to_date,m:m,employee_id:employee_id,department_id:department_id,sub_department_id:sub_department_id,employee_project_id:employee_project_id},
            success:function(data) {

                $('#loader').html('');
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+data+'</div>');
            }
        });
    }else{
        return false;
    }
}



$(document).ready(function(){
    $("#department_id").select2();
    $("#sub_department_id").select2();
    $("#emp_id").select2();
});


