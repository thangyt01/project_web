# vào terminal tại thư mục /project/api
docker-compose up                           # cài đặt container (chạy file docker-compose.yml)

# chạy các lệnh sau khi khởi tạo container
docker exec -it db bash                     # vào container
apt-get update && apt-get install vim -y    # cài vim

# vào mysql với password root@1234
mysql -proot@1234

# chạy các query
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root@1234';
FLUSH PRIVILEGES;
exit;
exit;

# Ra khỏi container và gõ để khởi động lại
docker restart db

# Chạy container (bật mysql)
docker-compose start

# Dừng container (tắt mysql)
docker-compose stop

# Gỡ cài đặt container
docker-compose down

# Kết nối với mysql
host: localhost
port: 33061
user: root
password: root@1234