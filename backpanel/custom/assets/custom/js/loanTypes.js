var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var loanType = new Array();
        var val;
        $("input[name='loanTypeSection[]']").each(function(){
            loanType.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in loanType) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });


    var loanType = 1;
    $('.addMoreLoanTypeSection').click(function (e){
        e.preventDefault();
        loanType++;

        $.ajax({
            url: baseUrl+'/hmfal/makeFormLoanTypeDetail',
            type: "GET",
            data: { id:loanType},
            success:function(data) {
                $('.loanTypeSection').append('<div style="margin-top: 5px;" id="sectionLoanType_'+loanType+'"><a href="#" onclick="removeLoanTypeSection('+loanType+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
            }
        });
    });
});

function removeLoanTypeSection(id){
    var elem = document.getElementById('sectionLoanType_'+id+'');
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

$(".btn-success").click(function(e){
    var loanType = new Array();
    var val;
    $("input[name='loanTypeSection[]']").each(function(){
        loanType.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in loanType) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});
