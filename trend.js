$(document).ready(function() {

  var imgTmp;
  var instance;
  //var page = "plugins/TrendCardGallery/cardSample.html";
  var date = new Date();
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  //Scroll Event Start//
  // var sticky = 75.5;

  // $(window).scroll(scrollRight);

  // function scrollRight() {
  //   if ($(window).scrollTop() > sticky) {
  //     $(".floatRight").addClass("fixed-head");
  //   } else {
  //     $(".floatRight").removeClass("fixed-head");
  //   }
  //   //alert($(window).scrollTop());
  // }

  // scrollRight();
  //Scroll Event End//

  //Bootstrap datapicker Start//
  $('.datepicker').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    //clearBtn: true,
    calendarWeeks: true,
    todayHighlight: true,
    language: 'zh-TW'
  });

  $('.datepicker').datepicker('setDate', today)
  $('#inputNumber').val(1);

  var valided = $('#myform')
    .addBack()
    .bootstrapValidator({
      excluded: ':disabled',
      feedbackIcons: {
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        Name: {
          validators: {
            notEmpty: {
              message: 'Product Name is required'
            },
            stringLength: {
              min: 1,
              max: 50,
              message: 'The Title must be less than 50 characters'
            }
          }
        },
        Type: {
          validators: {
            notEmpty: {
              message: '請選類別'
            }
          }
        },
        Number: {
          validators: {
            notEmpty: {
              message: '請輸入數量'
            }
          }
        },
        Owner: {
          validators: {
            // notEmpty: {
            //   message: '請填寫保管人'
            // },
            stringLength: {
              min: 1,
              max: 20,
              message: 'The Product Type must be less than 20 characters'
            }
          }
        },
        Use_name: {
          validators: {
            // notEmpty: {
            //   message: '請填寫使用人'
            // },
            stringLength: {
              min: 1,
              max: 20,
              message: 'The Designer must be less than 20 characters'
            }
          }
        },
        Use_Project: {
          validators: {
            // notEmpty: {
            //   message: '請填寫使用專案'
            // },
            stringLength: {
              min: 1,
              max: 20,
              message: 'The Place must be less than 20 characters'
            }
          }
        },
        Build_date: {
          validators: {
            notEmpty: {
              message: '請選擇日期'
            },
          }
        },
        Specs: {
          validators: {
            notEmpty: {
              message: 'Content is required'
            },
            stringLength: {
              min: 1,
              max: 100,
              message: 'The Content must be less than 100 characters'
            }
          }
        },
      }
    })

  // $('#myform')
  //   .find('[name="Tags"]')
  //   // Revalidate the color when it is changed
  //   .change(function(e) {
  //     // console.warn($('[name="Tags"]').val());
  //     // console.info($('#inputTags').val());
  //     // console.info($("#inputTags").tagsinput('items'));
  //     // var a = $("#inputTags").tagsinput('items');
  //     // console.log(typeof (a));
  //     // console.log(a.length);
  //     $('#myform').bootstrapValidator('revalidateField', 'Tags');
  //   });

  //build TrendCardGallery in #flex-container
  instance = $('#flex-container').TrendCardGallery({
    "startIndex" : 0,
    "limitData" : 10
  });

  $( ".expand-btn" ).click(function() {
    if($('#input-field').hasClass('hide')) {
      instance.inputMode();
    }
    else {
      instance.previewMode();
    }
  });

  $( ".split-btn > .add-btn" ).click(function() {
    instance.inputMode();
  });

  $( "#cancelBtn" ).click(function() {
    instance.previewMode();
  });

  $( "#changeBtn" ).click(function() {
    var bootstrapValidator = $('#myform').data('bootstrapValidator');
    //手動觸發驗證
    bootstrapValidator.validate();
    if(bootstrapValidator.isValid()){
      //alert('update');
      instance.updateData({'form': $('#myform')});
    }
  });

  $( "#deleteBtn" ).click(function() {
    deleteConfirm();
  });

  function deleteConfirm() {
    var txt;
    var r = confirm("確定要刪除資料?");
    if (r == true) {
      instance.deleteData({'id': $('#inputSN').text()});
    } else {
    }
  }

  $(document).keydown(
    function(event){
      if (event.keyCode === 27) {
        instance.previewMode();
      }   
  });

});
