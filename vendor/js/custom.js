/*****************LeftMenu Icon and Tabs aaction Start******************/
$(".menubar").click(function(){
  $(".sidenav span").toggleClass("show");
  $("#mySidenav").toggleClass("resizeWidth");
  $("#main").toggleClass("resizeLeft");
  $(".panel-left").toggleClass("extendWidth");
  $(".menubar").toggleClass("change");
});
   /*************leftSideBar Start******************/
$("#mySidenav a").click(function(){
  var className = $(this).attr('class').split(' ').map(function(clssName){
    return clssName;
  });
  if(className[0] == "createViewtab"){
    $(".wrapSpan").replaceWith("<span class='wrapSpan'>"+ $(this).attr("title")+ "</span>");
    $(".createView").siblings().removeClass('active').addClass('hide');
    $(".clipbrd").removeClass("hide").addClass("active");
    $(".viewDetailReport").removeClass("active").addClass("hide");
    $(".createView").removeClass('hide').addClass('active');
    $(".panel-right, .splitter").show();
    $(".panel-left").removeClass("extendWidthMain");
  }else if(className[0] == 'editViewtab'){
    $(".wrapSpan").replaceWith("<span class='wrapSpan'>"+ $(this).attr("title")+ "</span>");
    // $(".editView").siblings().removeClass('active').addClass('hide');
    // $(".editView").removeClass('hide').addClass('active');
    // $(".panel-right, .splitter").show();
    // $(".panel-left").removeClass("extendWidthMain");

    $(".createView").siblings().removeClass('active').addClass('hide');
    $(".clipbrd").removeClass("hide").addClass("active");
    $(".viewDetailReport").removeClass("active").addClass("hide");
    $(".createView").removeClass('hide').addClass('active');
    $(".panel-right, .splitter").show();
    $(".panel-left").removeClass("extendWidthMain");
  }else if(className[0] == 'viewReporttab'){
    $(".wrapSpan").replaceWith("<span class='wrapSpan'>"+ $(this).attr("title")+ "</span>");
    $(".viewReport").siblings().removeClass('active').addClass('hide');
    $(".clipbrd,.accessRgt,.accessRgt,.smlrReport,.attcdEnclosur").removeClass("active").addClass("hide");
    $(".viewReport,.viewDetailReport").removeClass('hide').addClass('active');
    $(".panel-right, .splitter").show();
    $(".panel-left").removeClass("extendWidthMain");
  }else if(className[0] == 'viewDrafttab'){
    $(".wrapSpan").replaceWith("<span class='wrapSpan'>"+ $(this).attr("title")+ "</span>");
    $(".viewDraft").siblings().removeClass('active').addClass('hide');
    $(".viewDraft").removeClass('hide').addClass('active');
    $(".panel-right, .splitter").hide();
    $(".panel-left").addClass("extendWidthMain");
  }
  $(this).siblings().removeClass("Tabactive");
  $(this).addClass("Tabactive");
});
/****************leftSideBar End******************/

/**********closeModal Start***************/
$(".crossModal").click(function(){
  $(".modalPopup").hide();
  $("#loader").hide();
});
/**********closeModal End***************/

/**************split the screen start *********************/
$(".panel-left").resizable({
  handleSelector: ".splitter",
  resizeHeight: false
});

$(".panel-top").resizable({
  handleSelector: ".splitter-horizontal",
  resizeWidth: false
});

/**************split the screen end *********************/
/***********loader start****************/
$(document).ajaxStart(function(){
  $('#loader').css("display", "block");
});
$(document).ajaxComplete(function(){
$('#loader').css("display", "none");
});
/***********loader end****************/

/************** Jquery for rightside start *********************/
function actionRight(){
  $('.list-group').children().removeClass('active').addClass('hide');
}
$("#smlrReport").click(function (e) {
  e.preventDefault();
  actionRight();
  $(".smlrReport").removeClass('hide').addClass("active");
});

$("#clipbrd").click(function (e) {
  e.preventDefault();
  actionRight();
  $(".clipbrd").removeClass('hide').addClass('active');
});

