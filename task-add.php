<?php

include('database.php');

if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $descripcion = $_POST['descripcion'];
    # $id = 1;
    $query = "INSERT into task(name, descripcion) VALUES ('$name', '$descripcion')";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed.');
    }
    echo "Task Added Successfully";
}

?>