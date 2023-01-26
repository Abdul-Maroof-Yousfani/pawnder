var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    // $('#department_id_1').select2();
    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var subDepartment = new Array();
        var val;
        $("input[name='subDepartmentSection[]']").each(function(){
            subDepartment.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in subDepartment) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

    var subDepartment = 1;
    var companyId = m;
    $('.addMoreSubDepartmentSection').click(function (e){
        e.preventDefault();
        subDepartment++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormSubDepartmentDetail',
            type: "GET",
            data: { id:subDepartment,companyId:companyId},
            success:function(data) {
                $('.subDepartmentSection').append('<div style="margin-top:5px;" id="sectionSubDepartment_'+subDepartment+'"><a href="#" onclick="removeSubDepartmentSection('+subDepartment+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });

});

function removeSubDepartmentSection(id){
    var elem = document.getElementById('sectionSubDepartment_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#SubDepartmentList').DataTable({
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
    var subDepartmentSection = new Array();
    var val;
    $("input[name='subDepartmentSection[]']").each(function(){
        subDepartmentSection.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in subDepartmentSection) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});