<?php
if(isset($_POST['submit'])) {
    //$to - адрес электронной почты, на который будет отправлено письмо
    //$subject - тема письма
    //$message - сам текст письма
    //$headers - дополнительные заголовки, такие как: адрес с которого осуществляется отправка, дополнительные адреса отправки и т.д.
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];

    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $tel = htmlspecialchars($tel);
    $name = urldecode($name);
    $email = urldecode($email);
    $tel = urldecode($tel);
    $name = trim($name);
    $email = trim($email);
    $tel = trim($tel);

    $to = 'yura_@tut.by';
    $subject = 'Тема письма';
    $message = '<span style="font-weight:bold;color:#ff6600;font-size:18px;"><i>Заказ звонка</i> </span><br><br>
        Имя: <span style="font-weight:bold;color:#339900;">'.$name.'</span><br>
        Телефон: <span style="font-weight:bold;color:#339900;"> '.$tel.'</span>';
        Email: <span style="font-weight:bold;color:#339900;"> '.$email.'</span>';
    $headers = "Content-type: text/html; charset=UTF-8 \r\n";
    $headers .= "From: <yura_87_@mail.ru>\r\n";

    //echo $name;
    //echo "<br>";
    //echo $email;
    if (mail($to, $subject, $message, $headers))
     {     echo "сообщение успешно отправлено";
    } else {
        echo "при отправке сообщения возникли ошибки";
    }
}
?>
