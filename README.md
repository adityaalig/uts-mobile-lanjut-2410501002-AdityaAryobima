# BookShelf - Aplikasi Katalog Buku

# NAMA  : ADITYA ARYOBIMA
# NIM   : 2410501002
# KELAS : B
# Tema C

# Tech Stack & Versi
Berdasarkan `package.json`, aplikasi ini menggunakan:
- **Framework:** React Native(v0.81.5) + Expo SDK (~54.0.33)
- **Library Utama:** React (v19.1.0)
- **Navigation:** 
    - `@react-navigation/native` (v7.2.2) 
    - `@react-navigation/bottom-tabs` (v7.15.9)
    - `@react-navigation/native-stack` (v7.14.11)

- **Support Library:**
    - react-native-screens (~4.16.0)
    - react-native-safe-area-context (~5.6.0)

- **Icons:** `@expo/vector-icons` (Ionicons)
- **State Management:** Context API + useReducer
- **HTTP Client:** Native Fetch API

# Cara install & run
- **Clone Repositori:**
    - git clone https://github.com/adityaalig/uts-mobile-lanjut-2410501002-AdityaAryobima 
- **Masuk Direktori Proyek:**
    - cd uts_mobile_lanjut_bookshelf
- **Instalasi Dependensi:**
    - npm install
- **Jalankan Expo:**
    - npx expo start

# Screenshot Tampilan
![Home screen](./screenshots/homescrenn.jpeg)
![Detail screen](./screenshots/detailscreen.jpeg)
![search screen](./screenshots/searchscreen1.jpeg)
![Search screen jika ada inputan](./screenshots/searchscreen2.jpeg)
![Favorite screen](./screenshots/favoritescreen.jpeg)
![About screen](./screenshots/aboutscreen.jpeg) 
![Error handling](./screenshots/errorhandling.jpeg) 

# Link Video Demo
https://drive.google.com/file/d/1u8mR33KDtW7M3k4rpN0asyau2D1I3v0i/view?usp=sharing 

# State Management
Untuk mengelola data di aplikasi ini, saya menggunakan kombinasi api context dan useReducer. Alasannya, saya ingin pembagian tugas dalam kode ini menjadi lebih jelas. di sini Context API saya gunakan sebagai “jembatan” agar data, seperti daftar favorit, bisa diakses di berbagai layar tanpa perlu dikirim secara manual. Sementara itu, useReducer saya gunakan sebagai pusat kendali logika aplikasinya. Dengan begitu, pada bagian tampilan hanya berfokus untuk menampilkan data dan mengirim perintah saja, seperti menambah atau menghapus favorit. Jadi hasilnya, kode akan lebih rapi, mudah dikembangkan, dan lebih sederhana dalam proses pemeliharaan.

# Refleksi Pengerjaan
Dalam proses pengerjaan uts ini, saya mendaptkan banyak pengalaman dalam menggunakan react native dan expo, khususnya itu dalam memahami alur pengembangan aplikasi mobile. Namun, di balik pemahaman itu semua, saya juga menghadapi berbagai tantangaan yang cukup menguji pemahaman saya. Tantangan utama yang saya alami itu ada pada proses integrasi API OpenLibrary, karena struktur data yang diberikan oleh API itu tidak konsisten dan terkadang membingungkan. Oleh karena itu, saya perlu menerapkan teknik doble fetching untuk mengambil dan menampilkan data penulis secara lengkap. Selain itu, saya juga sempat mengalami error pada bagian foto profil di AboutScreen akibat kesalahan dalam menuliskan relative path serta adanya cache pada Expo, yang membuat saya harus lebih teliti dalam mengelola aset. Dari situ, saya mulai unutk memahami pentingnya memperhatikan detail detail kecil seperti itu. Saya juga mempelajari cara mengelola state menggunakan api context dan useReducer, karena state itulah yang membantu saya dalam memisahkan logika aplikasi dan tampilan agar lebih rapi.

# Referensi
    - https://openlibrary.org/developers/api 
    - https://reactnavigation.org/docs/getting-started 



