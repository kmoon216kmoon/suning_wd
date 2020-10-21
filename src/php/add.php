<?php
    header('content-type:text/html;charset=utf-8;');
    data_open();
    function data_open(){
        $con=mysqli_connect('127.0.0.1','root','root','shop',3306);
        if(mysqli_connect_error())return;
        add_in($con);
    }
    function add_in($con){
        $sql="SELECT * FROM cart WHERE `tel`='$_REQUEST[tel]' AND `product_name`='$_REQUEST[name]'";
        $row=mysqli_query($con,$sql);
        $res=mysqli_fetch_assoc(($row));
        $num=$res['product_num'];
        if($_REQUEST['type']=="add"){
            $num=$num+1;
            $sql="UPDATE cart SET `product_num`='$num' WHERE `product_name`='$_REQUEST[name]' AND `tel`='$_REQUEST[tel]'";
        }else{
            $num=$num-1;
            if($num>0){
                $sql="UPDATE cart SET `product_num`='$num' WHERE `product_name`='$_REQUEST[name]' AND `tel`='$_REQUEST[tel]'";
            }
        }
        $result=mysqli_query($con,$sql);
        if($result){
            echo json_encode(array("code"=>1,"num"=>$num));
        }else{
            echo 0;
        }
    }


?>