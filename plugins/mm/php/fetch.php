<?php
    if(isset($_POST["limit"], $_POST["start"]))
    {
        require_once "config.php";
        // require_once "TOSBC.php";
        $path = "plugins/trendCardGallery/upload/";
        $desc = "";
        $where = "";
        $order = "";
        $limit = "LIMIT ".$_POST["start"].", ".$_POST["limit"]."";

        if(isset($_POST["where"]) && $_POST["where"] != "")
        {
            $where = "WHERE ";
            foreach ($_POST["where"] as $key => $value) {
                $where .= "a."."$key"."="."'$value'";
                if ( next($_POST["where"]) == true ) $where .= " and ";
            }
        }

        if($_POST["order"] != "")
        {
            $order = "ORDER BY ";
            foreach ($_POST["order"] as $value) {
                $order .= "a."."$value";
                if ( next($_POST["order"]) == true ) $order .= ", ";
            }
        }
        
        if(isset($_POST["desc"])) {
            $desc = $_POST["desc"] == 'true' ? "DESC" : "";
        }


        if($_POST["limit"] < 0) {
            $selectSql = "SELECT a.*,b.TYPE_NAME FROM mat_list a LEFT JOIN type_hash b ON a.TYPE = b.TYPE_CODE $where $order $desc";
        }
        else {
            $selectSql = "SELECT a.*,b.TYPE_NAME FROM mat_list a LEFT JOIN type_hash b ON a.TYPE = b.TYPE_CODE $where $order $desc $limit";
        }

        // $selectSql = "SELECT * FROM mat_list ORDER BY SERIAL_NUMBER DESC LIMIT ".$_POST["start"].", ".$_POST["limit"]."";

        $utfsetSql = "set names 'utf8'";
        $conn->query($utfsetSql);
        $result = $conn->query($selectSql);

        //echo $selectSql;

        if($result->num_rows > 0){
          while($row = $result->fetch_assoc() ) {
            echo "<tr id='item_".$row["SERIAL_NUMBER"]."'  data-toggle='tooltip' data-placement='right' title='保管人 : ".$row["OWNER"]."\n使用人 : ".$row["USE_NAME"]."\n使用專案 : ".$row["USE_PROJECT"]."\n地點 : ".$row["PLACE"]."\n'>".
                    "<th scope='row' class='val-sn'>".$row["SERIAL_NUMBER"]."</td>".
                    "<td >".$row["TYPE_NAME"]."</td>".
                    "<td class='val-tp hidden'>".$row["TYPE"]."</td>".
                    "<td class='val-nm'>".$row["NAME"]."</td>".
                    "<td class='op-col hidden val-ow'>".$row["OWNER"]."</td>".
                    "<td class='op-col hidden val-un'>".$row["USE_NAME"]."</td>".
                    "<td class='op-col hidden val-up'>".$row["USE_PROJECT"]."</td>".
                    "<td class='op-col hidden val-pl'>".$row["PLACE"]."</td>".
                    "<td class='val-sp'>".$row["SPECS"]."</td>".
                    "<td class='op-col hidden val-bd'>".$row["BUILD_DATE"]."</td>".
                 "</tr>";
          }
        }
        else {
          //echo "0 results";
        }
    }
?>