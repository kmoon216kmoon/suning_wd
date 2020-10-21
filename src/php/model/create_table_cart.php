<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE cart (
			product_id VARCHAR(300) NOT NULL PRIMARY KEY,
			product_name VARCHAR(300) NOT NULL,
			product_img VARCHAR(200) NOT NULL,
			product_price VARCHAR(30) NOT NULL,
			product_num VARCHAR(30) NOT NULL,
			submission_date TIMESTAMP,
			product_gg VARCHAR(30) NOT NULL,
			tel VARCHAR(30) NOT NULL
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