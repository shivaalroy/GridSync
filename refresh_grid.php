<?php
if (isset($_GET["size"])) {
    // CONNECT TO THE DATABASE
    include_once("db_conx.php");
    $size = $_GET["size"];
    $query = "SELECT instances, status FROM grid_status WHERE size='$size' LIMIT 1;";
    $result = pg_query($db_conx, $query);
    $count = pg_num_rows($result);
    $arr = pg_fetch_array($result);
    echo $arr["status"];
    exit();
}
if (isset($_GET["status"]) && isset($_GET["gridsize1"])) {
    // CONNECT TO THE DATABASE
    include_once("db_conx.php");
    $status = $_GET["status"];
    $size = $_GET["gridsize1"];
    $query = "SELECT instances, status FROM grid_status WHERE size='$size' LIMIT 1;";
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
    // $arr = pg_fetch_array($result);
    // echo $arr["status"];
    // echo $status;
    // echo $count;
    exit();
}
if (isset($_GET["instance"]) && isset($_GET["gridsize2"])) {
    // CONNECT TO THE DATABASE
    include_once("db_conx.php");
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