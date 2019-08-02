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
?>