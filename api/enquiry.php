<?php
    include "auth.php";
    include "tools.php";

    $conn = new mysqli($server_name, $username, $password, $db);

    $name = htmlentities($_POST["name"]);
    $emailid = htmlentities($_POST["emailid"]);
    $queries = htmlentities($_POST["queries"]);

    $query = "INSERT INTO enquiries (name, emailid, queries) VALUES ('". $name . "','" . $emailid . "','" . $queries . "');";
    $result = $conn->query($query);
    
    echo $query;
    
    if ($result === TRUE) 
        echo "ok";
    else
        header("status-code: 400");
        echo $conn->error;
?>