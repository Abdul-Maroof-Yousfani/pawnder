
window.onload=function () {
    var pageType = $('#pageType').val();
    if(pageType == 0){
        filterVoucherList();
    }else if(pageType == 1){
        viewDataFilterOneParameter();
    }else if(pageType == 2){
        viewDataFilterTwoParameter();
    }
}
var baseUrl = $('#baseUrl').val();

function rejectAdvanceSalaryWithPaySlip(companyId,recordId,tableName,column){
    var companyId;
    var recordId;
    var tableName;
    var column;
    var functionName = 'cdOne/rejectAdvanceSalaryWithPaySlip';

    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId,tableName:tableName,column:column},
        success:function(data) {
            location.reload();
        }
    });

}


function viewRangeWiseDataFilter() {
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    // Parse the entries
    var startDate = Date.parse(fromDate);
    var endDate = Date.parse(toDate);
    // Make sure they are valid
    if (isNaN(startDate)) {
        alert("The start date provided is not valid, please enter a valid date.");
        return false;
    }
    if (isNaN(endDate)) {
        alert("The end date provided is not valid, please enter a valid date.");
        return false;
    }
    // Check the date range, 86400000 is the number of milliseconds in one day
    var difference = (endDate - startDate) / (86400000 * 7);
    if (difference < 0) {
        alert("The start date must come before the end date.");
        return false;
    }
    filterVoucherList();
}
function filterVoucherList(){
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var functionName = $('#functionName').val();
    var tbodyId = $('#tbodyId').val();
    var filterType = $('#filterType').val();
    //alert(tbodyId);
    var m = $('#m').val();
    var url = ''+baseUrl+'/'+functionName+'';
    //alert(url); return false;
    $('#'+tbodyId+'').html('<tr><td colspan="15"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="loader"></div></div></div></td><tr>');
    if(filterType == 1){
        var selectSubDepartmentId = $('#selectSubDepartmentId').val();
        var selectSubDepartment = $('#selectSubDepartmentTwo').val();
        var selectVoucherStatus = $('#selectVoucherStatus').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,selectSubDepartment:selectSubDepartment,selectSubDepartmentId:selectSubDepartmentId,selectVoucherStatus:selectVoucherStatus}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }else if(filterType == 2){
        var selectSubDepartmentId = $('#selectSubDepartmentId').val();
        var selectSubDepartment = $('#selectSubDepartmentTwo').val();
        var selectSupplierId = $('#selectSupplierId').val();
        var selectSupplier = $('#selectSupplierTwo').val();
        var selectVoucherStatus = $('#selectVoucherStatus').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,selectSupplier:selectSupplier,selectSupplierId:selectSupplierId,selectSubDepartment:selectSubDepartment,selectSubDepartmentId:selectSubDepartmentId,selectVoucherStatus:selectVoucherStatus}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }else if(filterType == 3){
        var selectBranchId = $('#selectBranchId').val();
        var selectBranch = $('#selectBranchTwo').val();
        var selectVoucherStatus = $('#selectVoucherStatus').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,selectBranch:selectBranch,selectBranchId:selectBranchId,selectVoucherStatus:selectVoucherStatus}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }else if(filterType == 'EmployeeList'){
        var selectSubDepartmentId = $('#selectSubDepartmentId').val();
        var selectSubDepartment = $('#selectSubDepartmentTwo').val();
        var selectEmployeeGradingStatus = $('#selectEmployeeGradingStatus').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,selectSubDepartment:selectSubDepartment,selectSubDepartmentId:selectSubDepartmentId,selectEmployeeGradingStatus:selectEmployeeGradingStatus}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }else if(filterType == 'WorkingHoursPolicList'){
        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        var selectVoucherStatus = $('#selectVoucherStatus').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,selectVoucherStatus:selectVoucherStatus}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }else if(filterType == 'EmployeeAttendanceList'){
        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        var selectEmployeeId = $('#selectEmployeeId').val();
        var selectEmployee = $('#selectEmployeeTwo').val();
        var attendanceStatus = $('#attendance_status').val();
        $.getJSON(url, {fromDate: fromDate, toDate: toDate, m: m,attendanceStatus:attendanceStatus,selectEmployee:selectEmployee,selectEmployeeId:selectEmployeeId}, function (result) {
            $.each(result, function (i, field) {
                $('#' + tbodyId + '').html('' + field + '');
            });
        })
    }
}

