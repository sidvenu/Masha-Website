<?php
    include "auth.php";
    include "tools.php";

    $id = $_POST["id"];

    $query = [
        "DELETE FROM paintings WHERE item_number = '{id}'",
        "DELETE FROM carpets WHERE item_number = '{id}'",
        "DELETE FROM shawls WHERE item_number = '{id}'",
        "DELETE FROM sculptures WHERE item_number = '{id}'",
        "DELETE FROM events WHERE event_id = '{id}'",
        "DELETE FROM event_gallery WHERE event_id = '{id}'",
        "DELETE FROM exhibtions WHERE exhibition_id = '{id}'",
        "DELETE FROM exhibition_gallery WHERE exhibition_id = '{id}'",
        "DELETE FROM inmedia WHERE id = '{id}'",
        "DELETE FROM others WHERE item_number = '{id}'"
    ];

    for ($x = 0; $x < count($query); $x++) {
        $sql->query(str_replace("{id}", $id, $query[$x]));
    }
?>