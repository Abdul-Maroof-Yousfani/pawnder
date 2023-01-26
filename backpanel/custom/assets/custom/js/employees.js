var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    document.getElementById("password_1").value = password.substr(0,len);



}


$(document).ready(function() {
    var employee = 1;



    $('.addMoreEmployeeSection').click(function (e){

        e.preventDefault();
        employee++;
        $('.employeeSection').append('<div class="row myloader_'+employee+'"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>')

        $.ajax({
            url: baseUrl+'/hmfal/makeFormEmployeeDetail',
            type: "GET",
            data: { id:employee ,m : m},
            success:function(data) {
                $('.employeeSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="sectionEmployee_'+employee+'"><a href="#" onclick="removeEmployeeSection('+employee+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
                $('.myloader_'+employee).remove();
            }
        });
    });

    // Wait for the DOM to be ready

});

function removeEmployeeSection(id){
    var elem = document.getElementById('sectionEmployee_'+id+'');
    elem.parentNode.removeChild(elem);
}

function removeQualificationSection(id){
    $("#remove_area_"+id).remove();
}

function removeWorkExperienceSection(id){
    $("#remove_area1_"+id).remove();
}

function removeReferenceSection(id) {
    $(".remove_area2_"+id).remove();
}

function removeFamilyDataSection(id) {
    $(".remove_area3_"+id).remove();
}

function removeActivityDataSection(id) {
    $(".remove_area4_"+id).remove();
}

function removeEmergencyContactSection(id) {
    $(".remove_area5_"+id).remove();
}

function removeKinDetailsSection(id) {
    $(".remove_area6_"+id).remove();
}

function removeLanguageProficiencySection(id) {
    $("#remove_area7_"+id).remove();
}

function removeHealthDetailsSection(id) {
    $(".remove_area8_"+id).remove();
}
function removeRelativesDetailsSection(id) {
    $(".remove_area10_"+id).remove();
}
function removeEmployeeGsspDocumentDataSection(id) {
    $(".remove_area_"+id).remove();
}


$('#leaves_policy_id_1').click(function (e)
{
    var leaves_policy_id = $('#leaves_policy_1').val();
    if(leaves_policy_id != ''){

        showDetailModelTwoParamerter('hdc/viewLeavePolicyDetail',leaves_policy_id,'View Leaves Policy Detail ',m);
    }
    else
    {
        alert('Please Select Policy !');
    }
});

$('#view_tax_1').click(function (e)
{
    var tax_id = $('#tax_id_1').val();
    if(tax_id != '0'){

        showDetailModelTwoParamerterJson('hdc/viewTax',tax_id,'View Tax  Detail ',m);
    }
    else
    {
        alert('Please Select Tax !');
    }
});

$('#can_login_1').click(function (e)
{
    if($("#can_login_1").prop('checked') == true)
    {
        $('#credential_area_1').fadeIn();
    }
    else
    {
        $('#credential_area_1').fadeOut();
    }

})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img_file_1').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file_1").change(function(){
    readURL(this);
});

$("#transport_yes_1").change(function(){
    if($("#transport_yes_1").prop('checked') == true)
    {
        $("#transport_particular").fadeIn();
        $("#transport_no_1").prop('checked', false);
    }
    else
    {
        $("#transport_particular").fadeOut();
        $("#transport_yes_1").prop('checked', false);
    }
});

$("#transport_no_1").change(function(){
    if($("#transport_no_1").prop('checked') == true)
    {
        $("#transport_particular").fadeOut();
        $("#transport_yes_1").prop('checked', false);
    }

});




$("input[name='crime_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#crime_check_input_1").html('<label class="sf-label">Detail</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Detail" name="crime_detail_1" id="crime_detail_1" value="" />' +
            '');
    }
    else
    {
        $("#crime_check_input_1").html('');
    }
})


$("input[name='additional_info_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#additional_info_input_1").html('<label class="sf-label">Detail</label><span class="rflabelsteric"><strong>*</strong></span>' +
            ' <input type="text" class="form-control requiredField" placeholder="Detail" name="additional_info_detail_1" id="additional_info_detail_1" value="" />');
    }
    else
    {
        $("#additional_info_input_1").html('');
    }
})


$('#family_data_check_1').click(function(){

    if($(this).is(":checked") == true)
    {

        $("#family_data_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><input type="hidden" name="family_data[]" id="get_rows3" value="1">' +
            '<div class="" id="family_append_area_1">' +
            '<table class="table table-bordered sf-table-list get_rows3" id="get_clone3"><thead><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="family_name_1" id="family_name_1" required>' +'</td>' +
            '</thead><thead><th>Relation<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="family_relation_1"  id="family_relation_1" required></td>' +'</thead><thead>' +
            '<th>Add Emergency Contact<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="family_emergency_1" id="family_emergency_1" required>' +
            '</td></thead></table></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-xs btn-primary" id="addMoreFamilyData">Add More Family Data</button></div>' +
            '');

        $("#addMoreFamilyData").click(function(e){
            var form_rows_count = $(".get_rows3").length;
            form_rows_count++;
            $("#family_append_area_1").append('<table class="table table-bordered sf-table-list remove_area3_'+form_rows_count+' get_rows3" id="">' +
                '<input type="hidden" name="family_data[]" value="'+form_rows_count+'">'+
                '<thead><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="family_name_'+form_rows_count+'" id="family_name_'+form_rows_count+'" required>' +'</td>' +
                '</thead><thead><th>Relation<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="family_relation_'+form_rows_count+'"  id="family_relation_'+form_rows_count+'" required></td>' +'</thead><thead>'+
                '<th>Add Emergency Contact<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="family_emergency_'+form_rows_count+'" id="family_emergency_'+form_rows_count+'" required>' +
                '</td></thead></table>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeFamilyDataSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area3_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });
    }
    else
    {
        $("#family_data_area_1").html('');
    }

});



$('#bank_account_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#bank_account_area_1").html('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Account No</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Account No" name="account_no" id="account_no" value="" />' +
            '</div>'+
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Account Title</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Account Title" name="account_title" id="account_title" value="" />' +
            '</div>');
    }
    else
    {
        $("#bank_account_area_1").html('');
    }

});





$('#language_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#language_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<input type="hidden" name="language_data[]" value="1"><div class="">' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Language<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Read<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Write<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Speak<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"><button type="button" class="btn btn-xs btn-primary" id="addMoreLanguage">Add More Language</button></th>' +
            '</thead><tbody id="insert_clone7"><tr class="get_rows7"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td id="get_clone7" class="text-center"><input class="form-control requiredField" name="language_name_1"  id="language_name_1" required>' +
            '</td><td class="text-center"><b>Good : <input checked type="radio" name="reading_skills_1" value="Good"></b><b>Fair : <input type="radio" name="reading_skills_1" value="Fair">' +
            '</b><b>Poor : <input type="radio" name="reading_skills_1" value="Poor"></b></td><td class="text-center"><b>Good : <input checked type="radio" name="writing_skills_1" value="Good"></b>' +
            '<b>Fair : <input type="radio" name="writing_skills_1" value="Fair"></b><b>Poor : <input type="radio" name="writing_skills_1" value="Poor"></b>' +
            '</td><td class="text-center"><b>Good : <input checked type="radio" name="speaking_skills_1" value="Good"></b><b>Fair : <input type="radio" name="speaking_skills_1" value="Fair"></b>' +
            '<b>Poor : <input type="radio" name="speaking_skills_1" value="Poor"></b></td><td class="text-center"></td></tr></tbody></table> </div></div>');

        $("#addMoreLanguage").click(function(e){
            var form_rows_count = $(".get_rows7").length;
            form_rows_count++;
            $("#insert_clone7").append("<tr class='get_rows7' id='remove_area7_"+form_rows_count+"' ><td class='text-center'>" +
                '<input type="hidden" name="language_data[]" value="'+form_rows_count+'">' +
                "<span class='badge badge-pill badge-secondary'>"+form_rows_count+"<span></td>" +
                "<td class='text-center'><input class='form-control requiredField' name='language_name_"+form_rows_count+"' value='' id='language_name_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='reading_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='reading_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='reading_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='writing_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='writing_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='writing_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='speaking_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='speaking_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='speaking_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><button onclick='removeLanguageProficiencySection("+form_rows_count+")' type='button'class='btn btn-sm btn-danger'><i class='fas fa-trash'></i></button>" +
                "</td>" +
                "</tr>");


        });

    }
    else
    {
        $("#language_area_1").html('');
    }

});

