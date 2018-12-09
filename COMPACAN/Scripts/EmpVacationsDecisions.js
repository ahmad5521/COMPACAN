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
        url: "/HR/DecisionsList",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            resultGlobal = result;
            if (resultGlobal.length == 0) {
                $('#search').attr("readOnly", true);
                html += '<tr ><td >لا يوجد قرارات</td></tr>';
            }
            else {
                $.each(JSON.parse(resultGlobal.Data), function (key, item) {
                    html += '<tr>';
                    html += '<td style="vertical-align: middle;">' + item.empDecisionID + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.fullName + '</td>';
                    html += '<td style="vertical-align: middle;">' + item.totalNoOfDays + '</td>';
                    //html += '<td style="vertical-align: middle;">' + item.itsStateID + '</td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.empDecisionDateString, "YYYY/MM/DD").format("YYYY/MM/DD") + ' </td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.vacationStartDateString, "YYYY/MM/DD").format("YYYY/MM/DD") + ' </td>';
                    html += '<td style="vertical-align: middle;">'
                        + moment(item.vacationEndingDateString, "YYYY/MM/DD").format("YYYY/MM/DD") + ' </td>';



                    //html += '<td style="vertical-align: middle;">';
                    //html += '<div class="btn-group">';
                    //html += '<button data-toggle="dropdown" class="btn btn-primary btn-sm dropdown-toggle"> خيارات<span style="margin-right: 5px" class="caret"></span></button>';
                    //html += '<ul class="dropdown-menu">';
                    //html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; getbyID(' + item.treansactionID_FK + ');" href="#">عرض التقاصيل</a></li>';
                    //html += '<li class="divider"></li>';
                    //html += '<li><a onclick="currentVacationId=' + item.treansactionID_FK + '; trackingbyID(' + item.treansactionID_FK + ');" href="#">تتبع الإجازة</a></li>';
                    //html += '</ul>';
                    //html += '</div>';
                    html += '<td style="vertical-align: middle;">';
                    html += '<button onclick="currentVacationId=' + item.treansactionID_FK + ';  showReport();" class="btn btn-primary btn-sm">عرض القرار</button></td>';                    
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


function showReport() {
    window.location.href = "/HR/ShowReport/" + currentVacationId;
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
