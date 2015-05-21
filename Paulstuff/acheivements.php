<?php
$cookie_name = "user";
$cookie_value;
	//connects to server
    $title = "Achievements";
    $active = "achievements";
	$servername = "mysql10.000webhost.com";
	$username = "a8448796_paullol";
	$password = "paul123";
	$dbname = "a8448796_paullol";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	//check connection
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	} 	

	//gives cookie a random value
	if($_COOKIE == null) {
	$cookie_value = rand(0, PHP_INT_MAX);
	setcookie($cookie_name, $cookie_value, time() + (86400 * 40000));
	echo "setting cookie <br>";
    echo $cookie_value;
	} else {
    echo "Cookie is set!<br>";
    echo $_COOKIE[$cookie_name];
    $cookie_value = $_COOKIE[$cookie_name];
	}
	
	//sets variables to form values true or false
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$achiev1 = $_POST["achievement1"];
		$achiev2 = $_POST["achievement2"];
		$achiev3 = $_POST["achievement3"];
			
		//sets achievements in table to complete if true
		If ($achiev1 == 'true'){
			If($_COOKIE == null) {
				$sql = "INSERT INTO achievements (userID ,Achievement1)
				VALUES ('$cookie_value', '$achiev1')";
				if ($conn->query($sql) === TRUE) {
					echo "New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			} else{
				$sql = "UPDATE achievements
				SET Achievement1 = '$achiev1'
				WHERE userID = '$cookie_value'";
				if ($conn->query($sql) === TRUE) {
					echo "<br>New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
		}
		If ($achiev2 == 'true'){
			If($_COOKIE == null) {
				$sql = "INSERT INTO achievements (userID ,Achievement1)
				VALUES ('$cookie_value', '$achiev2')";
				if ($conn->query($sql) === TRUE) {
					echo "<br>New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			} else{
				$sql = "UPDATE achievements
				SET Achievement2 = '$achiev2'
				WHERE userID = '$cookie_value'";
				if ($conn->query($sql) === TRUE) {
					echo "<br>New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
		}
		If ($achiev3 == 'true'){
			If($_COOKIE == null) {
				$sql = "INSERT INTO achievements (userID ,Achievement1)
				VALUES ('$cookie_value', '$achiev3')";
				if ($conn->query($sql) === TRUE) {
					echo "<br>New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			} else{
				$sql = "UPDATE achievements
				SET Achievement3 = '$achiev3'
				WHERE userID = '$cookie_value'";
				if ($conn->query($sql) === TRUE) {
					echo "<br>New record created successfully<br>";
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
		}
		$sql = "SELECT Achievement1
		FROM achievements
		WHERE userID = '$cookie_value'";
		$itemList = $conn->query($sql);
		while($row = $itemList->fetch_assoc()) {
			if ($row['Achievement1'] == 'true'){
				echo '<br>You have unlocked achievement 1: Out of Time.<br>';
			} else{
				echo 'achievement 1 not unlocked yet<br>';
			}
		}
		$sql = "SELECT Achievement2
		FROM achievements
		WHERE userID = '$cookie_value'";
		$itemList = $conn->query($sql);
		while($row = $itemList->fetch_assoc()) {
			if ($row['Achievement2'] == 'true'){
				echo 'You have unlocked achievement 2: First steps.<br>';
			} else{
				echo 'achievement 2 not unlocked yet<br>';
			}
		}
		$sql = "SELECT Achievement3
		FROM achievements
		WHERE userID = '$cookie_value'";
		$itemList = $conn->query($sql);
		while($row = $itemList->fetch_assoc()) {
			if ($row['Achievement3'] == 'true'){
				echo 'You have unlocked achievement 3: Master of the walk.<br>';
			} else{
				echo 'achievement 3 not unlocked yet<br>';
			}
		}
	}
?>