$('#health_type_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#health_type_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<input type="hidden" name="health_data[]" value="1"><div class="">' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Health Type<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Yes / No<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"><button type="button" class="btn btn-xs btn-primary" id="addMoreHealth">Add More Health</button></th>' +
            '</thead>' +
            '<tbody id="insert_clone8"><tr class="get_rows8"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><select style="width:300px;" class="form-control" name="health_type_1" id="health_type_1" required>' +
            '<option value="Speech">Speech</option>' +
            '<option value="Hearing">Hearing</option>' +
            '<option value="Sight">Sight</option>' +
            '<option value="AIDS">AIDS</option>' +
            '<option value="Hands">Hands</option>' +
            '<option value="Feet">Feet</option>' +
            '<option value="Skin">Skin</option>' +
            '<option value="Cancer">Cancer</option>' +
            '<option value="Epilespy">Epilespy</option>' +
            '<option value="Asthma">Asthma</option>' +
            '<option value="Tuberculosis">Tuberculosis</option>' +
            '<option value="Hepatitis">Hepatitis</option>' +
            ' </select></td><td class="text-center"><select class="form-control" id="health_check_1" name="health_check_1" required>' +
            '<option value="Yes">Yes</option>' +
            '<option value="No">No</option>' +
            '</select></td><td class="text-center">-</td></tr></tbody></table></div>' +
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
            '<label class="sf-label">Any Physical Handicap</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span> ' +
            '<input type="text" class="form-control requiredField" name="physical_handicap" id="physical_handicap" value="-" />' +
            '</div><div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><label class="sf-label">Height</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="" name="height" id="height"/>' +
            '</div><div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><label class="sf-label">Weight</label>' +
            "<span class='rflabelsteric'><strong>*</strong></span>" +
            "<input type='number' class='form-control requiredField' placeholder='80kg' name='weight' id='weight'  />" +
            "</div> <div class='col-lg-3 col-md-3 col-sm-3 col-xs-12'><label class='sf-label'>Blood Group</label>" +
            "<span class='rflabelsteric'><strong>*</strong></span>" +
            "<input type='text' class='form-control requiredField' placeholder='A+' name='blood_group' id='blood_group'  />" +
            "</div></div>");

        $("#addMoreHealth").click(function(e){
            var clone_health_type = $("#health_type_1").html();
            var clone_health_check = $("#health_check_1").html();
            var form_rows_count = $(".get_rows8").length;
            form_rows_count++;
            $("#insert_clone8").append('<tr class="remove_area8_'+form_rows_count+' get_rows8" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                '<td class="text-center"><select style="width:300px;" class="form-control" name="health_type_'+form_rows_count+'" id="health_type_'+form_rows_count+'" required>'+clone_health_type+'</select></td>' +
                '<td class="text-center"><select class="form-control" name="health_check_'+form_rows_count+'" id="health_check_'+form_rows_count+'" required>'+clone_health_check+'</select></td>' +
                '<td class="text-center"><input type="hidden" name="health_data[]" value="'+form_rows_count+'">' +
                '<button type="button" onclick="removeHealthDetailsSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area8_'+form_rows_count+'"><i class="fas fa-trash"></i></button></td>' +
                '</tr>');
            $("#health_type_"+form_rows_count+"").select2();

        });
        $("#health_type_1").select2();
    }
    else
    {
        $("#health_type_area_1").html('');
    }

});

