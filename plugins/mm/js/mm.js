(function($) {
  var path = $("script").last().attr("src").split('js',1);
  var defaultOptions = {
    startIndex: 0,
    limitData: 30,
    action: 'inactive',
    scrollTop: 0,
  };

  function TrendCardGallery(container, options) {
    //this = TrendCardGallery.prototype
    this.container = $(container);
    this.build(container, options);
    return this;
  };

  TrendCardGallery.prototype = {
    constructor: TrendCardGallery,

    load_data: function(options) {	
      var self = this; //TrendCardGallery
      var limit = options.limitData;
      var start = options.startIndex;
      var where = options.where;
      var order = options.order;
      var desc = options.desc;
      var result = '';
      //alert(order);
      	$.ajax({
	        url: path+"php/fetch.php",
	        method: "POST",
	        async: false,
	        data: { limit: limit, 
                  start: start,
                  where: where,
                  order: order,
                  desc: desc},
	        cache: false,
	        success: function(data) {
            var tbody = self.container.find('tbody');
            tbody.empty();
	          tbody.append(data);
	          result = data;
            //alert(result);
	        },
	      });
      return result;
    },

    previewMode: function(options) {
      var self = this;
      var where = '';
      var order = ['TYPE','NAME','SPECS'];
      var desc = 'false';
      var limit = -1;
      var start = 0;
      var top = self.options.scrollTop;
      var topOffset = 785

      self.load_data({'limitData':limit,
                      'startIndex':start,
                      'where':where,
                      'order':order,
                      'desc':desc });

      $('#input-field').addClass('hide').removeClass('show');
      $('#preview-field').addClass('col-sm-12').removeClass('col-sm-6');
      $('#flex-container').removeClass('preview-edit');

      $('.op-col').removeClass('hidden');
      $("#preview-table").css('margin-top', 0 + "px");
      $('#preview-table > tbody').find('tr').addClass('selectable');
      $('#preview-table').on('click', function(e){
          var row = $(e.target).closest('tr.selectable');
          var id = row.index()+1;
          if(id > 0)
            self.editMode({'index':id, 'row':row});
      });

      $("#edit-title").text('查詢內容');
      $("#preview-title").text('查詢內容');
      $(".split-btn").removeClass('hidden');
      //alert(self.options.scrollTop);
      $(window).scrollTop(top);
    },

    inputMode: function() {
      var self = this;
      var limit = 10;
      var start = 0;
      var order = ['SERIAL_NUMBER'];
      var desc = 'true';
      $('#input-field').removeClass('hide').addClass('show');
      $('#preview-field').removeClass('col-sm-12').addClass('col-sm-6');
      self.load_data({'limitData':limit,
                      'startIndex':start,
                      'order':order,
                      'desc':desc});

      $('.op-col').addClass('hidden');
      $("#edit-title").text('新增品項');
      $("#preview-title").text('最近新增');
      $('#preview-table').unbind('click');

      $(".editBtnGroup").addClass('hidden');
      $("#newBtn").removeClass('hidden');
      $(".split-btn").addClass('hidden');
    },

    editMode: function(options) {
      var self = this;
      var row = options.row;
      var index = options.index;
      var scrollTop = $(window).scrollTop();
      self.options.scrollTop = scrollTop;
      //alert("scrollTop"+scrollTop);
      var fetch = {
            'id' : row.find('.val-sn').text(),
            'name' : row.find('.val-nm').text(),
            'type' : row.find('.val-tp').text(),
            'owner' : row.find('.val-ow').text(),
            'uName' : row.find('.val-un').text(),
            'uProject' : row.find('.val-up').text(),
            'place' : row.find('.val-pl').text(),
            'date' : row.find('.val-bd').text(),
            'specs' : row.find('.val-sp').text()
          }
      self.setFormFill(fetch);
      //alert(name+type+owner+uName+uProject+place+date+specs);
      //var top = index > 6 ? -50 + (-45*index) : 0
      $('#input-field').removeClass('hide').addClass('show');
      $('#preview-field').removeClass('col-sm-12').addClass('col-sm-6')
      $('#flex-container').addClass('preview-edit');
      $('.op-col').addClass('hidden');

      var selRow = options.row
      var rowHeight = selRow.height();
      var top = index > 6 ? -options.row.offset().top+150 : 0

      $("#preview-table").css('margin-top', top + "px");
      $('#preview-table > tbody').find('tr').removeClass('selectable');
      $('#preview-table').unbind('click');
      selRow.addClass('rowHighlight');

      $("#edit-title").text('變更內容');
      $("#preview-title").text('變更項目');
      
      $(".editBtnGroup").removeClass('hidden');
      $("#newBtn").addClass('hidden');
      $(".split-btn").addClass('hidden');
    },

    updateData: function(options) {
      var self = this;
      var form = options.form;
      var fetch = {
            'id' : form.find('#inputSN').text(),
            'name' : form.find('#inputName').val(),
            'type' : form.find('#inputType').val(),
            'owner' : form.find('#inputOwner').val(),
            'uName' : form.find('#inputUN').val(),
            'uProject' : form.find('#inputUP').val(),
            'place' : form.find('#inputPlace').val(),
            'date' : form.find('#inputBd').val(),
            'specs' : form.find('#inputSpecs').val()
          }

      $.ajax({
        url: "update.php",
        type: "POST",
        cache: false,
        data:fetch,
        success: function(dataResult){
          alert('Data updated successfully !');
          self.previewMode();
        }
      });
    },

    deleteData: function(options) {
      var self = this;
      //alert(options.id);
      var fetch = {
            'id' : options.id,
          }

      $.ajax({
        url: "delete.php",
        type: "POST",
        cache: false,
        data:fetch,
        success: function(dataResult){
          //alert('Data updated successfully !');
          self.previewMode();
        }
      });
    },

    append_data: async function(options, callback) {
      var result = this.load_data(options);
      if (typeof callback == 'function') { // make sure the callback is a function
        callback.call(this,result); // brings the scope to the callback
      }   	
    },

/********************/

/*********************/

    setFormFill: function(fetch) {
      $("#inputSN").html(fetch.id);
      $("#inputName").val(fetch.name)
      $("#inputType").val(fetch.type);
      $("#inputOwner").val(fetch.owner);
      $("#inputUN").val(fetch.uName);
      $("#inputUP").val(fetch.uProject);
      $("#inputPlace").val(fetch.place);
      $("#inputBd").val(fetch.date);
      $("#inputSpecs").val(fetch.specs);
    },

    build: function(container, options) {
      var self = this;//TrendCardGallery
      self.options = $.extend({}, defaultOptions, options);

      var start = self.options.startIndex;
      var limit = self.options.limitData;
      
      //self.load_data({'limitData':limit,'startIndex':start})
      self.previewMode();
      //$(container).tooltip('load_data',{'limitData':limit_data,'startIndex':start_index});
    }
  };

  $.fn.TrendCardGallery = function(options) {
  	var instance
    this.each(function() {
    	instance = new TrendCardGallery(this, options);
    });
    $.TrendCardGallery = function(){
    	return instance;
    }

    return $.TrendCardGallery();
  };

}(jQuery));
