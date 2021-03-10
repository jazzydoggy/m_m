<?php
    header("Content-Type:text/html; charset=utf-8");
    
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once "config.php";
        require_once "TOSBC.php";
        $path = "plugins/trendCardGallery/upload/";

        $id = convertStrType($_POST['id'],'TOSBC');

        $deleteSql = "DELETE FROM mat_list WHERE SERIAL_NUMBER = '$id'";

        //echo $updateSql;
        $utfsetSql = "set names 'utf8'";
        $conn->query($utfsetSql);
        $conn->query($deleteSql);
    }
?>