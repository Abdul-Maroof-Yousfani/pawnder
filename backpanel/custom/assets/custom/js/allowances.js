var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

$(document).ready(function() {
    $('#emp_id').select2();

    $('#sub_department_id').select2();
    $("#department_id").select2();
    $("#allowance_type").select2();

    var table = $('#AllowanceList').DataTable({
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



    $('.addMoreAllowanceSection').click(function (e){
        var form_rows_count = $(".get_data").length;
        var data = $('.form_area').html();
        $('.employeeSection').append('<div class="row" id="remove_area_'+form_rows_count+'"><div class="row"><button onclick="removeEmployeeSection('+form_rows_count+')" type="button" class="btn btn-sm btn-danger">Remove</button></div>'+data+'</div>');

        // Wait for the DOM to be ready


    });


    $(document).on('change', '#allowance_type', function() {
        if($(this).val()==5 || $(this).val()==6){
            $(".once_area").html('<label>Month-Year</label><input required type="month" class="form-control requiredField" name="month_year[]"><input type="hidden" name="once[]" id="once" value="1"> ')

        }
        else{
            $(".once_area").html('')
        }
    });


    // $('#once').click(function (e){
    //
    //     if($("#once").is(':checked')){
    //
    //         $(".once_area").html('<label>Month-Year</label><input type="month" class="form-control" name="month_year[]">')
    //     }
    //
    //     else{
    //         $(".once_area").html('')
    //     }
    //
    // });



});