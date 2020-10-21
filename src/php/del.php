<?php
    header('content-type:text/html;charset=utf-8;');
    data_open();
    function data_open(){
        $con=mysqli_connect('127.0.0.1','root','root','shop',3306);
        if(mysqli_connect_error())return;
        del_for($con);
    }
    function del_for($con){
        $sql="DELETE FROM cart WHERE `product_name`='$_REQUEST[name]' AND `tel`='$_REQUEST[tel]'";
        $res=mysqli_query($con,$sql);
        if($res){
            print_r($_REQUEST['tel']);
        }else{
            print_r($res);
        }
    }


?>