$('#activity_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#activity_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows4">' +
            '<input type="hidden" name="activity_data[]" value="1"><div id="get_clone4">' +
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Name Of Institution</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span><input class="form-control requiredField" name="institution_name_1" id="institution_name_1" required>' +
            '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Position Held</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Particulars" name="position_held_1" id="position_held_1" value="" />' +
            '</div></div><div class="row">&nbsp;</div><div class="row">&nbsp;</div><div id="insert_clone4"></div></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-xs btn-primary" id="addMoreActivities">Add More Activities</button>' +
            '</div>');

        $("#addMoreActivities").click(function(e){

            var form_rows_count = $(".get_rows4").length;
            form_rows_count++;
            $("#insert_clone4").append('<div class="remove_area4_'+form_rows_count+' get_rows4" id=""><input type="hidden" name="activity_data[]" value="'+form_rows_count+'">' +
                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Name Of Institution</label>' +
                '<span class="rflabelsteric"><strong>*</strong></span><input class="form-control requiredField" name="institution_name_'+form_rows_count+'" id="institution_name_'+form_rows_count+'" required>' +
                '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Position Held</label>' +
                '<span class="rflabelsteric"><strong>*</strong></span>' +
                '<input type="text" class="form-control requiredField" placeholder="Particulars" name="position_held_'+form_rows_count+'" id="position_held_'+form_rows_count+'" value="" />' +
                '</div></div>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeActivityDataSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area4_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });
    }
    else
    {
        $("#activity_area_1").html('');
    }

});
$('#work_experience_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#work_experience_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="">' +
            '<table class="table-sm mb-0 table-bordered"><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Emp Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">From</th><th class="text-center">Till</th>' +
            '<th class="text-center">File</th>' +
            ' <th class="text-center"><button type="button" id="addMoreWorkExperience" class="icon btn btn-sm btn-primary"><i class="fas fa-plus"></i></button></th>' +
            '</thead><tbody id="insert_clone1"><tr class="get_rows1"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td id="get_clone1" class="text-center"><input type="hidden" name="work_experience_data[]" value="1">' +
            '<input type="text" name="employeer_name_1" id="employeer_name_1" class="form-control requiredField" required></td>' +
            '<td class="text-center"><input name="started_1" type="date" class="form-control" id="started_1">' +
            '</td><td class="text-center"><input name="ended_1" id="ended_1"type="date" class="form-control" ></td>' +
            '<td class="text-center"><input type="file" class="form-control" name="work_exp_path_1" id="work_exp_path_1" multiple></td>' +
            '<td class="text-center">-</td></tr></tbody></table></div></div>' +
            '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12"><br><label class="sf-label">Have you ever been dismissed / suspended from service ?</label>' +
            '<input type="radio" name="suspend_check_1" id="suspend_check_1" value="no" checked/>&nbsp; No' +
            '<input type="radio" name="suspend_check_1" id="suspend_check_1" value="yes" />&nbsp; Yes &nbsp;' +
            '</div><div class="col-lg-7 col-md-7 col-sm-7 col-xs-12" id="suspend_detail_1"></div>');

        $("#career_level_1").select2();

        $("input[name='suspend_check_1']").click(function() {
            if($(this).val() == 'yes')
            {
                $("#suspend_detail_1").html('<label class="sf-label">Detail</label><span class="rflabelsteric"><strong>*</strong></span>' +
                    '<input type="text" class="form-control requiredField" placeholder="Suspend Reason" name="suspend_reason_1" id="suspend_reason_1" value="" />');
            }
            else
            {
                $("#suspend_detail_1").html('');
            }
        })

        $("#addMoreWorkExperience").click(function(e){
            var form_rows_count = $(".get_rows1").length;
            form_rows_count++;
            $("#insert_clone1").append("<tr class='get_rows1' id='remove_area1_"+form_rows_count+"' ><td class='text-center'>" +
                "<span class='badge badge-pill badge-secondary'>"+form_rows_count+"<span></td><td>" +
                '<input type="hidden" name="work_experience_data[]" value="'+form_rows_count+'">' +
                "<input type='text' name='employeer_name_"+form_rows_count+"' class='form-control requiredField' required></td>" +
                "<td class='text-center'><input name='started_"+form_rows_count+"' id='started_"+form_rows_count+"'  type='date' class='form-control' value=''></td>" +
                "<td class='text-center'><input name='ended_"+form_rows_count+"' id='ended_"+form_rows_count+"' type='date' class='form-control' value=''></td>" +
                "<td class='text-center'><input type='file' class='form-control' name='work_exp_path_"+form_rows_count+"' id='work_exp_path_"+form_rows_count+"' multiple></td>" +
                "<td class='text-center'><button onclick='removeWorkExperienceSection("+form_rows_count+")' type='button'class='btn btn-sm btn-danger'><i class='fas fa-trash'></i></button>" +
                "</td>" +
                "</tr>");
            $("#career_level_"+form_rows_count+"").select2();

        });
    }
    else
    {
        $("#work_experience_area_1").html('');
    }

});
$('#reference_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#reference_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows2"><div class="">' +
            '<table class="table table-bordered sf-table-list" id="get_clone2"><thead>' +
            '<th>Name<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input type="hidden" name="reference_data[]" value="1">' +
            '<input class="form-control requiredField" name="reference_name_1" id="reference_name_1" required>' +
            '</td> </thead><thead> <th>Designation<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="reference_designation_1" id="reference_designation_1" required>' +
            '</td> </thead> <thead><th>Organization<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="reference_organization_1" id="reference_organization_1" required>' +
            '</td></thead><thead>' +
            '<th>Contact Number<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control" type="text" name="reference_contact_1"  id="reference_contact_1" required>' +
            '</td></thead><thead><th>Relationship<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="reference_relationship_1" id="reference_relationship_1" required></td>' +
            '</thead></table><div id="insert_clone2"></div></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-xs btn-primary" id="addMoreReference">Add More Reference</button></div>');


        $("#addMoreReference").click(function(e){

            var form_rows_count = $(".get_rows2").length;
            form_rows_count++;
            $("#insert_clone2").append('<table class="table table-bordered sf-table-list remove_area2_'+form_rows_count+' get_rows2" id=""><thead>' +
                '<th>Name<span class="rflabelsteric"><strong>*</strong></span></th> <td class="text-center">' +
                '<input type="hidden" name="reference_data[]" value="'+form_rows_count+'">' +
                '<input class="form-control requiredField" name="reference_name_'+form_rows_count+'" id="reference_name_'+form_rows_count+'" required>' +
                '</td> </thead><thead> <th>Designation<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="reference_designation_'+form_rows_count+'" id="reference_designation_'+form_rows_count+'" required>' +
                '</td> </thead> <thead><th>Organization<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="reference_organization_'+form_rows_count+'" id="reference_organization_'+form_rows_count+'" required>' +
                '</td></thead><thead><th>Contact Number<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control" type="text" name="reference_contact_'+form_rows_count+'"  id="reference_contact_'+form_rows_count+'" required>' +
                '</td></thead><thead><th>Relationship<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="reference_relationship_'+form_rows_count+'" id="reference_relationship_'+form_rows_count+'" required></td>' +
                '</thead></table>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeReferenceSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area2_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });


    }
    else
    {
        $("#reference_area_1").html('');
    }

});


$('#kins_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#kins_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows9"><div class=""> ' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Relation<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"> <button type="button" class="btn btn-xs btn-primary" id="addMoreKinDetails">Add More Kin Details</button></th>' +
            '</thead><tbody id="insert_clone9"><tr>' +
            '<td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><input type="hidden" name="kins_data[]" value="1">' +
            '<input class="form-control requiredField" name="next_kin_name_1" id="next_kin_name_1" required></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="next_kin_relation_1" id="next_kin_relation_1" required></td>'+'<td class="text-center">-</td></tr></tbody></table><div></div></div></div>');


        $("#addMoreKinDetails").click(function(e){

            var form_rows_count = $(".get_rows9").length;
            form_rows_count++;
            $("#insert_clone9").append('<tr class="remove_area6_'+form_rows_count+' get_rows9" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                "<td class='text-center'><input type='hidden' name='kins_data[]' value="+form_rows_count+">" +
                "<input class='form-control requiredField' name='next_kin_name_"+form_rows_count+"' id='next_kin_name_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><input class='form-control requiredField' name='next_kin_relation_"+form_rows_count+"' id='next_kin_relation_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><button type='button' onclick='removeKinDetailsSection("+form_rows_count+")' class='btn btn-sm btn-danger remove_area9_"+form_rows_count+"'><i class='fas fa-trash'></i></button></td>" +
                '</tr>');

        });

    }
    else
    {
        $("#kins_area_1").html('');
    }

});


$("input[name='relative_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#relative_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows10">' +
            '<input type="hidden" name="relatives_data[]" value="1"><div class=""><table class="table table-bordered sf-table-list" >' +
            '<thead><th class="text-center">S.No</th><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th>Position<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"> <button type="button" class="btn btn-xs btn-primary" id="addMoreRelativesDetails">Add More Relatives Details</button></th>' +
            '</thead><tbody id="insert_clone10"><tr><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="relative_name_1" id="relative_name_1" required></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="relative_position_1"  id="relative_position_1" required></td>' +
            '<td class="text-center">-</td></tr></tbody></table><div></div></div></div>');

        $("#addMoreRelativesDetails").click(function(e){

            var form_rows_count = $(".get_rows10").length;
            form_rows_count++;
            $("#insert_clone10").append('<tr class="remove_area10_'+form_rows_count+' get_rows10" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                '<td class="text-center"><input type="hidden" name="relatives_data[]" value='+form_rows_count+'>' +
                '<input class="form-control requiredField" name="relative_name_'+form_rows_count+'" value="" id="relative_name_'+form_rows_count+'" required></td>' +
                '<td class="text-center"><input class="form-control requiredField" name="relative_position_'+form_rows_count+'" value="" id="next_kin_relation_'+form_rows_count+'" required></td>' +
                '<td class="text-center"><button type="button" onclick="removeRelativesDetailsSection('+form_rows_count+')" class="btn btn-xs btn-danger remove_area10_'+form_rows_count+'"><i class="fas fa-trash"></i></button></td>' +
                '</tr>');

        });

    }
    else
    {
        $("#relative_area_1").html('');
    }
})




$("input[name='transport_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#transport_particular_area_1").html(' <label class="sf-label">Particulars</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Particulars" name="transport_particulars_1" id="transport_particulars_1" value="" />' +
            '');
    }
    else
    {
        $("#transport_particular_area_1").html('');
    }
});

$('#documents_upload_check').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#file_upload_area").html('<label for="media">Upload File:</label>' +
            '<input type="file" class="form-control" name="media[]" id="media" multiple>');
    }
    else
    {
        $("#file_upload_area").html('');
    }
})


