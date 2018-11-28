<?php
require('./cross-origin.php');
require('./header.php');

$output['success'] = false;
if ($conn->connect_error) {
    $output['error'] = $conn->connect_error;
}

$query1 = "SELECT `id`, `firstname`, `lastname`, `status` FROM `candidate` WHERE `status` = 1";
$result1 = mysqli_query($conn, $query1);
if (mysqli_num_rows($result1) > 0) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result1)) {
    	$output['data'][][] = $row;
    }
} else {
	$output['message'] = "0 results in 1";
}

$query2 = "SELECT `id`, `firstname`, `lastname`, `status` FROM `candidate` WHERE `status` = 2";
$result2 = mysqli_query($conn, $query2);
$output['success'] = false;
if (mysqli_num_rows($result2) > 0) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result2)) {
    	$output['data'][][] = $row;
    }
} else {
	$output['message'] = "0 results in 2";
}

$query3 = "SELECT `id`, `firstname`, `lastname`, `status` FROM `candidate` WHERE `status` = 3";
$result3 = mysqli_query($conn, $query3);
$output['success'] = false;
if (mysqli_num_rows($result3) > 0) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result3)) {
    	$output['data'][][] = $row;
    }
} else {
	$output['message'] = "0 results in 3";
}

$query4 = "SELECT `id`, `firstname`, `lastname`, `status` FROM `candidate` WHERE `status` = 4";
$result4 = mysqli_query($conn, $query4);
$output['success'] = false;
if (mysqli_num_rows($result4) > 0) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result4)) {
    	$output['data'][][] = $row;
    }
} else {
	$output['message'] = "0 results in 4";
}

$output = json_encode($output);
print($output);

mysqli_close($conn);
?>