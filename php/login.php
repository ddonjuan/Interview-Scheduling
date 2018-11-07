<?php
require('./cross-origin.php');
require('./header.php');
$password = "test";
$stmt = $conn->prepare("SELECT `hashpassword` FROM `user` WHERE `username` = ?");
$stmt->bind_param("s", $username);
$username = "test";
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
    } else {
        $output['error'] = "Invalid Username or Password";
    }
} else {
    $output['error'] = "Invalid Username or Password";
}
$stmt->close();
$conn->close();
print_r(json_encode($output));
?>