$("#emp_id").change(function() {
    var emp_id = $("#emp_id").val();

    $.ajax({
        url: baseUrl+'/hdc/checkEmrNoExist',
        type: "get",
        data: { _token: $('meta[name=csrf-token]').attr('content'), emp_id:emp_id ,m : m},
        success:function(data) {
            if(data == 'success')
            {
                $('#emp_warning').html('');
                $(".btn_disable").removeAttr("disabled");
                $("#emrExistMessage").html('');
            }
            else
            {
                $('.btn_disable').attr('disabled', 'disabled');
                $('#emp_warning').html('Please Remove Errors !');
                $("#emrExistMessage").html(data);
            }
        }
    });
});




$("#cnic_1").change(function() {
    var emp_cnic = $("#cnic_1").val();
    

    $.ajax({
        url: baseUrl+'/hdc/checkCnicNoExist',
        type: "get",
        
        data: {emp_cnic:emp_cnic, m: m},
        success:function(data) {
            if(data == 'success')
            {
                $('#emp_warning').html('');
                $(".btn_disable").removeAttr("disabled");
                $("#cnicExistMessage").html('');
            }
            else
            {
                $('.btn_disable').attr('disabled', 'disabled');
                $('#emp_warning').html('Please Remove Errors !');
                $("#cnicExistMessage").html(data);
            }
        }
    });
});

$('#life_time_cnic_1').click(function(){
    if($(this).is(":checked") == true)
    {
        $("#cnic_expiry_date_1").attr('disabled', 'disabled');
        $("#cnic_expiry_date_1").removeClass('requiredField');
    }

    else
    {
        $("#cnic_expiry_date_1").removeAttr('disabled');
        $("#cnic_expiry_date_1").addClass('requiredField');
    }

});

function getSubDepartment(value){
    if(value != ''){
        $('#emp_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            type:'GET',
            url:baseUrl+'/slal/getSubDepartment',
            data:{id:value},
            success:function(res){
                $('#emp_loader').html('');
                $('select[name="sub_department_id_1"]').empty();
                $('select[name="sub_department_id_1"]').html(res);
                $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
            }
        })
    }
    else{

        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id_1"]').empty();
    }
}

$(document).ready(function(){

    $("#days_off_1").select2();
    $("#reporting_manager").select2();
    $("#working_hours_policy_1").select2();
    $("#working_hours_policy_1").select2();
    $("#sub_department_id_1").select2();
    $("#employee_project_id").select2();

    $('#sub_department_id_').select2();
    $('#gender_1').select2();
    $('#employee_status_1').select2();
    $('#designation_1').select2();
    $('#branch_id_1').select2();
    $('#region_id_1').select2();
    $('#grade_id_1').select2();
    $('#employee_category_id_1').select2();
    $('#employee_project_id_1').select2();
    $('#marital_status_1').select2();
    $('#provident_fund_1').select2();
});

function employeestatus(value){
    if(value == 8 || value == 13){

        $('#pTimePeriod').prop("disabled", false);
        $("#pTimePeriod").addClass('requiredField');
    }
    else{
        $("#pTimePeriod").val('');
        $('#pTimePeriod').prop("disabled", true);
        $("#pTimePeriod").removeClass('requiredField');

    }
}



$(".btn-success").click(function(e){

    var employee = new Array();
    var val;
    $("input[name='employeeSection[]']").each(function(){
        employee.push($(this).val());
    });
    var _token = $("input[name='_token']").val();
    for (val in employee) {
        jqueryValidationCustom();

        if(validate == 0){
            $('#pTimePeriod').prop("disabled", false);
            //alert(response);
        }else{

            return false;
        }
    }

});




function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    document.getElementById("password_1").value = password.substr(0,len);



}

// $('#cnic_1').keydown(function(){
//
//
//     //allow  backspace, tab, ctrl+A, escape, carriage return
//     if (event.keyCode == 8 || event.keyCode == 9
//         || event.keyCode == 27 || event.keyCode == 13
//         || (event.keyCode == 65 && event.ctrlKey === true) )
//         return;
//     if((event.keyCode < 48 || (event.keyCode > 57 && event.keyCode < 96 || event.keyCode > 105 )))
//         event.preventDefault();
//
//     var length = $(this).val().length;
//
//     if(length == 5 || length == 13)
//         $(this).val($(this).val()+'-');
//
//     if((length > 13))
//         return false;
// });


$('.cnicExistMessage').on('keydown',function(evt){

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 8 || charCode == 9
         || charCode == 27 || charCode == 13
         || (charCode == 65 && evt.ctrlKey === true) )
        return;
    if ((charCode < 48 || (charCode > 57 && charCode < 96 || charCode > 105 ))) {
        return false;
    }
    else{
        var cnicLength = $(this).val().length;
        if( cnicLength <=15){
            $('#cnicExistMessage').text('Not less than 13').css("color", "red");
            $('#btn_disable').attr('disabled', 'disabled');
        }
        if (cnicLength == 15) {
            $('#cnicExistMessage').text('');
            $("#btn_disable").removeAttr("disabled");
        }
        if(cnicLength == 5 || cnicLength == 13){
            $(this).val($(this).val()+'-');
        }
    }

});
function stopKeyPressedSpace(){


    var key = event.keyCode || event.charCode || event.which ;
    return key;
}
function checkMobileNumber(paramOne,paramTwo,paramThree,e){

    var mobileNumbers  = paramOne;
    var phoneno = /^[2-9]\d{9}$/;
    var charCode = (e.which) ? e.which : event.keyCode;


        if(paramThree == '1'){
            if(phoneno.test(mobileNumbers)) {
                $('.'+paramTwo+'').html('');
                $("#btn_disable").removeAttr("disabled");
                return true;
            }else {
                if(charCode == 48 && mobileNumbers.length  ==1 ){
                    $('#btn_disable').attr('disabled', 'disabled');
                    $('.'+paramTwo+'').html('zero is not allowed').css("color", "red");
                }else{
                    if (mobileNumbers.length  <10 ) {
                        $('#btn_disable').attr('disabled', 'disabled');
                        $('.'+paramTwo+'').html('Only 10 digits Mobile Number Allowed').css("color", "red");
                        return false;
                    }else if(mobileNumbers.length  >10) {
                        $('#btn_disable').attr('disabled', 'disabled');
                        $('.'+paramTwo+'').html('Only 10 digits Mobile Number Allowed ').css("color", "red");
                        return false;
                    }else{
                        $('.'+paramTwo+'').html('');
                        $("#btn_disable").removeAttr("disabled");
                        return true;
                    }
                }

            }
        }else if(paramThree == '2'){
            if(phoneno.test(mobileNumbers)) {
                $('.'+paramTwo+'').html('');
                $("#btn_disable").removeAttr("disabled");
                return true;
            }else {
                if(charCode == 48 && mobileNumbers.length  ==1){

                    $('.'+paramTwo+'').html('zero is not allowed').css("color", "red");
                    $('#btn_disable').attr('disabled', 'disabled');
                }else{
                    if (mobileNumbers.length  <10 ) {
                        $('.'+paramTwo+'').html('Only 10 digits Mobile Number  Not Less Than 10').css("color", "red");
                        $('#btn_disable').attr('disabled', 'disabled');
                        return false;
                    }else if(mobileNumbers.length  >10) {
                        $('.'+paramTwo+'').html('Only 10 digits Mobile Number Not Greater Than 10 ').css("color", "red");
                        $('#btn_disable').attr('disabled', 'disabled');
                        return false;
                    }else{
                        $('.'+paramTwo+'').html('');
                        $("#btn_disable").removeAttr("disabled");
                        return true;
                    }
                }
            }
        }


}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$(document).ready(function() {
    var employee = 1;

   $('.addMoreEmployeeSection').click(function (e){

        e.preventDefault();
        employee++;
        $('.employeeSection').append('<div class="row myloader_'+employee+'"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>')

        $.ajax({
            url: baseUrl+'/hmfal/makeFormEmployeeDetail',
            type: "GET",
            data: { id:employee ,m : m},
            success:function(data) {
                $('.employeeSection').append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="sectionEmployee_'+employee+'"><a href="#" onclick="removeEmployeeSection('+employee+')" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a><div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">'+data+'</div></div></div>');
                $('.myloader_'+employee).remove();
            }
        });
    });

    // Wait for the DOM to be ready
    // $(".btn-success").click(function(e){
    //     var employee = new Array();
    //     var val;
    //     $("input[name='employeeSection[]']").each(function(){
    //         employee.push($(this).val());
    //     });
    //
    //
    // });
});

