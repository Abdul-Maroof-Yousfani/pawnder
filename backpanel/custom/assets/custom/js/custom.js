var m=$('#m').val();
var baseUrl=$('#baseUrl').val();

function deleteRowCompanyRecords(companyId,recordId,tableName){
    var companyId;
    var recordId;
    var tableName;

    if(confirm("Do you want to delete this record ?") == true){
        $.ajax({
            url: baseUrl+'/cdOne/deleteRowCompanyRecords',
            type: "GET",
            data: {companyId:companyId,recordId:recordId,tableName:tableName},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }

}



var validate;
function jqueryValidationCustom() {

    var requiredField = document.getElementsByClassName('requiredField');

    for (i = 0; i < requiredField.length; i++) {

        var rf = requiredField[i].id;

        var checkType = requiredField[i].type;
        
        /*if(checkType == 'text'){
         alert('Please type text');
         }else if(checkType == 'select-one'){
         alert('Please select one option');
         }else if(checkType == 'number'){
         alert('Please type number');
         }else if(checkType == 'date'){
         alert('Please type date');
         }*/
        if ($('#' + rf).val() == '' || $('#' + rf).val() == 0) {
            $('#' + rf).css('border-color', 'red');
            if(checkType == 'select-one'){
                $('#' + rf).next('.select2').after($('.checkmarktitle').html(''));
                $('#' + rf).next('.select2').after('<span class="checkmarktitle">Field is rquired</span>');
            }
            else{
                $('#' + rf).after($('.checkmarktitle').html(''));
                $('#' + rf).after('<span class="checkmarktitle">Field is rquired</span>');
            }
            

            $('#' + rf).focus();
            validate = 1;
            return false;
        } else {
            $(".checkmarktitle").remove();
            $('#' + rf).after($('.checkmarktitle').html(''));
            $('#' + rf).after($('.checkmarktitle').html(''));
            $('#' + rf).css('border-color', '#ccc');
            validate = 0;
        }
    }


    /*var requiredField1 = document.getElementsByClassName('requiredField');
     for (i = 0; i < requiredField1.length; i++){
     var rf1 = requiredField[i].id;
     if($('#'+rf1+'').val() == ''){
     validate = 1;
     }else{
     validate = 0;
     }
     }*/
    return validate;
}


function hidemenu(){
    $('.main-wrapper1').removeAttr('id');
    $('.left-sidebar').css({"display": "none"});
    $('#hidemenu').css({"display": "none"});
    $('#showmenu').css({"display": "block"});
}
function showmenu(){
    $('.main-wrapper1').attr('id','main-wrapper');
    $('.left-sidebar').css({"display": "block"});
    $('#showmenu').css({"display": "none"});
    $('#hidemenu').css({"display": "block"});
}


function repostMasterTableRecords(recordId,tableName){

    var recordId;
    var tableName;

    $.ajax({
        url: baseUrl+'/cdOne/repostMasterTableRecords',
        type: "GET",
        data: {recordId:recordId,tableName:tableName},
        success:function(data) {
            location.reload();
        }
    });

}

function deleteRowCompanyHRRecords(companyId,recordId,tableName){
    var companyId;
    var recordId;
    var tableName;

    if(confirm("Do you want to delete this record ?") == true) {
        $.ajax({
            url: baseUrl+'/cdOne/deleteRowCompanyHRRecords',
            type: "GET",
            data: {companyId: companyId, recordId: recordId, tableName: tableName},
            success: function (data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }
}

function repostCompanyTableRecord(companyId,recordId,tableName) {

    var companyId;
    var recordId;
    var tableName;

    $.ajax({
        url: baseUrl+'/cdOne/repostOneTableRecords',
        type: "GET",
        data: {companyId:companyId,recordId:recordId,tableName:tableName},
        success:function(data) {
            location.reload();
        }
    });
    /* var url;
     var id;
     var tableName;
     var companyId;
     var accId;
     $.ajax({
     url: '<?php echo url('/')?>/'+url+'',
     type: "GET",
     data: {companyId:companyId,id:id,tableName:tableName,accId:accId},
     success:function(data) {
     location.reload();
     }
     });(*/
}




function getEmployee(){
    var department = $("#department_id").val();
    var sub_department = $("#sub_department_id").val();

    if(department == '0'){
        $("#department_id_").val('0');
        $("#sub_department").val('0');
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
        $('select[name="sub_department_id_1"]').empty();
        $('select[name="emp_id"]').empty();
    }
}

$('#btn_update').on('click', function() {
    var $this = $(this);
    $('#btn_update').html('Loading');
    $('#btn_update').append('&nbsp;<span class="loading"></span>');
    $(".loading").addClass("spinner-border spinner-border-sm");

    setTimeout(function() {
        $('#btn_update').html('Update');
    }, 2000);
});
$('#btn_add').on('click', function() {
    var $this = $(this);
    $('#btn_add').hide();
    $('#btn_add').after('&nbsp;<button type="button" class="btn btn-sm btn-success load">Loading <span class="loading"></span></button>');
    $(".loading").addClass("spinner-border spinner-border-sm");

    setTimeout(function() {
        $('#btn_add').show();
        $('.load').hide();
    }, 2000);
});
$('#btn_search').on('click', function() {
    var $this = $(this);
    $('#btn_search').hide();
    $('#btn_search').after('&nbsp;<button type="button" class="btn btn-primary load">Loading <span class="loading"></span></button>');
    $(".loading").addClass("spinner-border spinner-border-sm");

    setTimeout(function() {
        $('#btn_search').show();
        $('.load').hide();
    }, 2000);
});


$('#reset').on('click', function() {
    var $this = $(this);
    $('#reset').html('Loading');
    $('#reset').append('&nbsp;<span class="loading"></span>');
    $(".loading").addClass("spinner-border spinner-border-sm");

    setTimeout(function() {
        $('#reset').html('Clear Form');
    }, 2000);
});



$(document).ready(function () {
    $('#reset').html('Clear Form');
    $(document).bind('ajaxStart', function () {
        $('.btn_search').html(' <i id="load"> </i>'+' Loading');
        $("#load").addClass("spinner-border spinner-border-sm");
    }).bind('ajaxStop', function () {
        $('.btn_search').html('<i id="load" class="fas fa-search fa"> </i> '+' Search');
        $('#load').removeClass("spinner-border spinner-border-sm");
    });

});

function deleteRowMasterTable(id,tableName){
    var id;
    var tableName;

    if(confirm("Do you want to delete this record ?") == true){

        $.ajax({
            url: baseUrl+'/deleteMasterTableReceord',
            type: "GET",
            data: {id:id,tableName:tableName},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }

}

$(document).ready(function(){

    $('#filter_users').focus(function(){
        $('#itemsDiv').fadeIn(250);
    }).focusout(function(){
        $('#itemsDiv').fadeOut(250);
    });
});



// ul = document.getElementById("users-list");


// var render_lists = function(lists){
//     var li = "";
//     var i=0;
//     for(index in lists){
//         li += "<li><a href='"+lists[index][1]+"?m=12#Innovative'>" + lists[index][0] + "</a></li>";

//     }
//     ul.innerHTML = li;
// }

// render_lists(results);

// // lets filters it
// input = document.getElementById('filter_users');

// var filterUsers = function(event){
//     keyword = input.value.toLowerCase();
//     var i=0;
//     var j=0;
//     filtered_users = results.filter(function(user){
//         user = user[i].toLowerCase();
//         return user.indexOf(keyword) > -1;
//         i++;
//     });

//     render_lists(filtered_users);
// }


// input.addEventListener('keyup', filterUsers);


// // function readTextFile(file)
// // {
// //
// //
// //     var rawFile = new XMLHttpRequest();
// //     var name = '';
// //     var url = '';
// //     var out = '';
// //
// //     rawFile.open('GET', baseUrl+'/storage/app/menu.json', false);
// //     rawFile.onreadystatechange = function ()
// //     {
// //         if(rawFile.readyState === 4)
// //         {
// //             if(rawFile.status === 200 || rawFile.status == 0)
// //             {
// //                 var allText = rawFile.responseText;
// //                 myObj = JSON.parse(allText);
// //
// //                 var results = [];
// //                 var searchField = "name";
// //                 var searchVal = $('#myInput').val();
// //
// //                 for (var i=0 ; i < myObj.length; i++)
// //                 {
// //                     //console.log(myObj[i])
// //                     if (myObj[i][searchField] == searchVal) {
// //                         console.log(myObj[i]);
// //                         $("#menu_area").html('');
// //                         $("#menu_area").html(myObj[i].name);
// //                     }
// //                 }
// //                 // document.getElementById('menu_area').innerHTML = results;
// //                 // for (x in myObj) {
// //                 //     name = myObj[x].name;
// //                 //     url = myObj[x].url
// //                 //     out += "<a href='"+url+"'>"+name+"</a><br>";
// //                 // }
// //
// //                 //document.getElementById("demo").innerHTML = txt;
// //                // document.getElementById('menu_area').innerHTML = out;
// //             }
// //         }
// //     }
// //     rawFile.send(null);
// // }

// var results = [];
// var urls=[];
// function search_menu_key_press(){


//         function autocomplete(inp, arr) {



//             var rawFile = new XMLHttpRequest();
//             var name = '';
//             var url = '';
//             var out = '';

//             rawFile.open('GET', baseUrl+'/storage/app/menu.json', false);
//             rawFile.onreadystatechange = function ()
//             {
//                 if(rawFile.readyState === 4)
//                 {
//                     if(rawFile.status === 200 || rawFile.status == 0)
//                     {
//                         var allText = rawFile.responseText;
//                         myObj = JSON.parse(allText);
//                         var searchVal = $('#search_menu').val();

//                         for (var i=0 ; i < myObj.length; i++)
//                         {
//                             results[i]= [myObj[i].name,myObj[i].url];



//                             //urls[i]=myObj[i].url;
//                         }

//                     }
//                 }
//             };
//             rawFile.send(null);




//             /*the autocomplete function takes two arguments,
//              the text field element and an array of possible autocompleted values:*/
//             var currentFocus;
//             /*execute a function when someone writes in the text field:*/
//             // inp.addEventListener("input", function(e) {
//             //     var a, b, i, val = this.value;
//             //     /*close any already open lists of autocompleted values*/
//             //     closeAllLists();
//             //     if (!val) { return false;}
//             //     currentFocus = -1;
//             //     /*create a DIV element that will contain the items (values):*/
//             //     a = document.createElement("DIV");
//             //     a.setAttribute("id", this.id + "autocomplete-list");
//             //     a.setAttribute("class", "autocomplete-items");
//             //     /*append the DIV element as a child of the autocomplete container:*/
//             //     this.parentNode.appendChild(a);
//             //     /*for each item in the array...*/
//             //     for (i = 0; i < arr.length; i++) {
//             //         /*check if the item starts with the same letters as the text field value:*/
//             //         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//             //             /*create a DIV element for each matching element:*/
//             //             b = document.createElement("DIV");
//             //             /*make the matching letters bold:*/
//             //             b.innerHTML = arr[i].substr(0, val.length);
//             //             b.innerHTML += arr[i].substr(val.length);
//             //             /*insert a input field that will hold the current array item's value:*/
//             //             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//             //             /*execute a function when someone clicks on the item value (DIV element):*/
//             //             b.addEventListener("click", function(e) {
//             //                 /*insert the value for the autocomplete text field:*/
//             //
//             //                 inp.value = this.getElementsByTagName("input")[0].value;
//             //                 /*close the list of autocompleted values,
//             //                  (or any other open lists of autocompleted values:*/
//             //                 closeAllLists();
//             //             });
//             //             a.appendChild(b);
//             //         }
//             //     }
//             // });
//             /*execute a function presses a key on the keyboard:*/
//             inp.addEventListener("keydown", function(e) {
//                 var x = document.getElementById(this.id + "autocomplete-list");
//                 if (x) x = x.getElementsByTagName("div");
//                 if (e.keyCode == 40) {
//                     /*If the arrow DOWN key is pressed,
//                      increase the currentFocus variable:*/
//                     currentFocus++;
//                     /*and and make the current item more visible:*/
//                     addActive(x);
//                 } else if (e.keyCode == 38) { //up
//                     /*If the arrow UP key is pressed,
//                      decrease the currentFocus variable:*/
//                     currentFocus--;
//                     /*and and make the current item more visible:*/
//                     addActive(x);
//                 } else if (e.keyCode == 13) {
//                     /*If the ENTER key is pressed, prevent the form from being submitted,*/
//                     e.preventDefault();
//                     if (currentFocus > -1) {
//                         /*and simulate a click on the "active" item:*/
//                         if (x) x[currentFocus].click();
//                     }
//                 }
//             });
//             function addActive(x) {
//                 /*a function to classify an item as "active":*/
//                 if (!x) return false;
//                 /*start by removing the "active" class on all items:*/
//                 removeActive(x);
//                 if (currentFocus >= x.length) currentFocus = 0;
//                 if (currentFocus < 0) currentFocus = (x.length - 1);
//                 /*add class "autocomplete-active":*/
//                 x[currentFocus].classList.add("autocomplete-active");
//             }
//             function removeActive(x) {
//                 /*a function to remove the "active" class from all autocomplete items:*/
//                 for (var i = 0; i < x.length; i++) {
//                     x[i].classList.remove("autocomplete-active");
//                 }
//             }
//             function closeAllLists(elmnt) {
//                 /*close all autocomplete lists in the document,
//                  except the one passed as an argument:*/
//                 var x = document.getElementsByClassName("autocomplete-items");
//                 for (var i = 0; i < x.length; i++) {
//                     if (elmnt != x[i] && elmnt != inp) {
//                         x[i].parentNode.removeChild(x[i]);
//                     }
//                 }
//             }
//             /*execute a function when someone clicks in the document:*/
//             document.addEventListener("click", function (e) {
//                 closeAllLists(e.target);
//             });







//         }

//         /*An array containing all the country names in the world:*/

//         /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/


//         autocomplete(document.getElementById("filter_users"), results);
// // console.log(results)

// }



function payrollCalculation(id,netSalary,loan_per_month,total_deduction2)
{

    var loan_amount = (parseInt(loan_per_month) - $("#loan_amount_"+id).val());

    var extra_allowance = parseInt($("#extra_allowance_"+id).val());
    var otherAmount = parseInt($("#other_amount_"+id).val());
    var hidden_allowance =  parseInt($("#hidden_allowance_"+id).val());
    var allowance = parseInt($("#total_allowance_"+id).val()-hidden_allowance);
    var total_deduction = parseInt( $("#total_deduction_"+id).val());
    var loan_amount2 = parseInt($("#loan_amount_"+id).val());
    //alert(total_deduction);
    if( isNaN(extra_allowance) ){
        extra_allowance = 0;
    }
    if( isNaN(otherAmount) ){
        otherAmount = 0;
    }
    if( isNaN(loan_amount) ){
        loan_amount = 0;
    }
    if( isNaN(allowance) ){
        allowance = 0;
    }
    if( isNaN(total_deduction2) ){
        total_deduction = 0;
    }

    if(isNaN(loan_amount2)){
        loan_amount2 = 0;
    }

    $(".net_salary2_"+id).val(parseInt(netSalary)+otherAmount+extra_allowance+allowance+loan_amount);
    $(".net_salary2_"+id).html(parseInt(netSalary)+otherAmount+extra_allowance+allowance+loan_amount);
    $(".total_deduction_"+id).html(parseInt(total_deduction2) + parseInt(loan_amount2));
    $(".total_deduction_"+id).val(parseInt(total_deduction2) + parseInt(loan_amount2));
    //alert(otherAmount+extra_allowance+allowance+loan_amount);
}

$("#show_all").change(function(){
    if($('#show_all').is(':checked')){
        $('#department_id').prop("disabled", true);
        $('#sub_department_id').prop("disabled", true);
        $('#emp_id').prop("disabled", true);
    }
    else{
        $('#department_id_').prop("disabled", false);
        $('#sub_department_id').prop("disabled", false);
        $('#emp_id').prop("disabled", false);
        $('#department_id').prop("disabled", false);

    }

});

