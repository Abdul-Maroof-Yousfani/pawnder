var m=$('#m').val();
var baseUrl=$('#baseUrl').val();





function manageEmployeeApplication(){
    $("#employeePayslipSection").css({"display": "none"});
    var emp_id = $('#emp_id').val();

    jqueryValidationCustom();
    if(validate == 0) {
        if(emp_id!=0){
            if(emp_id!='all'){
         $("#employeePayslipSection").css({"display": "block"});
        $('#run_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl+'/hdc/viewLeaveApplicationClientForm',
            type: "GET",
            data: {emp_id: emp_id, m: m},
            success: function (data) {
                $('.employeePayslipSection').empty();
                $('.employeePayslipSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + data + '</div>');
                $('#run_loader').html('');
            }
        });
            }
        }
    }


}

$(document).ready(function(){
    $("#department_id").select2();
    $("#sub_department_id").select2();
    $("#emp_id").select2();
});


function getEmployee(){

    var department = $("#department_id").val();
    var sub_department = $("#sub_department_id").val();

    if(department == '0'){
        $("#department_id_").val('0');
        $("#sub_department").val('0');
        $('select[name="emp_id"]').empty();
        $("#emp_id").prepend("<option value='0'>-</option>");
        return false;
    }
    if(department != '0' && sub_department == ''){
        data = {department:department,sub_department:'0',m:m}
    }
    else if(department != '' && sub_department != ''){
        data = {department:department,sub_department:sub_department,m:m}
    }
    if(department != ''){
        $('#emp_loader_1').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            type:'GET',
            url:baseUrl+'/slal/getSubDepartment',
            data:data,
            success:function(res){
                $('#emp_loader_1').html('');
                $('select[name="emp_id"]').empty();
                $('select[name="emp_id"]').html(res);
                $("select[name='emp_id'] option[value='all']").remove();

            }
        })
    }
    else{
        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id_1"]').empty();
        $('select[name="emr_no"]').empty();
    }
}


function getLeavesData(id,leave_day_type,leave_type)
{
    $('#leave_area'+id).append('<div class="row">&nbsp;</div><div class="loader"></div>');
    var url= baseUrl+'/hdc/viewLeaveApplicationDetail';
    var data = {m:m,id:id,leave_day_type:leave_day_type,leave_type:leave_type};
    $.getJSON(url, data ,function(result){
        $.each(result, function(i, field){
            $('#leave_area'+id).html('<hr>' +
                '<div class="row text-center" style="background-color: gainsboro">' +
                '<h4><b>Leave Application Details</b></h4>' +
                '</div>' +
                '<div class="row">&nbsp;</div>'+field);

        });
    })

}

$(document).ready(function() {

           // var table = $('#LeaveApplicationList').DataTable({
           //     "dom": "t",
           //     "bPaginate" : false,
           //     "bLengthChange" : true,
           //     "bSort" : false,
           //     "bInfo" : false,
           //     "bAutoWidth" : false
           //
           // });
           //
           // $('#emp_id_search').keyup( function() {
           //     table.search(this.value).draw();
           // });




});

function viewRangeWiseLeaveApplicationsRequests()
{
    jqueryValidationCustom();
    if(validate == 0) {
        $('#leavesLoader').append('<div class="row">&nbsp;</div><div class="loader"></div>');
        var data = '';
        var gm_Approvals;
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();
        var LeavesStatus = $("#LeavesStatus").val();
        var department_id = $("#department_id").val();
        var sub_department_id_1 = $("#sub_department_id").val();
        var employee_id = $("#emp_id").val();
        var company_id = $("#company_id").val();
        var url = baseUrl+'/hdc/viewRangeWiseLeaveApplicationsRequests';
        if($("#gm_Approval").prop("checked") == true){
            gm_Approvals = 1;
            data = {fromDate: fromDate, toDate: toDate, LeavesStatus: LeavesStatus,employee_id:employee_id,m:m,company_id:company_id,department_id:department_id,sub_department_id_1:sub_department_id_1,gm_Approvals:gm_Approvals}
        }
        else{
            data = {fromDate: fromDate, toDate: toDate, LeavesStatus: LeavesStatus,employee_id:employee_id,m:m,company_id:company_id,department_id:department_id,sub_department_id_1:sub_department_id_1}
        }
        $.ajax({
            url: url,
            type: "GET",
            data:data,
            success: function (data) {
                $('#leavesLoader').html("");
                $('.LeavesData').html(data);


            }
        })
    }

}
function LeaveApplicationRequestDetail(id,leave_day_type,leave_type_name,user_id,company_id)
{
    $('#leave_area'+id).append('<div class="row">&nbsp;</div><div class="loader"></div>');
    var url= baseUrl+'/hdc/viewLeaveApplicationRequestDetail';
    $.ajax({
        url: url,
        type: "GET",
        data: {id:id,leave_day_type:leave_day_type,leave_type_name:leave_type_name,user_id:user_id,m:company_id},
        success: function (data) {

            jQuery('#showDetailModelTwoParamerter').modal('show', {backdrop: 'false'});
            jQuery('#showDetailModelTwoParamerter .modalTitle').html('View Leave Application Detail');
            jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
            jQuery('#showDetailModelTwoParamerter .modal-body').html(data);


        }
    })


}
function editLeaveApplicationRequestDetail(id,leave_day_type,leave_type_name,user_id,company_id)
{
    // alert();
    $('#leave_area'+id).append('<div class="row">&nbsp;</div><div class="loader"></div>');
    var url= baseUrl+'/hdc/viewLeaveApplicationRequestDetail';
    var data = {id:id,leave_day_type:leave_day_type,leave_type_name:leave_type_name,user_id:user_id,m:company_id};
    $.getJSON(url, data ,function(result){
        $.each(result, function(i, field){
            $('#leave_area'+id).html('<hr>' +
                '<div class="row text-center" style="background-color: gainsboro">' +
                '<h4><b>Leave Application Details</b></h4>' +
                '</div>' +
                '<div class="row">&nbsp;</div>'+field);

        });
    })

}

