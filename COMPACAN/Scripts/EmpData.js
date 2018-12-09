var counter = 0;
var empList = [];
var empPassport = [];
var empIqama = [];
var currentDetielsID = 0;
var currentPassportID = 0;
var currentIqamaID = 0;
$(document).ready(function () {
    loadData();
    $("#search").on("keyup", function () {
        var as = $("table tr").length;
        var value = $(this).val();
        if (value !== "") {
            //$('.tbody').empty;
            $("table tr").each(function (index) {
                if (index !== 0) {
                    $row = $(this);
                    var string = "";
                    string = string + $row.find("td:nth-child(1)").text() + "  ";
                    string = string + $row.find("td:nth-child(3)").text() + "  ";
                    string = string + $row.find("td:nth-child(5)").text() + "  ";
                    string = string + $row.find("td:nth-child(6)").text() + "  ";
                    var a = string.indexOf(value);
                    if (string.indexOf(value) === -1) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                }
            });
        }
        else {
            clientRefresh();
        }
    });
});
//Load Data function
function loadData() {
    //INITIALIZ Controls//

    //i-check
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    //start loading snapit
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    //populate data table
    $.ajax({
        url: "/HR/EmpList",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            empList = JSON.parse(result);
            var html = '';
            console.log("ok");
            $.each(empList, function (key, item) {
                html += '<tr>';
                //html += '<td class="center"  data-type="numeric">' + (parseInt(key) + 1) + '</td>';
                html += '<td style="vertical-align: middle;">' + item.userID + '</td>';
                html += '<td style="vertical-align: middle;">' + (item.name_E !== undefined ? item.name_E : "-") + '</td>';
                //html += '<td>' + item.secondName_E + '</td>';
                //html += '<td>' + item.thirdName_E + '</td>';
                html += '<td style="vertical-align: middle;">' + (item.lastName_E !== undefined ? item.lastName_E : "-") + '</td>';
                html += '<td style="vertical-align: middle;">' + (item.PassportNo !== undefined ? item.PassportNo : "-") + '</td>';
                //html += '<td>' + item.PassportIssueDate + '</td>';
                html += '<td style="vertical-align: middle;">' + (item.PassportExpireDate !== undefined ? moment(item.PassportExpireDate).format("YYYY/MM/DD") : "-") + '</td>';
                html += '<td style="vertical-align: middle;">' + (item.noOfDependents > 0 ? item.noOfDependents : "لا يوجد تابعين") + '</td>';
                //html += '<td>' + (item.documentID !== undefined ? '<a onclick="downloadDoc(' + item.documentID +')">' + item.documentID + '</a>' : "لا يوجد جواز") + '</td>';
                html += '<td style="vertical-align: middle;">';
                //html += '<div class="btn-group">';
                //html += '<button data-toggle="dropdown" class="btn btn-primary btn-xs dropdown-toggle"> خيارات<span class="caret"></span></button>';
                //html += '<ul class="dropdown-menu">';
                //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">تحديث البيانات</a></li>';
                //html += '<li class="divider"></li>';
                //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">التابعين</a></li>';
                //html += '</ul>';
                //html += '</div>';
                html += '<button type="button" style="margin: 5px;" class="btn btn-sm btn-primary" onClick="currentDetielsID = ' + item.userID + '; showPassportDetailes(' + item.userID +')">الجوازات</button>';
                html += '<button type="button" style="margin: 5px;" class="btn btn-sm btn-primary" onClick="currentDetielsID = ' + item.userID + '; showIqamaDetailes(' + item.userID +')">الإقامة</button>';
                html += '</td></tr>';
                html += '</tr>';
            });
            $("#myTable").find('tbody').remove();
            $("#myTable").find('tfoot').remove();
            $('#myTable').append('<tbody class="tbody">' + html + '</tbody><tfoot><tr class="footable-paging"><td colspan="9"><div class="footable-pagination-wrapper"><ul class="pagination pull-right"><li id="arrowFirst" class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li class="footable-page active"><a data-page="0" href="#">1</a></li><li class="footable-page"><a data-page="1" href="#">2</a></li><li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li id="arrowLast" class="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul></div></td></tr></tfoot>');
            $('#myTable').footable({
                "paging": {
                    "enabled": true,
                    "data-page-size": "15",
                    "data-limit-navigation": "3"
                },
                "sorting": {
                    "enabled": true
                }
            });
            $(".sparkline").sparkline([13, 10], {
                type: 'pie',
                height: '25',
                sliceColors: ['#1ab394', '#F5F5F5']
            });
            clientRefresh();
            $('#ibox1').children('.ibox-content').toggleClass('sk-loading'); $('#ibox1').addClass('bounce');
            $("#search").val("");

        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
            window.location.href = '/Home';
        }
    });

}



