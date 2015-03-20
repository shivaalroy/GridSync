<?php
include_once("db_conx.php");
// refreshGrid()
if (isset($_GET["mostrecentchange"]) && isset($_GET["size"])) {
    $size = $_GET["size"];
    $query = "SELECT lastchange FROM grid_status WHERE size='$size' LIMIT 1;";
    $result = pg_query($db_conx, $query);
    $count = pg_num_rows($result);
    $arr = pg_fetch_array($result);
    if ($count == 0)
        echo "no_lastchange";
    else
        echo $arr["lastchange"];
    exit();
}
// Gets the status of the grid from the server
// refreshGrid()
if (isset($_GET["size"]) && isset($_GET["lastchange"])) {
    $size = $_GET["size"];
    $lastchange = $_GET["lastchange"];
    $query = "SELECT instances, status, lastchange FROM grid_status WHERE size='$size' LIMIT 1;";
    $result = pg_query($db_conx, $query);
    $count = pg_num_rows($result);
    $arr = pg_fetch_array($result);
    if ($lastchange != $arr["lastchange"])
        echo $arr["status"].".".$arr["lastchange"];
    else
        echo "nochange";
    exit();
}
// Changes the status of the grid on the server side
// updateGridStatus()
if (isset($_GET["status"]) && isset($_GET["lastchange"]) && isset($_GET["gridsize"])) {
    $status = $_GET["status"];
    $lastchange = $_GET["lastchange"];
    $size = $_GET["gridsize"];
    $query = "SELECT instances, status FROM grid_status WHERE size='$size' LIMIT 1;";
    $result = pg_query($db_conx, $query);
    $count = pg_num_rows($result);
    $arr = pg_fetch_array($result);
    if ($count == 0) {
        $query = "INSERT INTO grid_status (size, instances, lastchange, status) VALUES ('$size', '0', '$lastchange', '$status');";
    } else if ($arr['status'] != $status) {
        $query = "UPDATE grid_status SET status='$status', lastchange='$lastchange' WHERE size='$size';";
    } else {
        echo "nochange";
        exit();
    }
    $result = pg_query($db_conx, $query);
    if ($result) echo "success";
    else echo "error";
    exit();
}
// Gets the count of instances from the server
// NOT FUNCTIONING YET
if (isset($_GET["instance"]) && isset($_GET["gridsize"])) {
    $status = $_GET["status"];
    $size = $_GET["gridsize2"];
    $query = "SELECT instances FROM grid_status WHERE size='$size' LIMIT 1;";
    $result = pg_query($db_conx, $query);
    $count = pg_num_rows($result);
    $arr = pg_fetch_array($result);
    if ($count == 0) {
        $query = "INSERT INTO grid_status (size, instances, lastchange, status) VALUES ('$size', '0', now(), '$status');";
    } else if ($arr['status'] != $status) {
        $query = "UPDATE grid_status SET status='$status', lastchange=now() WHERE size='$size';";
    } else {
        echo "no change";
        exit();
    }
    $result = pg_query($db_conx, $query);
    if ($result) echo "success";
    else echo "error";
    exit();
}
?>