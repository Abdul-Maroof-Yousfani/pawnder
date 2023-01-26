var m=$('#m').val();
var baseUrl=$('#baseUrl').val();
var emrNo = $('#emrNo').val();
$(document).ready(function() {



    $(".btn-success").click(function(e){
        var employee = new Array();
        var val;
        $("input[name='employeeSection[]']").each(function(){
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




    // $('.addMoreAllowanceSection').click(function (e){
    //     var form_rows_count = $(".get_data").length;
    //     var data = $('.count_rows').html();
    //     $('.allowanceData').append('<div class="row" id="remove_area_'+form_rows_count+'"><div class="count_rows">' +
    //         '' +
    //         '</div>' +
    //         '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">' +
    //         ' <label class="sf-label">Allowance Type:</label>' +
    //         '<span class="rflabelsteric"><strong>*</strong></span>' +
    //         '<input type="text" name="allowance_type[]" id="allowance_type[]" value="" class="form-control requiredField" /></div>' +
    //         '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">' +
    //         '<label class="sf-label">Amount:</label>' +
    //         '<span class="rflabelsteric"><strong>*</strong></span>' +
    //         '<input type="number" name="allowance_amount[]" id="allowance_amount[]" value="" class="form-control requiredField" /></div>' +
    //         '<div class="col-lg-2 col-md-2 col-sm-2 col-xs-12"><br>' +
    //         '<button onclick="removeEmployeeSection('+form_rows_count+')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></button>' +
    //         '</div>' +
    //         '</div>');
    //
    // });

    $('#emp_id').select2();
    $('#sub_department_id').select2();
    $('#department_id').select2();
    $('#designation_id').select2();
});

var previousSalary;
$('#emp_id').on('change', function() {
    $('#emp_data_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var emp_id = $(this).val();

    if(emp_id) {
        $.ajax({
            url: baseUrl+'/hdc/viewEmployeePreviousPromotionsDetail',
            type: "GET",
            data: { emp_id:emp_id,m:m},
            success:function(data) {
                $('#emp_data_loader').html('');
                $("#emp_data").html('<div class="row">&nbsp;</div>'+data);
                previousSalary = parseFloat($('#previousSalary').val());
                $('#salary').val(previousSalary);
            }
        });
    }
    else
    {
        $('#emp_data_loader').html('');
        $("#emp_data").html('');
    }
});

function removeEmployeeSection(id){
    $("#remove_area_"+id).remove();
}

$('#addAllowancesCheck').click(function(){
    if($(this).is(":checked") == true) {

        $('.allowanceLoader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        var emp_id = $('#emp_id').val();

        if(emp_id) {
            $.ajax({
                url: baseUrl+'/hdc/viewEmployeePreviousAllowancesDetail',
                type: "GET",
                data: { emp_id:emp_id,m:m},
                success:function(data) {
                    $('.allowanceLoader').html('');
                    $(".allowanceData").html('<div class="row">&nbsp;</div>'+data);
                }
            });
        }
        else
        {
            $('.allowanceLoader').html('');
            $(".allowanceData").html('');
        }
        $('#addMoreAllowancesBtn').show();
    }
    else {
        $('#addMoreAllowancesBtn').hide();
        $(".allowanceData").html('');
    }
});

function changeSalary(){

    $('#salary').val(previousSalary);
    var salary = parseFloat($('#salary').val());
    var increment = parseFloat($('#increment').val());
    $('#salary').val(salary + increment);

    if ($('#increment').val() == '')
        $('#salary').val(previousSalary);

}


$(document).ready(function() {

    var table = $('#LeaveApplicationRequestList').DataTable({
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

function salaryDiv(){
    if ($('#edit_salary').is(':checked')) {
        $(".div_salary").css({"display": "block"});

    }
     else {
        $(".div_salary").css({"display": "none"});

    }
}

// $('#edit_salary').change(function () {
//     if ($(this).is(':checked')) {
//         $("#div_salary").css({"display": "block"});
//
//     }
//     else {
//         $("#div_salary").css({"display": "none"});
//     }
// });





$(document).ready(function () {
    $('#designation_id').select2();
    $('#grade_id').select2();
});

function approveAndRejectTableRecord(companyId, recordId, approval_status, tableName){
    var companyId;
    var recordId;
    var tableName;
    var approval_status;

    var approvalCode=prompt('Enter Approval Code !');

    if(!approvalCode)
    {
        alert('Approval Code Required !');
        return false;
    }
    else if(approvalCode != '') {

        $.ajax({
            url : ''+baseUrl+'/cdOne/approveAndRejectTableRecord',
            type: "GET",
            data: {'emr_no':emrNo,'approvalCode':approvalCode,'request_type':'approve_reject','companyId': companyId, 'recordId': recordId, 'tableName': tableName, 'approval_status': approval_status},
            success: function (data) {
                console.log(data);
                if(data == 'error')
                {
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

