<?php
    include "auth.php";
    include "tools.php";

    $result = $sql->query("INSERT INTO enquiries () VALUES ();");
    $name = ($_POST["name"]);
    $emailid = ($_POST["emailid"]);
    $queries = ($_POST["queries"]);


    $result = $sql->query("INSERT INTO enquiries (name, emailid, queries) VALUES ('". $name . "','" . $emailid . "','" . $queries . "');");
?>