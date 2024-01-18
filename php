<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $quantity = $_POST["quantity"];

    // Use a mail function or a library to send an email
    mail("zouhair922@gmail.com", "New Order", "Name: $name\nAddress: $address\nPhone: $phone\nEmail: $email\nQuantity: $quantity");

    // Redirect to success page or perform other actions
    header("Location: /success.html");
    exit;
}
?>
