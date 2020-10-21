<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE rebox (
			id VARCHAR(300) NOT NULL PRIMARY KEY,
			tel VARCHAR(300) NOT NULL,
			area VARCHAR(200) NOT NULL,
			password VARCHAR(30) NOT NULL,
			email VARCHAR(30) NOT NULL
)";
$result = mysqli_query($conn,$sql);
if (!$result) {
	printf("Error: %s\n", mysqli_error($conn));
	exit();
	};
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>