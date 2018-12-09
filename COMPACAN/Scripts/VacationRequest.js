
//global variables//
//states//
var vacation = {};
var listOfVacation = [];
var request = {};
var requestVacationList = [];
var listOfVacationBalance = [];
var startDate = new Date();
startDate.setDate(startDate.getDate() - 30);
var attachment = undefined;
var tickets = [];
var hasTicketRequest = false;
var outOfKingdom = false;
var noOfAllowedTickets = 0;
var TicketsLines = 0;
var hideTicketsLines;
var thisVacation = {};


//function ready//
$(document).ready(function () {
    //Validate();

    //chosen
    $('.chosen-select').chosen({ width: "100%" });
    //i-check
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

  

    //convert hijri date
    findDayAndHijriDate();

    //set end and back date
    setEndAndBackDate();

    //load balance
    loadBalance();

    console.log(window.location.pathname.substring(0, 21));

    if (window.location.pathname.substring(0, 21) === "/VacationRequest/Edit") {
        fillBlank();
    }


})



//elements triggeres//
$('#startDateDiv').datepicker({
    language: 'ar',
    todayBtn: "linked",
    format: 'yyyy/mm/dd',
    forceParse: true,
    autoclose: true,
    startDate: startDate
}).on('hide', function (e) {
    m = moment($('#startDateE').val().substr(0, 4) + '/' + $('#startDateE').val().substr(5, 2) + '/' + $('#startDateE').val().substr(8, 2), 'YYYY/MM/DD');
    $('#startDate').val(m.format('iYYYY/iMM/iDD'));
    switch (m.format('dddd')) {
        case 'Sunday':
            $('#startDay').val('الأحد');
            break;
        case 'Monday':
            $('#startDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#startDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#startDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#startDay').val('الخميس');
            break;
        case 'Friday':
            $('#startDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#startDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }
    loadBalance();
});
$('#selectV').click(function () {
    $('#vtsError').text('');
    $('#vddiv').removeClass("has-error");
    $('#vddiv span').text('');
    if ($("#fileDiv"))
        $("#fileDiv").remove();
    loadBalance();
    var options = '';
    $.each(getActualBalance(), function (key, item) {
        options += '<option value="' + item.EmpEntitlmentTypeID + '">' + item.EmpEntitlmentTypeNameA + '  (' + item.totalBalance + ')</option>'
    });
    $('#vts').html(options);
    $('#vts').val('0');
    $('#vts').trigger("chosen:updated");
    $('.chosen-focus-input').css('opacity', '0');
    $('#vd').val('');    
});
$('#startDateE').change(function () {
    rearrangeListOfVacationDates();
    loadBalance();
});
$('#vts').change(function () {
    $('#vtsError').text('');
    if ($('#vddiv span').text('').length === 0) {
        $('#vddiv span').text('');
    }
    if ($('#vddiv').hasClass("has-error")) {
        $('#vddiv').removeClass("has-error");
        $('#vddiv span').text('');
    }
    var div;
    div = '<div class="form-group" id="fileDiv">';
    div += '<label for="attachment">المرفقات</label>';
    div += '<div class="fileinput fileinput-new input-group" data-provides="fileinput">';
    div += '<div class="form-control" data-trigger="fileinput">';
    div += '<i class="glyphicon glyphicon-file fileinput-exists"></i>';
    div += '<span class="fileinput-filename"></span>';
    div += '</div>';
    div += '<span class="input-group-addon btn btn-default btn-file">';
    div += '<span class="fileinput-new">اختيار ملف</span>';
    div += '<span class="fileinput-exists">تغيير</span>';
    div += '<input id="files" type="file" name="..."  accept="application/pdf"/>';
    div += '</span>';
    div += '<a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">حذف</a>';
    div += '</div>';
    div += '<span id="fileError" style="color:red" class="help-block"></span>';
    div += '</div>';




    $("#btnAddVac").prop('disabled', true);
    //SKLoading();
    $.ajax({
        url: "/VacationRequest/CheckNeedAttachment/" + $("#vts").val(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Code == 200) {
                //SKLoading();
                $("#btnAddVac").prop('disabled', false);
                $("#fileDiv").remove();
                $("#vacationType").find(".modal-body").find("#selectVacationForm").append(div);
                $('input[type = file]').change(function () {
                    $('#fileError').text('');
                });
            }
            else {
                //SKLoading();
                $("#btnAddVac").prop('disabled', false);
                $("#fileDiv").remove();
            }
        },
        error: function (errormessage) {
            //SKLoading();
            console.log("خطأ", errormessage);
            window.location.href = '/Home';
        }
    });

});
$('#vd').keyup(function () {
    if ($('#vddiv').hasClass("has-error")){
        $('#vddiv').removeClass("has-error");
        $('#vddiv span').text('');
    }
    if ($('#vddiv span').text('').length === 0) {
        $('#vddiv span').text('');
    }

});
$('#btnAddVac').click(function () {
    //alert($("#vts option:selected").text());
    if ($("#vts").val() != 0 && $("#vd").val() != 0) {

        //clear validation
        $('#vddiv').removeClass("has-error")
        $('#vddiv span').text('');
        $('#vtsError').text('');

        //validation here
        //تحقق هل يوجد رصيد كاقي؟؟
        var allawDays = parseInt(
            $("#vts option:selected").text().substring(
                $("#vts option:selected").text().indexOf('(') + 1,
                $("#vts option:selected").text().indexOf(')')
            )
        );

        if (parseInt($("#vd").val()) > allawDays || parseInt($("#vd").val()) < 0 || listOfVacation.find(x => x.empEntitlementTypeID_FK == $("#vts").val())) {
            if (parseInt($("#vd").val()) > allawDays) {
                $('#vddiv').addClass("has-error")
                $('#vddiv span').text('- لا يوجد رصيد كافي');
            }
            if (parseInt($("#vd").val()) < 0) {
                $('#vddiv').addClass("has-error")
                $('#vddiv span').text('- يجب اختيار مدة صحيحة');
            }
            if (listOfVacation.find(x => x.empEntitlementTypeID_FK == $("#vts").val())) {
                $('#vtsError').text('- لا يمكن اضافة اجازتين من نفس النوع');
            }
            return;
        }

        if ($('#fileDiv').length) {
            if (!$('#fileDiv > div').hasClass('fileinput-exists')) {
                $('#fileError').text('يجب اضافة مرفق');
                return;
            }
        }

        //add vacation to list
        var files;
        if ($("#files").length)
            files = $("#files").get(0).files;
        else
            files = [];        
        if (listOfVacation.length == 0) {
            vacation = {
                tagID: generateUNQID(),
                empEntitlementTypeID_FK: $("#vts").val(),
                vacationName: $("#vts option:selected").text().substring(0, $("#vts option:selected").text().indexOf('(')),
                vacationDuration: $("#vd").val(),
                vacationStartDateE: $('#startDateE').val(),
                startDateETagID: generateUNQID(),
                startDateTagID: generateUNQID(),
                vacationEndDateE: addDays($('#startDateE').val(), $("#vd").val() - 1),
                endDateETagID: generateUNQID(),
                endDateTagID: generateUNQID(),
                attachment: files[0]

            };
            listOfVacation.push(vacation);
            toggleForm();
        }
        else {
            vacation = {
                tagID: generateUNQID(),
                empEntitlementTypeID_FK: $("#vts").val(),
                vacationName: $("#vts option:selected").text().substring(0, $("#vts option:selected").text().indexOf('(')),
                vacationDuration: $("#vd").val(),
                vacationStartDateE: addDays(listOfVacation[listOfVacation.length - 1].vacationEndDateE, 1),
                startDateETagID: generateUNQID(),
                startDateTagID: generateUNQID(),
                vacationEndDateE: addDays(addDays(listOfVacation[listOfVacation.length - 1].vacationEndDateE, 1), $("#vd").val() - 1),
                endDateETagID: generateUNQID(),
                endDateTagID: generateUNQID(),
                attachment: files[0]
            };
            listOfVacation.push(vacation);
        }

    
        //add vacation to page
        thisVacation = listOfVacation[listOfVacation.length - 1];
        //console.log(thisVacation.attachment);
        var div = '<div class="lobipanel panel panel-default" data-inner-id="' + thisVacation.tagID + '">'
            + '<div class="panel-heading">'
            + '<div class="panel-title">'
            + '<h4 style="color:#676a6c">' + thisVacation.vacationName + '</h4>'
            + '</div></div>'
            + '<div class="panel-body">'
            + '<div class="row">'
            + '<div class="d col-md-3"><h4>عدد الأيام : ' + thisVacation.vacationDuration + '</h4></div>';
        if (thisVacation.attachment != undefined)
            div += '<div class="d col-md-3"><h4>المرفقات : <a onClick="downloadFile(\'' + thisVacation.tagID.toString() + '\');" >' + thisVacation.attachment.name + '</a></h4></div>';
        else
            div += '<div class="d col-md-3"><h4>المرفقات : <span style="color:#676a6c">لا يوجد مرفقات</span></h4></div>';
            //البداية
            div += '<div class="s col-md-3">'
            + '<div class="col-lg-5"><h4 >البداية : </h4></div>'
            + '<div class="col-lg-7"><div><h4 id="' + thisVacation.startDateETagID + '">' + thisVacation.vacationStartDateE + ' م</h4></div>'
            + '<div><h4 id="' + thisVacation.startDateTagID + '">' + moment(thisVacation.vacationStartDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ</h4></div>'
            + '</div></div>'

            //النهاية
            + '<div class="e col-md-3">'
            + '<div class="col-lg-5"><h4 >النهاية : </h4></div>'
            + '<div class="col-lg-7"><div><h4 id="' + thisVacation.endDateETagID + '">' + thisVacation.vacationEndDateE + ' م</h4></div>'
            + '<div><h4 id="' + thisVacation.endDateTagID + '">' + moment(thisVacation.vacationEndDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ</h4></div>'
            + '</div></div>'

            + '</div ></div ></div > '
        $('#vacContainer').append(div);

        //upload attachment if exist
        if (thisVacation.attachment !== undefined) {
            var vacationAttachment = new FormData();
            vacationAttachment.append("vacationAttachment", thisVacation.attachment);
            vacationAttachment.append("vacationTagID", thisVacation.tagID);
            $.ajax({
                url: '/VacationRequest/addVacationAttachment',
                type: "POST",
                processData: false,
                data: vacationAttachment,
                dataType: 'json',
                contentType: false,
                error: function (err) {
                    console.log(error);
                    window.location.href = '/Home';
                }
            });
        }

        //check for teckits
        if (thisVacation.empEntitlementTypeID_FK == 1) {
            SKLoading();
            m = moment($('#startDateE').val());
            $.ajax({
                url: "/VacationRequest/CheckForTickets/" + m.format('YYYYMMDD') + "/" +  parseFloat($('#userId').text()),
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.Code == 200) {
                        hideTicketsLines = false;
                        noOfAllowedTickets = parseInt(result.Title);
                        $("#tableBody").empty();
                        tickets = JSON.parse(result.Data);
                        var html = '';
                        var tagID = '';
                        $.each(JSON.parse(result.Data), function (key, item) {
                            html += '<tr>';
                            if (item.FacilitiesNameA === 'الموظف نفسه') {
                                html += '<td align="center"><div class="i-checks checked"><input id="ticket-' + key + '" class="tickets" checked type="checkbox" disabled style="position: absolute; opacity: 0;"></div></td > ';
                                tickets[key].isChecked = true;
                            }
                            else
                                html += '<td align="center"><div class="i-checks " ><input id="ticket-' + key + '" class="tickets" type="checkbox" style="position: absolute; opacity: 0;"></div></td > ';
                            html += '<td>' + item.EmpDependentsID + ' </td>';
                            html += '<td>' + item.EmpDependentsFirstName + ' ' + (item.EmpDependentsFamilyName ? item.EmpDependentsFamilyName : ' ') + ' </td>';
                            html += '<td>' + item.FacilitiesNameA + ' </td>';
                            html += '<td>' + (moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                            if (item.FacilitiesNameA === 'الموظف نفسه') {
                                html += '<td>' + (moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                            }
                            else
                                html += '<td>' + (moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                            html += '<td>' + (moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                            html += '</tr>';


                        });
                        $("#tableBody").append(html);

                        
                        
                        $('#ticket-1').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-2').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-3').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-4').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-5').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-6').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-7').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-8').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-9').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })
                        $('#ticket-10').on('ifChecked', function (event) {
                            ticketChecked(event.target.id.substring(7))
                        })

                        $('#ticket-2').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-3').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-4').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-5').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-6').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-7').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-8').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-9').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })
                        $('#ticket-10').on('ifUnchecked', function (event) {
                            ticketUnChecked(event.target.id.substring(7))
                        })


                        var div = '<input id="outOfKingdom" type="radio" name="a" style="position: absolute; opacity: 0; ">';
                        div += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
                        div += '&nbsp;	&nbsp;	&nbsp;';
                        div += '<input id="insidKingdom" type="radio" name="a" checked style="position: absolute; opacity: 0; ">';
                        div += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';


                        var div2 = '<input id="wantTickets" type="radio" name="b" style="position: absolute; opacity: 0; ">';
                        div2 += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
                        div2 += '&nbsp;	&nbsp;	&nbsp;';
                        div2 += '<input id="dontWantTickets" type="radio" name="b" checked style="position: absolute; opacity: 0; ">';
                        div2 += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';

                        $('.r1').append(div);
                        $('.r2').append(div2);

                        toggleOutsideKingdom();
                    }
                    else if (result.Code == 400) {
                        $("#tableBody").parent().hide();
                        hideTicketsLines = true;
                        var labl = "<div id='teckitMessage'><br/><label class='center control-label'>- " + result.Data + "</label></div>";
                        $("#tableBody").parent().parent().append(labl);

                        var div = '<input id="outOfKingdom" type="radio" name="a" style="position: absolute; opacity: 0; ">';
                        div += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
                        div += '&nbsp;	&nbsp;	&nbsp;';
                        div += '<input id="insidKingdom" type="radio" name="a" checked style="position: absolute; opacity: 0; ">';
                        div += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';


                        var div2 = '<input id="wantTickets" type="radio" name="b" style="position: absolute; opacity: 0; ">';
                        div2 += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
                        div2 += '&nbsp;	&nbsp;	&nbsp;';
                        div2 += '<input id="dontWantTickets" type="radio" name="b" checked style="position: absolute; opacity: 0; ">';
                        div2 += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';

                        $('.r1').append(div);
                        $('.r2').append(div2);


                        toggleOutsideKingdom();
                        
                    }
                    $('#outOfKingdom').on('ifChecked', function (event) {
                        toggleWantTickets();
                    });
                    $('#outOfKingdom').on('ifUnchecked', function (event) {
                        toggleWantTickets();
                    });


                    $('#wantTickets').on('ifChecked', function (event) {
                        toggleTickit();
                    });
                    $('#wantTickets').on('ifUnchecked', function (event) {
                        toggleTickit();
                    });

                    $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });
                    SKLoading();
                },
                error: function (errormessage) {
                    SKLoading();
                    console.log(errormessage.responseText);
                    window.location.href = '/Home';
                }
            });
        }
        $('.panel').lobiPanel({
            reload: false,
            unpin: false,
            minimize: false,
            expand: false,
            editTitle: false,
            sortable: false
        });
        $('#vacationType').modal('hide');

    }
    else {
        $('#vddiv span').text('جميع البيانات مطلوبة');
        //swal("خطأ","جميع البيانات مطلوبة", error);
    }
    $('.lobipanel').on('beforeClose.lobiPanel', function (ev, lobiPanel) {        
        var id = $(this).attr('data-inner-id');
        vacationToRemove = {};
        var vacationToRemove = listOfVacation.find(x => x.tagID == id);
        var tmpVacationList = [];
        if (vacationToRemove) {
            for (var i = 0; i < listOfVacation.length; i++) {
                if (JSON.stringify(listOfVacation[i]) !== JSON.stringify(vacationToRemove)) {
                    tmpVacationList.push(listOfVacation[i]);
                }
                else if (vacationToRemove.empEntitlementTypeID_FK == 1 && $('#outsideKingdomSeperator').length) {
                    toggleOutsideKingdom();
                    if ($('#tickitSeperator').length) {
                        toggleTickit();
                        toggleWantTickets();
                    }
                    if ($('#teckitMessage').length) {
                        $('#teckitMessage').remove();
                    }
                    $('.r1').empty();
                    $('.r2').empty();
                    tickets = [];
                }                
            }
            if (listOfVacation.length === 1) {
                toggleForm();
            }
            listOfVacation = [];
            listOfVacation = tmpVacationList;

            var str = '';
            for (var i = 0; i < listOfVacation.length; i++) {
                str += listOfVacation[i].tagID + ' ';
            }
            $(this).parent().attr("data-lobipanel-child-inner-id", str);
            rearrangeListOfVacationDates()

            $.ajax({
                url: '/VacationRequest/RemoveVacationAttachment/' + vacationToRemove.tagID,
                type: "GET",
                dataType: 'json',
                contentType: false,
                error: function (err) {
                    console.log(err);
                    window.location.href = '/Home';
                }
            });
        } else {
            return;
        }
    });  
    setEndAndBackDate();
});
$('#sendRequest').click(function () {
    SKLoading();
    if (listOfVacation.length == 0) {
        //alert("error");
        swal("خطأ", "يجب عليك اضافة اجازة واحدة عالاقل", "error");
        SKLoading();
        return;
    }
    if ($('#outOfKingdom').parent().hasClass('checked')) {
        outOfKingdom = true;
        if ($('#wantTickets').parent().hasClass('checked')) {
            if (tickets.length > 0) {
                var times = 0;
                if (tickets.length > noOfAllowedTickets) {
                    for (var i = 0; i < tickets.length; i++) {
                        if (tickets[i].isChecked === true)
                            times += 1;
                    }

                    if (times !== noOfAllowedTickets) {
                        if (noOfAllowedTickets === 0) {
                            swal("خطأ", " غير مسموح لك طلب تذاكر لوجود طلبات تحت الاجراء", "error");
                            SKLoading();
                            return;
                        } else {
                            swal("خطأ", "العدد المسموح به للتذاكر هو " + noOfAllowedTickets + " أشخاص", "error");
                            SKLoading();
                            return;
                        }
                    }
                }
                else {
                    noOfAllowedTickets = tickets.length;
                    for (var i = 0; i < tickets.length; i++) {
                        if (tickets[i].isChecked === true)
                            times += 1;
                    }
                    if (times < noOfAllowedTickets) {
                        swal("خطأ", "يرجى اختيار جميع أفرادالعائلة", "error");
                        SKLoading();
                        return;
                    }
                }
                hasTicketRequest = true;
            }
        } else {
            hasTicketRequest = false;
        }
    } else {
        outOfKingdom = false;
        hasTicketRequest = false;
    }






    var totalDouration = 0;
    for (var i = 0; i < listOfVacation.length; i++) {
        totalDouration += parseInt(listOfVacation[i].vacationDuration);
        requestVacationList.push(
            {
                tagID: listOfVacation[i].tagID,
                empEntitlementTypeID_FK: listOfVacation[i].empEntitlementTypeID_FK,
                noOfDay: listOfVacation[i].vacationDuration,
                startingDate: moment(listOfVacation[i].vacationStartDateE).format('YYYY/MM/DD HH:mm:ss'),
                endingDate: moment(listOfVacation[i].vacationEndDateE).format('YYYY/MM/DD HH:mm:ss')
            }
        );
    }


    if (tickets.length === 0) {
        hasTicketRequest = false;
    }
    //} else {
    //    hasTicketRequest = false;
    //    for (var i = 0; i < tickets.length; i++) {
    //        if (tickets[1].isChecked === true)
    //            hasTicketRequest = true;
    //    }
    //}


    if ($('#ticketsLineChosen').length) {
        TicketsLines = $('#ticketsLineChosen').val();
    }
    else {
        TicketsLines = 0;
    }

    



    request = {
        userID_FK: parseFloat($('#userId').text()),
        totalNoOfDays: totalDouration,
        startingDate: moment(listOfVacation[0].vacationStartDateE).format('YYYY/MM/DD HH:mm:ss'),
        endingDate: moment(listOfVacation[listOfVacation.length - 1].vacationEndDateE).format('YYYY/MM/DD HH:mm:ss'),
        backFromVacationDate: moment($('#backDateE').val()).format('YYYY/MM/DD HH:mm:ss'),
        code_vacationStateID_FK: 1,
        thisVacationDetail: requestVacationList,
        thisVacationTickets: tickets,
        outOfKingdom: outOfKingdom,
        hasTicketRequest: hasTicketRequest,
        TicketsLines: TicketsLines,
        Notes: $('#userNote').val()
    };



    console.log(window.location.pathname.substring(22), request);
    //return;
    if (window.location.pathname.substring(0, 21) === '/VacationRequest/Edit') { /* edit Vacation */
        //SKLoading()
        $.ajax({
            url: "/VacationRequest/updateVacation/" + parseInt(window.location.pathname.substring(22)),
            data: JSON.stringify(request),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Code == 1) {
                    SKLoading();
                    swal({
                        title: result.Title,
                        text: result.Data,
                        type: "success"
                    }, function () {
                        window.location.href = '/Home';
                    });
                    console.log(result.Data);
                }
                else {
                    SKLoading();
                    requestVacationList = [];
                    swal({
                        title: result.Title,
                        text: result.Data,
                        type: "error"
                    });
                }
            },
            error: function (errormessage) {
                SKLoading()
                console.log(errormessage);
                window.location.href = '/Home';
            }
        });

    }
    else if (window.location.pathname === '/VacationRequest') { /* add new Vacation */
        $.ajax({
            url: "/VacationRequest/addVacation",
            data: JSON.stringify(request),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Code == 1) {
                    SKLoading();
                    swal({
                        title: result.Title,
                        text: result.Data,
                        type: "success"
                    }, function () {
                        window.location.href = '/Home';
                    });
                    console.log(result.Data);
                }
                else {
                    SKLoading();
                    requestVacationList = [];
                    swal({
                        title: result.Title,
                        text: result.Data,
                        type: "error"
                    });
                }
            },
            error: function (errormessage) {
                SKLoading()
                console.log(errormessage);
                window.location.href = '/Home';
            }
        });
    }
    else {
        SKLoading()
        swal("خطأ", "ghfghgfhghfg", "error");
        window.location.href = '/Home';
    }
});
$('#cancelRequest').click(function () {
    swal({
        title: "هل أنت متأكد؟",
        text: "هل تريد الخروج من الصفحة!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "الغاء",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم, أود الخروج",
        closeOnConfirm: false
    }, function () {
        window.location.href = '/Home';
    });
    //window.location.href = '/Home';
});
$("#showMyBalance").click(function () {
    console.log(listOfVacationBalance);
    console.log(getActualBalance());
    var html = '';
    $.each(getActualBalance(), function (key, item) {
        html += '<tr>';
        html += '<td>' + item.EmpEntitlmentTypeNameA + '</td>';
        html += '<td style="text-align:center;vertical-align: middle;">' + item.totalBalance + '</td>';
        html += '</tr>';
    });
    $('.balancetbody').empty();
    $('.balancetbody').append(html);
}); 


