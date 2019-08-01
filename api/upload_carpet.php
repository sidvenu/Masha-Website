<?php
    $server_name = "localhost";
    $username = "test_masha";
    $password = "test";
    $db = "test_masha";

    $conn = new mysqli($server_name, $username, $password, $db);
    if ($conn->connect_error) {
        echo "Connection error";
    }
    else {
        $cols = "";
        $vals = "";

        for ($x = 0; $x < count($_POST); $x++) {
            $cols = $cols . array_keys($_POST)[$x];
            $vals = $vals . "'" . array_values($_POST)[$x] . "'";
            if ($x < count($_POST) - 1) {
                $cols = $cols . ", ";
                $vals = $vals . ", ";
            }
        }

        $query = "INSERT INTO carpets (" . $cols . ") VALUES (" . $vals . ");";

        if ($conn->query($query) !== TRUE) {
            http_response_code(400);
            echo $conn->error;
        }
        else {
            echo "SUCCESS";
        }
    }
?>