var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var designation = new Array();
        var val;
        $("input[name='designationSection[]']").each(function(){
            designation.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in designation) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });


    var designation = 1;
    $('.addMoreDesignationSection').click(function (e){
        e.preventDefault();
        designation++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormDesignationDetail',
            type: "GET",
            data: { id:designation},
            success:function(data) {
                $('.designationSection').append('<div style="margin-top: 5px;" id="sectionDesignation_'+designation+'"><a href="#" onclick="removeDesignationSection('+designation+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });
});

function removeDesignationSection(id){
    var elem = document.getElementById('sectionDesignation_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#DesignationList').DataTable({
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
    var designation = new Array();
    var val;
    $("input[name='designationSection[]']").each(function(){
        designation.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in designation) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});

