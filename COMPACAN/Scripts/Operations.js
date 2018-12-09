
var counter = 0;
var currentVacationId = '';
var list = [];

$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    //INITIALIZ Controls//

    //i-check
    //$('.i-checks').iCheck({
    //    checkboxClass: 'icheckbox_square-green',
    //    radioClass: 'iradio_square-green',
    //});

    //start loading snapit
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    //populate data table
    $.ajax({
        url: "/Operations/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            list = result;
            var html = '';
            if (result.length == 0) {
                $('#search').attr("readOnly", true);
                html += '<tr ><td >لا يوجد طلبات</td></tr>';
            }
            else {
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td style="vertical-align: middle;">' + item.treansactionID_FK + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.fullName + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.totalNoOfDays + '</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.requestDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.startingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.endingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    if (item.itsStateID === 12)
                        html += '<td style="vertical-align: middle;"><div><span class="label label-danger'
                            + '" style="font-family: DroidKufi-Regular;">'
                            + item.itsState + '</span></div></td>';
                    else
                        if (item.itsStateID === 55)
                            html += '<td style="vertical-align: middle;"><div><span class="label label-warning'
                                + '" style="font-family: DroidKufi-Regular;">'
                                + item.itsState + '</span></div></td>';
                        else
                            if (item.itsStateID === 46)
                                html += '<td style="vertical-align: middle;"><div><span class="label'
                                    + '" style="font-family: DroidKufi-Regular;">'
                                    + item.itsState + '</span></div></td>';
                            else
                                html += '<td style="vertical-align: middle;"><div><span class="label label-info'
                                    + '" style="font-family: DroidKufi-Regular;">'
                                    + item.itsState + '</span></div></td>';
                    html += '<td style="vertical-align: middle;">';
                    //html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.vacationID + ');" class="btn btn-success btn-sm">عرض التفاصيل</button > ';
                    //html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; vacationAccept();" class="btn btn-primary btn-sm">قبول</button> ';
                    //html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; vacationReturnForEdit();" class="btn btn-warning btn-sm">ارجاع للتعديل</button> ';
                    //html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; vacationDenay();" class="btn btn-danger btn-sm">رفض</button></td >';
                    html +='<div class="btn-group">';
                    html +=' <button data-toggle="dropdown" class="btn btn-sm btn-default dropdown-toggle ';
                    html +='aria-expanded="false" aria-haspopup="true">خيارات <span> ';
                    html +='<class="caret"></span></button >';
                    html += '<ul class="dropdown-menu">';
                    for (var i = 0; i < JSON.parse(item.actions).length; i++) {
                        html += '<li><a onclick="currentVacationId='
                            + item.treansactionID_FK + ';  showModel(' + JSON.parse(item.actions)[i].TSID + ' , ' + item.taskID + ');">'
                            + JSON.parse(item.actions)[i].actionName
                            + '</a></li>';
                    }
                    //html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; vacationAccept();">قبول</a></li>';
                    //html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; vacationDenay();">رفض</a></li>';
                    //html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; vacationReturnForEdit();">ارجاع للتعديل</a></li>';
                    html +='<li class="divider"></li>';
                    html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.treansactionID_FK + ');">عرض التفاصيل</a></li>';
                    html +='</ul>';
                    html +='</div >';


                    html += '</tr>';
                });
            }
            $(".table").find('tbody').remove();
            $(".table").find('tfoot').remove();
            $('.table').append('<tbody class="tbody">' + html + '</tbody><tfoot><tr class="footable-paging"><td colspan="9"><div class="footable-pagination-wrapper"><ul class="pagination pull-right"><li id="arrowFirst" class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li class="footable-page active"><a data-page="0" href="#">1</a></li><li class="footable-page"><a data-page="1" href="#">2</a></li><li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li id="arrowLast" class="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul></div></td></tr></tfoot>');
            $('.table').footable({
                "paging": {
                    "enabled": true,
                    "limit": 8
                },
                "sorting": {
                    "enabled": true
                }
            });
            $(".abcd").sparkline([13, 10], {
                type: 'pie',
                height: '25',
                sliceColors: ['#1ab394', '#F5F5F5']
            });
            clientRefresh()
            $('#ibox1').children('.ibox-content').toggleClass('sk-loading'); $('#ibox1').addClass('bounce');

        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });

}