function removeEmployeeSection(id){
    var elem = document.getElementById('sectionEmployee_'+id+'');
    elem.parentNode.removeChild(elem);
}

function removeQualificationSection(id){
    $("#remove_area_"+id).remove();
}

function removeWorkExperienceSection(id){
    $("#remove_area1_"+id).remove();
}

function removeReferenceSection(id) {
    $(".remove_area2_"+id).remove();
}

function removeFamilyDataSection(id) {
    $(".remove_area3_"+id).remove();
}

function removeActivityDataSection(id) {
    $(".remove_area4_"+id).remove();
}

function removeEmergencyContactSection(id) {
    $(".remove_area5_"+id).remove();
}

function removeKinDetailsSection(id) {
    $(".remove_area6_"+id).remove();
}

function removeLanguageProficiencySection(id) {
    $("#remove_area7_"+id).remove();
}

function removeHealthDetailsSection(id) {
    $(".remove_area8_"+id).remove();
}
function removeRelativesDetailsSection(id) {
    $(".remove_area10_"+id).remove();
}
function removeEmployeeGsspDocumentDataSection(id) {
    $(".remove_area_"+id).remove();
}


$('#leaves_policy_id_1').click(function (e)
{
    var leaves_policy_id = $('#leaves_policy_1').val();
    if(leaves_policy_id != ''){

        showDetailModelFourParamerter('hdc/viewLeavePolicyDetail',leaves_policy_id,'View Leaves Policy Detail ',m);
    }
    else
    {
        alert('Please Select Policy !');
    }
});

$('#view_tax_1').click(function (e)
{
    var tax_id = $('#tax_id_1').val();
    if(tax_id != '0'){

        showDetailModelTwoParamerterJson('hdc/viewTax',tax_id,'View Tax  Detail ',m);
    }
    else
    {
        alert('Please Select Tax !');
    }
});

$('#can_login_1').click(function (e)
{
    if($("#can_login_1").prop('checked') == true)
    {
        $('#credential_area_1').fadeIn();
        $("#password_1").addClass('requiredField');
        $("#role_1").addClass('requiredField');

    }
    else
    {
        $('#credential_area_1').fadeOut();
        $("#password_1").removeClass('requiredField');
        $("#role_1").removeClass('requiredField');
    }

})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img_file_1').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file_1").change(function(){
    readURL(this);
});

$("#transport_yes_1").change(function(){
    if($("#transport_yes_1").prop('checked') == true)
    {
        $("#transport_particular").fadeIn();
        $("#transport_no_1").prop('checked', false);
    }
    else
    {
        $("#transport_particular").fadeOut();
        $("#transport_yes_1").prop('checked', false);
    }
});

$("#transport_no_1").change(function(){
    if($("#transport_no_1").prop('checked') == true)
    {
        $("#transport_particular").fadeOut();
        $("#transport_yes_1").prop('checked', false);
    }

});




$("input[name='crime_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#crime_check_input_1").html('<label class="sf-label">Detail</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Detail" name="crime_detail_1" id="crime_detail_1" value="" />' +
            '');
    }
    else
    {
        $("#crime_check_input_1").html('');
    }
})


$("input[name='additional_info_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#additional_info_input_1").html('<label class="sf-label">Detail</label><span class="rflabelsteric"><strong>*</strong></span>' +
            ' <input type="text" class="form-control requiredField" placeholder="Detail" name="additional_info_detail_1" id="additional_info_detail_1" value="" />');
    }
    else
    {
        $("#additional_info_input_1").html('');
    }
})


$('#family_data_check_1').click(function(){

    if($(this).is(":checked") == true)
    {

        $("#family_data_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><input type="hidden" name="family_data[]" id="get_rows3" value="1">' +
            '<div class="" id="family_append_area_1">' +
            '<table class="table table-bordered sf-table-list get_rows3" id="get_clone3"><thead><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="family_name_1" id="family_name_1" required>' +'</td>' +
            '</thead><thead><th>Relation<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="family_relation_1"  id="family_relation_1" required></td>' +'</thead><thead>' +
            '<th>Add Emergency Contact<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="family_emergency_1" id="family_emergency_1" required>' +
            '</td></thead></table></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-sm btn-primary" id="addMoreFamilyData">Add More Family Data</button></div>' +
            '');

        $("#addMoreFamilyData").click(function(e){
            var form_rows_count = $(".get_rows3").length;
            form_rows_count++;
            $("#family_append_area_1").append('<table class="table table-bordered sf-table-list remove_area3_'+form_rows_count+' get_rows3" id="">' +
                '<input type="hidden" name="family_data[]" value="'+form_rows_count+'">'+
                '<thead><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="family_name_'+form_rows_count+'" id="family_name_'+form_rows_count+'" required>' +'</td>' +
                '</thead><thead><th>Relation<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="family_relation_'+form_rows_count+'"  id="family_relation_'+form_rows_count+'" required></td>' +'</thead><thead>'+
                '<th>Add Emergency Contact<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="family_emergency_'+form_rows_count+'" id="family_emergency_'+form_rows_count+'" required>' +
                '</td></thead></table>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeFamilyDataSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area3_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });
    }
    else
    {
        $("#family_data_area_1").html('');
    }

});



$('#bank_account_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#bank_account_area_1").html('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Account No</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Account No" name="account_no" id="account_no" value="" />' +
            '</div>'+
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Account Title</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Account Title" name="account_title" id="account_title" value="" />' +
            '</div>');
    }
    else
    {
        $("#bank_account_area_1").html('');
    }

});



