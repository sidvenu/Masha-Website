<?php 
    include "auth.php";
    include "tools.php";

    function lookupIdColumn($table) {
        switch ($table) {
            case "events":
            case "event_gallery":
                return "event_id";

            case "exhibitions":
            case "exhibition_gallery":
                return "exhibition_id";

            case "artists":
                return "artist";

            case "enquiries":
            case "inmedia":
                return "id";

            default:
                return "item_number";
        }
    }

    $table = extractFromArray($_POST, "table");
    $pri_key = lookupIdColumn($table);
    $id = extractFromArray($_POST, $pri_key);

    $query = "UPDATE " . $table . " SET ";

    //all updates
    for ($x = 0; $x < count($_POST); $x++) {
        $col = array_keys($_POST)[$x];
        $val = $_POST[$col];

        $query .= $col . " = '" . $val . "'";

        if ($x < count($_POST) - 1)
            $query .= ", ";
    }

    $query .= " WHERE " . $pri_key . " = '" . $id . "';";

    if ($sql->query($query) === FALSE) {
        http_response_code(400);
        echo $sql->error;
    }
    else {
        echo "SUCCESS";
    }
?>