# AWS-FASTAPI-TODO-APP

## Deskripsi Proyek

AWS-FASTAPI-TODO-APP adalah aplikasi TODO tingkat lanjut yang dibangun dengan arsitektur terpisah (decoupled), mendukung multi-user, dan di-deploy secara penuh di AWS. Proyek ini bertujuan untuk mendemonstrasikan cara membangun aplikasi fullstack production-grade menggunakan layanan serverless AWS dan framework modern.

---

## Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Arsitektur](#arsitektur)
3. [Cara Menjalankan](#cara-menjalankan)
4. [Infrastructure as Code](#infrastructure-as-code)
5. [Dependencies](#dependencies)


## Fitur Utama

- Backend menggunakan AWS Lambda Functions (Python runtime) dan FastAPI.
- Database menggunakan DynamoDB dengan pendekatan Single Table Design.
- Frontend dibangun dengan React + Vite, di-deploy sebagai static website di S3 Bucket.
- Mendukung autentikasi dan otorisasi dengan API Keys dan Cognito User Pool.
- Infrastruktur dikelola dengan AWS CDK (Python) atau Terraform.
- Pengujian menggunakan PyTest.
- Manajemen dependensi dengan Python Poetry.

---

## Arsitektur

- **Backend:** FastAPI berjalan di AWS Lambda, diakses melalui API Gateway, menyimpan data di DynamoDB, dan mendukung autentikasi via Cognito atau API Key.
- **Frontend:** React + Vite di-deploy ke S3 Bucket sebagai static website.
- **Infrastructure as Code:** Pilihan antara AWS CDK (Python) atau Terraform untuk provisioning resource AWS.

---

## Cara Menjalankan

1. **Clone repository ini.**
2. **Pilih metode deployment:**
  - Untuk CDK: lihat [`cdk/important_commands.sh`](cdk/important_commands.sh)
  - Untuk Terraform: lihat [`terraform/important_commands.sh`](terraform/important_commands.sh)
3. **Update konfigurasi sesuai kebutuhan (akun, region, dsb).**
4. **Ikuti instruksi pada masing-masing file untuk deploy/destroy.**

---

## Infrastructure as Code

Dua opsi utama untuk provisioning infrastruktur:

- [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/)
- [Terraform](https://www.terraform.io)

Pilih sesuai preferensi dan kebutuhan proyek.

---

## Dependencies

### Software Utama

- [Node.js](https://nodejs.org/en/) - Diperlukan untuk CDK.
- [Python](https://www.python.org) - Untuk backend dan CDK Python.
- [Visual Studio Code](https://code.visualstudio.com/) - Editor rekomendasi.

### Library & Tools

- [AWS CLI](https://aws.amazon.com/cli/) - Untuk autentikasi dan manajemen AWS.
- [CDK CLI](https://docs.aws.amazon.com/cdk/v2/guide/cli.html) - Untuk deployment dengan CDK.
- [Terraform](https://www.terraform.io) - Alternatif provisioning infrastruktur.