$('#language_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#language_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<input type="hidden" name="language_data[]" value="1"><div class="">' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Language<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Read<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Write<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Speak<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"><button type="button" class="btn btn-sm btn-primary" id="addMoreLanguage">Add More Language</button></th>' +
            '</thead><tbody id="insert_clone7"><tr class="get_rows7"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td id="get_clone7" class="text-center"><input class="form-control requiredField" name="language_name_1"  id="language_name_1" required>' +
            '</td><td class="text-center"><b>Good : <input checked type="radio" name="reading_skills_1" value="Good"></b><b>Fair : <input type="radio" name="reading_skills_1" value="Fair">' +
            '</b><b>Poor : <input type="radio" name="reading_skills_1" value="Poor"></b></td><td class="text-center"><b>Good : <input checked type="radio" name="writing_skills_1" value="Good"></b>' +
            '<b>Fair : <input type="radio" name="writing_skills_1" value="Fair"></b><b>Poor : <input type="radio" name="writing_skills_1" value="Poor"></b>' +
            '</td><td class="text-center"><b>Good : <input checked type="radio" name="speaking_skills_1" value="Good"></b><b>Fair : <input type="radio" name="speaking_skills_1" value="Fair"></b>' +
            '<b>Poor : <input type="radio" name="speaking_skills_1" value="Poor"></b></td><td class="text-center"></td></tr></tbody></table> </div></div>');

        $("#addMoreLanguage").click(function(e){
            var form_rows_count = $(".get_rows7").length;
            form_rows_count++;
            $("#insert_clone7").append("<tr class='get_rows7' id='remove_area7_"+form_rows_count+"' ><td class='text-center'>" +
                '<input type="hidden" name="language_data[]" value="'+form_rows_count+'">' +
                "<span class='badge badge-pill badge-secondary'>"+form_rows_count+"<span></td>" +
                "<td class='text-center'><input class='form-control requiredField' name='language_name_"+form_rows_count+"' value='' id='language_name_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='reading_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='reading_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='reading_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='writing_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='writing_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='writing_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><b>Good : <input checked type='radio' name='speaking_skills_"+form_rows_count+"' value='Good'></b>" +
                "<b>Fair : <input  type='radio' name='speaking_skills_"+form_rows_count+"' value='Fair'></b>" +
                "<b>Poor : <input type='radio' name='speaking_skills_"+form_rows_count+"' value='Poor'></b></td>" +
                "<td class='text-center'><button onclick='removeLanguageProficiencySection("+form_rows_count+")' type='button'class='btn btn-sm btn-danger'><i class='fas fa-trash'></i></button>" +
                "</td>" +
                "</tr>");


        });

    }
    else
    {
        $("#language_area_1").html('');
    }

});

$('#health_type_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#health_type_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            '<input type="hidden" name="health_data[]" value="1"><div class="">' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Health Type<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Yes / No<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"><button type="button" class="btn btn-sn btn-primary" id="addMoreHealth">Add More Health</button></th>' +
            '</thead>' +
            '<tbody id="insert_clone8"><tr class="get_rows8"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><select style="width:300px;" class="form-control" name="health_type_1" id="health_type_1" required>' +
            '<option value="Speech">Speech</option>' +
            '<option value="Hearing">Hearing</option>' +
            '<option value="Sight">Sight</option>' +
            '<option value="AIDS">AIDS</option>' +
            '<option value="Hands">Hands</option>' +
            '<option value="Feet">Feet</option>' +
            '<option value="Skin">Skin</option>' +
            '<option value="Cancer">Cancer</option>' +
            '<option value="Epilespy">Epilespy</option>' +
            '<option value="Asthma">Asthma</option>' +
            '<option value="Tuberculosis">Tuberculosis</option>' +
            '<option value="Hepatitis">Hepatitis</option>' +
            ' </select></td><td class="text-center"><select class="form-control" id="health_check_1" name="health_check_1" required>' +
            '<option value="Yes">Yes</option>' +
            '<option value="No">No</option>' +
            '</select></td><td class="text-center">-</td></tr></tbody></table></div>' +
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
            '<label class="sf-label">Any Physical Handicap</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span> ' +
            '<input type="text" class="form-control requiredField" name="physical_handicap" id="physical_handicap" value="-" />' +
            '</div><div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><label class="sf-label">Height</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="" name="height" id="height"/>' +
            '</div><div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"><label class="sf-label">Weight</label>' +
            "<span class='rflabelsteric'><strong>*</strong></span>" +
            "<input type='number' class='form-control requiredField' placeholder='80kg' name='weight' id='weight'  />" +
            "</div> <div class='col-lg-3 col-md-3 col-sm-3 col-xs-12'><label class='sf-label'>Blood Group</label>" +
            "<span class='rflabelsteric'><strong>*</strong></span>" +
            "<input type='text' class='form-control requiredField' placeholder='A+' name='blood_group' id='blood_group'  />" +
            "</div></div>");

        $("#addMoreHealth").click(function(e){
            var clone_health_type = $("#health_type_1").html();
            var clone_health_check = $("#health_check_1").html();
            var form_rows_count = $(".get_rows8").length;
            form_rows_count++;
            $("#insert_clone8").append('<tr class="remove_area8_'+form_rows_count+' get_rows8" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                '<td class="text-center"><select style="width:300px;" class="form-control" name="health_type_'+form_rows_count+'" id="health_type_'+form_rows_count+'" required>'+clone_health_type+'</select></td>' +
                '<td class="text-center"><select class="form-control" name="health_check_'+form_rows_count+'" id="health_check_'+form_rows_count+'" required>'+clone_health_check+'</select></td>' +
                '<td class="text-center"><input type="hidden" name="health_data[]" value="'+form_rows_count+'">' +
                '<button type="button" onclick="removeHealthDetailsSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area8_'+form_rows_count+'"><i class="fas fa-trash"></i></button></td>' +
                '</tr>');
            $("#health_type_"+form_rows_count+"").select2();

        });
        $("#health_type_1").select2();
    }
    else
    {
        $("#health_type_area_1").html('');
    }

});

