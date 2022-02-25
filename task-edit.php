<?php 

include('database.php');

$id = $_POST['id'];
$name = $_POST['name'];
$descripcion = $_POST['descripcion'];

$query = "UPDATE task SET name = '$name', descripcion = '$descripcion' WHERE id = '$id'";

$result = mysqli_query($connection, $query);

if (!$result) {
    die('Query Failed');
}

echo "Update Task Successfuly";

?>