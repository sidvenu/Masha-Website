<?php
    include "auth.php";

    function extractFromArray(&$array, $key) {
        //extract a single array field
        $value = FALSE;

        if (array_key_exists($key, $array)) {
            $value = $array[$key];
            array_splice($array, array_search($key, array_keys($array)), 1);
        }

        return $value;
    }
    
    function getSearchClause($q, $cols) {
        $clause = "(";
        for ($x = 0; $x < count($cols); $x++) {
            $clause .= $cols[$x] . " regexp '" . $q . ".*'";
            if ($x < count($cols) - 1) 
                $clause .= " OR ";
        }

        $clause .= ")";

        return $clause;
    }

    function getSortClause(&$args) {
        $sort = FALSE;
        $clause = "";

        $sort = extractFromArray($args, "sort");

        if ($sort !== FALSE && $sort != "") {
            $clause = " ORDER BY " . $sort . " ASC";
        }

        return $clause;
    }

    function getLimitClause(&$array) {
        $num = FALSE;
        $offset = FALSE;

        $num = extractFromArray($array, "num");
        $offset = extractFromArray($array, "offset");

        if ($offset === FALSE) {
            $offset = 0;
        } 

        $limit = "";

        if ($num !== FALSE) {
            $limit = " LIMIT " . $offset . ", " . $num;
        }

        return $limit;
    }
    
    function executeGetQuery($sql, $table, $searchQueryParams) {
        $where = FALSE;
        $sort = getSortClause($_GET);
        $limit = getLimitClause($_GET);

        $searchQuery = extractFromArray($_GET, "q");

        //where clause filtering
        for ($x = 0; $x < count($_GET); $x++) {
            $col = array_keys($_GET)[$x];
            if ($where === FALSE) {
                $where = " WHERE " . $col . " regexp '" . $_GET[$col] . ".*'";
            }
            else {
                $where = $where . ", " . $col . " = '" . $_GET[$col] . ".*'";
            }
        }

        //searching
        $search = "";

        if ($searchQuery !== FALSE && $searchQuery != "") {
            if ($where === FALSE) {
                $search = " WHERE ";
            }
            else {
                $search = " AND ";
            }

            $search .= getSearchClause($searchQuery, $searchQueryParams);
        }
        
        //query building
        $query = "SELECT * FROM " . $table;
        if ($where !== FALSE) 
            $query = $query . $where;
        $query .= $search;
        $query .= $sort;
        $query = $query . $limit;
        
        $query = $query . ";";

        //run query
        $result = $sql->query($query);
        if ($result === FALSE) {
            return FALSE;
        }
        $output = array();
        while ($row = $result->fetch_assoc()) {
            array_push($output, $row);
        }
        return $output;
    }
?>