$('#activity_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#activity_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows4">' +
            '<input type="hidden" name="activity_data[]" value="1"><div id="get_clone4">' +
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Name Of Institution</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span><input class="form-control requiredField" name="institution_name_1" id="institution_name_1" required>' +
            '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Position Held</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Particulars" name="position_held_1" id="position_held_1" value="" />' +
            '</div></div><div class="row">&nbsp;</div><div class="row">&nbsp;</div><div id="insert_clone4"></div></div>' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-sm btn-primary" id="addMoreActivities">Add More Activities</button>' +
            '</div>');

        $("#addMoreActivities").click(function(e){

            var form_rows_count = $(".get_rows4").length;
            form_rows_count++;
            $("#insert_clone4").append('<div class="remove_area4_'+form_rows_count+' get_rows4" id=""><input type="hidden" name="activity_data[]" value="'+form_rows_count+'">' +
                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Name Of Institution</label>' +
                '<span class="rflabelsteric"><strong>*</strong></span><input class="form-control requiredField" name="institution_name_'+form_rows_count+'" id="institution_name_'+form_rows_count+'" required>' +
                '</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label class="sf-label">Position Held</label>' +
                '<span class="rflabelsteric"><strong>*</strong></span>' +
                '<input type="text" class="form-control requiredField" placeholder="Particulars" name="position_held_'+form_rows_count+'" id="position_held_'+form_rows_count+'" value="" />' +
                '</div></div>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeActivityDataSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area4_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });
    }
    else
    {
        $("#activity_area_1").html('');
    }

});
$('#work_experience_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#work_experience_area_1").html(' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="">' +
            '<table class="table-sm mb-0 table-bordered"><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Emp Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">From</th><th class="text-center">Till</th>' +
            '<th class="text-center">File</th>' +
            ' <th class="text-center"><button type="button" id="addMoreWorkExperience" class="icon btn btn-sm btn-primary"><i class="fas fa-plus"></i></button></th>' +
            '</thead><tbody id="insert_clone1"><tr class="get_rows1"><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td id="get_clone1" class="text-center"><input type="hidden" name="work_experience_data[]" value="1">' +
            '<input type="text" name="employeer_name_1" id="employeer_name_1" class="form-control requiredField" required></td>' +
            '<td class="text-center"><input name="started_1" type="date" class="form-control" id="started_1">' +
            '</td><td class="text-center"><input name="ended_1" id="ended_1"type="date" class="form-control" ></td>' +
            '<td class="text-center"><input type="file" class="form-control" name="work_exp_path_1" id="work_exp_path_1" multiple></td>' +
            '<td class="text-center">-</td></tr></tbody></table></div></div>' +
            '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12"><br><label class="sf-label">Have you ever been dismissed / suspended from service ?</label>' +
            '<input type="radio" name="suspend_check_1" id="suspend_check_1" value="no" checked/>&nbsp; No' +
            '<input type="radio" name="suspend_check_1" id="suspend_check_1" value="yes" />&nbsp; Yes &nbsp;' +
            '</div><div class="col-lg-7 col-md-7 col-sm-7 col-xs-12" id="suspend_detail_1"></div>');

        $("#career_level_1").select2();

        $("input[name='suspend_check_1']").click(function() {
            if($(this).val() == 'yes')
            {
                $("#suspend_detail_1").html('<label class="sf-label">Detail</label><span class="rflabelsteric"><strong>*</strong></span>' +
                    '<input type="text" class="form-control requiredField" placeholder="Suspend Reason" name="suspend_reason_1" id="suspend_reason_1" value="" />');
            }
            else
            {
                $("#suspend_detail_1").html('');
            }
        })

        $("#addMoreWorkExperience").click(function(e){
            var form_rows_count = $(".get_rows1").length;
            form_rows_count++;
            $("#insert_clone1").append("<tr class='get_rows1' id='remove_area1_"+form_rows_count+"' ><td class='text-center'>" +
                "<span class='badge badge-pill badge-secondary'>"+form_rows_count+"<span></td><td>" +
                '<input type="hidden" name="work_experience_data[]" value="'+form_rows_count+'">' +
                "<input type='text' name='employeer_name_"+form_rows_count+"' class='form-control requiredField' required></td>" +
                "<td class='text-center'><input name='started_"+form_rows_count+"' id='started_"+form_rows_count+"'  type='date' class='form-control' value=''></td>" +
                "<td class='text-center'><input name='ended_"+form_rows_count+"' id='ended_"+form_rows_count+"' type='date' class='form-control' value=''></td>" +
                "<td class='text-center'><input type='file' class='form-control' name='work_exp_path_"+form_rows_count+"' id='work_exp_path_"+form_rows_count+"' multiple></td>" +
                "<td class='text-center'><button onclick='removeWorkExperienceSection("+form_rows_count+")' type='button'class='btn btn-sm btn-danger'><i class='fas fa-trash'></i></button>" +
                "</td>" +
                "</tr>");
            $("#career_level_"+form_rows_count+"").select2();

        });
    }
    else
    {
        $("#work_experience_area_1").html('');
    }

});
$('#reference_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#reference_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows2"><div class="">' +
            '<table class="table table-bordered sf-table-list" id="get_clone2"><thead>' +
            '<th>Name<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input type="hidden" name="reference_data[]" value="1">' +
            '<input class="form-control requiredField" name="reference_name_1" id="reference_name_1" required>' +
            '</td> </thead><thead> <th>Designation<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="reference_designation_1" id="reference_designation_1" required>' +
            '</td> </thead> <thead><th>Organization<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
            '<input class="form-control requiredField" name="reference_organization_1" id="reference_organization_1" required>' +
            '</td></thead><thead>' +
            '<th>Contact Number<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control" type="text" name="reference_contact_1"  id="reference_contact_1" required>' +
            '</td></thead><thead><th>Relationship<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<td class="text-center"><input class="form-control requiredField" name="reference_relationship_1" id="reference_relationship_1" required></td>' +
            '</thead></table><div id="insert_clone2"></div></div></div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right">' +
            '<button type="button" class="btn btn-sm btn-primary" id="addMoreReference">Add More Reference</button></div>');


        $("#addMoreReference").click(function(e){

            var form_rows_count = $(".get_rows2").length;
            form_rows_count++;
            $("#insert_clone2").append('<table class="table table-bordered sf-table-list remove_area2_'+form_rows_count+' get_rows2" id=""><thead>' +
                '<th>Name<span class="rflabelsteric"><strong>*</strong></span></th> <td class="text-center">' +
                '<input type="hidden" name="reference_data[]" value="'+form_rows_count+'">' +
                '<input class="form-control requiredField" name="reference_name_'+form_rows_count+'" id="reference_name_'+form_rows_count+'" required>' +
                '</td> </thead><thead> <th>Designation<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="reference_designation_'+form_rows_count+'" id="reference_designation_'+form_rows_count+'" required>' +
                '</td> </thead> <thead><th>Organization<span class="rflabelsteric"><strong>*</strong></span></th><td class="text-center">' +
                '<input class="form-control requiredField" name="reference_organization_'+form_rows_count+'" id="reference_organization_'+form_rows_count+'" required>' +
                '</td></thead><thead><th>Contact Number<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control" type="text" name="reference_contact_'+form_rows_count+'"  id="reference_contact_'+form_rows_count+'" required>' +
                '</td></thead><thead><th>Relationship<span class="rflabelsteric"><strong>*</strong></span></th>' +
                '<td class="text-center"><input class="form-control requiredField" name="reference_relationship_'+form_rows_count+'" id="reference_relationship_'+form_rows_count+'" required></td>' +
                '</thead></table>' +
                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"><button type="button" onclick="removeReferenceSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area2_'+form_rows_count+'"><i class="fas fa-trash"></i></button><div>');

        });


    }
    else
    {
        $("#reference_area_1").html('');
    }

});


$('#kins_check_1').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#kins_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows9"><div class=""> ' +
            '<table class="table table-bordered sf-table-list" ><thead><th class="text-center">S.No</th>' +
            '<th class="text-center">Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center">Relation<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"> <button type="button" class="btn btn-sm btn-primary" id="addMoreKinDetails">Add More Kin Details</button></th>' +
            '</thead><tbody id="insert_clone9"><tr>' +
            '<td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><input type="hidden" name="kins_data[]" value="1">' +
            '<input class="form-control requiredField" name="next_kin_name_1" id="next_kin_name_1" required></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="next_kin_relation_1" id="next_kin_relation_1" required></td>'+'<td class="text-center">-</td></tr></tbody></table><div></div></div></div>');


        $("#addMoreKinDetails").click(function(e){

            var form_rows_count = $(".get_rows9").length;
            form_rows_count++;
            $("#insert_clone9").append('<tr class="remove_area6_'+form_rows_count+' get_rows9" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                "<td class='text-center'><input type='hidden' name='kins_data[]' value="+form_rows_count+">" +
                "<input class='form-control requiredField' name='next_kin_name_"+form_rows_count+"' id='next_kin_name_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><input class='form-control requiredField' name='next_kin_relation_"+form_rows_count+"' id='next_kin_relation_"+form_rows_count+"' required></td>" +
                "<td class='text-center'><button type='button' onclick='removeKinDetailsSection("+form_rows_count+")' class='btn btn-sm btn-danger remove_area9_"+form_rows_count+"'><i class='fas fa-trash'></i></button></td>" +
                '</tr>');

        });

    }
    else
    {
        $("#kins_area_1").html('');
    }

});


