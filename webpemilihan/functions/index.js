
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

// ===================================
// PROSES PENYIMPANAN SUARA
// ===================================

exports.castVote = onCall(async (request) => {
  // Pastikan pengguna sudah login
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Silakan login terlebih dahulu."
    );
  }

  // Ambil identitas akun dari Firebase Authentication
  const voterUid = request.auth.uid;

  // Ambil kandidat yang dipilih
  const candidateId = request.data?.candidateId;

  if (!candidateId) {
    throw new HttpsError(
      "invalid-argument",
      "Kandidat harus dipilih."
    );
  }

  // BELUM DIAKTIFKAN:
  // Perlu disesuaikan dengan struktur koleksi Firestore.
  // Proses voting nantinya menggunakan transaksi server.
  // Identitas pemilih tidak boleh disimpan bersama isi ballot.

  throw new HttpsError(
    "unimplemented",
    "Sistem penyimpanan suara belum dikonfigurasi."
  );
});
