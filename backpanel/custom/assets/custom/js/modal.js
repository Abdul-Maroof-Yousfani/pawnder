var m= $('#m').val();

var baseUrl=$('#baseUrl').val()+'/';
function showDetailModelTwoParamerter(url,modalName){
    jQuery('#showDetailModelTwoParamerter').modal('show', {backdrop: 'false'});
    jQuery('#showDetailModelTwoParamerter .modalTitle').html(modalName);
    jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');


    $.ajax({

        url: baseUrl+'/'+url+'?m='+m,
        type: "GET",
        success:function(data) {

            //setTimeout(function(){
            jQuery('#showDetailModelTwoParamerter .modal-body').html(data);
            //},1000);


        }
    });
}

function showDetailModelFourParamerter(url,id,modalName,m){

    jQuery('#showDetailModelTwoParamerter').modal('show', {backdrop: 'false'});
    jQuery('#showDetailModelTwoParamerter .modalTitle').html(modalName);
    jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');


    $.ajax({

        url: baseUrl+'/'+url+'',
        type: "GET",
        data: {id:id,m:m, rights_url:url},
        success:function(data) {

            //setTimeout(function(){
            jQuery('#showDetailModelTwoParamerter .modal-body').html(data);
            //},1000);


        }
    });
}

function showMasterTableEditModel(url,id,modalName,m){

    jQuery('#showDetailModelTwoParamerter').modal('show', {backdrop: 'false'});
    jQuery('#showDetailModelTwoParamerter .modalTitle').html(modalName);
    jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');


    $.ajax({
        url: baseUrl+'/'+url+'',
        type: "GET",
        data: {id:id,m:m},
        success:function(data) {
            jQuery('#showDetailModelTwoParamerter .modal-body').html(data);
        }
    });
}

function insertMasterTableRecord(url,modalName,tableName,columnName,dropDownId,m){

    jQuery('#showDetailModelTwoParamerter').modal('show', {backdrop: 'false'});
    jQuery('#showDetailModelTwoParamerter .modalTitle').html(modalName);
    jQuery('#showDetailModelTwoParamerter .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');

    $.ajax({
        url: baseUrl+'/'+url+'',
        type: "GET",
        data: {tableName:tableName, columnName:columnName,dropDownId:dropDownId,m:m},
        success:function(data) {
            jQuery('#showDetailModelTwoParamerter .modal-body').html(data);
        }
    });
}


function showDetailModelTwoParamerterJson(url,id,modalName,m){

   $.getJSON(baseUrl+"/"+url, { id:id,m:m} ,function(result){
        $.each(result, function(i, field){

            jQuery('#showDetailModelTwoParamerterJson').modal('show', {backdrop: 'false'});
            jQuery('#showDetailModelTwoParamerterJson .modalTitle').html(modalName);
            jQuery('#showDetailModelTwoParamerterJson .modal-body').html('<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div>');
            setTimeout(function(){
                jQuery('#showDetailModelTwoParamerterJson .modal-body').html(field);
            },500);

        });
    })


}