$(".openAccessrgt").click(function (e) {
  e.preventDefault();
  actionRight();
  $(".accessRgt").removeClass('hide').addClass('active');
});
$(".openReceiptns").click(function (e) {
  e.preventDefault();
  actionRight();
  $(".distRecipients").removeClass('hide').addClass('active');
});

$("#attcdEnclosur").click(function (e) {
  e.preventDefault();
  actionRight();
  $(".attcdEnclosur").removeClass('hide').addClass('active');
});

$().click(function(e){
  e.preventDefault();
  actionRight();
  $(".viewDetailReport").removeClass('hide').addClass('active')
})
/************** Jquery for rightside end ********************/
/*****************Receiver list data start**************/
var RecvrLst = [];
  
$(document).ready(function() {
  $.ajax({
      //type: "POST",
      contentType: "application/json",
      data: "{}",
      url: "http://dummy.restapiexample.com/api/v1/employees",
      dataType: "json",
      async: false,
      success: function(data) {
          var select = $(".senderList");
          select.children().remove();
          if (data.data) {
              $(data.data).each(function(key,value) {
                $(".senderList").append($("<option></option>").val(value.id).html(value.employee_name));                      
              });                    
          }
       $('.senderList').multiselect({
        includeSelectAllOption: true,
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Search for something...',
        });
       $(".senderList").multiselect('rebuild');
      },
  });

  $(".senderList").on("change",function(element, checked){
    otherReceiverList();
  });

  function otherReceiverList(){
    var selected = $(".senderList option:selected");
    selected.children().remove();
      selected.each(function (key,value) {
        $(".senderList2nd").append($("<option></option>").val(value.value).html(value.text));
    });
    $(".ReceiverList2").show();
    $('.senderList2nd').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      enableCaseInsensitiveFiltering: true,
      filterPlaceholder: 'Search for something...',
      });
      $(".senderList2nd").multiselect('rebuild');

  }

  /*************access right action start**********/
  $('#accessRight').click(function () {
    
    var selected = $(".senderList option:selected");
    var receiverList = "";
    selected.each(function () {
      receiverList += '<li class="dataClick"> <input type="checkbox" id="myCheck"> <label>' + $(this).text() + " " + $(this).val() + '</label></li>' ;
        RecvrLst.push([$(this).text()]);
      });
     var senderData = selected.length + " " + " Selected";
    $('.datasender').val(senderData);
    $(".DataReceiver").show();
    $(".DataReceiver ul").html(receiverList);
   });
  
/*************access right action end**********/

/*************Final Recieptions start**********/
$('#finalRecptns').click(function () {
  var selected = $(".senderList option:selected");
  var message = "";
  selected.each(function () {
      message += '<li class="dataClick"> <input type="checkbox" id="myCheck"> <label>' + $(this).text() + " " + $(this).val() + '</label></li>' ;
     });
   var senderData = selected.length + " " + " Selected";
  $('.dataDistributer').val(senderData);
  $(".DataDistributer").show();
  $(".DataDistributer ul").html(message);
 });

/*************Final Recieptions end**********/
});
/*****************Receiver list data end**************/

/******Tab COntent for report and docviwer start******/
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();
/******Tab COntent for report and docviwer end******/

