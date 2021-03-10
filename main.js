var instance;
$(document).ready(function() {
  var action = 'inactive';

  instance = $('#flex-container').TrendCardGallery({
      "source" : "card-source",
      "target" : "card-center",
      "startIndex" : 0,
      "limitData" : 35,
      "allowUpdate" : true
  });
  //instance.options.startIndex = instance.options.startIndex + instance.options.limitData;

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(".flex-container").height() && action == 'inactive') {
      instance.options.startIndex = instance.options.startIndex + instance.options.limitData;
      var start = instance.options.startIndex;
      var limit = instance.options.limitData;
      action = 'active';
      setTimeout(function() {
        instance.append_data({'limitData':limit,'startIndex':start}, appendComplete);
      }, 1000);
    }
  });

  function appendComplete(data)
  {
    if (data == '') {
      action = 'active';
    } else {
      action = 'inactive';
    }
  }
  console.log(instance);
});
