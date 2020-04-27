/*****************LeftMenu Icon******************/
$(".menubar").click(function(){
  $("#mySidenav").toggleClass("resizeWidth");
  $("#main").toggleClass("resizeLeft");
  $(".panel-left").toggleClass("extendWidth");
  $(".menubar").toggleClass("change");
});

$("#mySidenav a").click(function(){
  $(this).siblings().removeClass("Tabactive");
  $(this).addClass("Tabactive");
});
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

$(".customTab li").click(function(){
  $(this).siblings().children().removeClass("active");
  $(this).children().siblings().addClass("active");
});

/***********loader start****************/
$(document).ajaxStart(function(){
  $('#loader').css("display", "block");
});
$(document).ajaxComplete(function(){
$('#loader').css("display", "none");
});
/***********loader end****************/

/************** Jquery for rightside start *********************/
$("#smlrReport").click(function (e) {
  e.preventDefault();
  $('.list-group').children().removeClass('active').addClass('hide');
  $(".smlrReport").removeClass('hide').addClass("active");
});

$("#clipbrd").click(function (e) {
  e.preventDefault();
  $('.list-group').children().removeClass('active').addClass('hide');
  $(".clipbrd").removeClass('hide').addClass('active');
});

$("#accessRgt").click(function (e) {
  e.preventDefault();
  $('.list-group').children().removeClass('active').addClass('hide');
  $(".accessRgt").removeClass('hide').addClass('active');
});

$("#attcdEnclosur").click(function (e) {
  e.preventDefault();
  $('.list-group').children().removeClass('active').addClass('hide');
  $(".attcdEnclosur").removeClass('hide').addClass('active');
});
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
        onChange: function(element, checked) {
          var selected = $(".senderList option:selected");
          $(selected).each(function(index, brands){
            RecvrLst.push([$(this).text()]);
          });
        }
        });
       $(".senderList").multiselect('refresh');
      },
  });

  /*************access right action start**********/
  $('#accessRgt').click(function () {
    var selected = $(".senderList option:selected");
    var message = "";
    selected.each(function () {
        message += '<li class="dataClick"> <input type="checkbox" id="myCheck"> <label>' + $(this).text() + " " + $(this).val() + '</label></li>' ;
       });
    $('.accessRgt ul.dataForAr').html(message);
    if($(".dataForAr").children().length == 0){
      $(".noRcvr").show();
    }else{
      $(".noRcvr").hide();
    }
  });
  $(".cV").on('click', function(){
   var cvChecked = $(".dataClick input:checked").parent();
    var cvData = "";
    cvChecked.each(function(){
      cvData += '<li>' +$(this).text() + '</li>';
    });
    $(".cVdata").html(cvData);
 });
 $(".cE").on('click', function(){
  var cvChecked = $(".dataClick input:checked").parent();
  var cvData = "";
  cvChecked.each(function(){
    cvData += '<li>' +$(this).text() + '</li>';
  });
  $(".cEdata").html(cvData);
});
$(".cC").on('click', function(){
  var cvChecked = $(".dataClick input:checked").parent();
  var cvData = "";
  cvChecked.each(function(){
    cvData += '<li>' +$(this).text() + '</li>';
  });
  $(".cCdata").html(cvData);  
});
$("#clear").on('click', function(){
  $(this).siblings().children().children("#myCheck").prop("checked", false);
});
/*************access right action end**********/
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
$("i").click(function () {
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

/******* Data table in clipboard for selecting rows start *******/
//   var table = $('#clipboard').DataTable();
//   $('#clipboard tbody').on('click', 'tr', function () {
//     if ($(this).hasClass('selected')) {
//       $(this).removeClass('selected');
//     } else {
//       table.$('tr.selected').removeClass('selected');
//       $(this).addClass('selected');
//     }
// });
   
/****Get Get From ClipBoard and update on Editor***/
function updateIframes() {
  //   var myFrame = $(".richText-editor").children("div");
  //   var dataGet = displayRecords[i].employee_name;
  //   myFrame.html(dataGet);
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
function saveDraft(){
  var orgName = document.getElementById("orgName").value;
  var fileNum = document.getElementById("fileNum").value;
  var entitype = $("#entitype").find("option:selected").text();
  var dataRetriev = document.getElementById("dataRetriev").value;
  var subject = document.getElementById("subject").value;
  var selectLayout = $("#selectLayout").find("option:selected").text();
  var editor = $("#editor").children().val();
  console.log(editor);
  if(orgName == ''){
    alert("please enter the organization name");
    return false;
  }else if(fileNum == ''){
    alert("please enter the fileNum name");
  }else if(entitype == ''){
    alert("please enter the entitype name");
  }else if(dataRetriev == ''){
    alert("please enter the dataRetriev name");
  }else if(subject == ''){
    alert("please enter the subject name");
  }else if(selectLayout == ''){
    alert("please enter the selectLayout name");
  }else if(editor === ''){
    alert("please enter the editor name");
  }else if(RecvrLst == ''){
    alert("please enter the RecvrLst name");
    console.log(RecvrLst);
  }
  $.ajax({
    type: "POST",
    url: 'http://dummy.restapiexample.com/api/v1/employees',
    data: "orgName="+orgName+"&fileNum="+fileNum+"&entitype="+entitype+"&dataRetriev="+dataRetriev+
    "&subject="+subject+"&selectLayout="+selectLayout+"&RecvrLst="+RecvrLst,
    success: function() {
      console.log(data);
         //success message mybe...
    }
});
}
/************Get the value of fields end***************/