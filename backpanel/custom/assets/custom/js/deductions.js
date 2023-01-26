var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    $("#employee_project_id").select2();
    // Wait for the DOM to be ready
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
            }else if(validate == 1){
                return false;
            }
        }
    });



    $('.addMoreDeductionSection').click(function (e){
        var form_rows_count = $(".get_data").length;
        var data = $('.form_area').html();
        $('.employeeSection').append('<div id="remove_area_'+form_rows_count+'"> <button style="margin-top:10px;" onclick="removeEmployeeSection('+form_rows_count+')" type="button" class="btn btn-sm btn-danger">Remove</button>'+data+'</div>');

        // Wait for the DOM to be ready

    });

    $('#emp_id').select2();
    $('#sub_department_id').select2();
    $("#department_id").select2();


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


function removeEmployeeSection(id){
    $("#remove_area_"+id).remove();
}

$(document).ready(function() {
    $("#employee_project_id").select2();


    var table = $('#DeductionList').DataTable({
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

$(document).on('change', '#deduction_type', function() {

    if($(this).val()=="LWP"){
        $('.lblDeduct').html("Deduction Days:");
    }
    else{
        $('.lblDeduct').html("Deduction Amount:");
    }
});

$('#once').click(function (e){

    if($("#once").is(':checked')){

        $(".once_area").html('<label>Month-Year</label><input type="month" class="requiredField form-control" name="month_year[]">')
    }

    else{
        $(".once_area").html('')
    }

});
