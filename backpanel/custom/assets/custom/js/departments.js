var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var department = new Array();
        var val;
        $("input[name='departmentSection[]']").each(function(){
            department.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in department) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });


    var department = 1;
    $('.addMoreDepartmentSection').click(function (e){
        e.preventDefault();
        department++;
        $.ajax({
            url: baseUrl+'http://localhost/nuxt_web/backend/public/makeFormDepartmentDetail',
            type: "GET",
            data: { id:department},
            success:function(data) {
                $('.departmentSection').append('<div style="margin-top: 5px;" id="sectionDepartment_'+department+'"><a href="#" onclick="removeDepartmentSection('+department+')" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });
});

function removeDepartmentSection(id){
    var elem = document.getElementById('sectionDepartment_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#DepartmentList').DataTable({
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
    var department = new Array();
    var val;
    $("input[name='departmentSection[]']").each(function(){
        department.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in department) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});