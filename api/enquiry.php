<?php
    include "auth.php";
    include "tools.php";

    $result = $sql->query("INSERT INTO enquiries () VALUES ();");
    $name = htmlentities($_POST["name"]);
    $emailid = htmlentities($_POST["emailid"]);
    $queries = htmlentities($_POST["queries"]);

    $result = $sql->query("INSERT INTO enquiries (name, emailid, queries) VALUES ('". $name . "','" . $emailid . "','" . $queries . "');");
?>