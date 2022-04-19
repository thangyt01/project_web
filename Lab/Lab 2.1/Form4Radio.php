<html>
    <head>
        <title>
            Receiving Input
        </title>
    </head>
    <body>
        <font size = 5>Thanh You: Go Your Input</font>
        <?php
            $email = $_POST["email"];
            $contact = $_POST["contact"];
            print("<br>Your mail address is $email");
            print("<br>Coctact preference is $contact");
        ?>
    </body>
</html>