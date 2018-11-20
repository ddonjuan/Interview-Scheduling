<?php
require('./cross-origin.php');
require('./header.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);

$stmt = $conn->prepare("INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `hashpassword`, `email`, `token`, `privilege`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)");
$stmt -> bind_param("ssssssi", $username, $firstname, $lastname, $hashpassword, $email, $token, $privilege);

$username = $request['username'];
$firstname = $request['firstname'];
$lastname = $request['lastname'];
$hashpassword = password_hash("test", PASSWORD_DEFAULT);
$email = $request['email'];
$token = "test";
$privilege = 0;

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