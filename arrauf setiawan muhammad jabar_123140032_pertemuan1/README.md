# 📚 Manajemen Tugas Akademik Mahasiswa

## ✨ Penjelasan Singkat Aplikasi dan Fitur

Aplikasi **Manajemen Tugas Akademik Mahasiswa** adalah alat yang dirancang untuk membantu mahasiswa mengelola, melacak, dan memprioritaskan tugas-tugas akademik secara efisien.

Aplikasi ini menggunakan **Local Storage** pada *browser* pengguna untuk menyimpan data secara lokal, sehingga data tugas tetap tersimpan meskipun *browser* ditutup dan dibuka kembali.

---
### 1. Penerapan local storage
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/505766f8-e98c-4a93-9502-b0617e297317" />

### 2. Penerapan validasi form 
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/aaffb07d-c967-4198-ba37-dc726aa2c2e4" />

### 3. jumlah tugas yang fleksibel ketika tugas sudah di selesaikan
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/5685cef9-3775-496d-99f4-26fc67c04b46" />
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/ebfdac68-030b-43eb-9272-ef24ef6dabca" />

---
## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini sepenuhnya *client-side* dan tidak memerlukan *server* atau *dependency* eksternal.

1.  **Unduh File:** Pastikan Anda memiliki ketiga file berikut di dalam satu folder:
    * `index.html`
    * `style.css`
    * `script.js`
2.  **Buka di Browser:** Klik dua kali pada file **`index.html`** atau buka *browser* Anda dan *drag-and-drop* file tersebut ke jendela *browser*.
3.  **Aplikasi Siap Digunakan:** Aplikasi akan segera memuat dan, jika ada, memuat data tugas yang tersimpan sebelumnya di **Local Storage**

---

## ✅ Daftar Fitur yang Telah Diimplementasikan

* **CRUD Tugas:** Menambah, mengedit (melalui *toggle* status), dan menghapus tugas.
* **Detail Tugas:** Setiap tugas menyimpan informasi: **Nama Tugas**, **Mata Kuliah**, dan **Deadline**.
* **Status Tugas:** Kemampuan untuk menandai tugas sebagai **Selesai** atau **Belum Selesai**.
* **Prioritas & Pengurutan:**
    * **Prioritas Otomatis:** Tugas yang **Belum Selesai** selalu ditampilkan di bagian atas daftar.
    * **Pengurutan Cerdas:** Di antara tugas yang belum selesai, tugas diurutkan berdasarkan **deadline terdekat**.
* **Filter/Pencarian:**
    * Filter berdasarkan **Status** (Semua, Belum Selesai, Selesai).
    * Pencarian *real-time* berdasarkan **Mata Kuliah**.
* **Ringkasan Cepat:** Menampilkan jumlah total tugas yang **Belum Selesai**.
* **Validasi Form:** Menerapkan validasi pada input pengguna (nama tidak boleh kosong, *deadline* harus valid/masa depan).
---

## 👨‍💻 Penjelasan Teknis: Local Storage dan Validasi Form

Aplikasi ini sepenuhnya berjalan di sisi klien (*client-side*) menggunakan JavaScript murni dan mengandalkan fitur bawaan *browser* untuk persistensi data dan kontrol kualitas input.

### 1. 💾 Penggunaan Local Storage untuk Persistensi Data

* **Penyimpanan Data (Saving):**
    * Setiap kali ada perubahan (tambah, hapus, atau *toggle* status), *array* tugas JavaScript (`tasks`) diubah menjadi *string* menggunakan **`JSON.stringify(tasks)`**.
    * *String* JSON ini kemudian disimpan di `localStorage` dengan kunci **`'tasks'`** melalui perintah **`localStorage.setItem()`**.
* **Pengambilan Data (Loading):**
    * Saat halaman dimuat, data diambil menggunakan **`localStorage.getItem('tasks')`**.
    * *String* JSON yang diambil diubah kembali menjadi *array* JavaScript menggunakan **`JSON.parse()`**.
* **Inisialisasi:** Proses *loading* ini dipicu oleh *event listener* **`DOMContentLoaded`** yang memastikan tugas dimuat segera setelah halaman HTML siap.

### 2. ✅ Implementasi Validasi Form (Fungsi `validateTask`)

Validasi diterapkan sebelum tugas baru diizinkan masuk ke daftar `tasks` untuk menjaga integritas data.

* **Validasi Nama Tugas:** Memeriksa apakah input nama tugas kosong atau hanya berisi spasi putih (menggunakan **`!name.trim()`**).
    * *Pesan Error:* "Nama tugas tidak boleh kosong."
* **Validasi Deadline Wajib Isi:** Memeriksa apakah kolom input tanggal *deadline* telah diisi (**`!deadline`**).
    * *Pesan Error:* "Deadline tugas wajib diisi."
* **Validasi Deadline Masa Lalu:** Membandingkan tanggal *deadline* yang dimasukkan dengan tanggal hari ini. Jika tanggal *deadline* berada di masa lalu (**`deadlineDate < today`**), validasi gagal.
    * *Pesan Error:* "Deadline tidak valid atau sudah terlewat."
* **Mekanisme Tampilan Error:** Jika salah satu validasi gagal, pesan *error* ditampilkan kepada pengguna di elemen khusus di bawah *form* (**`id="form-error"`**).
