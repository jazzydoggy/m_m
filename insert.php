<?php
    if(isset($_POST['submitBtn']))
    {
        require_once "config.php";
        require_once "TOSBC.php";
        $path = "plugins/trendCardGallery/upload/";

        $name = convertStrType($_POST['Name'],'TOSBC');      
        $type = convertStrType($_POST['Type'],'TOSBC');
        $owner = convertStrType($_POST['Owner'],'TOSBC');
        $use_name = convertStrType($_POST['Use_name'],'TOSBC');$_POST['Product_type'];
        $use_project = convertStrType($_POST['Use_Project'],'TOSBC');
        $place = convertStrType($_POST['Place'],'TOSBC');
        $build_date = convertStrType($_POST['Build_date'],'TOSBC');
        $specs = convertStrType($_POST['Specs'],'TOSBC');
        $number = convertStrType($_POST['Number'],'TOSBC');
        //$website = convertStrType($_POST['Website'],'TOSBC');//$_POST['Website'];
        //$tags = explode(",", convertStrType($_POST['Tags'],'TOSBC') );
        //$build_date = convertStrType(date('Y-m-d H:i:s'),'TOSBC');//date('Y-m-d H:i:s');
        $insertSql = "INSERT INTO mat_list(NAME, TYPE, OWNER, USE_NAME,USE_PROJECT,PLACE,BUILD_DATE,SPECS) VALUES ('$name','$type','$owner','$use_name','$use_project','$place','$build_date','$specs')";
        $utfsetSql = "set names 'utf8'";
            
        for ($i=0; $i<$number; $i++) {
            $conn->query($utfsetSql);
            $conn->query($insertSql);
        }

        header("Location:form.php");
    }
    
?>