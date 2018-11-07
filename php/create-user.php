<?php
require('./cross-origin.php');
require('./header.php');


$stmt = $conn->prepare("INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `hashpassword`, `email`, `token`, `privilege`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)");
$stmt -> bind_param("ssssssi", $username, $firstname, $lastname, $hashpassword, $email, $token, $privilege);

$username = "test";
$firstname = "test";
$lastname = "test";
$hashpassword = password_hash("test", PASSWORD_DEFAULT);
$email = "test";
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