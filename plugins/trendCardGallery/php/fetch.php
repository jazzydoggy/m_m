<?php
    if(isset($_POST["limit"], $_POST["start"]))
    {
        require_once "config.php";
        // require_once "TOSBC.php";
        $path = "plugins/trendCardGallery/upload/";

        $selectSql = "SELECT * FROM trend_cards ORDER BY ID DESC LIMIT ".$_POST["start"].", ".$_POST["limit"]."";
        $utfsetSql = "set names 'utf8'";
        $conn->query($utfsetSql);
        $result = $conn->query($selectSql);

        if($result->num_rows > 0){
          while($row = $result->fetch_assoc() ) {
            echo "<div class='flex-card' id='".$row["ID"]."'>".
                  "<a class='hovereffect'>".
                    "<img class ='img-responsive' src='".$path.$row["IMG"]."'>".
                    "<div class='overlay'>".
                      "<i class='fas fa-search'></i>".
                    "</div>".
                  "</a>".
                 "</div>";
          }
        }
        else {
          //echo "0 results";
        }
    }
?>