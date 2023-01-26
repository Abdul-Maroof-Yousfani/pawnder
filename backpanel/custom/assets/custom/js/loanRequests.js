var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var employee = new Array();
        var val;
        $("input[name='employeeSection[]']").each(function(){
            employee.push($(this).val());
        });
        var _token = $("input[name='_token']").val();

    });

    $('.addMoreLoanRequestSection').click(function (){
        var count_rows = $('.count_rows').length;
        count_rows++;
        $.ajax({
            url: baseUrl+'/hmfal/makeFormLoanRequestDetail',
            type: "GET",
            data: { count_rows:count_rows,m:m},
            success:function(data) {
                $('.insert_clone').append('<div style="margin-top: 3px;" class="row"><div class="col-sm-12" id="sectionLoanRequest_'+count_rows+'"><button type="button"  onclick="removeLoanRequestSection('+count_rows+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button><br>'+data+'</div></div> ');
            }
        });
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


function removeLoanRequestSection(id){
    var elem = document.getElementById('sectionLoanRequest_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#LoanRequestList').DataTable({
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

$(function(){
    $('select[name="sub_department_id"]').on('change', function() {
        var sub_department_id = $(this).val();

        if(sub_department_id) {
            $.ajax({
                url: baseUrl+'/slal/employeeLoadDependentDepartmentID',
                type: "GET",
                data: { sub_department_id:sub_department_id,m:m},
                success:function(data) {
                    $('#emp_id').empty();
                    $('#emp_id').html(data);
                    $('#emp_id').find('option').get(0).remove();


                }
            });
        }else{
            $('select[name="emp_id"]').empty();
        }
    });
});






















$(document).ready(function(){
    $("#sub_department_id").select2();
    $("#department_id").select2();
    $("#emp_id1").select2();
    $("#loan_id").select2();


});
function viewLoanReport(){
    $("#employeeAttendenceReportSection").css({"display": "none"});
    $('.employeePayslipSection').empty();
    var emp_id = $('#emp_id').val();
    var department_id = $("#department_id").val();
    var sub_department = $("#sub_department_id").val();
    var loan_id = $("#loan_id").val();

    jqueryValidationCustom();
    if(validate == 0){
        $("#employeeAttendenceReportSection").css({"display": "block"});
        $('#loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

        var datas = {loan_id:loan_id,emp_id:emp_id,m:m,sub_department:sub_department,department_id:department_id}

        $.ajax({
            url: baseUrl+'/hdc/viewLoanReportDetail',
            type: "GET",
            data: datas,
            success:function(response) {
                $('.employeeAttendenceReportSection').empty();
                $('.employeeAttendenceReportSection').append(response);
                $('#loader').html('');
                // $('#TaxesList ').tableHover({colClass: 'hover'});

            }
        });
    }else{
        return false;
    }
}

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
                $('select[name=emp_id] > option:first-child')
                    .text('Select');
                //  $('select[name="emp_id"]').find('option').get(0).val('');
                //   $('select[name="emp_id"]').find('option').get(0).text('Select');

            }
        })
    }
    else{
        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id_1"]').empty();
        $('select[name="emr_no"]').empty();
    }
}

function getEmpLoans()
{
    $('#emp_loader_2').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    $.get( baseUrl+'/slal/viewEmployeeLoansList',
        { m:m,emp_id: $("#emp_id").val()})
        .done(function( data ) {
            $('#emp_loader_2').html('');
            $('#loan_id').html(data);

        });
}


function downloadimage() {
        $("body").scrollTop(0);
        var container = document.getElementById("get_area");; // full page
        html2canvas(container, { allowTaint: true }).then(function (canvas) {

            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "html_image.jpg";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
        });
}



