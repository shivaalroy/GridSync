<?php
include_once("db_conx.php");
$tbl_gridstatus = "CREATE TABLE IF NOT EXISTS grid_status (
					size 		INT				UNIQUE,
					instances 	INT				DEFAULT 1,
					lastchange	TIMESTAMP		NOT NULL,
					status	 	VARCHAR(1000)	NOT NULL
				)";
$result = pg_query($db_conx, $tbl_gridstatus);
if ($result == true) {
	echo "<h3>table grid_status table created OK :) </h3>";
} else {
	echo "<h3>table grid_status table NOT created :( </h3>";
}
?>