function approveAndRejectLeaveApplications(recordId,approval_status,leave_day_type)
{

    var check = (approval_status == 2) ? "Approve":"Reject";

    var companyId = m;

    if(confirm('Do you want to '+check+' Leave Applicaiton ?'))
    {

        $.ajax({
            url: baseUrl+'/hdc/approveAndRejectLeaveApplication',
            type: "GET",
            data: {companyId:companyId,recordId:recordId,approval_status:approval_status},
            success:function(data) {
                location.reload();
            }
        });
    }
}

function approveAndRejectLeaveApplication2(recordId,approval_status_lm,leave_day_type)
{
    var check = (approval_status_lm == 2) ? "Approve":"Reject";

    var companyId = m;

    if(confirm('Do you want to '+check+' Leave Applicaiton ?'))
    {

        $.ajax({
            url: baseUrl+'/hdc/approveAndRejectLeaveApplication2',
            type: "GET",
            data: {companyId:companyId,recordId:recordId,approval_status_lm:approval_status_lm},
            success:function(data) {
                location.reload();
                //getPendingLeaveApplicationDetail('approval_status_lm',leave_day_type);
            }
        });
    }
}

function approveAndRejectLeaveApplication3(recordId,approval_status_hd,leave_day_type)
{

    var check = (approval_status_hd == 2) ? "Approve":"Reject";
    var url= baseUrl+'/cdOne/approveAndRejectLeaveApplication3';
    var companyId = m;

    if(confirm('Do you want to '+check+' Leave Applicaiton ?'))
    {

        $.ajax({
            url: url,
            type: "GET",
            data: {companyId:companyId,recordId:recordId,approval_status_hd:approval_status_hd},
            success:function(data) {
                getPendingLeaveApplicationDetail('approval_status_hd',approval_status_hd,leave_day_type);
            }
        });
    }
}

function RepostLeaveApplicationData(companyId,recordId)
{
    if(confirm('Do you want to Repost Leave Applicaiton ?'))
    {
        repostMasterTableRecords(recordId,'leave_application');

    }

}
function getPendingLeaveApplicationDetail(type,leave_day_type){
    var companyId = m;
    jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

    $.ajax({
        url: baseUrl+'/hdc/getPendingLeaveApplicationDetail',
        type: "GET",
        data: {m:companyId,type:type,leave_day_type:leave_day_type},
        success:function(data) {
            if(data == 0)
            {
                location.reload();
            }else{
                jQuery('#showDetailModelTwoParamerter .modal-body').html(data);
            }

        }
    });
}

$(document).ready(function(){
    $("#employee_project_id").select2();
    $("#emp_id").select2();
    $("#department_id").select2();
    $("#sub_department_id").select2();
});


function getEmployee(){
    var department = $("#department_id").val();
    var sub_department = $("#sub_department_id").val();

    if(department == '0'){
        $("#department_id_").val('0');
        $("#sub_department").val('0');
        $('select[name="emp_id"]').empty();
        $("#emp_id").prepend("<option value='0'>-</option>");
        return false;
    }
    if(department != '0' && sub_department == ''){
        data = {department:department,sub_department:'0',m:m}
    }
    else if(department != '' && sub_department != ''){
        data = {department:department,sub_department:sub_department,m:m}
    }
    if(department != ''){
        $('#emp_loader_1').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            type:'GET',
            url:baseUrl+'/slal/getSubDepartment',
            data:data,
            success:function(res){
                $('#emp_loader_1').html('');
                $('select[name="emp_id"]').empty();
                $('select[name="emp_id"]').html(res);

            }
        })
    }
    else{
        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id_1"]').empty();
        $('select[name="emr_no"]').empty();
    }
}
function viewLeavesBalances(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    var company_id = $('#company_id').val();
    var leaves_policy_id = $("#leaves_policy_id").val();
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl+'/hdc/viewLeavesBalances',
            type: "GET",
            data: {company_id:company_id,leaves_policy_id:leaves_policy_id},
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







































