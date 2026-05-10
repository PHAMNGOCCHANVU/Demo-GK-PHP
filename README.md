# Demo-GK-PHP

## Clone dự án

Lệnh để clone dự án Laravel về:

```bash
git clone https://github.com/PHAMNGOCCHANVU/Demo-GK-PHP.git
```

## Các bước cài đặt

Thực hiện các bước cơ bản sau theo thứ tự:

### 1. Cài đặt thư viện PHP (Composer)

```bash
composer install
```

> Lệnh này tải các package trong file `composer.json` về thư mục `vendor`.

### 2. Cài đặt thư viện Frontend (NPM/Bun)

```bash
npm install && npm run dev
```

> Để biên dịch CSS/JS. Nếu dự án dùng Vite hoặc Mix thì bước này rất quan trọng.

### 3. Tạo file cấu hình môi trường (.env)

```bash
cp .env.example .env
```

Sau đó bạn hãy mở file `.env` lên để cấu hình Database và các thông số cần thiết.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ten_database_cua_ban
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Tạo khóa bảo mật (App Key)

```bash
php artisan key:generate
```

### 5. Chạy Database Migration

```bash
php artisan migrate
```

> Nếu dự án có dữ liệu mẫu, bạn có thể chạy `php artisan migrate --seed`.

### 6. Khởi động server

```bash
php artisan serve
```

## Chạy project

Để chạy project cần run song song:

```bash
php artisan serve
```

```bash
npm run dev