var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    var table = $('#MaritalStatusList').DataTable({
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

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var grade = new Array();
        var val;
        $("input[name='EmployeeGrageSection[]']").each(function(){
            grade.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in grade) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

    var grade = 1;
    $('.addMoreEmployeeGradesSection').click(function (e){
        e.preventDefault();
        grade++;
        $('.EmployeeGradeSection').append('<div style="margin-top: 5px;" id="sectionGrade_'+grade+'">' +
            '<a href="#" onclick="removeEmployeeGradesSection('+grade+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>' +
            '<div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' +
            '<div class="row">' +
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label>Category:</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<select class="form-control requiredField" name="category[]" id="category"> ' +
            '<option value="">Select Category</option> ' +
            '<option value="Executives">Executives</option> ' +
            '<option value="Engineering">Engineering</option> ' +
            '<option value="Clearing">Clearing</option> </select></div>'+
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
            '<label>Grade Type</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" name="employee_grade_type[] " id="employee_grade_type" value="" class="form-control requiredField" required />' +
            '</div></div></div></div></div>');

    });
});

function removeEmployeeGradesSection(id){
    var elem = document.getElementById('sectionGrade_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(".btn-success").click(function(e){
    var employeeGrades = new Array();
    var val;
    $("input[name='employeeGradesSection[]']").each(function(){
        employeeGrades.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in employeeGrades) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});