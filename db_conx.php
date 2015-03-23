<?php
$host = getenv("GRIDSYNC_HOST");
$dbname = getenv("GRIDSYNC_DATABASE");
$user = getenv("GRIDSYNC_USER");
$password = getenv("GRIDSYNC_PASSWORD");
$conn_string = "host=".$host." dbname=".$dbname." user=".$user." password=".$password;
$db_conx = pg_connect($conn_string);
// $db_conx = true;
// Evaluate the connection
if (!$db_conx) {
    echo "Database connection error.";
    exit();
}
?>