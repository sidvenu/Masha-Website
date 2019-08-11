<?php
    include "auth.php";

    $conn = new mysqli($server_name, $username, $password, $db);
    if ($conn->connect_error) {
        echo "Connection error";
    }
    else {
        $output = executeGetQuery($sql, "shawls", ["type", "name", "gender"]);

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