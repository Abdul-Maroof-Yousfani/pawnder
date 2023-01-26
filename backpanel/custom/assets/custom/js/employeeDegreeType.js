var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var degreeType = new Array();
        var val;
        $("input[name='EmployeeDegreeTypeSection[]']").each(function(){
            degreeType.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in degreeType) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

    var category = 1;
    $('.addMoreEmployeeDegreeTypeSection').click(function (e){
        e.preventDefault();
        category++;
        $('.EmployeeDegreeTypeSection').append('<div style="margin-top: 5px;" id="sectionEmployeeDegreeType_'+category+'">' +
            '<a href="#" onclick="removeEmployeeDegreeTypeSection('+category+')" class="btn btn-xs btn-danger"><i class="fas fa-trash"></i></a>' +
            '<div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' +
            '<div class="row">' +
            '  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <label>Employee Degree Type:</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" name="degree_type_name[] " id="degree_type_name[] " value="" class="form-control requiredField" required/>' +
            '</div></div></div></div></div>');

    });
});

function removeEmployeeDegreeTypeSection(id){
    var elem = document.getElementById('sectionEmployeeDegreeType_'+id+'');
    elem.parentNode.removeChild(elem);
}

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

$(".btn-success").click(function(e){
    var employeeDegreeType = new Array();
    var val;
    $("input[name='employeeDegreeTypeSection[]']").each(function(){
        employeeDegreeType.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in employeeDegreeType) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});