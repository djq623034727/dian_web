<?php
$user = Array("uid"=>"userid");
//文件存储路径
$file_path="./images/";
//664权限为文件属主和属组用户可读和写，其他用户只读。
if(is_dir($file_path) != TRUE) mkdir($file_path, 0664) ;
//定义允许上传的文件扩展名
$ext_arr = array("gif", "jpg", "jpeg", "png", "bmp");
if (empty($_FILES['file']) === false) {
    //判断检查
    $_FILES['file']['size'] > 2097152 AND exit("<script>parent.photost('failed!','对不起，您上传的照片超过了2M');</script>");
    $_FILES["file"]["error"] > 0 AND exit("<script>parent.photost('failed!','文件上传发生错误：".$_FILES["file"]["error"]."');</script>");
    //获得文件扩展名
    $temp_arr = explode(".", $_FILES["file"]["name"]);
    $file_ext = array_pop($temp_arr);
    $file_ext = trim($file_ext);
    $file_ext = strtolower($file_ext);
    //检查扩展名
    if (in_array($file_ext, $ext_arr) === false) {
        exit("<script>parent.photost('failed!','上传文件扩展名是不允许的扩展名');</script>");
    }
    //删除目录下相同前缀的文件
    if($dh = opendir($file_path)) {
        while(($file = readdir($dh)) !== false) {
            $file_arr = split('.',$file);
            if($file_arr[0] == $user['uid']) unlink($file_path.$file);
        }
    }
    //以uid重命名文件
    $new_name = $user['uid'].".".$file_ext;
    //将文件移动到存储目录下
    move_uploaded_file($_FILES["file"]["tmp_name"], $file_path.$new_name);
    echo("<script>parent.photost('OK','".$file_path.$new_name."');</script>");
}
else {
   echo("<script>parent.photost('failed!','无正确的图片上传');</script>");
}
?>