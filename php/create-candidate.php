<?php
require('./header.php');
require('./cross-origin.php');


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);

$stmt = $conn->prepare("INSERT INTO `candidate` (`id`, `firstname`, `lastname`, `email`, `phone`, `school`, `year`, `cv`, `essay1`, `essay2`, `interest`, `time`, `status`, `token`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)");
$stmt->bind_param("sssssisssssi", $firstname, $lastname, $email, $phone, $school, $year, $cv, $essay1, $essay2, $interest, $status, $token);

$firstname = $request['firstname'];
$lastname = $request['lastname'];
$email = $request['email'];
$phone = $request['phone'];
$school = $request['school'];
$year = $request['yearOfGraduation'];
$cv = $request['cv'];
$essay1 = "";
$essay2 = "";
$interest = $request['department'];
$status = 0;
$token = 0;

$output['success'] = false;


if($stmt->execute()){
    $output['success'] = true;
}else{
    $output['error'] = $stmt->error;
}

$stmt->close();
$conn->close();

print(json_encode($output))
?>