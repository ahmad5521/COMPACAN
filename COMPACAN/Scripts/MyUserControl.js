
function myUserControl(action, task, ticketsList) {
    var modalTitle = "Title"
    var modalBody = "body";
    var modalFotter = 'fotter';
    var size = 50;
    var html = [];



    // شاشة المشرفين
    if (task === 221 || task === 227 || task === 223 || task === 226) {
        // موافقة
        if (action.actionType === 20) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض
        else if (action.actionType === 51) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');"  placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick="$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + 'id = "AcceptConferm">' + action.actionName + '</button>'
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // تعديل الاجازة
        else if (action.actionType === 92) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');"  placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-warning" '
                + 'onclick="$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + 'id="AcceptConferm">' + action.actionName + '</button>'
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
    }
    //شاشة شؤون الموظفين
    else if (task === 269 || task === 271 || task === 270) {
        // موافقة
        if (action.actionType === 20) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // موافقة على الالغاء
        else if (action.actionType === 95) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // موافقة على التعديل
        else if (action.actionType === 94) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض
        else if (action.actionType === 51) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض الالغاء
        else if (action.actionType === 99) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض التعديل
        else if (action.actionType === 98) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // تعديل الاجازة
        else if (action.actionType === 92) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-warning" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
    }
    //شاشة الجوازات
    else if (task === 260 || task === 266 || task === 290 || task === 293) {
        // الغاء التأشيرة
        if (action.actionType === 100) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض الالغاء
        if (action.actionType === 99) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض
        if (action.actionType === 51) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // تعديل الاجازة
        else if (action.actionType === 92) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-warning" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-warning" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // ارسال للتذاكر
        if (action.actionType === 90) {  
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<div class="form-group">'
                + '<label>رقم تأشيرة الخروج</label>'
                + '<input required onkeypress="$(\'#formErr\').text(\'\');" type="number" id="VisaNo" placeholder="رقم تأشيرة الخروج" class="form-control">'
                + '</div>'
                + '<div class="form-group">'
                + '<label>تاريخ بداية التأشيرة</label>'
                + '<div class="input-group date" style="margin-top:10px" id="VisaDateStartDiv">'
                + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
                + '<input onchange="$(\'#formErr\').text(\'\');" id="VisaDateStart" style="background-color: white;" type="text" placeholder="تاريخ بداية التأشيرة" '
                + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label>تاريخ نهاية التأشيرة</label>'
                + '<div class="input-group date" style="margin-top:10px" id="VisaDateEndDiv">'
                + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
                + '<input onchange="$(\'#formErr\').text(\'\');" id="VisaDateEnd" style="background-color: white;" type="text" placeholder="تاريخ نهاية التأشيرة" '
                + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
                //+ 'readonly class="form-control" value="' + moment("20120620", "YYYYMMDD").fromNow() + '">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label>مدة التأشيرة</label>'
                + '<input onkeypress="$(\'#formErr\').text(\'\');" type="number" id="visaDuration" placeholder="مدة التأشيرة" class="form-control">'
                + '</div>'
                + '<div class="form-group">'
                + '<label>ملاحظات</label>'
                + '<input onkeypress="$(\'#formErr\').text(\'\');" type="text" id="VisaNote" placeholder="ملاحظات" class="form-control">'
                + '</div>'
                + '<h5 id="formErr" style="color:red;">error</h5>'
                + '</form>';
            modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#VisaNote\').val());" id="AcceptConfirm">' + action.actionName + '</button>'
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            //modalBody = '<form>'
            //    + '<div class="form-group">'
            //    + '<label>رقم تأشيرة الخروج</label>'
            //    + '<input required type="number" id="VisaNo" placeholder="رقم تأشيرة الخروج" class="form-control">'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>تاريخ بداية التأشيرة</label>'
            //    + '<div class="input-group date" style="margin-top:10px" id="VisaDateStartDiv">'
            //    + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
            //    + '<input id="VisaDateStart" style="background-color: white;" type="text" placeholder="تاريخ بداية التأشيرة" '
            //    + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
            //    + '</div>'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>تاريخ نهاية التأشيرة</label>'
            //    + '<div class="input-group date" style="margin-top:10px" id="VisaDateEndDiv">'
            //    + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
            //    + '<input id="VisaDateEnd" style="background-color: white;" type="text" placeholder="تاريخ نهاية التأشيرة" '
            //    + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">' 
            //    + '</div>'
            //    + '</div>'
            //    //+ '<div class="form-group">'
            //    //+ '<label>مدة التأشيرة</label>'
            //    //+ '<input type="number" id="visaDuration" placeholder="مدة التأشيرة" class="form-control">'
            //    //+ '</div>'
            //    + '<div class="form-group">'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="VisaNote" placeholder="ملاحظات" class="form-control">'
            //    + '</div>'
            //    + '</form>';
            //modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#VisaNote\').val());" id="AcceptConfirm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 80;
        }
        // اصدار قرار الاجازة
        if (action.actionType === 91) {
            modalTitle = action.actionName;
            modalBody = '<form>'
                + '<div class="form-group">'
                + '<label>رقم تأشيرة الخروج</label>'
                + '<input required onkeypress="$(\'#formErr\').text(\'\');" type="number" id="VisaNo" placeholder="رقم تأشيرة الخروج" class="form-control">'
                + '</div>'
                + '<div class="form-group">'
                + '<label>تاريخ بداية التأشيرة</label>'
                + '<div class="input-group date" style="margin-top:10px" id="VisaDateStartDiv">'
                + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
                + '<input onchanged="$(\'#formErr\').text(\'\');" id="VisaDateStart" style="background-color: white;" type="text" placeholder="تاريخ بداية التأشيرة" '
                + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">' 
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label>تاريخ نهاية التأشيرة</label>'
                + '<div class="input-group date" style="margin-top:10px" id="VisaDateEndDiv">'
                + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
                + '<input onchanged="$(\'#formErr\').text(\'\');" id="VisaDateEnd" style="background-color: white;" type="text" placeholder="تاريخ نهاية التأشيرة" '
                + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label>مدة التأشيرة</label>'
                + '<input onkeypress="$(\'#formErr\').text(\'\');" type="number" id="visaDuration" placeholder="مدة التأشيرة" class="form-control">'
                + '</div>'
                + '<div class="form-group">'
                + '<label>ملاحظات</label>'
                + '<input onkeypress="$(\'#formErr\').text(\'\');" type="text" id="VisaNote" placeholder="ملاحظات" class="form-control">'
                + '</div>'
                + '<h5 id="formErr" style="color:red;">error</h5>'
                + '</form>';
            modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#VisaNote\').val());" id="AcceptConfirm">' + action.actionName + '</button>'
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 60;
        }
    }
    //شاشة التذاكر
    else if (task === 261 || task === 276 || task === 277) {
        // قبول عملية الغاء التذاكر لطلب التعديل
        if (action.actionType === 96) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // قبول عملية الغاء التذاكر
        if (action.actionType === 97) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-primary" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض التعديل
        if (action.actionType === 98) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض الالغاء
        if (action.actionType === 99) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // رفض
        if (action.actionType === 51) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-danger" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-danger" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // تعديل الاجازة
        else if (action.actionType === 92) {
            modalTitle = action.actionName;
            //modalBody = '<form>'
            //    //+ '< div class="form-group" >'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control">'
            //    //+ '</div>'
            //    + '</form >';
            //modalFotter = '<button type="button" class="btn btn-warning" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConferm">' + action.actionName + '</button>'
            //    + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            modalBody = '<form>'
                + '<label>ملاحظات</label>'
                + '<input type="text" id="note" onkeypress="$(\'#noteErr\').text(\'\');" placeholder="ملاحظات" class="form-control">'
                + '<h5 id="noteErr" style="color:red;"></h5>'
                + '</form >';
            modalFotter = '<button type="button" class="btn btn-warning" '
                + ' onclick = "$(\'#note\').val() !== \'\' ? ( nextStep(' + action.actionType + ' , $(\'#note\').val()) , $(\'#note\').val() = \'\'): $(\'#noteErr\').text(\'بيانات مطلوبة\')" '
                + ' id = "AcceptConfirm" > ' + action.actionName + '</button > '
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 30;
        }
        // اصدار قرار الاجازة
        if (action.actionType === 91) {
            modalTitle = action.actionName;

            modalBody = '<form><div class="panel-body" id="modelContainer">'
                + '<div class="form-group">'
                + '<label>اضافة رقم التذكرة / التذاكر</label>'
                + '<table class="form-group table table-bordered">'
                + '<thead>'
                + '<tr>'
                + '<th>#</th>'
                + '<th>الاسم</th>'
                + '<th width="200px">رقم التذكرة</th>'
                + '<th width="100px">السعر</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="ticketData">';
            //console.log(JSON.parse(ticketsList));
            $.each(JSON.parse(ticketsList), function (key, item) {                
                modalBody += '<tr><td>' + key
                    + '</td style="vertical-align: middle; text-align: center;"><td>' + item.fullName
                    + '</td><td><input class="form-control" type="text" name="ticketNo" id="ticketNo-' + item.ticketID + '" value="" /></td>'
                    + '<td><input class="form-control" type="stext" name="ticketPrice" id="ticketPrice-' + item.ticketID + '" value="" /></td></tr > ';
            });




            modalBody += '</tbody > '
                + '</table>'
                + '</div>'
                + '</div>'
                + '<label> ملاحظات</label ><input type="text" id="acceptNote" placeholder="ملاحظات" class="form-control"></div></form>';

            console.log(modalBody);
            //modalBody = '<form>'
            //    + '<div class="form-group">'
            //    + '<label>رقم تأشيرة الخروج</label>'
            //    + '<input required type="number" id="VisaNo" placeholder="رقم تأشيرة الخروج" class="form-control">'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>تاريخ بداية التأشيرة</label>'
            //    + '<div class="input-group date" style="margin-top:10px" id="VisaDateStartDiv">'
            //    + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
            //    + '<input id="VisaDateStart" style="background-color: white;" type="text" placeholder="تاريخ بداية التأشيرة" '
            //    + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
            //    + '</div>'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>تاريخ نهاية التأشيرة</label>'
            //    + '<div class="input-group date" style="margin-top:10px" id="VisaDateEndDiv">'
            //    + '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>'
            //    + '<input id="VisaDateEnd" style="background-color: white;" type="text" placeholder="تاريخ نهاية التأشيرة" '
            //    + 'readonly class="form-control" value="' + moment().format('YYYY/MM/DD') + '">'
            //    + '</div>'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>مدة التأشيرة</label>'
            //    + '<input type="number" id="visaDuration" placeholder="مدة التأشيرة" class="form-control">'
            //    + '</div>'
            //    + '<div class="form-group">'
            //    + '<label>ملاحظات</label>'
            //    + '<input type="text" id="VisaNote" placeholder="ملاحظات" class="form-control">'
            //    + '</div>'
            //    + '</form>';
            modalFotter = '<button type="button" class="btn btn-primary" onclick="nextStep(' + action.actionType + ', $(\'#acceptNote\').val());" id="AcceptConfirm">' + action.actionName + '</button>'
                + '<button type="button" class="btn btn-default" id="detailsClose" data-dismiss="modal">اغلاق</button>';
            size = 60;
        }
    }


    html = [];
    html.push(modalTitle);
    html.push(modalBody);
    html.push(modalFotter);
    html.push(size);
    return html;
}