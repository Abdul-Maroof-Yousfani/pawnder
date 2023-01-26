var m=$('#m').val();
var baseUrl=$('#baseUrl').val();


$(document).ready(function() {

    // Wait for the DOM to be ready


    var Holidays = 1;
    $('.addMoreHolidaysSection').click(function (e){
        e.preventDefault();
        Holidays++;
        $('.HolidaysSection').append('<div id="sectionHoliday_'+Holidays+'">' +
            '<a href="#" onclick="removeHolidaySection('+Holidays+')" class="btn btn-xs btn-danger">Remove</a>' +
            '<div class="lineHeight">&nbsp;</div><div class="panel"><div class="panel-body">' +
            '<div class="row"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
            '<label>Holiday Name:</label><span class="rflabelsteric"><strong>*</strong></span>' +
            '<input required type="text" name="holiday_name[]" id="holiday_name[]" value="" class="form-control requiredField" /></div>' +
            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><label>Holiday Date:</label>' +
            '<span class="rflabelsteric"><strong>*</strong></span>' +
            '<input required type="date" name="holiday_date[]" id="holiday_date[]" value="" class="form-control requiredField" />' +
            '</div></div></div></div></div>');

    });

});


function removeHolidaySection(id){
    var elem = document.getElementById('sectionHoliday_'+id+'');
    elem.parentNode.removeChild(elem);
}