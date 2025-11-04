# Sử dụng Python làm base image
FROM python:3.11-slim

# Đặt thư mục làm việc
WORKDIR /app

# Copy file cần thiết
COPY requirements.txt .

# Cài đặt các thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ code vào container
COPY . .

# Chạy Flask (port 5000)
CMD ["flask", "run", "--host=0.0.0.0"]