//functions//
//prepare Trips Lines
function prepareTripsLines(data) {
    var str = "";
    $.each(JSON.parse(data.Data), function (key, item) {
        str += '<option value=' + item.ticketLineId +'>' + item.citiesLine +'</option>';
    });
    return str;
}
//load Balance
function loadBalance() {
    SKLoading();
    //alert("welcome");
    m = moment($('#startDateE').val());
    $.ajax({
        url: "/VacationRequest/GetBalance/" + m.format("YYYYMMDD") + "/" + parseFloat($('#userId').text()),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Code == 500) {
                //alert("500 - خطأ في قراءة الرصيد");
                swal("خطأ", "500 - خطأ في قراءة الرصيد", "error");
            }
            else if (result.Code == 401) {
                //alert("400 - خطأ في قراءة الرصيد");
                swal("خطأ", "401 - خطأ في قراءة الرصيد", "error");
            }
            else if (result.Code == 200) {
                listOfVacationBalance = null;
                listOfVacationBalance = JSON.parse(result.Data);
            }
            SKLoading();

        },
        error: function (errormessage) {
            SKLoading();
            console.log(errormessage);
            window.location.href = '/Home';
        }
    });
}
//optimaiz sk loading
function SKLoading() {
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    if ($('#cancelRequest').prop("disabled") || $('#sendRequest').prop("disabled")) {
        $('#cancelRequest').prop("disabled", false);
        $('#sendRequest').prop("disabled", false);
        //$('.input-group date').css({ opacity: 0.5 });
        $('input[type=text]').prop("disabled", false);
        $('input[type=text]').css({ opacity: 1 });
        $('.chosen-focus-input').css('opacity', '0');
    } else {
        $('#cancelRequest').prop("disabled", true)
        $('#sendRequest').prop("disabled", true)
        //$('.input-group date').css({ opacity: 1 });
        $('input[type=text]').prop("disabled", true);
        $('input[type=text]').css({ opacity: .5 });
        $('.chosen-focus-input').css('opacity', '0');
    }
}
//التاريخ الهجري واليوم لبداية الاجازة عند بداية اللود
function findDayAndHijriDate() {
    //for start date
    m = moment($('#startDateE').val().substr(0, 4) + '/' + $('#startDateE').val().substr(5, 2) + '/' + $('#startDateE').val().substr(8, 2), 'YYYY/MM/DD');
    $('#startDate').val(m.format('iYYYY/iMM/iDD'));
    switch (m.format('dddd')) {
        case 'Sunday':
            $('#startDay').val('الأحد');
            break;
        case 'Monday':
            $('#startDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#startDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#startDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#startDay').val('الخميس');
            break;
        case 'Friday':
            $('#startDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#startDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }
}
//add days to date 
function addDays(date, days) {
    var new_date = moment(date, "YYYY/MM/DD").add('days', days);
    return new_date.format('YYYY/MM/DD');
}
//generate random number
function generateUNQID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
//rearrange Vacation Date list
function rearrangeListOfVacationDates() {
    var startDate, vacationDuraionTotal, tagID;
    startDate = $('#startDateE').val();
    for (var i = 0; i < listOfVacation.length; i++) {
        vacationDuraionTotal += parseInt(listOfVacation[i].vacationStartDateE);
        listOfVacation[i].vacationStartDateE = startDate;
        listOfVacation[i].vacationEndDateE = addDays(startDate, listOfVacation[i].vacationDuration - 1);

        startDate = addDays(listOfVacation[i].vacationEndDateE, 1);

        tagID = '#' + listOfVacation[i].startDateETagID;
        $(tagID).text(listOfVacation[i].vacationStartDateE + ' م');
        tagID = '#' + listOfVacation[i].startDateTagID;
        $(tagID).text(moment(listOfVacation[i].vacationStartDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ');

        tagID = '#' + listOfVacation[i].endDateETagID;
        $(tagID).text(listOfVacation[i].vacationEndDateE + ' م');
        tagID = '#' + listOfVacation[i].endDateTagID;
        $(tagID).text(moment(listOfVacation[i].vacationEndDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ');
    }

    setEndAndBackDate();
}
//التاريخ الهجري واليوم لنهاية الاجازة والمباشرة
function setEndAndBackDate() {
    var endDateE, backDateE;

    if (listOfVacation.length == 0)
        endDateE = $('#startDateE').val();
    else {
        endDateE = listOfVacation[listOfVacation.length - 1].vacationEndDateE;
    }

    m = moment(endDateE, 'YYYY/MM/DD');
    if (m.format('dddd') == 'Thursday')
        backDateE = addDays(endDateE, 3);
    else
        backDateE = addDays(endDateE, 1);



    $('#endDateE').val(endDateE);
    $('#endDate').val(m.format('iYYYY/iMM/iDD'));
    switch (m.format('dddd')) {
        case 'Sunday':
            $('#endDay').val('الأحد');
            break;
        case 'Monday':
            $('#endDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#endDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#endDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#endDay').val('الخميس');
            break;
        case 'Friday':
            $('#endDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#endDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }


    m = moment(backDateE, 'YYYY/MM/DD');
    $('#backDateE').val(backDateE);
    $('#backDate').val(m.format('iYYYY/iMM/iDD'));
    switch (m.format('dddd')) {
        case 'Sunday':
            $('#backDay').val('الأحد');
            break;
        case 'Monday':
            $('#backDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#backDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#backDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#backDay').val('الخميس');
            break;
        case 'Friday':
            $('#backDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#backDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }
}
//نسخ المصفوفة
function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
//حساب الرصيد المستحق في شاشة اضافة الاجازة
function getActualBalance() {
    var actualBalabce = clone(listOfVacationBalance);

    for (var i = 0; i < actualBalabce.length; i++) {
        for (var j = 0; j < listOfVacation.length; j++) {
            if (listOfVacation[j].empEntitlementTypeID_FK == actualBalabce[i].EmpEntitlmentTypeID) {
                actualBalabce[i].totalBalance = actualBalabce[i].totalBalance - listOfVacation[j].vacationDuration
            }
        }
    }

    return actualBalabce;
}
//تشغيل الدف للتذاكر
function toggleTickit() {
    if ($('#tickitSeperator').length) {
        $("#ticketsDiv").toggle();
        $("#tickitSeperator").remove();
    }
    else {
        $("#ticketsDiv").toggle();
        $('<div id="tickitSeperator" class="hr-line-dashed"></div>').insertAfter("#ticketsDiv");
    }
}
//تشغيل الدف لخارج / داخل المملكة
function toggleOutsideKingdom() {
    if ($('#outsideKingdomSeperator').length) {
        $("#outsideKingdomDiv").toggle();
        $("#outsideKingdomSeperator").remove();
    }
    else {
        $("#outsideKingdomDiv").toggle();
        $('<div id="outsideKingdomSeperator" class="hr-line-dashed"></div>').insertAfter("#outsideKingdomDiv");
    }
}
//toggleWantTickets
function toggleWantTickets() {
    if ($('#wantTickets').length) {
    //if ($('#insidKingdom').parent().hasClass('checked')) {
        $("#wantTicketsDiv").toggle();
        $('#dontWantTickets').iCheck('check');
        if ($('#tickitSeperator').length) {
            $("#ticketsDiv").toggle();
            $("#tickitSeperator").remove();
        }
        if (!hideTicketsLines) {
            $.ajax({
                url: "/VacationRequest/GetTicketLines/" + "/" + parseFloat($('#userId').text()),
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var tl = prepareTripsLines(result);

                    var div = '<div id="ticketsLineChosendiv" class="">';
                    div += ' <label class="control-label" for="vacationType">مسار التذكرة : </label>';
                    div += ' <div style="width:500px"> '
                        + '<select id="ticketsLineChosen" data-placeholder="اختر المسار..." class="chosen-select" tabindex="4">'
                        + tl
                        + '</select></div>';
                    div += '</div>';

                    $("#ticketsLine").empty();
                    $("#ticketsLine").append(div);


                    //chosen
                    $('#ticketsLineChosen').chosen({ width: "100%" });


                    if (typeof requestForEdit.TicketsLines !== 'undefined')
                        $('#ticketsLineChosen').val(requestForEdit.TicketsLines).trigger('chosen:updated');

                },
                error: function (errormessage) {
                    console.log(errormessage.responseText);
                    window.location.href = '/Home';
                }
            });
            $('#ticketsLineChosendiv').show();
        }
        else {
            $('#ticketsLineChosendiv').hide();
        }
        
    }
    else if ($('#outOfKingdom').parent().hasClass('checked')){
            $("#wantTicketsDiv").toggle();
    }
}
//toggleForm
function toggleForm() {
    if ($('#formSeperator').length) {
        $("#formDiv").toggle();
        $("#formSeperator").remove();
        $("#mySep").attr("hidden", true);
    }
    else {
        $("#formDiv").toggle();
        $('<div id="formSeperator" hidden class="hr-line-dashed"></div>').insertBefore("#formDiv");
        $("#mySep").attr("hidden", false);
    }
}
//تحميل المرفق
function downloadFile(id) {
    window.open('/VacationRequest/DownLoadVacationAttachment/' + id, 'attachment');
}
//downloadFileEdit
function downloadFileEdit(id) {
    //alert(id);
    window.open('/VacationRequest/DownLoadVacationAttachmentEdit/' + id, 'attachment');
}
//ticketChecked
function ticketChecked(id) {
    tickets[id].isChecked = true;
}
//ticketUnChecked
function ticketUnChecked(id) {
    tickets[id].isChecked = false;
}
//CheckForTicketsNumber
function CheckForTicketsNumber() {
    SKLoading();
    $.ajax({
        url: "/VacationRequest/CheckForTicketsNumber/" + m.format("YYYYMMDD") + "/" + parseFloat($('#userId').text()),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Code == 200) {
                noOfAllowedTickets = parseInt(result.Data);
            }
            else {
                noOfAllowedTickets = 0;
            }
            SKLoading();

        },
        error: function (errormessage) {
            SKLoading();
            console.log(errormessage);
            window.location.href = '/Home';
        }
    });
}
//fillBlank
function fillBlank() {

    //fill listOfVacation
    for (var i = 0; i < vacationData.thisVacationDetail.length; i++) {
        if (vacationData.thisVacationDetail[i].tagID === null) {
            vacationData.thisVacationDetail[i].tagID = generateUNQID();
        }
        listOfVacation.push(
            {
                tagID: vacationData.thisVacationDetail[i].tagID,
                empEntitlementTypeID_FK: vacationData.thisVacationDetail[i].empEntitlementTypeID_FK,
                EmpEntitlmentTypeNameA: vacationData.thisVacationDetail[i].EmpEntitlmentTypeNameA,
                vacationDuration: vacationData.thisVacationDetail[i].noOfDay,
                vacationStartDateE: moment(vacationData.thisVacationDetail[i].startingDateString, 'YYYYMMDD').format('YYYY/MM/DD'),
                startDateETagID: generateUNQID(),
                startDateTagID: generateUNQID(),
                vacationEndDateE: moment(vacationData.thisVacationDetail[i].endingDateString, 'YYYYMMDD').format('YYYY/MM/DD'),
                endDateETagID: generateUNQID(),
                endDateTagID: generateUNQID(),
                attachment: vacationData.thisVacationDetail[i].attachment
            }
        );
    }

    //fill tickets
    if (vacationData.hasTicketRequest) {
        for (var i = 0; i < vacationData.thisVacationTickets.length; i++) {
            tickets.push(
                {
                    EmpDependentsFamilyName: vacationData.thisVacationTickets[i].EmpDependentsFamilyName,
                    EmpDependentsFirstName: vacationData.thisVacationTickets[i].EmpDependentsFirstName,
                    EmpDependentsID: vacationData.thisVacationTickets[i].EmpDependentsID,
                    EmpDependentsIDBirthDate: vacationData.thisVacationTickets[i].EmpDependentsIDBirthDate,
                    FacilitiesNameA: vacationData.thisVacationTickets[i].FacilitiesNameA,
                    IqamaExpireDate: vacationData.thisVacationTickets[i].IqamaExpireDate,
                    empDecisionFromDate: vacationData.thisVacationTickets[i].empDecisionFromDate,
                    isChecked: vacationData.thisVacationTickets[i].isChecked,
                    ordering: vacationData.thisVacationTickets[i].ordering
                }
            );
        }
    }

    //fill request
    requestForEdit = {
        userID_FK: vacationData.userID_FK,
        totalNoOfDays: vacationData.totalNoOfDays,
        startingDate: vacationData.startingDate,
        endingDate: vacationData.endingDate,
        backFromVacationDate: vacationData.backFromVacationDate,
        code_vacationStateID_FK: vacationData.code_vacationStateID_FK,
        outOfKingdom: vacationData.outOfKingdom,
        hasTicketRequest: vacationData.hasTicketRequest,
        TicketsLines: vacationData.TicketsLines
    };

    //fill is saudi
    var isSaudi = vacationData.isSaudi;


    //startDateE
    $('#startDateE').val(moment(new Date(parseInt(requestForEdit.startingDate.substr(6))).toLocaleDateString()).format("YYYY/MM/DD"));
    //startDate
    $('#startDate').val(moment(new Date(parseInt(requestForEdit.startingDate.substr(6))).toLocaleDateString()).format("iYYYY/iMM/iDD"));
    //startDay
    switch (moment(new Date(parseInt(requestForEdit.startingDate.substr(6))).toLocaleDateString()).format('dddd')) {
        case 'Sunday':
            $('#startDay').val('الأحد');
            break;
        case 'Monday':
            $('#startDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#startDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#startDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#startDay').val('الخميس');
            break;
        case 'Friday':
            $('#startDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#startDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }


    //endDateE
    $('#endDateE').val(moment(new Date(parseInt(requestForEdit.endingDate.substr(6))).toLocaleDateString()).format("YYYY/MM/DD"));
    //endDate
    $('#endDate').val(moment(new Date(parseInt(requestForEdit.endingDate.substr(6))).toLocaleDateString()).format("iYYYY/iMM/iDD"));
    //endDay
    switch (moment(new Date(parseInt(requestForEdit.endingDate.substr(6))).toLocaleDateString()).format('dddd')) {
        case 'Sunday':
            $('#endDay').val('الأحد');
            break;
        case 'Monday':
            $('#endDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#endDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#endDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#endDay').val('الخميس');
            break;
        case 'Friday':
            $('#endDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#endDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }


    //backDateE
    $('#backDateE').val(moment(new Date(parseInt(requestForEdit.backFromVacationDate.substr(6))).toLocaleDateString()).format("YYYY/MM/DD"));
    //backDate
    $('#backDate').val(moment(new Date(parseInt(requestForEdit.backFromVacationDate.substr(6))).toLocaleDateString()).format("iYYYY/iMM/iDD"));
    //endDay
    switch (moment(new Date(parseInt(requestForEdit.backFromVacationDate.substr(6))).toLocaleDateString()).format('dddd')) {
        case 'Sunday':
            $('#backDay').val('الأحد');
            break;
        case 'Monday':
            $('#backDay').val('الاثنين');
            break;
        case 'Tuesday':
            $('#backDay').val('الثلاثاء');
            break;
        case 'Wednesday':
            $('#backDay').val('الأربعاء');
            break;
        case 'Thursday':
            $('#backDay').val('الخميس');
            break;
        case 'Friday':
            $('#backDay').val('الجمعة');
            break;
        case 'Saturday':
            $('#backDay').val('السبت');
            break;
        default:
            alert(m.format('dddd'));
    }


    var div = "";
    for (var i = 0; i < listOfVacation.length; i++) {        
        div = '<div class="lobipanel panel panel-default" data-inner-id="' + listOfVacation[i].tagID + '">'
            + '<div class="panel-heading">'
            + '<div class="panel-title">'
                + '<h4 style="color:#676a6c">' + listOfVacation[i].EmpEntitlmentTypeNameA + '</h4>'
            + '</div></div>'
            + '<div class="panel-body">'
            + '<div class="row">'
            + '<div class="d col-md-3"><h4>عدد الأيام : ' + listOfVacation[i].vacationDuration + '</h4></div>';        
            if (listOfVacation[i].attachment.FileContentString !== null)
                div += '<div class="d col-lg-3"><h4>المرفقات : <a  href="#" onClick="downloadFileEdit(\'' + listOfVacation[i].tagID + '\');">' + listOfVacation[i].EmpEntitlmentTypeNameA + '</a></h4></div>';
            else
                div += '<div class="d col-lg-3"><h4>المرفقات : <span style="color:#676a6c">لا يوجد مرفقات</span></h4></div>';
            //البداية
            div += '<div class="s col-md-3">'
            + '<div class="col-lg-5"><h4 >البداية : </h4></div>'
                + '<div class="col-lg-7"><div><h4 id="' + listOfVacation[i].startDateETagID + '">' + moment(listOfVacation[i].vacationStartDateE, 'YYYY/MM/DD').format('YYYY/MM/DD')  + ' م</h4></div>'
                + '<div><h4 id="' + listOfVacation[i].startDateTagID + '">' + moment(listOfVacation[i].vacationStartDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ</h4></div>'
            + '</div></div>'

            //النهاية
            + '<div class="e col-md-3">'
            + '<div class="col-lg-5"><h4 >النهاية : </h4></div>'
                + '<div class="col-lg-7"><div><h4 id="' + listOfVacation[i].endDateETagID + '">' + moment(listOfVacation[i].vacationEndDateE, 'YYYY/MM/DD').format('YYYY/MM/DD') + ' م</h4></div>'
                + '<div><h4 id="' + listOfVacation[i].endDateTagID + '">' + moment(listOfVacation[i].vacationEndDateE, 'YYYY/MM/DD').format('iYYYY/iMM/iDD') + ' هـ</h4></div>'
            + '</div></div>'

            + '</div ></div ></div > ';

            $('#vacContainer').append(div);
    }
    $('.panel').lobiPanel({
        reload: false,
        unpin: false,
        minimize: false,
        expand: false,
        editTitle: false,
        sortable: false
    });
    $('.lobipanel').on('beforeClose.lobiPanel', function (ev, lobiPanel) {
        
        var id = $(this).attr('data-inner-id');
        vacationToRemove = {};
        var vacationToRemove = listOfVacation.find(x => x.tagID == id);
        var tmpVacationList = [];
        if (vacationToRemove) {
            for (var i = 0; i < listOfVacation.length; i++) {
                if (JSON.stringify(listOfVacation[i]) !== JSON.stringify(vacationToRemove)) {
                    tmpVacationList.push(listOfVacation[i]);
                }
                else if (vacationToRemove.empEntitlementTypeID_FK == 1 && $('#outsideKingdomSeperator').length) {
                    toggleOutsideKingdom();
                    if ($('#tickitSeperator').length) {
                        toggleTickit();
                        toggleWantTickets();
                    }
                    if ($('#teckitMessage').length) {
                        $('#teckitMessage').remove();
                    }
                    $('.r1').empty();
                    $('.r2').empty();
                    tickets = [];
                }
            }
            if (listOfVacation.length === 1) {
                toggleForm();
            }
            listOfVacation = [];
            listOfVacation = tmpVacationList;

            var str = '';
            for (var i = 0; i < listOfVacation.length; i++) {
                str += listOfVacation[i].tagID + ' ';
            }
            $(this).parent().attr("data-lobipanel-child-inner-id", str);
            rearrangeListOfVacationDates();

            $.ajax({
                url: '/VacationRequest/RemoveVacationAttachment/' + vacationToRemove.tagID,
                type: "GET",
                dataType: 'json',
                contentType: false,
                error: function (err) {
                    console.log(err);
                }

            });
        } else {
            return;
        }
    });


    CheckForTicketsNumber();
    if (requestForEdit.hasTicketRequest) {
        hideTicketsLines = false;
        $('#ticketsLineChosen').val(requestForEdit.TicketsLines).trigger('chosen:updated');
            var html = '';
            $.each(tickets, function (key, item) {
                html += '<tr>';
                if (item.isChecked) {
                    if (item.FacilitiesNameA === 'الموظف نفسه') {
                        html += '<td align="center"><div class="i-checks checked"><input id="ticket-' + key + '" class="tickets" checked type="checkbox" disabled style="position: absolute; opacity: 0;"></div></td > ';
                    } else {
                        html += '<td align="center"><div class="i-checks checked" ><input id="ticket-' + key + '" class="tickets" checked type="checkbox" style="position: absolute; opacity: 0;"></div></td > ';
                    }
                }
                else {
                    if (item.FacilitiesNameA === 'الموظف نفسه') {
                        html += '<td align="center"><div class="i-checks checked" ><input id="ticket-' + key + '" class="tickets" checked type="checkbox" disabled style="position: absolute; opacity: 0;"></div></td > ';
                    } else {
                        html += '<td align="center"><div class="i-checks " ><input id="ticket-' + key + '" class="tickets" type="checkbox" style="position: absolute; opacity: 0;"></div></td > ';
                    }
                }
                html += '<td>' + item.EmpDependentsID + ' </td>';
                html += '<td>' + item.EmpDependentsFirstName + ' ' + (item.EmpDependentsFamilyName ? item.EmpDependentsFamilyName : ' ') + ' </td>';
                html += '<td>' + item.FacilitiesNameA + ' </td>';
                html += '<td>' + (moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                html += '<td>' + (moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                html += '<td>' + (moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                html += '</tr>';
            });
            $("#tableBody").append(html);

            




            $('#ticket-1').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-2').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-3').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-4').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-5').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-6').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-7').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-8').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-9').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })
            $('#ticket-10').on('ifChecked', function (event) { ticketChecked(event.target.id.substring(7)) })

            $('#ticket-2').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-3').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-4').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-5').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-6').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-7').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-8').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-9').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })
            $('#ticket-10').on('ifUnchecked', function (event) { ticketUnChecked(event.target.id.substring(7)) })

            
        }
    else {
        ///بريك


        m = moment($('#startDateE').val());
        $.ajax({
            url: "/VacationRequest/CheckForTickets/" + m.format('YYYYMMDD') + "/" + parseFloat($('#userId').text()),
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Code == 200) {
                    hideTicketsLines = false;
                    noOfAllowedTickets = parseInt(result.Title);
                    $("#tableBody").empty();
                    tickets = JSON.parse(result.Data);
                    var html = '';
                    var tagID = '';
                    $.each(JSON.parse(result.Data), function (key, item) {
                        html += '<tr>';
                        if (item.FacilitiesNameA === 'الموظف نفسه') {
                            html += '<td align="center"><div class="i-checks checked"><input id="ticket-' + key + '" class="tickets" checked type="checkbox" disabled style="position: absolute; opacity: 0;"></div></td > ';
                            tickets[key].isChecked = true;
                        }
                        else
                            html += '<td align="center"><div class="i-checks " ><input id="ticket-' + key + '" class="tickets" type="checkbox" style="position: absolute; opacity: 0;"></div></td > ';
                        html += '<td>' + item.EmpDependentsID + ' </td>';
                        html += '<td>' + item.EmpDependentsFirstName + ' ' + (item.EmpDependentsFamilyName ? item.EmpDependentsFamilyName : ' ') + ' </td>';
                        html += '<td>' + item.FacilitiesNameA + ' </td>';
                        html += '<td>' + (moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.EmpDependentsIDBirthDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                        html += '<td>' + (moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.IqamaExpireDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                        html += '<td>' + (moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD').toString() != '0000-01-01' ? moment(item.empDecisionFromDate, 'YYYYMMDD').format('YYYY-MM-DD') + ' م' : 'غير متوفر') + ' </td>';
                        html += '</tr>';


                    });
                    $("#tableBody").append(html);

                    $('#ticket-1').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-2').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-3').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-4').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-5').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-6').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-7').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-8').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-9').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })
                    $('#ticket-10').on('ifChecked', function (event) {
                        ticketChecked(event.target.id.substring(7))
                    })


                    $('#ticket-2').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-3').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-4').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-5').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-6').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-7').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-8').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-9').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })
                    $('#ticket-10').on('ifUnchecked', function (event) {
                        ticketUnChecked(event.target.id.substring(7))
                    })


                    $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });
                }
                else if (result.Code == 400) {
                    hideTicketsLines = true;
                    $("#tableBody").parent().hide();
                    var labl = "<div id='teckitMessage'><br/><label class='center control-label'>- " + result.Data + "</label></div>";
                    $("#tableBody").parent().parent().append(labl);

                    
                    $('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });
                }

                $('#outOfKingdom').on('ifChecked', function (event) {
                    toggleWantTickets();
                });
                $('#outOfKingdom').on('ifUnchecked', function (event) {
                    toggleWantTickets();
                });


                $('#wantTickets').on('ifChecked', function (event) {
                    toggleTickit();
                });
                $('#wantTickets').on('ifUnchecked', function (event) {
                    toggleTickit();
                });
                //SKLoading();
            },
            error: function (errormessage) {
                //SKLoading();
                console.log(errormessage.responseText);
            }
        });
        

            //$("#tableBody").parent().hide();
            //var labl = "<div id='teckitMessage'><br/><label class='center control-label'>- لا توجد طلبات تذاكر</label></div>";
            ////labl += "<br /><div id='teckitMessage'><br/><label class='center control-label'>- لإضافة تذاكر يرجى حذف الاجازة من الأعلى ثم اضافتها مرة اخرى </label></div>";
            //$("#tableBody").parent().parent().append(labl);
    }


    var isAnnula = false;
    for (var i = 0; i < listOfVacation.length; i++) {
        if (listOfVacation[i].empEntitlementTypeID_FK === 1 && isSaudi != true) {
            isAnnula = true;
        }
    }
    if (requestForEdit.outOfKingdom) {
        var div = '<input id="outOfKingdom" type="radio" name="a" style="position: absolute; opacity: 0; ">';
        div += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
        div += '&nbsp;	&nbsp;	&nbsp;';
        div += '<input id="insidKingdom" type="radio" name="a" checked style="position: absolute; opacity: 0; ">';
        div += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';


        var div2 = '<input id="wantTickets" type="radio" name="b" style="position: absolute; opacity: 0; ">';
        div2 += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
        div2 += '&nbsp;	&nbsp;	&nbsp;';
        div2 += '<input id="dontWantTickets" type="radio" name="b" checked style="position: absolute; opacity: 0; ">';
        div2 += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';

        $('.r1').append(div);
        $('.r2').append(div2);



        toggleOutsideKingdom();
        $('#outOfKingdom').on('ifChecked', function (event) {
            toggleWantTickets();
        });
        $('#outOfKingdom').on('ifUnchecked', function (event) {
            toggleWantTickets();
        });

        $('#wantTickets').on('ifChecked', function (event) {
            toggleTickit();
        });
        $('#wantTickets').on('ifUnchecked', function (event) {
            toggleTickit();
        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        if (requestForEdit.outOfKingdom) {
            $('#outOfKingdom').iCheck('check');
        }
        if (requestForEdit.hasTicketRequest) {
            $('#wantTickets').iCheck('check');
        }
    }
    else if (isAnnula){
        var div = '<input id="outOfKingdom" type="radio" name="a" style="position: absolute; opacity: 0; ">';
        div += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
        div += '&nbsp;	&nbsp;	&nbsp;';
        div += '<input id="insidKingdom" type="radio" name="a" checked style="position: absolute; opacity: 0; ">';
        div += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';


        var div2 = '<input id="wantTickets" type="radio" name="b" style="position: absolute; opacity: 0; ">';
        div2 += '<label for="competitionFragmented" style="margin - right: -20px">نعم</label>';
        div2 += '&nbsp;	&nbsp;	&nbsp;';
        div2 += '<input id="dontWantTickets" type="radio" name="b" checked style="position: absolute; opacity: 0; ">';
        div2 += '<label for="competitionFragmented" style="margin - right: -20px">لا</label>';

        $('.r1').append(div);
        $('.r2').append(div2);



        toggleOutsideKingdom();
        $('#outOfKingdom').on('ifChecked', function (event) {
            toggleWantTickets();
        });
        $('#outOfKingdom').on('ifUnchecked', function (event) {
            toggleWantTickets();
        });

        $('#wantTickets').on('ifChecked', function (event) {
            toggleTickit();
        });
        $('#wantTickets').on('ifUnchecked', function (event) {
            toggleTickit();
        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        if (requestForEdit.outOfKingdom) {
            $('#outOfKingdom').iCheck('check');
        }
        if (requestForEdit.hasTicketRequest) {
            $('#wantTickets').iCheck('check');
        }
    }
    toggleForm();
}