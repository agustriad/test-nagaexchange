# NagaExchange Test Code

Repository ini dibuat untuk keperluan **test code dari PT NagaExchange**.

---

## Tech Stack

- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

---

## ⚙️ Cara Menjalankan (via Docker)

> Pastikan Anda sudah menginstall Docker di sistem Anda.

1. Clone repository ini:
    ```bash
    git clone https://github.com/agustriad/test-nagaexchange.git
    cd test-nagaexchange
    ```

````

2. Buat file `.env` berdasarkan file `.env.example`

   ```bash
   cp .env.example .env
   ```

3. Jalankan Docker Compose:

   ```bash
   docker compose up --build
   ```

4. Akses API di:

   ```
   http://localhost:4000/api
   ```

---

## 📌 API Endpoint List

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api`                     | Swagger API Docs           |
| POST   | `/register`                | Register user              |
| POST   | `/login`                   | Login user                 |
| POST   | `/user`                    | Create user                |
| GET    | `/user/:id`                | Get user by ID             |
| GET    | `/transaction`             | Get list transactions      |
| GET    | `/transaction/:id`         | Get info transaction       |
| POST   | `/transaction/process`     | Create new transaction     |
| POST   | `/transaction/process/:id` | Update transaction by id   |
| ...    |                            |                            |

> 📘 Dokumentasi lengkap dapat diakses melalui Swagger:
>
> [http://localhost:4000/api](http://localhost:4000/api)

---

## 👤 Biodata

* **Nama**: Agus Triadji
* **Email**: [agus.triadji@gmail.com](mailto:agus.triadji@gmail.com)
* **Kontak**: +62 838 7173 7555
* **LinkedIn**: [https://www.linkedin.com/in/agus-triadji-7b69942b/](https://www.linkedin.com/in/agus-triadji-7b69942b/)

---

## 📁 Struktur Dockerfile

```Dockerfile
# Base
FROM node:lts-bullseye-slim AS base
WORKDIR /usr/src
COPY package*.json ./
RUN npm install

# Build
FROM base AS build
COPY . .
RUN npm run build

# Local Development
FROM base AS local
COPY . .
CMD ["npm","run","start:dev"]

# Production Release
FROM base AS release
RUN npm ci --only=production
COPY --from=build /usr/src ./
CMD ["npm", "run", "setup:prod"]
```

---

## 📝 Catatan

* Harap pastikan `.env` telah dikonfigurasi dengan benar.
* Port default API adalah `4000`, dapat diubah via `.env`.

---

Jika Anda butuh bantuan, silakan hubungi saya melalui email atau LinkedIn yang tertera di atas.

```
````
