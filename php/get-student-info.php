<?php
require('./cross-origin.php');
require('./header.php');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$query = "SELECT `id`, `firstname`, `lastname`, `email`, `phone`, `school`, `year`, `cv`, `essay1`, `essay2`, `interest`, `time`, `status` FROM `candidate`";
$result = mysqli_query($conn, $query);
$output['success'] = false;
if (mysqli_num_rows($result) > 0) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result)) {
    	$output['data'][] = $row;
    }
} else {
	$output['error'] = "0 results";
}

$output = json_encode($output);
print($output);

mysqli_close($conn);
?>