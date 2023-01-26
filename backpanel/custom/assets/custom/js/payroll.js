var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function(){
    $('#sub_department_id').select2();
    $('#emp_id').select2();
    $('#department_id').select2();
});


function showPayrollReport(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    var month_year = $('#month_year').val();
    var company_id = m;
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

        $.ajax({
            url: baseUrl+'/hdc/companyWisePayrollReport',
            type: "GET",
            data: {company_id:company_id,month_year:month_year},
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

function showPayrollReportBank(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    var month_year = $('#month_year').val();
    var company_id = m;
    var cheque_no =  $('#cheque_no').val();
    var cheque_date = $("#cheque_date").val();
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

        $.ajax({
            url: baseUrl+'/hdc/viewBankReportDetail',
            type: "GET",
            data: {company_id:company_id,month_year:month_year,cheque_no:cheque_no,cheque_date:cheque_date},
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

function viewEmployeePayrollForm(){
    $("#employeePayslipSection").css({"display": "none"});
    $('.employeePayslipSection').empty();
    var emp_id = $('#emp_id').val();
    var payslip_month = $('#payslip_month').val();
    var sub_department = $("#sub_department_id").val();
    var department_id = $("#department_id").val();
    var datas = '';
    var show_all = $('#show_all').val();
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeePayslipSection").css({"display": "block"});
        $('#run_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

        if ($("#show_all").is(":checked")) {

            var datas = {show_all:show_all,emp_id:emp_id,payslip_month:payslip_month,m:m,sub_department:sub_department,department_id:department_id}
        }
        else{
            var datas = {emp_id:emp_id,payslip_month:payslip_month,m:m,sub_department:sub_department,department_id:department_id}
        }
        $.ajax({
            url: baseUrl+'/hdc/viewEmployeePayrollForm',
            type: "GET",
            data: datas,
            success:function(data) {

                $('.employeePayslipSection').empty();
                $('.employeePayslipSection').append('<div class="">'+data+'</div>');
                $('#run_loader').html('');
                // $('#TaxesList ').tableHover({colClass: 'hover'});
            }
        });
    }else{
        return false;
    }
}

function viewPayrollReport(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var payslip_month = $('#payslip_month').val();
    var department_id = $('#department_id').val();
    var sub_department_id = $('#sub_department_id').val();
    var show_all = $('#show_all').val();
    var data = '';
    var emp_id = $("#emp_id").val();
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        if ($("#show_all").is(":checked")) {
            var data = {show_all:show_all,m:m,payslip_month:payslip_month,department_id:department_id,sub_department_id:sub_department_id}
        }
        else{
            var data = {m:m,payslip_month:payslip_month,department_id:department_id,sub_department_id:sub_department_id,emp_id:emp_id}
        }

        $.ajax({
            url: baseUrl+'/hdc/viewPayrollReport',
            type: "GET",
            data:data,
            success:function(data) {
                $('#loader').html('');
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+data+'</div>');
            }
        });
    }
    else{
        return false;
    }


}


function viewConcileReport(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var month_from = $('#month_year_from').val();
    var month_to = $('#month_year_to').val();
    var data = '';
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});

            var data = {m:m,month_to:month_to,month_from:month_from}


        $.ajax({
            url: baseUrl+'/hdc/viewConcileReport',
            type: "GET",
            data:data,
            success:function(data) {
                $('#loader').html('');
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+data+'</div>');
            }
        });
    }
    else{
        return false;
    }


}
function viewComparisonReport() {
    $("#employeeAttendenceReportSection").css({"display": "none"});
    $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var month_from = $('#month_year_from').val();
    var month_to = $('#month_year_to').val();
    var data = '';
    jqueryValidationCustom();
    if (validate == 0) {
        $("#employeeAttendenceReportSection").css({"display": "block"});

        var data = {m: m, month_to: month_to, month_from: month_from}


        $.ajax({
            url: baseUrl + '/hdc/viewComparisonReport',
            type: "GET",
            data: data,
            success: function (data) {
                $('#loader').html('');
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + data + '</div>');
            }
        });
    }
    else {
        return false;
    }
}