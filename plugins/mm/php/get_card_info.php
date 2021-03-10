<?php
    header("Content-Type:text/html; charset=utf-8");
    require_once "config.php";
    // require_once "TOSBC.php";

    $id = $_POST['id'];
    $return_arr = array();
    $tags = "";


    $selectSql = "SELECT * FROM trend_card_tags WHERE CID=$id";
    $utfsetSql = "set names 'utf8'";
    $conn->query($utfsetSql);
    $result = $conn->query($selectSql);
    if($result->num_rows > 0){
      while($row = $result->fetch_assoc() ) {
        //print_r($row['TAG']);
        $tag = '#'.ltrim($row['TAG'])." ";
        $tags = $tags.$tag;

        //print_r($return_arr[0]['content']);
        //print_r($tags);
      }
    }
    else {
        //echo "0 results";
    }
   
    //get card info
    $selectSql = "SELECT * FROM trend_cards WHERE ID=$id";
    $utfsetSql = "set names 'utf8'";
    $conn->query($utfsetSql);
    $result = $conn->query($selectSql);

    if($result->num_rows > 0){
      while($row = $result->fetch_assoc() ) {
        $id = $row['ID'];
        $title = $row['TITLE'];
        $type = $row['TYPE'];
        $content = $row['CONTENT'];
        $product_type = $row['PRODUCT_TYPE'];
        $designer = $row['DESIGNER'];
        $place = $row['PLACE'];
        $release_date = $row['RELEASE_DATE'];
        $creator = $row['CREATOR'];
        $website = $row['WEBSITE'];
        $img = $row['IMG'];

        //echo $content;
        $return_arr[] = array("id" => $id,
                            "title" => $title,
                            "type" => $type,
                            "content" => $content,
                            "product_type" => $product_type,
                            "designer" => $designer,
                            "place" => $place,
                            "release_date" => $release_date,
                            "creator" => $creator,
                            "website" => $website,
                            "img" => $img,
                            "tags" => $tags
                        );

        //print_r($return_arr[0]['content']);
        //print_r('’');
      }
    }
    else {
        //echo "0 results";
    }

    echo json_encode($return_arr,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    //echo json_encode($return_arr,true);
    
?>