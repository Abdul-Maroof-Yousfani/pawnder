var m=$('#m').val();
var baseUrl=$('#baseUrl').val();


$(document).ready(function() {

    $(".btn-success").click(function (e) {
        var employee = new Array();
        var val;
        $("input[name='employeeSection[]']").each(function () {
            employee.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in employee) {
            jqueryValidationCustom();
            if (validate == 0) {
                //alert(response);
            } else {
                return false;
            }
        }

    });

    var bonus = 1;
    $('.addMoreBonusSection').click(function (e) {
        e.preventDefault();
        bonus++;
        $('.BonusSection').append('<div class="row myloader_' + bonus + '"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>')
        $.ajax({
            url: baseUrl+'/hmfal/makeFormBonusDetail',
            type: "GET",
            data: {id: bonus},
            success: function (data) {

                $('.BonusSection').append('<div id="sectionBonus' + bonus + '"><a style="cursor:pointer;color: white;margin-top: 5px;" onclick="removeBonusSection(' + bonus + ')" class="btn btn-sm btn-danger">Remove</a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' + data + '</div></div></div>');
                $('.myloader_' + bonus).remove();
            }
        });
    });

});

function removeBonusSection(id){
    var elem = document.getElementById('sectionBonus'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#BonusList').DataTable({
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


$(document).ready(function() {

    $(".btn-success").click(function (e) {
        var employee = new Array();
        var val;
        $("input[name='employeeSection[]']").each(function () {
            employee.push($(this).val());
        });
        var _token = $("input[name='_token']").val();


    });

    $('#department_id').select2();
    $('#sub_department_id').select2();
    $("#emp_id").select2();
    $("#bonus_id").select2();
});

function viewEmployeesBonus(){
    $("#employeePayslipSection").css({"display": "none"});
    var department_id = $('#department_id').val();
    var employee_project_id = $('#employee_project_id').val();
    var emp_id = $('#emp_id').val();
    var bonus_month_year = $('#bonus_month_year').val();
    var bonus_id = $('#bonus_id').val();

    var url= baseUrl+'/hdc/viewEmployeesBonus';
    jqueryValidationCustom();
    if(validate == 0){
        $("#employeePayslipSection").css({"display": "block"});
        $('#run_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            url: baseUrl+'/hdc/viewEmployeesBonus',
            type: "GET",
            data: { department_id:department_id,bonus_id:bonus_id,emp_id:emp_id,bonus_month_year:bonus_month_year,m:m,employee_project_id:employee_project_id},
            success:function(data) {
                $('.employeePayslipSection').empty();
                $('.employeePayslipSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+data+'</div>');
                $('#run_loader').html('');

            }
        });


    }else{
        return false;
    }
}

