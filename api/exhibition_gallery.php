<?php
    include "auth.php";
    include "tools.php";

    $conn = new mysqli($server_name, $username, $password, $db);
    if ($conn->connect_error) {
        echo "Connection error";
    }
    else {
        $output = executeGetQuery($sql, "exibition_gallery", ["exhibition_id"]);

        if ($output === FALSE) {
            http_response_code(500);
            echo "ERROR";
        }
        else {
            header("Content-Type: application/json;");
            echo json_encode($output);
        }
    }   
?>