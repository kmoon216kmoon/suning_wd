<?php
    header('content-type:text/html;charset=utf-8;');
    database_open();
    function database_open(){
        $connect=mysqli_connect('127.0.0.1','root','root','shop','3306');
        if(mysqli_connect_error())return;
        insert_to($connect);
    };
    function insert_to($connect){
        $sql="INSERT INTO `regbox` VALUES (null,'$_REQUEST[tel]','$_REQUEST[area]','$_REQUEST[password]','$_REQUEST[email]')";
        $res=mysqli_query($connect,$sql);
        if($res){
            echo 1;
        }else{
            echo 0;
        };
    };
    
?>