/******Tab COntent for report and docviwer start******/
function openreportAttch(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tbcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tblinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen2").click();

/******Tab COntent for report and docviwer end******/

/*********fetching current Date calendar start********/
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;
document.getElementsByClassName('theDate')[0].value = today;
document.getElementsByClassName('theDate')[1].value = today;
document.getElementsByClassName('theDate')[2].value = today;
document.getElementsByClassName('theDate')[3].value = today;
document.getElementsByClassName('theDate')[4].value = today;
/*********fetching current Date calendar end********/

/**** Attaching image start *********/
$(".element i.fa-paperclip").click(function () {
  $("input[type='file']").trigger('click');
});
$('input[type="file"]').on('change', function () {
  var val = $(this).val();
  console.log(val)
  $(this).siblings('.name').text(val);
});
/**** Attaching image end *********/

/*******Data table in clipboard start*******/
  $('#clipboard').DataTable({
    "processing": false,
    "serverSide": false,
    "order": [
      [3, "desc"]
    ],
    "pagingType": "full_numbers",
    "pageLength": 10,


    "createdRow": function (row) {
      $(row).attr('onClick', "updateIframes()");
    },

    /* SCROLLING */
    "scrollY": "480px",
    "scrollCollapse": true,

    /* display number of data */
    "columnDefs": [{
        "targets": [0],
        "orderData": [4, 1]
      },

      {
        "targets": [3],
        "visible": false,
        "searchable": false
      },
      {
        "targets": [4],
        "visible": false
      }
    ],
    "ajax": {
      "url": "http://dummy.restapiexample.com/api/v1/employees",
    },
    "columns": [{
        "data": "id"
      },
      {
        "data": "employee_name"
      },
      {
        "data": "employee_salary"
      },
      {
        "data": "employee_age"
      },
      {
        "data": "profile_image"
      },
    ]
  });
/******* Data table in clipboard end *******/

/******* Data table in clipboard for selecting rows end *******/


/**************View Similar Report**************/
/*function to populate similar docs table */
var reportData = [{
  "date": "12/05/2017",
  "page": "marker",
  "file_name": "abc.txt",
  "file_content": "This is test File",
  "user_flag": "important"
},
{
  "date": "12/05/2017",
  "page": "marker",
  "file_name": "abc.txt",
  "file_content": "This is test File",
  "user_flag": "important"
},
{
  "date": "12/05/2017",
  "page": "marker",
  "file_name": "abc.txt",
  "file_content": "This is test File",
  "user_flag": "important"
},
];

$('#docTable').dataTable({
"data": reportData,
"columns": [{
    "data": null,
    "pagingType": "full_numbers",
    "pageLength": 2,
    "render": function (reportData, type, row, meta) {
      var rowData = `
            <div style="display:flex;">
            <span class="fa fa-calendar" style="margin-top: 3px;
margin-right: 3px;"></span>
              <label>Date:</label>
              <label>` + row.date + `</label>
            </div>	
            <br/>
            
            <div style="display:flex;">
            <span class="fa fa-signal" style="margin-top: 3px;
    margin-right: -5px;"></span>
              <label>Page:</label>
              <label>` + row.page + `</label>
            </div>
            `
      return rowData;
    }
  },
  {
    "data": null,

    "render": function (data, type, row, meta) {
      var rowData = `
            <div>
            
            <a href=` + row.file_name + `>` + row.file_name + `</a>
            </div>	
            <br/>
            
            <div>
            <p style="padding: 0;">` + row.file_content + `</p>
            
            </div>
            `
      return rowData;
    }
   },
  {
    "reportData": null,
    "render": function (reportData, type, row, meta) {

      var rowData =
        `
              <button type="button" class="btn btn-success btn-xs btnMark"><span class="fa fa-pencil-square-o btnSpan"></span></button>
              <br/>
              <button type="button" class="btn btn-warning btn-xs btnMark"><span class="fa fa-pencil-square-o btnSpan"></span></button>
              <br/>
              <button type="button" class="btn btn-info btn-xs btnMark"><span class="fa fa-pencil-square-o btnSpan"></span></button>
              <br/>
              <button type="button" class="btn btn-primary btn-xs btnMark"><span class="fa fa-pencil-square-o btnSpan"></span></button>
              <br/>
              <button type="button" class="btn btn-success btn-xs btnMark"><span class="fa fa-pencil-square-o btnSpan"></span></button>
              `
      return rowData;
    }
  },
]
});
/*************End of View Similar Report***************/

/*******Data table in attachedEncllouser start*******/

$('#attcdEnclosurData').DataTable({
"processing": false,
"serverSide": false,
"order": [
  [3, "desc"]
],
"pagingType": "full_numbers",
"pageLength": 5,


"createdRow": function (row) {
  $(row).attr('onClick', "updateIframes()");
},

/* SCROLLING */
"scrollY": "480px",
"scrollCollapse": true,

/* display number of data */
"columnDefs": [{
    "targets": [0],
    "orderData": [4, 1]
  },

  {
    "targets": [3],
    "visible": false,
    "searchable": false
  },
  {
    "targets": [4],
    "visible": false
  }
],
"ajax": {
  "url": "http://dummy.restapiexample.com/api/v1/employees",
},
"columns": [{
    "data": "id"
  },
  {
    "data": "employee_name"
  },
  {
    "data": "employee_salary"
  },
  {
    "data": "employee_age"
  },
  {
    "data": "profile_image"
  },
]
});
/**************End Attached Enclosures**************/

/*********Left pannel Editor*********/
$(document).ready(function () {
  $('.content').richText();
});

   
/****Get Get From ClipBoard and update on Editor***/
function updateIframes() {
  $("td").click(function () {
    var myFrame = $(".richText-editor").children("div");
    var dataget = $(this).text();
    myFrame.html(dataget);
  });
}

function updateIframe(i) {
  var myFrame = $(".richText-editor").children("div");
  var dataGet = displayRecords[i].employee_name;
  myFrame.html(dataGet);

}

/**************Get the value of fields start******************/

var items = [];
var DataJSON = {};
function saveDraft(){
  var orgName = document.getElementById("orgName").value;
  var fileNum = document.getElementById("fileNum").value;
  var entitype = $("#entitype").find("option:selected").text();
  var dataRetriev = document.getElementById("dataRetriev").value;
  var subject = document.getElementById("subject").value;
  var selectLayout = $("#selectLayout").find("option:selected").text();
  var editor = $("#editor").children().val();

  var fields = $(".createView input").val();
  if(fields == ""){
    $("#loader").show();
    $(".loader").hide();
    $(".modalPopup").show();
    $(".modalContent").text("First Please fill the Fields");
    return false;
  }
  
  DataJSON["orgName"] = orgName;
  DataJSON["fileNum"] = fileNum;
  DataJSON["entitype"] = entitype;
  DataJSON["dataRetriev"] = dataRetriev;
  DataJSON["subject"] = subject;
  DataJSON["selectLayout"] = selectLayout;
  DataJSON["editor"] = editor;
  DataJSON["RecvrLst"] = RecvrLst;

  items.push(DataJSON);
  localStorage.setItem('added-draft', JSON.stringify(items, undefined, 2));
}

function dataLoad(){
  
  $(".draftorg").hide();
  var retrievedObject = localStorage.getItem('added-draft');
  var parsedObject = JSON.parse(retrievedObject);
  if(parsedObject != null){
    $(".draftorg").show();
    $(".noData").hide();
  }
  for(i=0; i<=parsedObject.length;i++){
  $(".subDraft").text(parsedObject[i].subject);
  $(".dateDraft").text(parsedObject[i].dataRetriev);
  }
}

$(".viewDrafttab").click(function(){
  
  dataLoad();  
});

$(".draftorg").click(function(){
  $(".draftorgdata").toggleClass("active");
});
/************Get the value of fields end***************/

$(".draftorg").click(function(){
  var retrievedReport = localStorage.getItem('added-draft');
   var parsedObject = JSON.parse(retrievedReport);
  if(parsedObject != null){
    $(".reportPdf").show();
    $(".noData").hide();
  }
        /*********EditReport Start**************/
        $(".editReport").click(function(){
          $(".wrapSpan").replaceWith("<span class='wrapSpan'>"+ $(this).text()+ "</span>");
          $(".viewDetailReport,.viewReport").removeClass("active").addClass("hide");
          $(".createView,.clipbrd").removeClass("hide").addClass("active");
          $(".viewReporttab").removeClass("Tabactive");
          $(".editViewtab").addClass("Tabactive");
        });
  for(i=0; i<=parsedObject.length;i++){
    $(".subDraftpdf").text(parsedObject[i].subject);
    $(".orgDraftpdf").text(parsedObject[i].orgName);
    $(".dateDraftpdf").text(parsedObject[i].dataRetriev);
    }
});

/*******generate PDF start************/
function convertPDF() {
	var doc = new jsPDF();
	var elementHTML = $('#reportPdf').html();
	var specialElementHandlers = {
		'#elementH': function (element, renderer) {
			return true;
		}
	};
	doc.fromHTML(elementHTML, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
	
	// Save the PDF
	doc.save('viewReport.pdf');
}
/*******generate PDF end************/
