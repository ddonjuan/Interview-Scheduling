<?php
require('./cross-origin.php');
require('./header.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);

$stmt = $conn->prepare("UPDATE `candidate` SET `status` = ? WHERE `candidate`.`id` = ?");
$stmt -> bind_param("ii", $status, $id);

$status = $request['current-status'] + $request['status-action'];
$id = $request['id'];

$output['success'] = false;

if($stmt->execute()){
    $output['success'] = true;
    $output['request'] = $request;
}else{
    $output['error'] = $stmt->error;
    $output['request'] = $request;
}

$stmt->close();
$conn->close();

print(json_encode($output))


?>