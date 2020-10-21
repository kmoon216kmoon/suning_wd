<?php
    header('content-type:text/html;charset=utf-8;');
    data_open();
    function data_open(){
        $connct=mysqli_connect('127.0.0.1','root','root','shop',3306);
        if(mysqli_connect_error())return;
        select_in($connct);
    }
    function select_in($connct){
        // $sql="SELECT FROM `regbox` WHERE `tel`='$_REQUEST[tel]' AND `password`='$_REQUEST[password]'";
        $sql="SELECT*FROM regbox WHERE `tel`='$_REQUEST[tel]' AND `password`='$_REQUEST[password]'";
        $row=mysqli_query($connct,$sql);
        // if (!$row) {
        //     printf("Error: %s\n", mysqli_error($connct));
        //     exit();
        //     };
        $res=mysqli_fetch_row($row);
        if($res){
            $arr=array('code'=>1,'tel'=>$res[1]);
        }else{
            echo 0;
        }
        echo json_encode($arr);
    }


?>