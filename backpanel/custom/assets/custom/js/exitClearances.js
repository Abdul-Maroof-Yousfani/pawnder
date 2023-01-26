var m=$('#m').val();
var baseUrl=$('#baseUrl').val();


function viewEmployeeExitClearance() {

    $("#exitSectiondiv").css({"display": "none"});
    $('#exitSection').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var emp_id = $('#emp_id').val();
    var m = $('#company_id').val();

    if (emp_id != '')
    {

            $("#exitSectiondiv").css({"display": "block"});
            $.ajax({
                url: baseUrl+"/hdc/viewEmployeeExitClearanceForm",
                type: 'GET',
                data: {emp_id: emp_id, m : m},
                success: function (response){
                    $('#exitSection').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class=""></div></div></div>');
                    var result = response;
                    $('#exitSection').append(result);

                }
            });


        // else if($("Input[name='exit_clearance_check']:checked").val() == 2)
        // {
        //     $("#exitSectiondiv").css({"display": "block"});
        //     $.ajax({
        //         url: baseUrl+"/hdc/viewFinalSettlement",
        //         type: 'GET',
        //         data: {emp_id: emp_id, m: m},
        //         success: function (response) {
        //             $('#exitSection').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class=""></div></div></div>');
        //             $('#exitSection').append(response);
        //
        //         }
        //     });
        // }

    }
    else
    {
        $("#exitSectiondiv").css({"display": "none"});
        $('#exitSection').html('');
    }

}
//
//
// function getEmployee(){
//
//     var department = $("#department_id").val();
//     var sub_department = $("#sub_department_id").val();
//
//     if(department == '0'){
//         $("#department_id_").val('0');
//         $("#sub_department").val('0');
//         $('select[name="emp_id"]').empty();
//         $("#emp_id").prepend("<option value='0'>-</option>");
//         return false;
//     }
//     if(department != '0' && sub_department == ''){
//         data = {department:department,sub_department:'0',m:m}
//     }
//     else if(department != '' && sub_department != ''){
//         data = {department:department,sub_department:sub_department,m:m}
//     }
//     if(department != ''){
//         $('#emp_loader_1').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
//         $.ajax({
//             type:'GET',
//             url:baseUrl+'/slal/getSubDepartment',
//             data:data,
//             success:function(res){
//                 $('#emp_loader_1').html('');
//                 $('select[name="emp_id"]').empty();
//                 $('select[name="emp_id"]').html(res);
//
//             }
//         })
//     }
//     else{
//         $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
//         $('select[name="sub_department_id_1"]').empty();
//         $('select[name="emp_id"]').empty();
//     }
// }

// $(document).ready(function () {
//
//     // Wait for the DOM to be ready
//     $(".btn-success").click(function(e){
//         var employee = new Array();
//         var val;
//         $("input[name='employeeSection[]']").each(function(){
//             employee.push($(this).val());
//         });
//         var _token = $("input[name='_token']").val();
//         for (val of employee) {
//             jqueryValidationCustom();
//             if(validate == 0){
//                 //alert(response);
//             }else if(validate == 1){
//                 return false;
//             }
//         }
//
//     });
// });


function deleteEmployeeExitClearance(companyId,recordId,emr_no,tableName){
    var companyId;
    var recordId;
    var tableName;
    var emr_no;

    if(confirm("Do you want to delete this record ?") == true){
        $.ajax({
            url: baseUrl+'/cdOne/deleteEmployeeExitClearance',
            type: "GET",
            data: {companyId:companyId,recordId:recordId,tableName:tableName, emp:emr_no},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }
}

$(document).ready(function() {
    $('#sub_department_id').select2();
    $('#department_id').select2();
    $('#emp_id').select2();

    var table = $('#EmployExitCleareanceList').DataTable({
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

function approveAndRejectEmployeeExit(companyId, recordId, approval_status, tableName, employee_emr_no, employee_status){
    var companyId;
    var recordId;
    var tableName;
    var approval_status;
    var employee_emr_no;
    var employee_status;

    var approvalCode=prompt('Enter Approval Code !');

    if(!approvalCode)
    {
        alert('Approval Code Required !');
        return false;
    }
    else if(approvalCode != '') {

        $.ajax({
            url : ''+baseUrl+'/cdOne/approveAndRejectEmployeeExit',
            type: "GET",
            data: {'emr_no':employee_emr_no,'approvalCode':approvalCode,'request_type':'approve_reject',companyId: companyId, recordId: recordId, tableName: tableName, approval_status: approval_status, employee_emr_no: employee_emr_no, employee_status: employee_status},
            success: function (data) {
                console.log(data);
                if(data == 'error') {
                    alert('Incorrect Approval Code');
                }
                else{
                    location.reload();
                }
            },
            error: function () {
                console.log("error");
            }
        });
    }
}

