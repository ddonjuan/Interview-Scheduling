<?php
require('./cross-origin.php');
require('./header.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);
$query = $request['query'];

$stmt = $conn->prepare("SELECT `hashpassword` FROM `user` WHERE `username` = ?");
$stmt->bind_param("s", $username);

$username = $query['userName'];
$password = $query['password'];
$stmt->execute();
$result = $stmt->get_result();
$output['success'] = false;
if($result->num_rows !== 0){
    while($row = $result->fetch_assoc()) {
        $hashpassowrd = $row['hashpassword'];
    }
    $valid = password_verify( $password, $hashpassowrd );
    if($valid){
        $output['success'] = true;
        //create token and store token
        require_once('jwt.php');
        $output['token'] = $jwt;
    } else {
        $output['error'] = "Invalid Password";
    }
} else {
    $output['error'] = "Invalid Username";
}
$stmt->close();
$conn->close();
print_r(json_encode($output));
?>