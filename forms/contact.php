<?php

  $receiving_email_address = 'waghmareshubham132@gmail.com';

  $from_name = $_POST['name'];
  $from_email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  $mailheader = "From: " . $from_name . "\r\n";

  mail($receiving_email_address,$subject,$message,$mailheader) or die("Error!");

  header('Location: index.html');
?>