function approveAdvanceSalaryWithPaySlip(companyId,recordId,emp_id){
    var companyId;
    var recordId;
    var emp_id;
    //alert(emp_id); return false;
    var functionName = 'cdOne/approveAdvanceSalaryWithPaySlip';
    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId,emp_id:emp_id},
        success:function(data) {
            location.reload();
        }
    });

}
function deleteAdvanceSalaryWithPaySlip(companyId,recordId,tableName){
    var companyId;
    var recordId;
    var tableName;
    var functionName = 'cdOne/deleteAdvanceSalaryWithPaySlip';

    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId,tableName:tableName},
        success:function(data) {
            location.reload();
        }
    });

}
function deleteCompanyMasterTableRecord(url,id,tableName,companyId,accId) {
    var url;
    var id;
    var tableName;
    var companyId;
    var accId;

    if(confirm("Do you want to delete this record ?") == true){
        $.ajax({
            url: baseUrl+url,
            type: "GET",
            data: {companyId:companyId,id:id,tableName:tableName,accId:accId},
            success:function(data) {
                location.reload();
            }
        });
    }
    else{
        return false;
    }
}
function approveLoanRequest(companyId,recordId) {

    var companyId;
    var recordId;
    var functionName = 'cdOne/approveLoanRequest';
    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId},
        success:function(data) {
            location.reload();
        }
    });

}

function rejectLoanRequest(companyId,recordId) {
    var companyId;
    var recordId;

    var functionName = 'cdOne/rejectLoanRequest';
    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId},
        success:function(data) {
            location.reload();
        }
    });

}

function deleteLoanRequest(companyId,recordId)
{
    var companyId;
    var recordId;

    var functionName = 'cdOne/deleteLoanRequest';
    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId},
        success:function(data) {
            location.reload();
        }
    });
}

function deleteLeaveApplicationData(companyId,recordId)
{
    var companyId;
    var recordId;
    var functionName = 'cdOne/deleteLeaveApplicationDetail';

if(confirm('Do you Want To Delete Leave Application ?')){
    $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId},
        success:function(data) {
            location.reload();
        }
    });
}
}

function approveAndRejectLeaveApplication(recordId,approval_status,leave_day_type)
{
    // alert('hello');
    // return;
    var check = (approval_status == 2) ? "Approve":"Reject";

    var companyId = m;

    if(confirm('Do you want to '+check+' Leave Applicaiton ?'))
    {

        $.ajax({
            url: baseUrl+'/hdc/approveAndRejectLeaveApplication',
            type: "GET",
            data: {companyId:companyId,recordId:recordId,approval_status:approval_status},
            success:function(data) {
                // alert(data);
                location.reload();
            }
        });
    }
}
function approveAndRejectRequestHiring(companyId,recordId,approval_status)
{
    var functionName = 'cdOne/approveAndRejectRequestHiring';
   $.ajax({
        url: ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {companyId:companyId,recordId:recordId,approval_status:approval_status},
        success:function(data) {
            location.reload();
        }
    });
}

		var employee_id = $('#employee_id').val();
function approveAndRejectTableRecords(companyId, recordId, approval_status, tableName){
	
    var companyId;
    var recordId;
    var tableName;
    var approval_status;
    var functionName = 'cdOne/approveAndRejectTableRecord';

    $.ajax({
        url : ''+baseUrl+'/'+functionName+'',
        type: "GET",
        data: {'employee_id':employee_id,'request_type':'approve_reject',companyId: companyId, recordId: recordId, tableName: tableName, approval_status: approval_status},
        success: function (data) {
            console.log(data);
            if(data == 'error')
            {
                alert('Incorrect Approval Code');
            }
            else{ 
                location.reload();
            }
        },
        error: function () {
            console.log("error");
        }
    });

}

function printView(param1,param2,param3) {

    $('.table-responsive').removeClass('table-responsive');
    $('.wrapper').removeClass('wrapper');
    $( ".qrCodeDiv" ).removeClass( "hidden" );
    var printContents = document.getElementById(param1).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}
//End Print

//Start Export
function exportView(param1,param2,$param3) {
    $(".hide-table").remove('#hide-table-row');
    $('#'+param1+'').tableToCSV();
}

jQuery.fn.tableToCSV = function() {
    var clean_text = function(text){
        text = text.replace(/"/g, '""');
        return '"'+text+'"';
    };

    $(this).each(function(){
        var table = $(this);
        var caption = $(this).find('caption').text();
        var title = [];
        var rows = [];

        $(this).find('tr').each(function(){
            var data = [];
            $(this).find('th').each(function(){
                var text = clean_text($(this).text());
                title.push(text);
            });
            $(this).find('td').each(function(){
                var text = clean_text($(this).text());
                data.push(text);
            });
            data = data.join(",");
            rows.push(data);
        });
        title = title.join(",");
        rows = rows.join("\n");

        var csv = title + rows;
        var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        var download_link = document.createElement('a');
        download_link.href = uri;
        var ts = new Date().getTime();
        if(caption==""){
            download_link.download = ts+".csv";
        } else {
            download_link.download = caption+"-"+ts+".csv";
        }
        document.body.appendChild(download_link);
        download_link.click();
        document.body.removeChild(download_link);
    });

};

//End Export




