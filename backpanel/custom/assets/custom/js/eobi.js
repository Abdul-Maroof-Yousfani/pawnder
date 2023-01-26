var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var EOBISection = new Array();
        var val;
        $("input[name='EOBISection[]']").each(function(){
            EOBISection.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in EOBISection) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

    var EOBI = 1;
    $('.addMoreEOBISection').click(function (e){
        e.preventDefault();
        EOBI++;
        $('.EOBISection').append('<div class="row myloader_'+EOBI+'"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>')
        $.ajax({
            url: baseUrl+'/hmfal/makeFormEOBIDetail',
            type: "GET",
            data: { id:EOBI},
            success:function(data) {

                $('.EOBISection').append('<div style="margin-top:5px;" id="sectionEOBI_'+EOBI+'"><a style="cursor:pointer;" onclick="removeEOBISection('+EOBI+')" class="btn btn-sm btn-danger"><i style="color: white;" class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
                $('.myloader_'+EOBI).remove();
            }
        });
    });
});

function removeEOBISection(id){
    var elem = document.getElementById('sectionEOBI_'+id+'');
    elem.parentNode.removeChild(elem);
}

$(document).ready(function() {

    var table = $('#EOBIList').DataTable({
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