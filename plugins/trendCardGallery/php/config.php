<?php
    /* Database credentials. Assuming you are running MySQL
    server with default setting (user 'root' with no password) */
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '1qaz1qaz');
    define('DB_NAME', 'trend_wall');
     
    /* Attempt to connect to MySQL database */
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    $conn->set_charset("utf8");
     
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
?>