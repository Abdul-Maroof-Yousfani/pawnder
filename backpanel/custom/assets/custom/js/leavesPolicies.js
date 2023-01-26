var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    $('.addMorePolicySection').click(function (e){

        var form_rows_count = $(".get_data").length;
        var total_values = $('#count').val();
        if(total_values == form_rows_count)
        {
            //return false;
        }
        var data = $('.form_area').html();
        $('.employeeSection').append('<br><div id="remove_area_'+form_rows_count+'"><button onclick="removeEmployeeSection('+form_rows_count+')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></button>'+data+'</div>');

        //Wait for the DOM to be ready
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


    });



});

function removeEmployeeSection(id){

    $("#remove_area_"+id).remove();

    var sum = 0;
    $(".getLeaves").each(function(){
        sum += +$(this).val();
    });
    $("#totalLeaves").val(sum);

}

function LeavesCount()
{
    var sum = 0;
    $(".getLeaves").each(function(){
        sum += +$(this).val();
    });
    $("#totalLeaves").val(sum);
}


function deleteLeavesDataPolicyRows(functionName,companyId,recordId)
{
    if(confirm('Are you sure You want to delete?')){
        var main_url = baseUrl+functionName;

        $.ajax({
            url: main_url,
            type: "GET",
            data: {companyId:companyId,recordId:recordId},
            success:function(data) {
                location.reload();
            }
        });
    }

}

$(document).ready(function() {

    var table = $('#LeavesPolicyList').DataTable({
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

$(function() {
    $('.summernote').summernote({
        height: 200
    });

});





    function addMorePolicySection() {

        var form_rows_count = $(".get_rows").length;
        var total_values = $('#count').val();
        //alert(total_values);
        if (total_values == form_rows_count) {
            //return false;
        }
        form_rows_count++;

        var data = $('#get_data').html();
        $('#append_area').append('<tr class="get_rows" id=remove_area_' + form_rows_count + '><td>' + data + '</td><td><input class="form-control" type="number" name="no_of_leaves[]" id="no_of_leaves[]"></td><td><button onclick="removeEmployeeSection(' + form_rows_count + ')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></button></td></tr>');

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

    }


function removeEmployeeSection(id){

    $("#remove_area_"+id).remove();

}


$(document).ready(function(){
    $('#emp_id').select2();
    $('#department_id').select2();
    $('#sub_department_id').select2();
    $('#region_id').select2();
    $('#emp_category_id').select2();
    $('#employee_project_id').select2();

});

function checkManualLeaves(value,leave_type,error_status,m,main_id){
    var emr_no = $("#emp_id").val();
    var casual_leaves = $("#casual-leaves").html();
    var sick_leaves = $("#sick-leaves").html();
    var annual_leaves = $("#annuals-leaves").html();
    var error = 'Your'+' '+error_status+' '+'is greater than your leave policy';
    if(emr_no != null) {
        $.ajax({
            type: 'GET',
            url: baseUrl+'/hdc/checkManualLeaves',
            data: {value: value, leave_type: leave_type, error_status: error_status, m: m,emr_no:emr_no},
            success: function (res) {
                if(res != 'done'){
                    $("#"+error_status).html(res);
                    $("#"+main_id).val('');
                    $( "#create" ).prop( "disabled", true);
                }
                else{
                    $('#'+error_status).html('');
                    $( "#create" ).prop( "disabled", false );
                }
            }
        });
    }
    else{
        $("#casual_leaves").val('');
        $("#sick_leaves").val('');
        $("#annual_leaves").val('');
        alert('Please Select Employee');
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
            url: baseUrl+'/hdc/employeeGetLeavesBalances',
            type: "GET",
            data: {company_id:company_id,leaves_policy_id:leaves_policy_id,m:m},
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


