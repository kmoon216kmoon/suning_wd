<?php
    header('content-type:text/html;charset=utf-8;');
    data_open();
    function data_open(){
        $con=mysqli_connect('127.0.0.1','root','root','shop',3306);        
        if(mysqli_connect_error())return;
        select_in($con);
    };
    function select_in($con){
        $sql="SELECT*FROM cart WHERE `tel`='$_REQUEST[tel]'";
        $row=mysqli_query($con,$sql);
        $res=mysqli_fetch_all($row);
        if($row){
            print_r(json_encode($res));
        }
    }

?>