///   THIS IS FOR PASSPORT   ///

$("#updatePassportModalBtnUpdate").click(function () {
    if ($("#userIDUpdateModal").val() === "" ||
        $("#name_EUpdateModal").val() === "" ||
        $("#secondName_EUpdateModal").val() === "" ||
        $("#thirdName_EUpdateModal").val() === "" ||
        $("#lastName_EUpdateModal").val() === "" ||
        $("#PassportNoUpdateModal").val() === "" ||
        $("#PassportIssueDateUpdateModal").val() === "" ||
        $("#PassportExpireDateUpdateModal").val() === "" ||
        $("#updateFiles").val() === "") {
        swal("خطأ","جميع الحقول مطلوبة", "error");
    }
    else {
        updatePassport();
        $("#updatePassportModal").modal("hide");
    }
    
});
$("#addNewPassportModalBtnUpdate").click(function () {
    if ($("#userIDAddNewModal").val() === "" ||
        $("#name_EAddNewModal").val() === "" ||
        $("#secondName_EAddNewModal").val() === "" ||
        $("#thirdName_EAddNewModal").val() === "" ||
        $("#lastName_EAddNewModal").val() === "" ||
        $("#PassportNoAddNewModal").val() === "" ||
        $("#PassportIssueDateAddNewModal").val() === "" ||
        $("#PassportExpireDateAddNewModal").val() === "" ||
        $("#inseartFiles").val() === "") {
        swal("خطأ", "جميع البيانات مطلوبة", "error");
    }
    else {
        insertNewPassport();
        $("#addNewPassportModal").modal("hide");
    }
});
//function for insert and update passport
function insertNewPassport() {
    //alert($("#name_EAddNewModal").val());

    var files;
    if ($("#inseartFiles").length)
        files = $("#inseartFiles").get(0).files;
    else
        files = [];
    //upload attachment if exist
    if (files[0] !== undefined) {
        var passportAttachment = new FormData();
        passportAttachment.append("theAttachment", files[0]);
        passportAttachment.append("passportNo", $('#PassportNoAddNewModal').val());
        $.ajax({
            url: '/HR/addAttachment',
            type: "POST",
            processData: false,
            data: passportAttachment,
            dataType: 'json',
            contentType: false,
            success: function () {

                var obj = {
                    userNationalID: currentDetielsID,
                    name_E: $("#name_EAddNewModal").val(),
                    secondName_E: $("#secondName_EAddNewModal").val(),
                    thirdName_E: $("#thirdName_EAddNewModal").val(),
                    lastName_E: $("#lastName_EAddNewModal").val(),
                    passportNo: $("#PassportNoAddNewModal").val(),
                    passportIssueDate: $("#PassportIssueDateAddNewModal").val(),
                    passportExpireDate: $("#PassportExpireDateAddNewModal").val()
                };


                $.ajax({
                    url: "/HR/InsertEmpPassport",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        loadPassportData(currentDetielsID);
                        loadData();
                    },
                    error: function (errormessage) {
                        console.log(errormessage);
                        window.location.href = '/Home';
                    }
                });
            },
            error: function (err) {
                console.log(err);
                window.location.href = '/Home';
            }
        });
    }
}
function updatePassport() {
    var files;
    if ($("#updateFiles").length)
        files = $("#updateFiles").get(0).files;
    else
        files = [];
    //upload attachment if exist
    if (files[0] !== undefined) {
        var passportAttachment = new FormData();
        passportAttachment.append("theAttachment", files[0]);
        passportAttachment.append("passportNo", $('#PassportNoUpdateModal').val());
        $.ajax({
            url: '/HR/addAttachment',
            type: "POST",
            processData: false,
            data: passportAttachment,
            dataType: 'json',
            contentType: false,
            success: function () {

                var obj = {
                    passportID: currentPassportID,
                    name_E: $("#name_EUpdateModal").val(),
                    secondName_E: $("#secondName_EUpdateModal").val(),
                    thirdName_E: $("#thirdName_EUpdateModal").val(),
                    lastName_E: $("#lastName_EUpdateModal").val(),
                    userNationalID: $("#PassportNoUpdateModal").val(),
                    passportNo: $("#PassportNoUpdateModal").val(),
                    passportIssueDate: $("#PassportIssueDateUpdateModal").val(),
                    passportExpireDate: $("#PassportExpireDateUpdateModal").val()
                };
                $.ajax({
                    url: "/HR/updateEmpPassport",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Code === 1) {
                            console.log(result);
                            loadPassportData(currentDetielsID);
                            loadData();
                        }
                        else {
                            swal("خطأ", result.Title, "error");
                        }
                    },
                    error: function (errormessage) {
                        console.log(errormessage);
                        window.location.href = '/Home';
                    }
                });
            },
            error: function (err) {
                console.log(err);
                window.location.href = '/Home';
            }
        });
    }
}
//show details
function showPassportDetailes(userID) {
    loadPassportData(userID);
    $("#passportDataModal").modal("show");
}
//load Passport Data
function loadPassportData(userID) {
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: "/HR/GetListOfPassport/" + userID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var html = '';            
            if (result.Code === 0) {
                html += '<tr><td>لا توجد بيانات</td></tr>';
                $("#passportTable").find('tbody').remove();
                $("#passportTable").find('tfoot').remove();
                $('#passportTable').append('<tbody class="tbody">' + html);
            }
            else {
                empPassport = JSON.parse(result.Data);
                $.each(empPassport, function (key, item) {

                    html += '<tr>';
                    //html += '<td class="center"  data-type="numeric">' + (parseInt(key) + 1) + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.userNationalID + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.name_E !== undefined ? item.name_E : "-") + '</td>';
                    //html += '<td>' + item.secondName_E + '</td>';
                    //html += '<td>' + item.thirdName_E + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.lastName_E !== undefined ? item.lastName_E : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportNo !== undefined ? item.PassportNo : "-") + '</td>';
                    //html += '<td>' + item.PassportIssueDate + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportExpireDate !== undefined ? moment(item.PassportExpireDate).format("YYYY/MM/DD") : "-") + '</td>';
                    //html += '<td style="vertical-align: middle;">' + (item.noOfDependents > 0 ? item.noOfDependents : "لا يوجد تابعين") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.documentID !== undefined ? '<a onclick="downloadDoc(' + item.documentID +')">' + item.documentID + '</a>' : "لا يوجد جواز") + '</td>';
                    html += '<td style="vertical-align: middle;">';
                    //html += '<div class="btn-group">';
                    //html += '<button data-toggle="dropdown" class="btn btn-primary btn-xs dropdown-toggle"> خيارات<span class="caret"></span></button>';
                    //html += '<ul class="dropdown-menu">';
                    //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">تحديث البيانات</a></li>';
                    //html += '<li class="divider"></li>';
                    //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">التابعين</a></li>';
                    //html += '</ul>';
                    //html += '</div>';
                    html += '<button type="button" style="margin: 5px;" class="btn btn-sm btn-primary" onClick="currentPassportID = ' + item.PassportID + '; showUpdatepassportModal()">تعديل</button>';
                    html += '</td></tr>';
                    html += '</tr>';
                });
            }           
            if ($('#passportTable thead tr').css('display', 'none'))
                $('#passportTable thead tr').css('display', 'contents');
            $("#passportTable").find('tbody').remove();
            $("#passportTable").find('tfoot').remove();
            $('#passportTable').append('<tbody class="tbody">' + html);
            $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
        },
        error: function (errormessage) {
            console.log(errormessage);
            $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
            window.location.href = '/Home';
        }
    });
}
//show add new passport Modal
function showAddNewPassportModal() {
    $('#userIDAddNewModal').css('border-color', 'lightgrey');
    $('#name_EAddNewModal').css('border-color', 'lightgrey');
    $('#secondName_EAddNewModal').css('border-color', 'lightgrey');
    $('#thirdName_EAddNewModal').css('border-color', 'lightgrey');
    $('#lastName_EAddNewModal').css('border-color', 'lightgrey');
    $('#PassportNoAddNewModal').css('border-color', 'lightgrey');


    $('#PassportIssueDateAddNewModal').css('border-color', 'lightgrey');
    $('#PassportExpireDateAddNewModal').css('border-color', 'lightgrey');

    var emp = empList.filter(o => o.userID === currentDetielsID)[0];

    $('#userIDAddNewModal').val(emp.userID);
    $('#name_EAddNewModal').val(emp.name_E);
    $('#secondName_EAddNewModal').val(emp.secondName_E);
    $('#thirdName_EAddNewModal').val(emp.thirdName_E);
    $('#lastName_EAddNewModal').val(emp.lastName_E);
    $('#PassportNoAddNewModal').val(emp.PassportNo);
    $('#PassportIssueDateAddNewModal').val(moment(emp.PassportIssueDate).format("YYYY-MM-DD"));
    $('#PassportExpireDateAddNewModal').val(moment(emp.PassportExpireDate).format("YYYY-MM-DD"));
    $('#addNewPassportIssueDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });
    $('#addNewPassportExpireDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });

    if ($('#fileDivAddNew > div').hasClass('fileinput-exists')) {
        $('#fileDivAddNew > div').removeClass('fileinput-exists');
        $('#fileDivAddNew > div').addClass('fileinput-new');
        $(".fileinput-filename").text('');
    }
    
    $('#userIDAddNewModal').val(emp.userID);
    $('#addNewPassportModal').modal('show');
    $('#btnUpdate').show();


}
//show update passport Modal
function showUpdatepassportModal() {
    $('#userIDUpdateModal').css('border-color', 'lightgrey');
    $('#name_EUpdateModal').css('border-color', 'lightgrey');
    $('#secondName_EUpdateModal').css('border-color', 'lightgrey');
    $('#thirdName_EUpdateModal').css('border-color', 'lightgrey');
    $('#lastName_EUpdateModal').css('border-color', 'lightgrey');
    $('#PassportNoUpdateModal').css('border-color', 'lightgrey');


    $('#PassportIssueDateUpdateModal').css('border-color', 'lightgrey');
    $('#PassportExpireDateUpdateModal').css('border-color', 'lightgrey');



    
    var emp = empPassport.filter(o => o.PassportID === currentPassportID)[0];
    console.log(empPassport);
    console.log(emp);


    $('#userIDUpdateModal').val(emp.userNationalID);
    $('#name_EUpdateModal').val(emp.name_E);
    $('#secondName_EUpdateModal').val(emp.secondName_E);
    $('#thirdName_EUpdateModal').val(emp.thirdName_E);
    $('#lastName_EUpdateModal').val(emp.lastName_E);
    $('#PassportNoUpdateModal').val(emp.PassportNo);
    $('#PassportIssueDateUpdateModal').val(moment(emp.PassportIssueDate).format("YYYY-MM-DD"));
    $('#PassportExpireDateUpdateModal').val(moment(emp.PassportExpireDate).format("YYYY-MM-DD"));

    $('#updatePassportIssueDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });
    $('#updatePassportExpireDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });

    if($('#fileDivUpdate > div').hasClass('fileinput-exists')){
        $('#fileDivUpdate > div').removeClass('fileinput-exists');
        $('#fileDivUpdate > div').addClass('fileinput-new');
        $(".fileinput-filename").text('');
    }
    
    $('#updatePassportModal').modal('show');
    $('#btnUpdate').show();
}





///   THIS IS FOR IQAMA   ///


$("#updateIqamaModalBtnUpdate").click(function () {
    if ($("#userIDUpdateIqamaModal").val() === "" ||
        $("#IqamaNoUpdateIqamaModal").val() === "" ||
        $("#IqamaIssuePlaceUpdateIqamaModal").val() === "" ||
        $("#IqamaIssueDateUpdateIqamaModal").val() === "" ||
        $("#IqamaExpireDateUpdateIqamaModal").val() === "" ||
        $("#IqamaNoOfCopyUpdateIqamaModal").val() === "" ||
        $("#updateFilesIqama").val() === "") {
        swal("خطأ", "جميع الحقول مطلوبة", "error");
    }
    else {
        updateIqama();
        $("#updateIqamaModal").modal("hide");
    }
});
$("#addNewIqamaModalBtnUpdate").click(function () {
    if ($("#userIDAddNewIqamaModal").val() === "" ||
        $("#IqamaNoAddNewIqamaModal").val() === "" ||
        $("#IqamaIssuePlaceIqamaModal").val() === "" ||
        $("#IqamaIssueDateAddNewIqamaModal").val() === "" ||
        $("#IqamaExpireDateAddNewIqamaModal").val() === "" ||
        $("#IqamaNoOfCopyIqamaModal").val() === "" ||
        $("#inseartFilesIqama").val() === "") {
        swal("خطأ", "جميع الحقول مطلوبة", "error");
    }
    else {
        insertNewIqama();
        $("#addNewIqamaModal").modal("hide");
    }
});
//function for insert and update Iqama
function insertNewIqama() {
    var files;
    if ($("#inseartFilesIqama").length)
        files = $("#inseartFilesIqama").get(0).files;
    else
        files = [];
    //upload attachment if exist
    if (files[0] !== undefined) {
        var passportAttachment = new FormData();
        passportAttachment.append("theAttachment", files[0]);
        passportAttachment.append("iqamaNo", $('#IqamaNoAddNewIqamaModal').val());
        $.ajax({
            url: '/HR/addAttachment',
            type: "POST",
            processData: false,
            data: passportAttachment,
            dataType: 'json',
            contentType: false,
            success: function () {

                var obj = {
                    userNationalID: currentDetielsID,
                    //name_E: $("#name_EUpdateModal").val(),
                    //secondName_E: $("#secondName_EAddNewModal").val(),
                    //thirdName_E: $("#thirdName_EAddNewModal").val(),
                    //lastName_E: $("#lastName_EAddNewModal").val(),
                    issuePlace: $("#IqamaIssuePlaceIqamaModal").val(),
                    iqamaNo: $("#IqamaNoAddNewIqamaModal").val(),
                    iqamaIssueDate: $("#IqamaIssueDateAddNewIqamaModal").val(),
                    iqamaExpireDate: $("#IqamaExpireDateAddNewIqamaModal").val(),
                    iqamaNoOfCopy: $("#IqamaNoOfCopyIqamaModal").val(),
                    iqamaNote: $("#IqamaNoteAddNewIqamaModal").val()
                };
                $.ajax({
                    url: "/HR/InsertEmpIqama",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        loadIqamaData(currentDetielsID);
                        loadData();
                    },
                    error: function (errormessage) {
                        console.log(errormessage);
                        window.location.href = '/Home';
                    }
                });
            },
            error: function (err) {
                console.log(err);
                window.location.href = '/Home';
            }
        });
    }
}
function updateIqama() {
    var files;
    if ($("#updateFilesIqama").length)
        files = $("#updateFilesIqama").get(0).files;
    else
        files = [];
    //upload attachment if exist
    if (files[0] !== undefined) {
        var passportAttachment = new FormData();
        passportAttachment.append("theAttachment", files[0]);
        passportAttachment.append("iqamaNo", $('#IqamaNoUpdateIqamaModal').val());
        $.ajax({
            url: '/HR/addAttachment',
            type: "POST",
            processData: false,
            data: passportAttachment,
            dataType: 'json',
            contentType: false,
            success: function () {

                var obj = {
                    userNationalID: currentDetielsID,
                    iqamaID: currentIqamaID,
                    issuePlace: $("#IqamaIssuePlaceUpdateIqamaModal").val(),
                    iqamaNo: $("#IqamaNoUpdateIqamaModal").val(),
                    iqamaIssueDate: $("#IqamaIssueDateUpdateIqamaModal").val(),
                    iqamaExpireDate: $("#IqamaExpireDateUpdateIqamaModal").val(),
                    iqamaNoOfCopy: $("#IqamaNoOfCopyUpdateIqamaModal").val(),
                    iqamaNote: $("#IqamaNoteUpdateIqamaModal").val()
                };
                $.ajax({
                    url: "/HR/UpdateEmpIqama",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Code === 1) {
                            console.log(result);
                            loadIqamaData(currentDetielsID);
                            loadData();
                        }
                        else {
                            swal("خطأ", result.Title, "error");
                        }
                    },
                    error: function (errormessage) {
                        console.log(errormessage);
                        window.location.href = '/Home';
                    }
                });
            },
            error: function (err) {
                console.log(err);
                window.location.href = '/Home';
            }
        });
    }
}
//show details
function showIqamaDetailes(userID) {
    loadIqamaData(userID);
    $("#iqamaDataModal").modal("show");
}
//load iqama Data
function loadIqamaData(userID) {
    $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
    $.ajax({
        url: "/HR/GetListOfIqama/" + userID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var html = '';
            if (result.Code === 0) {
                html += '<tr><td>لا توجد بيانات</td></tr>';
                $("#iqamaTable").find('tbody').remove();
                $("#iqamaTable").find('tfoot').remove();
                $('#iqamaTable').append('<tbody class="tbody">' + html);
            }
            else {
                empIqama = JSON.parse(result.Data);
                console.log(empIqama);
                $.each(empIqama, function (key, item) {

                    html += '<tr>';
                    html += '<td style="vertical-align: middle;">' + item.userNationalID + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.IqamaNo !== undefined ? item.IqamaNo : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.IqamaExpireDate !== undefined ? moment(item.IqamaExpireDate).format("YYYY/MM/DD") : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.IqamaNoOfCopy > 0 ? item.IqamaNoOfCopy : "لا يوجد بيانات") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.documentID !== undefined ? '<a onclick="downloadDoc(' + item.documentID + ')">' + item.documentID + '</a>' : "لا توجد اقامة") + '</td>';
                    html += '<td style="vertical-align: middle;">';
                    html += '<button type="button" style="margin: 5px;" class="btn btn-sm btn-primary" onClick="currentIqamaID = ' + item.IqamaID + '; showUpdateIqamaModal()">تعديل</button>';
                    html += '</td></tr>';
                    html += '</tr>';
                });
            }
            if ($('#iqamaTable thead tr').css('display', 'none'))
                $('#iqamaTable thead tr').css('display', 'contents');
            $("#iqamaTable").find('tbody').remove();
            $("#iqamaTable").find('tfoot').remove();
            $('#iqamaTable').append('<tbody class="tbody">' + html);

            $('#ibox3').children('.ibox-content').toggleClass('sk-loading');

        },
        error: function (errormessage) {
            console.log(errormessage);

            $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
            window.location.href = '/Home';
        }
    });
}
//show add new iqama Modal
function showAddNewIqamaModal() {
    $('#userIDAddNewModal').css('border-color', 'lightgrey');
    //$('#name_EAddNewModal').css('border-color', 'lightgrey');
    //$('#secondName_EAddNewModal').css('border-color', 'lightgrey');
    //$('#thirdName_EAddNewModal').css('border-color', 'lightgrey');
    //$('#lastName_EAddNewModal').css('border-color', 'lightgrey');
    $('#IqamaNoAddNewIqamaModal').css('border-color', 'lightgrey');


    $('#PassportIssueDateAddNewIqamaModal').css('border-color', 'lightgrey');
    $('#PassportExpireDateAddNewIqamaModal').css('border-color', 'lightgrey');

    var emp = empIqama.filter(o => o.userNationalID === currentDetielsID)[0];
    console.log(emp);

    $('#userIDAddNewIqamaModal').val(currentDetielsID/*emp.userID*/);
    //$('#name_EAddNewModal').val(emp.name_E);
    //$('#secondName_EAddNewModal').val(emp.secondName_E);
    //$('#thirdName_EAddNewModal').val(emp.thirdName_E);
    //$('#lastName_EAddNewModal').val(emp.lastName_E);
    if (emp !== undefined) {
        $('#IqamaNoAddNewIqamaModal').val(emp.IqamaNo);
        $('#iqamaNoOfCopy').val(emp.IqamaNoOfCopy);
        $('#IqamaIssuePlaceIqamaModal').val(emp.IssuePlace);
        $('#IqamaIssueDateAddNewIqamaModal').val(moment(emp.IqamaIssueDate).format("YYYY-MM-DD"));
        $('#IqamaExpireDateAddNewIqamaModal').val(moment(emp.IqamaExpireDate).format("YYYY-MM-DD"));
    }
    $('#addNewIqamaIssueDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });
    $('#addNewIqamaExpireDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });

    if ($('#fileDivAddNewIqama > div').hasClass('fileinput-exists')) {
        $('#fileDivAddNewIqama > div').removeClass('fileinput-exists');
        $('#fileDivAddNewIqama > div').addClass('fileinput-new');
        $(".fileinput-filename").text('');
    }

    $('#addNewIqamaModal').modal('show');
    $('#btnUpdate').show();


}
//show update iqama Modal
function showUpdateIqamaModal() {
    $('#userIDUpdateIqamaModal').css('border-color', 'lightgrey');
    $('#name_EUpdateIqamaModal').css('border-color', 'lightgrey');
    $('#secondName_EUpdateIqamaModal').css('border-color', 'lightgrey');
    $('#thirdName_EUpdateIqamaModal').css('border-color', 'lightgrey');
    $('#lastName_EUpdateIqamaModal').css('border-color', 'lightgrey');
    $('#PassportNoUpdateIqamaModal').css('border-color', 'lightgrey');


    $('#updateIqamaIssueDateDiv').css('border-color', 'lightgrey');
    $('#updateIqamaExpireDateDiv').css('border-color', 'lightgrey');


    var emp = empIqama.filter(o => o.IqamaID === currentIqamaID)[0];
    console.log(emp);

    $('#userIDUpdateIqamaModal').val(emp.userNationalID);
    //$('#name_EUpdateModal').val(emp.name_E);
    //$('#secondName_EUpdateModal').val(emp.secondName_E);
    //$('#thirdName_EUpdateModal').val(emp.thirdName_E);
    //$('#lastName_EUpdateModal').val(emp.lastName_E);
    $('#IqamaNoUpdateIqamaModal').val(emp.IqamaNo);
    $('#IqamaIssuePlaceUpdateIqamaModal').val(emp.IssuePlace);
    $('#IqamaNoOfCopyUpdateIqamaModal').val(emp.IqamaNoOfCopy);
    $('#IqamaIssueDateUpdateIqamaModal').val(moment(emp.IqamaIssueDate).format("YYYY-MM-DD"));
    $('#IqamaExpireDateUpdateIqamaModal').val(moment(emp.IqamaExpireDate).format("YYYY-MM-DD"));

    $('#updateIqamaIssueDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });
    $('#updateIqamaExpireDateDiv').datepicker({
        language: 'ar',
        todayBtn: "linked",
        format: 'yyyy-mm-dd',
        forceParse: true,
        autoclose: true
    });

    if ($('#fileDivUpdate > div').hasClass('fileinput-exists')) {
        $('#fileDivUpdate > div').removeClass('fileinput-exists');
        $('#fileDivUpdate > div').addClass('fileinput-new');
        $(".fileinput-filename").text('');
    }

    $('#updateIqamaModal').modal('show');
    $('#btnUpdate').show();
}










//function for client Refresh
function clientRefresh() {
    $("table tr").each(function (index) {
        $(this).show();
    });
    if (counter == 0) {

        $('#selector').click();
        counter = counter + 1;
    }
    $('#selector').click();
    $('#selector').click();
}
function downloadDoc(did) {
    window.open('/HR/getDocument/' + did, 'attachment');

}