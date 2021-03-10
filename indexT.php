
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
    <title>TrendCard</title>

    <!-- Meta -->
    <meta http-equiv=”Content-Type” content=”text/html; charset=utf-8″ />
    <meta name="viewport" content="width=device-width, initial-scale=1.25, shrink-to-fit=no" >
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- <link rel="shortcut icon" href="favicon.ico?v=2"> -->

    <!-- CSS Global Compulsory -->
    <!-- <script src="https://kit.fontawesome.com/1e6a132afb.js" crossorigin="anonymous"></script> -->
    <link href="plugins/fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="plugins/fontawesome/css/brands.css" rel="stylesheet">
    <link href="plugins/fontawesome/css/solid.css" rel="stylesheet">
    <link href="plugins/fontawesome/css/regular.css" rel="stylesheet">
    <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="plugins/datepicker/css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="plugins/tagsinput/bootstrap-tagsinput.css">
    <link rel="stylesheet" href="plugins/bootstrapValidate/css/bootstrapValidator.css">
    <link rel="stylesheet" href="plugins/trendCardGallery/css/TrendCardGallery.css?@20200414">
    <!-- <link rel="stylesheet" href="trend.css?@20200407"> -->
    <!-- <link rel="stylesheet" href="assets/css/style.css?20190430"> -->

    <style>
      .card-source {
        position: fixed;
        overflow: hidden;
        width:600px;
        height:450px;
        margin-bottom: 25px;
        border-radius: 7px;
        box-shadow:5px -5px 25px #232323;
        z-index: -1;
        top:50%;
        left:50%;
        -webkit-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        transform:translate(-50%,-50%);
        -webkit-transition:all .2s ease-in-out;
        transition:all .2s ease-in-out;
        font-size: 12px;
        opacity: 0;
      }

      .card-center {
        position: fixed;
        width: 700px;
        height: 526px;
        margin-bottom: 25px;
        border-radius: 8px;
        box-shadow:5px -5px 25px #232323;
        z-index: 99999;
        top:50%;
        left:50%;
        -webkit-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        transform:translate(-50%,-50%);
        -webkit-transition:all .2s ease-in-out;
        transition:all .2s ease-in-out;
        font-size: 13.9px;
        opacity: 1;
      }

      .card-right {
        position: fixed;
        width: 600px;
        height: 450px;
        margin-bottom: 25px;
        border-radius: 8px;
        box-shadow:5px -5px 25px #232323;
        z-index: 99999;
        top:50%;
        left:50%;
        -webkit-transform:translate(0%,-76%);
        -ms-transform:translate(0%,-76%);
        transform:translate(0%,-76%);
        -webkit-transition:all .2s ease-in-out;
        transition:all .2s ease-in-out;
        font-size: 12px;
        opacity: 1;
      }

      .flex-card {
        margin-bottom: 30px;
      }
      .main-title {
        text-align:center;
        padding-bottom:15px;
        padding-left: 70px;
        padding-right: 70px;
      }
      .main-title h1 {
        font-weight: 520;
      }
    </style>
</head>

<body>

<div class="container">
    <!-- <div id="includedHeader"></div> -->
    <div class="content-body">
      <div class="main-title">
        <h1>Trend Cards</h1>
        <hr>
      </div>
      <div class="row">
        <div class="flex-container" id="flex-container">
          <!-- Cards -->
        </div>
        <div class="flex-footer">

        </div> 
      </div>
    </div>
    <!-- <div id="includedFooter"></div> -->
</div><!--/wrapper-->
  
<!-- JS Global Compulsory -->
<script type="text/javascript" src="plugins/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="TrendCardGallery.js?@20200317"></script> -->
<script type="text/javascript" src="plugins/trendCardGallery/js/TrendCardGallery.js?@20200414"></script>
<script type="text/javascript" src="main.js?@20200413"></script>
<script>

</script>
<!--[if lt IE 9]>

<![endif]-->

</body>
</html>
