<?php
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

        if (array_key_exists("sort", $args)) {
            $sort = $args["sort"];
            array_splice($args, array_search("sort", array_keys($args)), 1);
        }

        if ($sort !== FALSE) {
            $clause = " ORDER BY " . $sort . " ASC";
        }

        return $clause;
    }
?>