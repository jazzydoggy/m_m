<?php
    header("Content-Type:text/html; charset=utf-8");
    
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once "config.php";
        require_once "TOSBC.php";
        //$path = "plugins/trendCardGallery/upload/";

        $id = convertStrType($_POST['id'],'TOSBC');
        $name = convertStrType($_POST['name'],'TOSBC');      
        $type = convertStrType($_POST['type'],'TOSBC');
        $owner = convertStrType($_POST['owner'],'TOSBC');
        $use_name = convertStrType($_POST['uName'],'TOSBC');$_POST['Product_type'];
        $use_project = convertStrType($_POST['uProject'],'TOSBC');
        $place = convertStrType($_POST['place'],'TOSBC');
        $build_date = convertStrType($_POST['date'],'TOSBC');
        $specs = convertStrType($_POST['specs'],'TOSBC');

        $updateSql = "UPDATE mat_list SET NAME='$name',TYPE='$type',OWNER='$owner',USE_NAME='$use_name',USE_PROJECT='$use_project',PLACE='$place',BUILD_DATE='$build_date',SPECS='$specs' WHERE SERIAL_NUMBER = '$id'";

        //echo $updateSql;
        $utfsetSql = "set names 'utf8'";
        $conn->query($utfsetSql);
        $conn->query($updateSql);
    }
?>