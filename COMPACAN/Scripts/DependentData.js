var currentPassportID;
var currentDepID;
var dependentsList = [];
var dependentsPassports = [];

$(document).ready(function () {
    $("#search").keydown(function (e) {
        var allowedChars = '0123456789';
        function contains(stringValue, charValue) {
            return stringValue.indexOf(charValue) > -1;
        }
        var invalidKey = e.key.length === 1 && !contains(allowedChars, e.key)
            || e.key === '.' && contains(e.target.value, '.');
        invalidKey && e.preventDefault();
    });

    $('#search').keyup(function (e) {
        if (e.keyCode === 13) {
            showData();
        }
        if (e.keyCode === 46) {
            //if ($('#search').val().length === 1) {
                clearData();
            //}            
        }
    });
});


function showData() {
    if ($("#search").val() !== "") {
        
        loadData();
        $("#dataTable").css("visibility", "visible");
    }    
}


function loadData() {
    $.ajax({
        url: "/HR/GetListOfDependent/" + $("#search").val(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result);
            var html = '';
            if (result.Code === 0) {
                html += '<tr><td>لا توجد بيانات</td></tr>';
                $("#myTable").find('tbody').remove();
                $("#myTable").find('tfoot').remove();
                $('#myTable').append('<tbody class="tbody">' + html);
            }
            else {
                dependentsList = JSON.parse(result.Data);
                console.log("dependentsList");
                console.log(dependentsList);
                $.each(dependentsList, function (key, item) {

                    html += '<tr>';
                    //html += '<td class="center"  data-type="numeric">' + (parseInt(key) + 1) + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.EmpDependentsID + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.EmpDependentsFirstNameE !== undefined ? item.EmpDependentsFirstNameE : "-") + '</td>';
                    //html += '<td>' + item.secondName_E + '</td>';
                    //html += '<td>' + item.thirdName_E + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.EmpDependentsFamilyNameE !== undefined ? item.EmpDependentsFamilyNameE : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.relationshipName + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportNo !== undefined ? item.PassportNo : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportExpireDate !== undefined ? moment(item.PassportExpireDate).format("YYYY/MM/DD") : "-") + '</td>';
                    //html += '<td style="vertical-align: middle;">' + (item.noOfDependents > 0 ? item.noOfDependents : "لا يوجد تابعين") + '</td>';
                    //html += '<td style="vertical-align: middle;">' + (item.documentID !== undefined ? '<a onclick="downloadDoc(' + item.documentID + ')">' + item.documentID + '</a>' : "لا يوجد جواز") + '</td>';
                    html += '<td style="vertical-align: middle;">';
                    //html += '<div class="btn-group">';
                    //html += '<button data-toggle="dropdown" class="btn btn-primary btn-xs dropdown-toggle"> خيارات<span class="caret"></span></button>';
                    //html += '<ul class="dropdown-menu">';
                    //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">تحديث البيانات</a></li>';
                    //html += '<li class="divider"></li>';
                    //html += '<li><a onclick="clearTextBox(); getbyID(' + item.userID + ');" href="#">التابعين</a></li>';
                    //html += '</ul>';
                    //html += '</div>';
                    html += '<button type="button" style="margin: 5px;" class="btn btn-sm btn-primary" onClick="currentDepID = ' + item.EmpDependentsID + '; showPassportDetailes()">الجوازات</button>';
                    html += '</td></tr>';
                    html += '</tr>';
                });
            }
            if ($('#myTable thead tr').css('display', 'none'))
                $('#myTable thead tr').css('display', 'contents');
            $("#myTable").find('tbody').remove();
            $("#myTable").find('tfoot').remove();
            $('#myTable').append('<tbody class="tbody">' + html);

        },
        error: function (errormessage) {
            console.log(errormessage);
            //window.location.href = '/Home';
        }
    });
}

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
        swal("خطأ", "جميع الحقول مطلوبة", "error");
    }
    else {
        console.log("currentPassportID");
        console.log(currentPassportID);
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
                    empDependentID_FK: currentDepID,
                    name_E: $("#name_EAddNewModal").val(),
                    secondName_E: $("#secondName_EAddNewModal").val(),
                    thirdName_E: $("#thirdName_EAddNewModal").val(),
                    lastName_E: $("#lastName_EAddNewModal").val(),
                    passportNo: $("#PassportNoAddNewModal").val(),
                    passportIssueDate: $("#PassportIssueDateAddNewModal").val(),
                    passportExpireDate: $("#PassportExpireDateAddNewModal").val()
                };


                $.ajax({
                    url: "/HR/InsertDependentPassport",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        loadPassportData(currentDepID);
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
                console.log("currentPassportID");
                console.log(currentPassportID);
                var obj = {
                    passportID: currentPassportID,
                    name_E: $("#name_EUpdateModal").val(),
                    secondName_E: $("#secondName_EUpdateModal").val(),
                    thirdName_E: $("#thirdName_EUpdateModal").val(),
                    lastName_E: $("#lastName_EUpdateModal").val(),
                    empDependentID_FK: currentDepID,
                    passportNo: $("#PassportNoUpdateModal").val(),
                    passportIssueDate: $("#PassportIssueDateUpdateModal").val(),
                    passportExpireDate: $("#PassportExpireDateUpdateModal").val()
                };
                $.ajax({
                    url: "/HR/updateDependentPassport",
                    data: JSON.stringify(obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.Code === 1) {
                            console.log(result);
                            loadPassportData(currentDepID);
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
function showPassportDetailes() {
    loadPassportData();
    $("#passportDataModal").modal("show");
}
//load Passport Data
function loadPassportData() {
    $.ajax({
        url: "/HR/GetDependentPassport/" + currentDepID,
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
                dependentsPassports = JSON.parse(result.Data);
                console.log("loadPassports");
                console.log(dependentsPassports);
                $.each(dependentsPassports, function (key, item) {

                    html += '<tr>';
                    //html += '<td class="center"  data-type="numeric">' + (parseInt(key) + 1) + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.EmpDependentsID + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.EmpDependentsFirstNameE !== undefined ? item.EmpDependentsFirstNameE : "-") + '</td>';
                    //html += '<td>' + item.secondName_E + '</td>';
                    //html += '<td>' + item.thirdName_E + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.EmpDependentsFamilyNameE !== undefined ? item.EmpDependentsFamilyNameE : "-") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportNo !== undefined ? item.PassportNo : "-") + '</td>';
                    //html += '<td>' + item.PassportIssueDate + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.PassportExpireDate !== undefined ? moment(item.PassportExpireDate).format("YYYY/MM/DD") : "-") + '</td>';
                    //html += '<td style="vertical-align: middle;">' + (item.noOfDependents > 0 ? item.noOfDependents : "لا يوجد تابعين") + '</td>';
                    html += '<td style="vertical-align: middle;">' + (item.documentID !== undefined ? '<a onclick="downloadDoc(' + item.documentID + ')">' + item.documentID + '</a>' : "لا يوجد جواز") + '</td>';
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

        },
        error: function (errormessage) {
            console.log(errormessage);
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

    var emp = dependentsList.filter(o => o.EmpDependentsID === currentDepID)[0];
    console.log("showUpdatepassport");
    console.log(emp);

    $('#userIDAddNewModal').val(emp.EmpDependentsID);
    $('#name_EAddNewModal').val(emp.EmpDependentsFirstNameE);
    $('#secondName_EAddNewModal').val(emp.EmpDependentsMidNameE);
    $('#thirdName_EAddNewModal').val(emp.EmpDependentsGrandNameE);
    $('#lastName_EAddNewModal').val(emp.EmpDependentsFamilyNameE);
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




    var emp = dependentsPassports.filter(o => o.PassportID === currentPassportID)[0];  
    console.log("showUpdatepassport");
    console.log(emp);


    $('#userIDUpdateModal').val(emp.EmpDependentsID);
    $('#name_EUpdateModal').val(emp.EmpDependentsFamilyNameE);
    $('#secondName_EUpdateModal').val(emp.EmpDependentsMidNameE);
    $('#thirdName_EUpdateModal').val(emp.EmpDependentsGrandNameE);
    $('#lastName_EUpdateModal').val(emp.EmpDependentsFamilyNameE);
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

    if ($('#fileDivUpdate > div').hasClass('fileinput-exists')) {
        $('#fileDivUpdate > div').removeClass('fileinput-exists');
        $('#fileDivUpdate > div').addClass('fileinput-new');
        $(".fileinput-filename").text('');
    }

    $('#updatePassportModal').modal('show');
    $('#btnUpdate').show();
}

function clearData() {
    $("#search").val("");
    $("#dataTable").css("visibility", "hidden");
}

function downloadDoc(did) {
    window.open('/HR/getDocument/' + did, 'attachment');

}