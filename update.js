$(document).ready(function() {
  var filePath = $('#img-upload').attr('src');
  var fileName = filePath.split("/");
  fileName = fileName[fileName.length - 1];
  var imgTmp = filePath;
  $('#imgInp').parents('.input-group').find(':text').val(fileName);
  //var page = "plugins/TrendCardGallery/cardSample.html";

  //Bootstrap datapicker Start//
  $('.datepicker').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    //clearBtn: true,
    calendarWeeks: true,
    todayHighlight: true,
    language: 'zh-TW'
  }).change(dateChange).on('changeDate', dateChange);

  function dateChange() {
    refreshCard();
    //$('#inputRd').datepicker('hide');
    $('#updateForm').bootstrapValidator('revalidateField', 'Release_date');
  }
  //Bootstrap datapicker End//


  //File upload check Start
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function(event, label) {

    var input = $(this).parents('.input-group').find(':text'),
      log = label;

    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }

  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        //$('#img-upload').attr('src', e.target.result);
        imgTmp = e.target.result;
        refreshCard();
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function() {
    readURL(this);
  });
  //File upload check End


  $('#updateForm')
    .find('[name="Tags"]')
    .addBack()
    .bootstrapValidator({
      excluded: ':disabled',
      feedbackIcons: {
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        Title: {
          validators: {
            notEmpty: {
              message: 'Ttile is required'
            },
            stringLength: {
              min: 1,
              max: 40,
              message: 'The Title must be less than 40 characters'
            }
          }
        },
        Type: {
          validators: {
            notEmpty: {
              message: 'Type is required'
            }
          }
        },
        Product_type: {
          validators: {
            notEmpty: {
              message: 'Product Type is required'
            },
            stringLength: {
              min: 1,
              max: 40,
              message: 'The Product Type must be less than 40 characters'
            }
          }
        },
        Designer: {
          validators: {
            notEmpty: {
              message: 'Designer is required'
            },
            stringLength: {
              min: 1,
              max: 40,
              message: 'The Designer must be less than 40 characters'
            }
          }
        },
        Place: {
          validators: {
            notEmpty: {
              message: 'Place is required'
            },
            stringLength: {
              min: 1,
              max: 40,
              message: 'The Place must be less than 40 characters'
            }
          }
        },
        Release_date: {
          validators: {
            notEmpty: {
              message: 'Please select release date'
            },
          }
        },
        Creator: {
          validators: {
            notEmpty: {
              message: 'Creator is required'
            },
            stringLength: {
              min: 1,
              max: 80,
              message: 'The Creator must be less than 80 characters'
            }
          }
        },
        Website: {
          validators: {
            notEmpty: {
              message: 'Website is required'
            },
            stringLength: {
              min: 1,
              max: 40,
              message: 'The Website must be less than 40 characters'
            }
          }
        },
        Content: {
          validators: {
            notEmpty: {
              message: 'Content is required'
            },
            stringLength: {
              min: 1,
              max: 650,
              message: 'The Content must be less than 650 characters'
            }
          }
        },
        // file: {
        //   validators: {
        //     notEmpty: {
        //       message: 'Please select the image'
        //     },
        //   }
        // },
        Tags: {
          validators: {
            notEmpty: {
              message: 'Please enter at least one city you like the most'
            }
          }
        },
      }
    })
    .on('success.form.bv', function(e) {
      e.preventDefault();
      var url = 'update.php';
      var method = 'POST';
      //var serializeData = $('#updateForm').serialize()+"&file="+$('#imgInp').val();
      var formData = new FormData($('#updateForm')[0]);
      formData.append('file', $('#imgInp')[0].files[0]);

      $.ajax({
        type: method,
        url: url,
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json",
        //data: $('#updateForm').serialize(), // serializes the form's elements.
        data: formData,
        success: function(data) {
          var d = new Date();
          var imgPath = data.img + "?" + d.getTime();
          $("#" + data.id + " > .hovereffect > img").attr("src", imgPath);
          instance.setCardInfo(data); //update CardInfo n let it show the newest info
          instance.closeUpdatePanel({
            data: {
              upTarget: '',
              fetch: data,
              self: instance
            }
          });
        }
      });
      return false;
    });

  $('#updateForm')
    .find('[name="Tags"]')
    // Revalidate the color when it is changed
    .change(function(e) {
      $('#updateForm').bootstrapValidator('revalidateField', 'Tags');
    });

  // $( "#updateForm" ).unbind("submit");
  // $( "#updateForm" ).bind( "submit", function( event ) {
  //   event.preventDefault();

  //   //console.log( $( this ).serialize() );
  //   var form = $(this);
  //   var url = form.attr('action');
  //   var method = form.attr('method');

  //   $.ajax({
  //      type: method,
  //      url: url,
  //      data: $('#updateForm').serialize(), // serializes the form's elements.
  //      success: function(data)
  //      {
  //       alert(data);
  //        instance.closeUpdatePanel({
  //         data:{
  //           upTarget: '', 
  //           fetch: instance.options.cardInfo, 
  //           self: instance
  //         }
  //        });
  //        //alert(data); // show response from the php script.
  //      }
  //    });

  //   //alert(instance.options.cardInfo.id);
  //   return false;
  // });


  $('.form-control').on('input', refreshCard);

  function refreshCard() {
    instance.showCard({
      'title': $("#inputTitle").val(),
      'type': $("#inputType").val(),
      'productType': $("#inputPt").val(),
      'designer': $("#inputDesign").val(),
      'place': $("#inputPlace").val(),
      'releaseDate': $("#inputRd").val(),
      'creator': $("#inputCreator").val(),
      'website': $("#inputWebsite").val(),
      'content': $("#inputContent").val(),
      'img': imgTmp
    }, false);
  }
});