$("input[name='relative_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#relative_area_1").html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 get_rows10">' +
            '<input type="hidden" name="relatives_data[]" value="1"><div class=""><table class="table table-bordered sf-table-list" >' +
            '<thead><th class="text-center">S.No</th><th>Name<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th>Position<span class="rflabelsteric"><strong>*</strong></span></th>' +
            '<th class="text-center"> <button type="button" class="btn btn-sm btn-primary" id="addMoreRelativesDetails">Add More Relatives Details</button></th>' +
            '</thead><tbody id="insert_clone10"><tr><td class="text-center"><span class="badge badge-pill badge-secondary">1</span></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="relative_name_1" id="relative_name_1" required></td>' +
            '<td class="text-center"><input class="form-control requiredField" name="relative_position_1"  id="relative_position_1" required></td>' +
            '<td class="text-center">-</td></tr></tbody></table><div></div></div></div>');

        $("#addMoreRelativesDetails").click(function(e){

            var form_rows_count = $(".get_rows10").length;
            form_rows_count++;
            $("#insert_clone10").append('<tr class="remove_area10_'+form_rows_count+' get_rows10" id="">' +
                '<td class="text-center"><span class="badge badge-pill badge-secondary">'+form_rows_count+'</td>' +
                '<td class="text-center"><input type="hidden" name="relatives_data[]" value='+form_rows_count+'>' +
                '<input class="form-control requiredField" name="relative_name_'+form_rows_count+'" value="" id="relative_name_'+form_rows_count+'" required></td>' +
                '<td class="text-center"><input class="form-control requiredField" name="relative_position_'+form_rows_count+'" value="" id="next_kin_relation_'+form_rows_count+'" required></td>' +
                '<td class="text-center"><button type="button" onclick="removeRelativesDetailsSection('+form_rows_count+')" class="btn btn-sm btn-danger remove_area10_'+form_rows_count+'"><i class="fas fa-trash"></i></button></td>' +
                '</tr>');

        });

    }
    else
    {
        $("#relative_area_1").html('');
    }
})




$("input[name='transport_check_1']").click(function() {

    if($(this).val() == 'Yes')
    {
        $("#transport_particular_area_1").html(' <label class="sf-label">Particulars</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input type="text" class="form-control requiredField" placeholder="Particulars" name="transport_particulars_1" id="transport_particulars_1" value="" />' +
            '');
    }
    else
    {
        $("#transport_particular_area_1").html('');
    }
});

$('#documents_upload_check').click(function(){

    if($(this).is(":checked") == true)
    {
        $("#file_upload_area").html('<label for="media">Upload File:</label>' +
            '<input type="file" class="form-control" name="media[]" id="media" multiple>');
    }
    else
    {
        $("#file_upload_area").html('');
    }
})


// $("#emp_id").change(function() {
//     var emp_id = $("#emp_id").val();
//
//     $.ajax({
//         url: baseUrl+'/hdc/checkEmrNoExist',
//         type: "POST",
//         data: { _token: $('meta[name=csrf-token]').attr('content'), emp_id:emp_id ,m : m},
//         success:function(data) {
//             if(data == 'success')
//             {
//                 $('#emp_warning').html('');
//                 $(".btn_disable").removeAttr("disabled");
//                 $("#emrExistMessage").html('');
//             }
//             else
//             {
//                 $('.btn_disable').attr('disabled', 'disabled');
//                 $('#emp_warning').html('Please Remove Errors !');
//                 $("#emrExistMessage").html(data);
//             }
//         }
//     });
// });

// $("#cnic_1").change(function() {
//     var emp_cnic = $("#cnic_1").val();

//     $.ajax({
//         url: baseUrl+'/hdc/checkCnicNoExist',
//         type: "POST",
//         data: { _token: $('meta[name=csrf-token]').attr('content'), emp_cnic:emp_cnic, m: m},
//         success:function(data) {
//             if(data == 'success')
//             {
//                 $('#emp_warning').html('');
//                 $(".btn_disable").removeAttr("disabled");
//                 $("#cnicExistMessage").html('');
//             }
//             else
//             {
//                 $('.btn_disable').attr('disabled', 'disabled');
//                 $('#emp_warning').html('Please Remove Errors !');
//                 $("#cnicExistMessage").html(data);
//             }
//         }
//     });
// });

// $('#life_time_cnic_1').click(function(){
//     if($(this).is(":checked") == true)
//     {
//         $("#cnic_expiry_date_1").attr('disabled', 'disabled');
//         $("#cnic_expiry_date_1").removeClass('requiredField');
//     }

//     else
//     {
//         $("#cnic_expiry_date_1").removeAttr('disabled');
//         $("#cnic_expiry_date_1").addClass('requiredField');
//     }

// });

function getSubDepartment(value){
    if(value != ''){
        $('#emp_loader').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            type:'GET',
            url:baseUrl+'/slal/getSubDepartment',
            data:{id:value},
            success:function(res){
                $('#emp_loader').html('');
                $('select[name="sub_department_id_1"]').empty();
                $('select[name="sub_department_id_1"]').html(res);
                $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
            }
        })
    }
    else{

        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id_1"]').empty();
    }
}

$(document).ready(function(){

    $("#days_off_1").select2();
    $("#reporting_manager").select2();
    $("#working_hours_policy_1").select2();
    $("#working_hours_policy_1").select2();
    $("#sub_department_id_1").select2();
    $("#employee_project_id").select2();
    $("#department_id").select2();
    $('#gender_1').select2();
    $('#employee_status_1').select2();
    $('#designation_1').select2();
    $('#branch_id_1').select2();
    $('#region_id_1').select2();
    $('#grade_id_1').select2();
    $('#employee_category_id_1').select2();
    $('#employee_project_id_1').select2();
    $('#marital_status_1').select2();
    $('#provident_fund_1').select2();
});





function deleteEmployee(companyId,recordId,tableName,emp_id){
    var companyId;
    var recordId;
    var tableName;
    var emp_id;
    if(confirm("Do you want to delete this record ?") == true){
        $.ajax({
            url: baseUrl+'/cdOne/deleteEmployee',
            type: "GET",
            data: {'request_type':'delete',companyId:companyId,recordId:recordId,tableName:tableName,'emp_id':emp_id},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }
}

function restoreEmployee(companyId,recordId,tableName){
    var companyId;
    var recordId;
    var tableName;
    $.ajax({
        url: baseUrl+'/cdOne/restoreEmployee',
        type: "get",
        data: {companyId:companyId,recordId:recordId,tableName:tableName},
        success:function(data) {
            location.reload();
        }
    });
}







$(document).ready(function() {

    var table = $('#EmployeeList').DataTable({
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

    var table = $('#UserAccountsList').DataTable({
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

    var table = $('#exportLateArrivals').DataTable({
        "dom": "t",
        "bPaginate" : false,
        "bLengthChange" : true,
        "bSort" : false,
        "bInfo" : false,
        "bAutoWidth" : false

    });

    $('#emp_id_').keyup( function() {
        table.search(this.value).draw();
    });




});

$(document).ready(function(){


    //$("#emp_id").select2();
    $("#sub_department_id").select2();
    $('#department_id_').select2();
    $('#leaves_policy_1').select2();


});

function workExpFile(id) {
    $('.workExpFile_'+id).hide();
    $('#work_exp_path_'+id).show();
}

function documentFile(id) {
    $('#'+id).hide();
    $('#media_show').show();
}

function getEmployee(){

    var department = $("#department_id").val();
    var sub_department = $("#sub_department_id").val();

    if(department == '0'){
        $("#department_id_").val('0');
        $("#sub_department_id").val('0');
        $('select[name="emp_id"]').empty();
        $("#emp_id").prepend("<option value='0'>-</option>");
        return false;
    }
    if(department != '0' && sub_department == ''){
        data = {department:department,sub_department:'0',m:m}
    }
    else if(department != '' && sub_department != ''){
        data = {department:department,sub_department:sub_department,m:m}
    }
    if(department != ''){
        $('#emp_loader_1').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
        $.ajax({
            type:'GET',
            url:baseUrl+'/slal/getSubDepartment',
            data:data,
            success:function(res){
                $('#emp_loader_1').html('');
                $('select[name="emp_id"]').empty();
                $('select[name="emp_id"]').html(res);

            }
        })
    }
    else{
        $("#sub_department_id_1").prepend("<option value='' selected='selected'>Select Sub Department</option>");
        $('select[name="sub_department_id"]').empty();
        $('select[name="emr_no"]').empty();
    }
}








