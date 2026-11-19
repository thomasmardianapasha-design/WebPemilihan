
// Alur login dan voting E-Voting
// Versi demo antarmuka. Belum terhubung ke autentikasi Firebase.

const getElement = (selector) => document.querySelector(selector);

const setMessage = (selector, text) => {
  const element = getElement(selector);
  if (element) {
    element.textContent = text;
  }
};

// ===================================
// LOGIN PEMILIH MENGGUNAKAN NTA
// ===================================

const ntaForm = getElement("#nta-form");

if (ntaForm) {
  ntaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nta = getElement("#nta")?.value.trim();
    const password = getElement("#password")?.value;

    if (!nta || !password) {
      setMessage("#form-message", "NTA dan password wajib diisi.");
      return;
    }

    // Demo saja: belum memvalidasi akun melalui Firebase.
    sessionStorage.setItem("demo_nta", nta);

    location.href = "voting.html";
  });
}

// ===================================
// MEMILIH KANDIDAT
// ===================================

const continueVoteButton = getElement("#continue-vote");

if (continueVoteButton) {
  continueVoteButton.addEventListener("click", () => {
    const selectedCandidate = document.querySelector(
      'input[name="candidate"]:checked'
    );

    if (!selectedCandidate) {
      setMessage(
        "#vote-message",
        "Pilih salah satu pasangan terlebih dahulu."
      );
      return;
    }

    sessionStorage.setItem(
      "demo_candidate",
      selectedCandidate.value
    );

    location.href = "confirmation.html";
  });
}

// ===================================
// MENAMPILKAN PILIHAN KANDIDAT
// ===================================

const chosenCandidate = getElement("#chosen-candidate");

if (chosenCandidate) {
  const candidateId = sessionStorage.getItem("demo_candidate");

  chosenCandidate.textContent =
    candidateId === "candidate-01"
      ? "Pasangan Kandidat 01"
      : candidateId === "candidate-02"
        ? "Pasangan Kandidat 02"
        : "Belum ada pilihan";
}

// ===================================
// KONFIRMASI VOTING
// ===================================

const submitVoteButton = getElement("#submit-vote");

if (submitVoteButton) {
  submitVoteButton.addEventListener("click", () => {
    setMessage(
      "#confirm-message",
      "Voting demo belum disimpan. Integrasikan backend Firebase sebelum digunakan."
    );
  });
}
