<?php
$host = getenv("HOST");
$dbname = getenv("DATABASE");
$user = getenv("USER");
$password = getenv("PASSWORD");
echo $conn_string;
$conn_string = "host=".$host." dbname=".$dbname." user=".$user." password=".$password;
$db_conx = pg_connect($conn_string);
// Evaluate the connection
if (!$db_conx) {
    echo "Database connection error.";
    exit();
}
?>