var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    var jobType = 1;
    $('.addMoreJobTypeSection').click(function (e){
        e.preventDefault();
        jobType++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormJobTypeDetail',
            type: "GET",
            data: { id:jobType},
            success:function(data) {
                $('.jobTypeSection').append('<div style="margin-top: 5px;" id="sectionJobType_'+jobType+'"><a href="#" onclick="removeJobTypeSection('+jobType+')" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var jobType = new Array();
        var val;
        $("input[name='jobTypeSection[]']").each(function(){
            jobType.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in jobType) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

});

function removeJobTypeSection(id){
    var elem = document.getElementById('sectionJobType_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {
    var jobType = 1;
    $('.addMoreJobTypeSection').click(function (e){
        e.preventDefault();
        jobType++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormJobTypeDetail',
            type: "GET",
            data: { id:jobType},
            success:function(data) {
                $('.jobTypeSection').append('<div id="sectionJobType_'+jobType+'"><a href="#" onclick="removeJobTypeSection('+jobType+')" class="btn btn-xs btn-danger">Remove</a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var jobType = new Array();
        var val;
        $("input[name='jobTypeSection[]']").each(function(){
            jobType.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in jobType) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

});

function removeJobTypeSection(id){
    var elem = document.getElementById('sectionJobType_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#JobTypeList').DataTable({
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