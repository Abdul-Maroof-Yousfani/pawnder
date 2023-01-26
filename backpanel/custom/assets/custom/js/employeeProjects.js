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
        var employeeProject = new Array();
        var val;
        $("input[name='EmployeeProjectSection[]']").each(function(){
            employeeProject.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in employeeProject) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });


    var location = 1;
    $('.addMoreEmployeeProjectSection').click(function (e){
        e.preventDefault();
        location++;
        $('.EmployeeProjectSection').append('<div style="margin-top: 5px;" id="sectionEmployeeProject_'+location+'">' +
            '<a href="#" onclick="removeEmployeeProjectSection('+location+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>' +
            '<div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' +
            '<div class="row">' +
            '  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <label>Employee Project:</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" name="project_name[] " id="project_name[] " value="" class="form-control requiredField" required/>' +
            '</div></div></div></div></div>');

    });
});

function removeEmployeeProjectSection(id){
    var elem = document.getElementById('sectionEmployeeProject_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(".btn-success").click(function(e){
    var employeeProjects = new Array();
    var val;
    $("input[name='employeeProjectsSection[]']").each(function(){
        employeeProjects.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in employeeProjects) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});