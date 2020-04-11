/***Menu Tooggle***/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $(this).toggleClass("change")
  });
  
$("#smlrReport").click(function(e) {
      e.preventDefault();
      $(".smlrReport").toggleClass("active");
      $('.accessMan').toggleClass("hide");
    });

    $("#accessRgt").click(function(e) {
      e.preventDefault();
      $(".accessRgt").removeClass("hide");
      $('.smlrReport').removeClass("active");
    });
    
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

 /*********editor*********/ 
  editor.document.designMode = "On";

  function transform(option, argument) {
    editor.document.execCommand(option, false, argument);
  }

  /****accordiaon******/
  // var acc = document.getElementsByClassName("accordion");
  // var i;

  // for (i = 0; i < acc.length; i++) {
  //   acc[i].addEventListener("click", function() {
  //     this.classList.toggle("active");
  //     var panel = this.nextElementSibling;
  //     if (panel.style.maxHeight) {
  //       panel.style.maxHeight = null;
  //     } else {
  //       panel.style.maxHeight = panel.scrollHeight + "px";
  //     } 
  //   });
 // }

 
/****Ajax dynamic Data call******/
var $pagination = $('#pagination'),
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
                  record =records.data;;
                  totalRecords = records.data.length;
                  console.log(totalRecords)
                  totalPages = Math.ceil(totalRecords / recPerPage);
                  apply_pagination();
      }
});

/***Create content from ajax calll***/
function generate_table() {
var div;
    $('#emp_body').html('');
    for (var i = 0; i < displayRecords.length; i++) {
          div = $('<div class="lineContent" onclick="updateIframe('+i+')"/>');
          div.append("<div class='date'><span>" + displayRecords[i].employee_salary + "</span></div>");
          div.append("<p>" + displayRecords[i].employee_name + "</p>");
          $('#emp_body').append(div);
    }
}

/***Pagination for clipboard***/
function apply_pagination() {
 $pagination.twbsPagination({
      
          totalPages: totalPages,
          visiblePages: 6,
          onPageClick: function (event, page) {
              displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = (displayRecordsIndex) + recPerPage;
               
                displayRecords = record.slice(displayRecordsIndex, endRec);
                generate_table();
          }
    });
}

/****Get Get From ClipBoard and update on Editor***/
  function updateIframe(i) {
      var myFrame = $("#editor").contents().find('body');
      var dataGet = displayRecords[i].employee_name;
      myFrame.html(dataGet);
    }

