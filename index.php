
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
    <title>Material Management</title>

    <!-- Meta -->
    <meta http-equiv=”Content-Type” content=”text/html; charset=utf-8″ />
    <meta name="viewport" content="width=device-width, initial-scale=1.25, shrink-to-fit=no" >
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- <link rel="shortcut icon" href="favicon.ico?v=2"> -->

    <!-- CSS Global Compulsory -->
    <link href="plugins/fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="plugins/fontawesome/css/brands.css" rel="stylesheet">
    <link href="plugins/fontawesome/css/solid.css" rel="stylesheet">
    <link rel="stylesheet" href="plugins/bootstrap4/css/bootstrap.css">
    <link rel="stylesheet" href="plugins/datepicker/css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="plugins/tagsinput/bootstrap-tagsinput.css">
    <link rel="stylesheet" href="plugins/bootstrapValidate/css/bootstrapValidator.css">
    <link rel="stylesheet" href="plugins/mm/css/mm.css?@20201110">
    <!-- <link rel="stylesheet" href="trend.css?@20200320"> -->
    <!-- <link rel="stylesheet" href="assets/css/style.css?20190430"> -->

    <style>
        .bootstrap-tagsinput {
          width: 100%;
        }
        .datepicker {
          padding: 0px !important;
        }
        .input-group {
          z-index: 0 !important;
        }
        .btn-file {
            position: relative;
            overflow: hidden;
        }
        .btn-file input[type=file] {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            font-size: 100px;
            text-align: right;
            filter: alpha(opacity=0);
            opacity: 0;
            outline: none;
            background: white;
            cursor: inherit;
            display: block;
        }
    </style>

    <script>

        $(function (){
            $('[data-toggle=tooltip""]').tooltip();
            $('form').on('submit', function (e) {
              // e.preventDefault();

              // $.ajax({
              //   type: 'post',
              //   url: 'insert.php',
              //   data: $('form').serialize(),
              //   success: function () {
              //     alert('form was submitted');
              //   }
              // });
            });
        });
    </script>
</head>

<body class="header-fixed">

<div class="container">
    <!-- <div id="includedHeader"></div> -->
    <div class="content-body">
      
      <div class="row">
        <div id="input-field" class="col-sm-6">
          <div>
            <h2 id="edit-title">新增品項</h2>
          </div>
          <hr>
          <form action="insert.php" method="post" enctype="multipart/form-data" id="myform" class="form-horizontal">
            <div class="form-group row" style="visibility: hidden; position: fixed;">
              <label id="inputSN" class="col-sm-4 col-form-label" ></label>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-sm-4 col-form-label">物品名稱</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="inputName" name="Name" placeholder="物品名稱">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputType" class="col-sm-4 col-form-label">類別</label>
                <div class="col-sm-8">
                  <select class="browser-default custom-select form-control" id="inputType" name="Type">
                    <option value="A">開發板</option>
                    <option value="B">模組板</option>
                    <option value="C">感測器/元件</option>
                    <option value="D">電源供應類</option>
                    <option value="E">轉接線/擴充/線材</option>
                    <option value="F">工具類</option>
                    <option value="G">3C產品</option>
                    <option value="H">耗材</option>
                    <option value="I">雜項</option>
                  </select>
                </div>
            </div>
            <div class="form-group row">
              <label for="inputNumber" class="col-sm-4 col-form-label">數量</label>
              <div class="col-sm-8">
                <input type="number" class="form-control" id="inputNumber" name="Number" min="1" max="50" placeholder="數量">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputOwner" class="col-sm-4 col-form-label">保管人</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="inputOwner" name="Owner" placeholder="保管人">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputUN" class="col-sm-4 col-form-label">使用人</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="inputUN" name="Use_name" placeholder="使用人">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputUP" class="col-sm-4 col-form-label">使用專案</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="inputUP" name="Use_Project" placeholder="使用專案">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPlace" class="col-sm-4 col-form-label">地點</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="inputPlace" name="Place" placeholder="存放位置">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputBd" class="col-sm-4 col-form-label">建立日期</label>
              <div class="col-sm-8">
                <div class="input-group date datepicker">
                  <input type="text" class="form-control" id="inputBd" name="Build_date" readonly>
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputSpecs" class="col-sm-4 col-form-label">規格
</label>
              <div class="col-sm-8">
                <textarea class="form-control" id="inputSpecs" name="Specs" rows="6" placeholder="輸入基本規格"></textarea>
              </div>
            </div>

            <div class="form-group row" align="right">
              <div class="btn-field">
                <button id="cancelBtn" name="cancelBtn" class="btn btn-warning">取消</button>
                <button type="submit" id="newBtn" name="submitBtn" class="btn btn-success">新增</button>
                <div class="editBtnGroup">
                  <button id="changeBtn" name="changeBtn" class="btn btn-primary">變更</button>
                  <button id="deleteBtn" name="deleteBtn" class="btn btn-danger">刪除</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div id="preview-field" class="col-sm-6">
          <div>
            <h2 id="preview-title">最近新增</h2>
          </div>
          <hr>
          <div class="menu-layer">
            <div class="split-btn">
              <i class="fas fa-plus add-btn"> 新增</i>
            </div>
          </div>  
          <div class="flex-container" id="flex-container">
            <table class="table" id="preview-table">
              <thead class="thead-dark">
                <tr>    
                  <th scope="col">編號</th>
                  <th scope="col">類別</th>
                  <th scope="col">名稱</th>
                  <th scope="col" class='op-col hidden'>保管人</th>
                  <th scope="col" class='op-col hidden'>使用人</th>
                  <th scope="col" class='op-col hidden'>專案</th>
                  <th scope="col" class='op-col hidden'>地點</th>
                  <th scope="col">規格</th>
                  <th scope="col" class='op-col hidden'>時間</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
            <!-- Cards -->
          </div>
          <div class="flex-footer">
            <a href="#" class="expand-btn">
              <!-- <span>More<br> -->
              <i class='fas fa-angle-double-down'></i>
            <!-- </span> -->
            </a>
          </div>  
        </div>
      </div>
    </div>
    <!-- <div id="includedFooter"></div> -->
</div><!--/wrapper-->
<!-- JS Global Compulsory -->
<script type="text/javascript" src="plugins/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="plugins/bootstrap4/js/bootstrap.min.js"></script>
<script type="text/javascript" src="plugins/datepicker/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="plugins/datepicker/locales/bootstrap-datepicker.uk.min.js"></script>
<script type="text/javascript" src="plugins/tagsinput/bootstrap-tagsinput.js"></script>
<script type="text/javascript" src="plugins/bootstrapValidate/js/bootstrapValidator.js"></script>
<script type="text/javascript" src="plugins/mm/js/mm.js?@20210317"></script>
<!-- <script type="text/javascript" src="TrendCardGallery.js?@20200320"></script> -->
<script type="text/javascript" src="trend.js?@20201111"></script>
<script>
    $(document).keypress(
      function(event){
        if (event.which == '13') {
          if(!$('#inputSpecs').is(":focus"))
            event.preventDefault();
        }   
    });
</script>
<!--[if lt IE 9]>
    <script src="assets/plugins/respond.js"></script>
    <script src="assets/plugins/html5shiv.js"></script>
    <script src="assets/plugins/placeholder-IE-fixes.js"></script>
<![endif]-->

</body>
</html>
