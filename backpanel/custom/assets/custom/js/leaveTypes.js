var m=$('#m').val();
var baseUrl=$('#baseUrl').val();


$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var leaveType = new Array();
        var val;
        $("input[name='leaveTypeSection[]']").each(function(){
            leaveType.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in leaveType) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });


    var leaveType = 1;
    $('.addMoreLeaveTypeSection').click(function (e){
        e.preventDefault();
        leaveType++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormLeaveTypeDetail',
            type: "GET",
            data: { id:leaveType},
            success:function(data) {
                $('.leaveTypeSection').append('<div style="margin-top: 5px;" id="sectionLeaveType_'+leaveType+'"><a href="#" onclick="removeLeaveTypeSection('+leaveType+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });

});

function removeLeaveTypeSection(id){
    var elem = document.getElementById('sectionLeaveType_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#LeaveTypeList').DataTable({
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