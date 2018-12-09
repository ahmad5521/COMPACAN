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
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    //start loading snapit
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    //populate data table
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
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
                    html += '<td style="vertical-align: middle;">' + item.totalNoOfDays + '</td>';
                    //html += '<td style="vertical-align: middle;">' + item.itsStateID + '</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.requestDateString, "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.startingDateString , "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.endingDateString , "YYYYMMDD").format("iYYYY/iMM/iDD") + ' هـ</td>';
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
                                html += '<td style="vertical-align: middle;"><div><span class="label label-info'
                                    + '" style="font-family: DroidKufi-Regular;">'
                                    + item.itsState + '</span></div></td>';
                            else
                                if(item.itsStateID === 47)
                                    html += '<td style="vertical-align: middle;"><div><span class="label'
                                    + '" style="font-family: DroidKufi-Regular;">'
                                        + item.itsState + '</span></div></td>';    
                                else 
                                    html += '<td style="vertical-align: middle;"><div><span class="label label-danger'
                                        + '" style="font-family: DroidKufi-Regular;">'
                                        + item.itsState + '</span></div></td>';  
                    html += '<td style="vertical-align: middle;">';
                    html += '<div class="btn-group">';
                    html += '<button data-toggle="dropdown" class="btn btn-primary btn-sm dropdown-toggle"> خيارات<span style="margin-right: 5px" class="caret"></span></button>';
                    html += '<ul class="dropdown-menu">';
                    html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.treansactionID_FK + ');" href="#">عرض التقاصيل</a></li>';
                    html += '<li class="divider"></li>';
                    html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; trackingbyID(' + item.treansactionID_FK + ');" href="#">تتبع الإجازة</a></li>';
                    html += '</ul>';
                    html += '</div>';  
                    //html += '<td style="vertical-align: middle;">';
                    //html += '<button onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.treansactionID_FK + ');" class="btn btn-success btn-sm">التفاصيل</button > </td>';                    
                    html += '</td> </tr>';
                });
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
        url: "/Home/getVacationDetails/" + vacationID,
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

            $('#myModalLabel').empty();
            $('#myModalLabel').text('تفاصيل الاجازة');
            $('#modelContainer').empty();
            $('#modelContainer').append(div);

            $('#detailsEdit').hide();
            $('#detailsMubashra').hide();
            $('#detailsPrint').hide();

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
//function for get actions and notes on vacation By ID
function trackingbyID(vacationID) {
    $.ajax({
        url: "/Home/getTrackingDetails/" + vacationID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var div = '<div id="trackingTable">';
            div += '<h3>الحالة:</h3>';
            //div += '<span class="label label-primary" style="font-size:13px; font-family: DroidKufi-Regular;">'
            //    + resultGlobal.filter(o => o.treansactionID_FK === currentVacationId)[0].itsState
            //    + '</span>';
            div += '<h4>'
                + resultGlobal.filter(o => o.treansactionID_FK === currentVacationId)[0].itsState
                + '.</h4>';
            div += '<br />';
            div += '<h3>اجراءات تمت على الاجازة:</h3>';
            div += '<h6>من الاقدم الى الاحدث </h6>';
            div += '<table class="table table-bordered" style="display: inline-table;">';
            div += '<thead>';
            div += '<tr>';
            div += ' <th style="width:9%; text-align:center;vertical-align: middle;">رقم الإجراء</th>';
            div += '<th style="width:14%;">الإجراء </th>';
            div += '<th style="width:18%;">التاريخ </th>';
            div += '<th style="width:10%;">الشخص </th>';
            div += '<th style="width:50%;">الملاحضات </th>';
            div += '</tr>';
            div += '</thead > ';
            div += '<tbody class="balancetbody">';
            console.log(JSON.parse(result.Data));
            $.each(JSON.parse(result.Data), function (key, item) {
                div += '<tr><td>' + item.actionID +'</td>';
                div += '<td>' + item.actionTypeName +'</td>';
                div += '<td>' + item.actionDateTime +'</td>';
                div += '<td>' + item.whoFullName + '</td>';                
                div += '<td>' + ((item.commentByHolder == undefined) ? "لا يوجد بيانات" : item.commentByHolder) +'</td></tr></div>';
            });

            div += '</tbody></table > ';            
            $('#myModalLabel').empty();
            $('#myModalLabel').text('تتبع الإجازة');
            $('#modelContainer').empty();
            $('#modelContainer').append(div);
            $('#detailsEdit').hide();
            $('#detailsMubashra').hide();
            $('#detailsPrint').show();

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
}

function downloadFile(id) {
    //alert(id);
    window.open('/Home/DownLoadVacationAttachment/' + id, 'attachment');
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


//print div
function PrintElem() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body dir="rtl" >');
    mywindow.document.write('<h1>الاجراءات</h1>');
    mywindow.document.write(document.getElementById('trackingTable').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

$('#detailsEdit').click(function () {
    window.location.href = '/VacationRequest/Edit/' + $('#transactionID').text();
});