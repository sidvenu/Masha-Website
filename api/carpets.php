<?php
    header("Content-Type: application/json;");
    include "auth.php";
    include "tools.php";

    $conn = new mysqli($server_name, $username, $password, $db);
    if ($conn->connect_error) {
        echo "Connection error";
    }
    else {
        $where = FALSE;
        $sort = getSortClause($_GET);
        $limit = getLimitClause($_GET);

        $searchQuery = FALSE;
        if (array_search("q", array_keys($_GET)) !== FALSE) {
            $searchQuery = $_GET["q"];
            array_splice($_GET, array_search("q", array_keys($_GET)), 1);
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

        $query = "SELECT * FROM carpets";
        $search = "";
        if ($where !== FALSE) 
            $query = $query . $where;

        if ($searchQuery !== FALSE && $searchQuery != "") {
            if ($where === FALSE) {
                $search = " WHERE ";
            }
            else {
                $search = " AND ";
            }

            $search .= getSearchClause($searchQuery, ["origin", "type", "name"]);
        }

        $query .= $search;

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