$(document).ready(function() {

    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var subDepartment = new Array();
        var val;
        $("input[name='employeeSection[]']").each(function(){
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

    $('#department_id').select2();
    $('#sub_department_id').select2();
    $('#emp_id').select2();
    $('#employee_project_id').select2();


});

// function employeeProject() {
//     var emp_category_id = $("#emp_category_id").val();
//     var region_id = $("#region_id").val();
//     var employee_project_id = $("#employee_project_id").val();
//     if(employee_project_id == '0'){
//         empCategory()
//     }
//     if (region_id == '') {
//         alert('Please Select Region !');
//         return false;
//     } else if (emp_category_id == '') {
//         alert('Please Select Cateogery !');
//         return false;
//     } else {
//         var m = '<?= Input::get('m'); ?>';
//         if (employee_project_id) {
//             $('#emp_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
//
//             $.ajax({
//                 url: '<?php echo url('/')?>/slal/getEmployeeProjectList',
//                 type: "GET",
//                 data: {
//                     emp_category_id: emp_category_id,
//                     region_id: region_id,
//                     employee_project_id: employee_project_id,
//                     m: m
//                 },
//                 success: function (data) {
//                     $('#emp_loader').html('');
//                     $('select[name="emr_no"]').empty();
//                     $('select[name="emr_no"]').html(data);
//                 }
//             });
//         } else {
//             $('select[name="emr_no"]').empty();
//         }
//     }
// }

// function empCategory() {
//     var emp_category_id = $("#emp_category_id").val();
//     var region_id = $("#region_id").val();
//     if (region_id == '') {
//         alert('Please Select Region !');
//         return false;
//     } else {
//         var m = '<?= Input::get('m'); ?>';
//         if (emp_category_id) {
//             $('#emp_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
//
//             $.ajax({
//                 url: '<?php echo url('/')?>/slal/getEmployeeCategoriesList',
//                 type: "GET",
//                 data: {emp_category_id: emp_category_id, region_id: region_id, m: m},
//                 success: function (data) {
//                     $('#emp_loader').html('');
//                     $('select[name="emr_no"]').empty();
//                     $('select[name="emr_no"]').html(data);
//                 }
//             });
//         } else {
//             $('select[name="emr_no"]').empty();
//         }
//     }
// }


function viewEmployeeEquipmentsForm()
{
    $("#equipmentSection").css({"display": "none"});
    $('.equipmentSectionLoader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
    var emp_id = $('#emp_id').val();

    if(emp_id) {
        $("#equipmentSection").css({"display": "block"});
        $.ajax({
            url: baseUrl+'/hdc/viewEmployeeEquipmentsForm',
            type: "GET",
            data: { emp_id:emp_id,m:m},
            success:function(data) {
                $('.equipmentSection').html(data);
                $('.equipmentSectionLoader').html('');
            },
            error: function () {
                $('.equipmentSectionLoader').html('');
                $('.equipmentSection').html('');
            }
        });
    }
}


function insuranceCheck()
{
    if ($('.insurance').is( ":checked" )) {
        $('#insurance_number').prop("disabled", false);
        $('#insurance_path').prop("disabled", false);
    }
    else {
        $('#insurance_number').prop("disabled", true);
        $('#insurance_path').prop("disabled", true);
    }

}

function eobiCheck()
{
    if ($('.eobi').is( ":checked" )) {
        $('#eobi_number').prop("disabled", false);
        $('#eobi_path').prop("disabled", false);
    }
    else {
        $('#eobi_number').prop("disabled", true);
        $('#eobi_path').prop("disabled", true);
    }

}

function mobileCheck()
{
    if ($('.mobile').is( ":checked" )) {
        $('#model_number').prop("disabled", false);
        $('#mobile_number').prop("disabled", false);
        $('#sim_number').prop("disabled", false);
    }
    else {
        $('#model_number').prop("disabled", true);
        $('#mobile_number').prop("disabled", true);
        $('#sim_number').prop("disabled", true);
    }

}



function deleteEmployeeEquipments(companyId,recordId){
    var companyId;
    var recordId

    if(confirm("Do you want to delete this record ?") == true){
        $.ajax({
            url: baseUrl+'/cdOne/deleteEmployeeEquipments',
            type: "GET",
            data: {companyId:companyId,recordId:recordId},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }

}



$(document).ready(function() {
    var table = $('#EmployIdCardRequestList').DataTable({
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
    if ($('.insurance').is( ":checked" )) {
        $('#insurance_number').prop("disabled", false);
        $('#insurance_path').prop("disabled", false);
    }
    else {
        $('#insurance_number').prop("disabled", true);
        $('#insurance_path').prop("disabled", true);
    }

    if ($('.eobi').is( ":checked" )) {
        $('#eobi_number').prop("disabled", false);
        $('#eobi_path').prop("disabled", false);
    }
    else {
        $('#eobi_number').prop("disabled", true);
        $('#eobi_path').prop("disabled", true);
    }

    if ($('.mobile').is( ":checked" )) {
        $('#model_number').prop("disabled", false);
        $('#mobile_number').prop("disabled", false);
        $('#sim_number').prop("disabled", false);
    }
    else {
        $('#model_number').prop("disabled", true);
        $('#mobile_number').prop("disabled", true);
        $('#sim_number').prop("disabled", true);
    }
});


function insuranceCheck()
{
    if ($('.insurance').is( ":checked" )) {
        $('#insurance_number').prop("disabled", false);
        $('#insurance_path').prop("disabled", false);
    }
    else {
        $('#insurance_number').prop("disabled", true);
        $('#insurance_path').prop("disabled", true);
    }

}

function eobiCheck()
{
    if ($('.eobi').is( ":checked" )) {
        $('#eobi_number').prop("disabled", false);
        $('#eobi_path').prop("disabled", false);
    }
    else {
        $('#eobi_number').prop("disabled", true);
        $('#eobi_path').prop("disabled", true);
    }

}

function mobileCheck()
{
    if ($('.mobile').is( ":checked" )) {
        $('#model_number').prop("disabled", false);
        $('#mobile_number').prop("disabled", false);
        $('#sim_number').prop("disabled", false);
    }
    else {
        $('#model_number').prop("disabled", true);
        $('#mobile_number').prop("disabled", true);
        $('#sim_number').prop("disabled", true);
    }

}

$('#eobi_check').click(function() {
    $('#eobi_div_hide').hide();
    $('#eobi_div_show').show();
});

$('#insurance_check').click(function() {
    $('#insurance_div_hide').hide();
    $('#insurance_div_show').show();
});


$(document).ready(function() {
    // Wait for the DOM to be ready
    $(".btn-success").click(function(e){
        var employeeCategory = new Array();
        var val;
        $("input[name='EmployeeEquipmentSection[]']").each(function(){
            employeeCategory.push($(this).val());
        });
        var _token = $("input[name='_token']").val();
        for (val in employeeCategory) {

            jqueryValidationCustom();
            if(validate == 0){
                //alert(response);
            }else{
                return false;
            }
        }

    });

    var category = 1;
    $('.addMoreEmployeeEquipmentsSection').click(function (e){
        e.preventDefault();
        category++;
        $('.EmployeeEquipmentSection').append('<div style="margin-top: 5px;" id="sectionEmployeeEquipment_'+category+'">' +
            '<a href="#" onclick="removeEmployeeEquipmentSection('+category+')" class="btn btn-sm btn-danger"><i class="fas fa-trash fa"></i></a>' +
            '<div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' +
            '<div class="row">' +
            '  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            ' <label>Equipment Name:</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" name="equipment_name[] " id="equipment_name[] " value="" class="form-control requiredField" required/>' +
            '</div></div></div></div></div>');

    });
});

function removeEmployeeEquipmentSection(id){
    var elem = document.getElementById('sectionEmployeeEquipment_'+id+'');
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
    var employeeEquipments = new Array();
    var val;
    $("input[name='employeeEquipmentsSection[]']").each(function(){
        employeeEquipments.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in employeeEquipments) {

        jqueryValidationCustom();
        if(validate == 0){
            //alert(response);
        }else{
            return false;
        }
    }

});
