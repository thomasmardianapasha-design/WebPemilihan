
# Pemilihan Digital — HTML, CSS, JavaScript, Firebase

Starter project dengan 13 halaman, tema modern biru-putih, sidebar admin light.

## Penting
Ini adalah starter project untuk pengembangan dan pengujian, bukan sistem pemilihan produksi.
- WhatsApp OTP memerlukan Meta WhatsApp Cloud API melalui backend Firebase Cloud Functions.
- Pencocokan wajah pada halaman ini masih berupa alur UI/demo. Jangan menganggap selfie browser sebagai verifikasi identitas yang kuat.
- Jangan mengaktifkan pemilihan nyata sebelum audit keamanan, uji beban, uji pemulihan, pemeriksaan privasi, dan pengujian independen.
- Jangan menyimpan token Meta atau kredensial admin di file JavaScript frontend.
- Suara disimpan terpisah dari identitas pemilih pada rancangan data; jangan menambahkan voterId ke dokumen ballot.

## Menjalankan tampilan
1. Ekstrak folder `webpemilihan`.
2. Buka folder di VS Code.
3. Jalankan dengan ekstensi Live Server atau hosting lokal.
4. Isi `js/firebase-config.js` dengan konfigurasi proyek Firebase milikmu.
5. Aktifkan Authentication (Email/Password untuk admin) dan Firestore di Firebase Console.
6. Terapkan `firestore.rules` sebelum menguji database.

## Struktur
- `index.html` sampai `pengaturan.html`: 13 view.
- `css/`: styling responsif.
- `js/`: Firebase init dan logika antarmuka.
- `functions/`: contoh endpoint backend untuk integrasi WhatsApp OTP (belum aktif sampai dikonfigurasi).
- `firestore.rules`: aturan awal yang menolak akses publik langsung ke koleksi sensitif.

## Firebase setup
1. Buat project di https://console.firebase.google.com/
2. Tambahkan Web App dan salin konfigurasi ke `js/firebase-config.js`.
3. Aktifkan Authentication. Buat akun admin secara manual di Firebase Authentication.
4. Buat dokumen `admins/{uid}` di Firestore dengan `active: true`.
5. Buat koleksi `settings` dan dokumen `election` untuk pengaturan pemilihan.
6. Deploy rules setelah menyesuaikan kebutuhan dan menguji dengan Firebase Emulator.

## WhatsApp Cloud API
Jangan panggil Meta Graph API langsung dari browser. Simpan `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, dan konfigurasi lain sebagai secrets di Cloud Functions. Gunakan template pesan OTP yang sudah disetujui Meta. Contoh fungsi di `functions/index.js` adalah kerangka, bukan endpoint produksi.

## Data / privasi
Data NIM, nomor WhatsApp, dan foto wajah merupakan data pribadi. Kumpulkan hanya dengan persetujuan dan tujuan yang jelas, batasi akses admin, tetapkan masa retensi/penghapusan, dan jangan unggah foto wajah asli untuk demo. Untuk tugas kelas, gunakan data dummy.