//function to show axact model
function showModel(TSID, task) {
    var jsonAction = JSON.parse(list.filter(o => o.treansactionID_FK == currentVacationId)[0].actions).filter(o => o.TSID == TSID)[0];
    //console.log(jsonAction, task);
    var result = myUserControl(jsonAction, task);
    $("#userControl").css("margin-top", "7%");
    $("#userControl .modal-title").html(result[0]);
    $("#userControl .modal-body").html(result[1]);
    $("#userControl .modal-footer").html(result[2]);
    $("#userControl .modal-dialog").width(result[2] + '%');

    $("#userControl").modal('show');

}

//function to do operation in vacation
function nextStep(operationType, note) {
    $.ajax({
        url: "/Operations/VacationOperations/" + currentVacationId + '/' + operationType + '/' + note,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result.Code === 200) {
                swal({
                    title: "تمت العملية بنجاح",
                    text: result.Title,
                    type: "success"
                });
            }
            else {
                swal({
                    title: "خطأ",
                    text: result.Title,
                    type: "error"
                });
            }
            $("#userControl").modal('hide');
            loadData();
        },
        error: function (errormessage) {
            console.log(errormessage);
            //alert(errormessage.responseText);
        }
    });
}

//function for get data By ID
function getbyID(vacationID) {
    //alert(currentVacationId);
    $.ajax({
        url: "/Operations/getVacationDetails/" + vacationID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var div = '';
            $.each(result, function (key, item) {
                div += '<div class="lobipanel panel panel-default" data-inner-id="6e2c17da424f" data-index="0">';
                div += '<div class="panel-heading"><div class="panel-title" style="max-width: calc(100% - 38px);"><h4>' + item.vacationTypeText +'</h4></div></div>';
                div += '<div class="panel-body">';
                div += '<div class="row">';
                div += '<div class="d col-sm-2"><h5 id="duration"> المدة - يوم :  ' + item.noOfDay + '</h5></div>';
                if (item.tagID)
                    div += '<div class="d col-sm-4"><h5>المرفقات : <a  href="#" onClick="downloadFile(\'' + item.tagID + '\');">' + item.vacationTypeText + '</a></h5></div>';
                else
                    div += '<div class="d col-sm-4"><h5>المرفقات : <span style="color:#676a6c">لا يوجد مرفقات</span></h5></div>';
                div += '<div class="s col-sm-3"><div class="col-lg-5"><h5>البداية : </h5></div>';
                div += '<div class="col-sm-7"><div><h5 id="startDateE">'
                    + moment(item.startingDateString, "YYYYMMDD").format("YYYY/MM/DD")
                    + ' م</h5></div>';
                div += '<div><h5 id="startDate">'
                    + moment(item.startingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD")
                    + ' هـ</h5></div></div ></div > ';
                div += '<div class="e col-sm-3"><div class="col-sm-5"><h5>النهاية : </h5></div>';
                div += '<div class="col-sm-7"><div><h5 id="endDateE">'
                    + moment(item.endingDateString, "YYYYMMDD").format("YYYY/MM/DD")
                    + ' م</h5></div>';
                div += '<div><h5 id="endDate">'
                    + moment(item.endingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD")
                    + ' هـ</h5></div></div ></div > ';
                div += '</div>';
                div += '</div>';
                div += '</div>';
            });
            $('#modelContainer').empty();
            $('#modelContainer').append(div);
            $('#detailsModel').modal('show');
            //$('#btnUpdate').show();
            //$('#btnAdd').hide();
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
    //return false;
}

function downloadFile(id) {
    //alert(id);
    window.open('/Operations/DownLoadVacationAttachment/' + id, 'attachment');
}

//function for client Refresh
function clientRefresh() {
    $("table tr").each(function (index) {
        $(this).show();
    });
    //if (counter == 0) {

    //    $('#selector').click();
    //    counter = counter + 1;
    //}
    $('#selector').click();
    $('#selector').click();
}


