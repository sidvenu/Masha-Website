<?php
    header("Content-Type: application/json;");
    $server_name = "localhost";
    $username = "test_masha";
    $password = "test";
    $db = "test_masha";

    $conn = new mysqli($server_name, $username, $password, $db);
    if ($conn->connect_error) {
        echo "Connection error";
    }
    else {
        $where = FALSE;
        $num = FALSE;
        $offset = FALSE;
        if (array_search("num", array_keys($_GET)) !== FALSE) {
            $num = $_GET["num"];
            array_splice($_GET, array_search("num", array_keys($_GET)), 1);
        }

        if (array_search("offset", array_keys($_GET)) !== FALSE) {
            $offset = $_GET["offset"];
            array_splice($_GET, array_search("offset", array_keys($_GET)), 1);
        }
        
        if ($offset === FALSE) {
            $offset = 0;
        } 

        $limit = FALSE;

        if ($num !== FALSE) {
            $limit = " LIMIT " . $offset . ", " . $num;
        }

        for ($x = 0; $x < count($_GET); $x++) {
            $col = array_keys($_GET)[$x];
            if ($where === FALSE) {
                $where = " WHERE " . $col . " regexp '" . $_GET[$col] . ".*'";
            }
            else {
                $where = $where . ", " . $col . " = '" . $_GET[$col] . ".*'";
            }
        }

        $query = "SELECT * FROM paintings";
        if ($where !== FALSE) 
            $query = $query . $where;

        if ($limit !== FALSE) 
            $query = $query . $limit;

        $query = $query . ";";

        $result = $conn->query($query);
        $output = array();
        while ($row = $result->fetch_assoc()) {
            array_push($output, $row);
        }
        echo json_encode($output);
    }   

?>