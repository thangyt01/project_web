# Giới thiệu
- Project cho phần backend & api của BKWatch.me
- Framework sử dụng: NodeJS >v10
- Database: MySQL 8.0

# Cấu trúc thư mục
* Server starts from bin/www.js
* `config` chứa các config
* `database` chứa các function query vào database
* `logs` chứa các file logs của web
* `hac` chứa các functions/variable utils hay sử dụng
* `src` folder contains all logic code
    - `components`: Chứa toàn bộ logic cho các api của web, mỗi component tương ứng với 1 đối tượng trong web, cụ thể
        + `auth`: API cho phần xác thực thông tin cá nhân.
        + `order`: API cho phần đơn hàng.
        + `product`: API cho phần sản phẩm.
        + `user`: API cho phần người dùng.
        -----------------
        + Cấu trúc 1 folder trong components thông thường có 4 files
            - `xxxConstant.js`: Chứa các constant cho component
            - `xxxValidator.js`: Chứa các validation cho component: mục đích kiểm tra tính hợp lệ của data gửi tới api
            - `xxxService.js`: Chứa các xử lý logic và thao tác với db
            - `xxxController.js`: Filter data -> gửi tới service, nhận kết quả từ service và response
    - `helpers`: Chứa các functions/utils hay sử dụng
    - `middleware`: Chứa các middlewares
    - `routers`: Chứa các routers của các components
    - `app.js`: setup req, res

# Start project
Cài đặt node_modules
```bash
    npm install
```
Run project
```bash
    npm start
```

## API Reference

#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Register

```http
  POST /api/auth/register
```

| Parameter | Type     | Description   |
| :-------- | :------- | :-------------|
| `username`| `string` | **Required**. |
| `password`| `string` | **Required**. |
| `re_password`| `string` | **Required**. |
| `email`| `string` | **Allow null**. |
| `firstname`| `string` | **Required**. |
| `lastname`| `string` | **Required**. |


# License

[MIT](https://choosealicense.com/licenses/mit/)
