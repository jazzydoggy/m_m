(function($) {
  var path = $("script").last().attr("src").split('js',1);
  var defaultOptions = {
    startIndex: 0,
    limitData: 30,
    action: 'inactive',
    source: 'trend-container',
    target: 'fixed-center',
    allowUpdate: false,
    typeColor: [
      "#ff1d1d", // Fashion
      "#5f5f5f", // Transport
      "#000000", // Color
      "#ff33cc", // Visual
      "#660066", // CMF
      "#32cc32", // Form
      "#33ccff", // Space
      "#008080", // Technology
      "#ff6600", // UX
      "#cc00ff", // Thinking
      "#a50021", // Mechanism
      // "#ff0066", // PC
      // "#3333ff", // Communications
      // "#cc0099", // Home Appliance
      // "#7030a0", // Electronics
      // "#1f497d", // AIoT
      // "#984807", // Furniture & Lighting
      // "#0099cc", // Interior Architecture
      // "#009900", // Office
      // "#cc9900", // Watches & Luxuries
      // "#4f6228"  // Outdoor,Sport & Leisure
    ],
    textColor: [
      "#000000", // Fashion
      "#ffffff", // Transport
      "#ffffff", // Color
      "#000000", // Visual
      "#ffffff", // CMF
      "#000000", // Form
      "#000000", // Space
      "#000000", // Technology
      "#000000", // UX
      "#000000", // Thinking
      "#ffffff", // Mechanism
      // "#ffffff", // PC
      // "#ffffff", // Communications
      // "#ffffff", // Home Appliance
      // "#ffffff", // Electronics
      // "#ffffff", // AIoT
      // "#ffffff", // Furniture & Lighting
      // "#ffffff", // Interior Architecture
      // "#ffffff", // Office
      // "#ffffff", // Watches & Luxuries
      // "#ffffff", // Outdoor,Sport & Leisure
    ],
    cardInfo: {
      'id' : '',
      'title' : '',
      'type' : 1,
      'productType' : '',
      'designer' : '',
      'place' : '',
      'releaseDate' : '',
      'creator' : '',
      'website' : '',
      'content' : '',
      'img' : '',
      'tags' : ''
    },
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
      var result = '';
      	$.ajax({
	        url: path+"php/fetch.php",
	        method: "POST",
	        async: false,
	        data: { limit: limit, start: start },
	        cache: false,
	        success: function(data) {
	          self.container.append(data);
			      var source = self.options.source;
	          var target = self.options.target;
	          self.addCardEvent({source: source, target: target});
	          result = data;
	        },
	      });
      return result;
    },

    append_data: async function(options, callback) {
      var result = this.load_data(options);
      if (typeof callback == 'function') { // make sure the callback is a function
        callback.call(this,result); // brings the scope to the callback
      }   	
    },

    addCardEvent: function(options) {
      var self = this; //TrendCardGallery
      var source = options.source;
      var target = options.target;
      var items = self.container.find('.flex-card');
      
      self.appendCardTemplete();
      
      items.each(function(x) {
        $(this).off('click');
        $(this).on('click', { item: $(this), self: self }, self.showModal);
      });
    },

    appendCardTemplete: function() {
      var self = this;
      var page = path+"cardSample.html";
      var source = self.options.source;
      var target = self.options.target;

      if($("#trend-container").length <= 0)
      {
        $.get(page, function(data){
            $("body").append(data);
            $("#trend-container").addClass(source);
        });
      }
    },

    showModal: function (e) {
      var self = e.data.self;//TrendCardGallery
      var source = self.options.source;
      var target = self.options.target;
      var upTarget = 'card-right';
      var item = e.data.item;//$('.flex-card')
      var id = item.attr('id');
      item.parent().prepend("<div class='black-cover' id='black-cover'></div>");
      $("#trend-container").removeAttr('class').addClass(target);
      $("#black-cover").on('click', { source: target, target: source, self: self}, self.closeModal);
      $('body').css({'overflow':'hidden'});
      
      // ESCAPE key pressed
      $(document).bind("keydown.key27",function(e) {
          if (e.keyCode == 27) 
              $("#black-cover").click();
      });
      
      $.ajax({
        type: "POST",
        url: path+"php/get_card_info.php",
        dataType: "json",
        data: { id: id },
        success: function(data) {
          var fetch = {
            'id' : data[0].id,
            'title' : data[0].title,
            'type' : data[0].type,
            'productType' : data[0].product_type,
            'designer' : data[0].designer,
            'place' : data[0].place,
            'releaseDate' : data[0].release_date,
            'creator' : data[0].creator,
            'website' : data[0].website,
            'content' : data[0].content,
            'img' : path + 'upload/' + data[0].img,
            'tags' : data[0].tags
          }
          self.showCard(fetch,false);

          $(".others").removeClass('hidden');
          /*set update btn event*/
          if(self.options.allowUpdate)
          {
            $('#black-cover').append("<i id='update-btn' class='far fa-keyboard'></i>")
            $("#update-btn").on('click', { upTarget: upTarget, fetch: fetch, self: self }, self.showUpdatePanel);
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          alert('get_card_info fail');
          alert(xhr.status);
          alert(thrownError);
        }
      });
    },

    closeModal: function (e) {
      var cover = this;// $(cover) = $('.black-cover')
      var self = e.data.self;//TrendCardGallery
      var source = e.data.source;
      var target = e.data.target;
      $("#trend-container").removeAttr('class').addClass(target);
      $(".others").addClass('hidden');
      $("#update-btn").unbind('click');
      $('body').css({'overflow':''});
      $(cover).remove();
      self.showCard();
      $(document).unbind("keydown.key27");
    },

/********************/
    showUpdatePanel: function (e) {
      var self = e.data.self;//TrendCardGallery
      var page = path+"formSample.html";
      var upTarget = e.data.upTarget;

      $("#black-cover").removeAttr('class').addClass('white-cover');
      $("#black-cover").unbind('click');
      $("#trend-container").removeAttr('class').addClass(upTarget);
      $("#update-btn").unbind('click');
      $("#update-btn").on('click', { fetch: e.data.fetch , self: self }, self.closeUpdatePanel);

      $.get(page, function(data){
        $("#black-cover").append(data);
        self.setFormFill(e.data.fetch);
        $("#cancelBtn").on('click', { fetch: e.data.fetch , self: self }, self.closeUpdatePanel);
      });

      self.showCard(e.data.fetch,true);
      //e.stopPropagation()
    },

    closeUpdatePanel: function (e) {
      var self = e.data.self;//TrendCardGallery
      var source = self.options.source;
      var target = self.options.target;
      var reTarget = self.options.target;
      var upTarget = $("#trend-container").attr('class');

      $("#black-cover").removeAttr('class').addClass('black-cover');
      $("#black-cover").on('click', { source: target, target: source, self: self}, self.closeModal);
      $("#trend-container").removeAttr('class').addClass(reTarget);
      $("#update-btn").unbind('click');
      $("#update-btn").on('click', { upTarget: upTarget, fetch: e.data.fetch, self: self }, self.showUpdatePanel);
      $("#update-group").remove();

      self.showCard(e.data.fetch,true);
      e.stopPropagation();
    },

/*********************/
    showCard: function(cardinfo, remember) {
      var self = this;
      var options;
      if(cardinfo)
        options = cardinfo;
      else
        options = self.options.cardInfo;

      if(remember) {
        self.setCardInfo(cardinfo);
      }
      
      var id = options.id != "" && options.id != undefined ? options.id : "";
      var title = options.title != "" ? options.title : "Title";
      var type = options.type != "" ? options.type : 0;
      var product_type = options.productType != "" ? options.productType : "Project Name";
      var designer = options.designer != "" ? options.designer : "Designer";
      var place = options.place != "" ? options.place : "Place";
      var release_date = options.releaseDate != "" ? options.releaseDate : "YYYY-MM-DD";
      var creator = options.creator != "" ? options.creator : "AP/XX/XXXX";
      var website = options.website != "" ? options.website : "Website link";
      var content = options.content != "" ? options.content.replace(/\r?\n/g, '<br />') : "Please input contents...";
      var img = options.img != "" && options.img != undefined ? options.img : "img/cardbg2.png";
      var tags = options.tags != "" && options.tags != undefined ? options.tags : "";

      $("#cardID").html(id);
      $("#cardTitle").html(title);
      self.setTypeColor(type);
      $("#cardProductType").html(product_type);
      $("#cardDesigner").html("By " + designer);
      $("#cardPlace").html(place);
      $("#cardDate").html(release_date);
      $("#cardCreator").html("Posted by " + creator);
      $("#cardWebsite").html(website);

      if(options.website != "")
        $("#cardWebsite").attr('href',website);
      else
        $("#cardWebsite").removeAttr('href');

      $("#cardContent").html(content);
      $("#img-upload").attr('src', img);
      $("#cardTags").html(tags);
    },

    setFormFill: function(fetch) {
      $("#inputID").val(fetch.id)
      $("#inputTitle").val(fetch.title);
      $("#inputType").val(fetch.type);
      $("#inputPt").val(fetch.productType);
      $("#inputDesign").val(fetch.designer);
      $("#inputPlace").val(fetch.place);
      $("#inputRd").val(fetch.releaseDate);
      $("#inputCreator").val(fetch.creator);
      $("#inputWebsite").val(fetch.website);
      $("#inputContent").val(fetch.content);
      var tags = fetch.tags;
      var tagString = "";
      tags = tags.split("#");
      $.each( tags, function( key, value ) {
        if(key != 0)
          tagString = tagString+value.trimEnd()+",";
      });
      tagString = tagString.substr(0,tagString.length-1);
      $("#inputTags").val(tagString);
    },

    setCardInfo: function (options) {
      var self = this;
      self.options.cardInfo = {
        'id' : options.id,
        'title' : options.title,
        'type' : options.type,
        'productType' : options.productType,
        'designer' : options.designer,
        'place' : options.place,
        'releaseDate' : options.releaseDate,
        'creator' : options.creator,
        'website' : options.website,
        'content' : options.content,
        'img' : options.img,
        'tags' : options.tags
      }
    },

    setTypeColor: function (val) {
      var self = this;
      var typeColor = self.options.typeColor;
      var textColor = self.options.textColor;
      $.each(typeColor, function(index, value) {
        if (val == index + 1) {
          $(".trend-footer").css('background-color', typeColor[index]);
          $(".trend-title").css('color', typeColor[index]);
          $(".trend-footer").css('color', textColor[index]);
          $(".trend-footer > .website").css('color', textColor[index]);
        }
      });
    },
    test: function(e)
    {
      alert(e.source);
    },

    build: function(container, options) {
      var self = this;//TrendCardGallery
      self.options = $.extend({}, defaultOptions, options);

      var start = self.options.startIndex;
      var limit = self.options.limitData;
      var source = self.options.source;
      var target = self.options.target;
      
      self.load_data({'limitData':limit,'startIndex':start})

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


  var methods = {
    init: function(options) {
      alert('init');
      // this
    },
    load_data: function(options) {
      var limit = options.limitData;
      var start = options.startIndex;
      $.ajax({
        url: "fetch.php",
        method: "POST",
        data: { limit: limit, start: start },
        cache: false,
        success: function(data) {
          $('.flex-container').append(data);
        }
      });
    },
    hide: function() {
      // good
    },
    update: function(content) {
      // !!!
    }
  };

  $.fn.tooltip = function(method) {
    // 方法呼叫
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method' + method + 'does not exist on jQuery.tooltip');
    }
  };

}(jQuery));
