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

    /************** Jquery for rightside start *********************/

    $("#smlrReport").click(function(e) {
      e.preventDefault();
      $('.list-group').children().removeClass('active').addClass('hide');
      $(".smlrReport").removeClass('hide').addClass("active");
    });

    $("#clipbrd").click(function(e) {
      e.preventDefault();
      $('.list-group').children().removeClass('active').addClass('hide');
      $(".clipbrd").removeClass('hide').addClass('active');
    });

    $("#accessRgt").click(function(e) {
      e.preventDefault();
      $('.list-group').children().removeClass('active').addClass('hide');
      $(".accessRgt").removeClass('hide').addClass('active');
    });

    $("#attcdEnclosur").click(function(e) {
      e.preventDefault();
      $('.list-group').children().removeClass('active').addClass('hide');
      $(".attcdEnclosur").removeClass('hide').addClass('active');
    });
  /************** Jquery for rightside end *********************/   
    
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
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
  /******Tab COntent for report and docviwer end******/

  /******Tab COntent for report and docviwer start******/

    /******Tab COntent******/
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
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen2").click();

/******Tab COntent for report and docviwer end******/

  /*********editor*********/ 
 $(document).ready(function() {
  $('.content').richText();
 });

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
  
  $('input[type="file"]').on('change', function() {
    var val = $(this).val();
    console.log(val)
    $(this).siblings('.name').text(val);
  });

/**** Attaching image end *********/

 /*******Data table in clipboard start*******/ 
  $(document).ready(function() {
    
    $('#example').DataTable( {
        "processing": false,
        "serverSide": false,
        "order": [[ 3, "desc" ]],
        "pagingType": "full_numbers",
        "pageLength": 10,

        
        "createdRow" : function(row) {
          $(row).attr('onClick', "updateIframes()");
         },

        /* SCROLLING */
          "scrollY":"480px",
          "scrollCollapse": true,
        
        /* display number of data */
         "columnDefs": [{
          "targets": [ 0 ],
           "orderData": [ 4, 1 ]
          },
          
          {
            "targets": [ 3 ],
            "visible": false,
            "searchable": false
        },
          {
              "targets": [ 4 ],
              "visible": false
          }
      ],
        "ajax": {
            "url": "http://dummy.restapiexample.com/api/v1/employees",
          },
          "columns": [
            { "data": "id" },
            { "data": "employee_name" },
            { "data": "employee_salary" },
            { "data": "employee_age" },
            { "data": "profile_image" },
        ]
    } );
    
} );
/******* Data table in clipboard end *******/ 

/******* Data table in clipboard for selecting rows start *******/ 
$(document).ready(function() {
  var table = $('#example').DataTable();

  $('#example tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  } );

  // $('tr').click( function () {
  //    table.row('.selected').remove().draw( false );
  // } );

  $('#example tbody, #reportAttch tbody')
       .find('td')
       .append('<input type="button" value="Delete" class="del"/>')
       .parent()//traversing to 'tr' Element
       .append('<td><input type="button" value="Delete row" class="delrow" /></td>'); 

} );

/******* Data table in clipboard for selecting rows end *******/ 


/**************View Similar Report**************/
/****Ajax dynamic Data call******/
var $pagination1 = $('#pagination1'),
totalRecords = 0,
records = [],
displayRecords = [],
recPerPage = 5,
page = 1,
totalPages = 0;
$.ajax({
      url: "http://dummy.restapiexample.com/api/v1/employees",
      async: true,
      dataType: 'json',
      success: function (data) {
            records = data;
                  console.log(records);
                  record =records.data;
                  totalRecords = records.data.length;
                  console.log(totalRecords)
                  totalPages = Math.ceil(totalRecords / recPerPage);
                  apply_pagination1();
      }
});

/***Create content from ajax calll***/
function generate_table1() {
var div;
    $('#emp_body1').html('');
    for (var i = 0; i < displayRecords.length; i++) {
          div = $('<div class="lineContent" onclick="updateIframe('+i+')"/>');
          div.append("<div class='date'><span>" + displayRecords[i].employee_salary + "</span></div>");
          div.append("<p>" + displayRecords[i].employee_name + "</p>");
          $('#emp_body1').append(div);
    }
}

/***Pagination for clipboard***/
function apply_pagination1() {
 $pagination1.twbsPagination({
      
          totalPages: totalPages,
          visiblePages: 6,
          onPageClick: function (event, page) {
              displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = (displayRecordsIndex) + recPerPage;
               
                displayRecords = record.slice(displayRecordsIndex, endRec);
                generate_table1();
          }
    });
}
/*************End of View Similar Report***************/

/**************Attached Enclosures**************/
/*******Data table in clipboard start*******/ 
$(document).ready(function() {
    
  $('#attcdEnclosurData').DataTable( {
      "processing": false,
      "serverSide": false,
      "order": [[ 3, "desc" ]],
      "pagingType": "full_numbers",
      "pageLength": 5,

      
      "createdRow" : function(row) {
        $(row).attr('onClick', "updateIframes()");
       },

      /* SCROLLING */
        "scrollY":"480px",
        "scrollCollapse": true,
      
      /* display number of data */
       "columnDefs": [{
        "targets": [ 0 ],
         "orderData": [ 4, 1 ]
        },
        
        {
          "targets": [ 3 ],
          "visible": false,
          "searchable": false
      },
        {
            "targets": [ 4 ],
            "visible": false
        }
    ],
      "ajax": {
          "url": "http://dummy.restapiexample.com/api/v1/employees",
        },
        "columns": [
          { "data": "id" },
          { "data": "employee_name" },
          { "data": "employee_salary" },
          { "data": "employee_age" },
          { "data": "profile_image" },
      ]
  } );
  
} );
/******* Data table in clipboard end *******/ 
/**************End Attached Enclosures**************/

/****Get Get From ClipBoard and update on Editor***/
  function updateIframes() {
    //   var myFrame = $(".richText-editor").children("div");
    //   var dataGet = displayRecords[i].employee_name;
    //   myFrame.html(dataGet);
    $( "td" ).click(function() {
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

