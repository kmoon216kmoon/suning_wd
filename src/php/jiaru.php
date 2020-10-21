<?php
    header('content-type:text/html;charset=utf-8;');
    data_open();
    function data_open(){
        $con=mysqli_connect('127.0.0.1','root','root','shop',3306);
        if(mysqli_connect_error())return;
        jiaru($con);
    }
    function jiaru($con){
            $sql="SELECT*FROM cart WHERE `tel`='$_REQUEST[tel]' AND `product_name`='$_REQUEST[name]'";
        $row=mysqli_query($con,$sql);
        $reses=mysqli_num_rows($row);
            print_r($reses);
            if($reses){
                    $res=mysqli_fetch_assoc($row);
                    // print_r($res);
                    $num=$res['product_num']+$_REQUEST['num'];
                    print_r($num);
                    $sql="UPDATE `cart` SET `product_num`='$num' WHERE  `product_name`='$_REQUEST[name]'";
                }else{
                    $sql="INSERT INTO cart (`product_name`,`product_num`,`product_price`,`product_img`,`tel`,`product_gg`) VALUES ('$_REQUEST[name]','$_REQUEST[num]','$_REQUEST[price]','$_REQUEST[img]','$_REQUEST[tel]','$_REQUEST[gg]')";
                }
                
        $result=mysqli_query($con,$sql);
        print_r($result);
        if($result){
            echo 1;
            printf($_REQUEST['name']);
        }else{
            echo 0;
        }
    }

?>