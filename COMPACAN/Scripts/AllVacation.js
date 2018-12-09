//Load Data in Table when documents is ready
var counter = 0;
var currentVacationId = '';
var resultGlobal = [];

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
        url: "/AllVacation/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            resultGlobal = result;
            var html = '';
            resultGlobal = result;
            if (resultGlobal.length == 0) {
                $('#search').attr("readOnly", true);
                html += '<tr ><td >لا يوجد طلبات</td></tr>';
            }
            else {
                $.each(resultGlobal, function (key, item) {
                    html += '<tr>';
                    html += '<td style="vertical-align: middle;">' + item.treansactionID_FK + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.fullName + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.totalNoOfDays + '</td>';
                    //html += '<td style="vertical-align: middle;">' + item.itsStateID + '</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.requestDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.startingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.endingDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    if (item.itsStateID == 12)
                        html += '<td style="vertical-align: middle;"><div><span class="label label-danger'
                            + '" style="font-family: DroidKufi-Regular;">'
                            + item.itsState + '</span></div></td>';
                    else
                        if (item.itsStateID == 55)
                            html += '<td style="vertical-align: middle;"><div><span class="label label-warning'
                                + '" style="font-family: DroidKufi-Regular;">'
                                + item.itsState + '</span></div></td>';
                        else
                            if (item.itsStateID == 46)
                                html += '<td style="vertical-align: middle;"><div><span class="label label-info'
                                    + '" style="font-family: DroidKufi-Regular;">'
                                    + item.itsState + '</span></div></td>';
                            else
                                if (item.itsStateID == 47)
                                    html += '<td style="vertical-align: middle;"><div><span class="label'
                                        + '" style="font-family: DroidKufi-Regular;">'
                                        + item.itsState + '</span></div></td>';
                                else
                                    html += '<td style="vertical-align: middle;"><div><span class="label label-danger'
                                        + '" style="font-family: DroidKufi-Regular;">'
                                        + item.itsState + '</span></div></td>';

                    html += '<td style="vertical-align: middle;">';
                    html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.treansactionID_FK + ');" class="btn btn-success btn-sm">التفاصيل</button > </td>';
                    html += '</tr>';
                });
                $('#header').text('');
                $('#header').text(resultGlobal[0].allVacationsMessage);
            }
            $(".table").find('tbody').remove();
            $(".table").find('tfoot').remove();
            $('.table').append('<tbody class="tbody">' + html + '</tbody><tfoot><tr class="footable-paging"><td colspan="9"><div class="footable-pagination-wrapper"><ul class="pagination pull-right"><li id="arrowFirst" class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li class="footable-page active"><a data-page="0" href="#">1</a></li><li class="footable-page"><a data-page="1" href="#">2</a></li><li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li id="arrowLast" class="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul></div></td></tr></tfoot>');
            $('.table').footable({
                "paging": {
                    "enabled": true,
                    "limit": 10
                },
                "sorting": {
                    "enabled": true
                }
            });
            clientRefresh()
            $('#ibox1').children('.ibox-content').toggleClass('sk-loading'); $('#ibox1').addClass('bounce');


            
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
            window.location.href = '/Home';
        }
    });

}

//function for get data By ID
function getbyID(vacationID) {
    //alert(currentVacationId);
    $.ajax({
        url: "/AllVacation/getVacationDetails/" + vacationID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var div = '';
            $.each(result, function (key, item) {
                div += '<div class="lobipanel panel panel-default" data-inner-id="6e2c17da424f" data-index="0">';
                div += '<div class="panel-heading"><div class="panel-title" style="max-width: calc(100% - 38px);"><h4>' + item.vacationTypeText + '</h4></div></div>';
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

            $('#detailsEdit').hide();
            $('#detailsMubashra').hide();

            for (var i = 0; i < resultGlobal.length; i++) {
                if (resultGlobal[i].treansactionID_FK == vacationID) {
                    if (resultGlobal[i].itsStateID == 55) {
                        $('#detailsEdit').show();
                    }
                    else if (resultGlobal[i].itsStateID == 46) {
                        $('#detailsMubashra').show();
                    }
                }
            }
            $('#transactionID').text(vacationID);
            $('#detailsModel').modal('show');
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
            window.location.href = '/Home';
        }
    });
    //return false;
}

function downloadFile(id) {
    //alert(id);
    window.open('/AllVacation/DownLoadVacationAttachment/' + id, 'attachment');
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

$('#detailsEdit').click(function () {
    window.location.href = '/VacationRequest/Edit/' + $('#transactionID').text();
});