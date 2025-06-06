import { db, ref, set, get, child, remove } from "./firebase.js";

const pelangganBody = document.getElementById("dataPelangganBody");

// Load data pelanggan dari Firebase
function loadPelanggan() {
  const dbRef = ref(db);
  get(child(dbRef, "pelanggan")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      tampilkanPelanggan(data);
    } else {
      pelangganBody.innerHTML = "<tr><td colspan='7'>Tidak ada data pelanggan.</td></tr>";
    }
  }).catch((error) => {
    console.error("Gagal mengambil data:", error);
  });
}

// Tampilkan data ke tabel
function tampilkanPelanggan(data) {
  pelangganBody.innerHTML = "";
  Object.entries(data).forEach(([id, pel]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pel.nama}</td>
      <td>${pel.idPelanggan}</td>
      <td>${pel.paket}</td>
      <td>Rp ${pel.harga.toLocaleString()}</td>
      <td>${pel.telepon}</td>
      <td>${pel.alamat}</td>
      <td><button onclick="konfirmasiBayar('${id}', ${pel.harga})">Bayar</button></td>
    `;
    pelangganBody.appendChild(row);
  });
}

// Fungsi konfirmasi bayar
window.konfirmasiBayar = function(id, harga) {
  const pelangganRef = ref(db, `pelanggan/${id}`);
  get(pelangganRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const lunasRef = ref(db, `lunas/${id}`);
      set(lunasRef, {
        ...data,
        tanggalBayar: new Date().toISOString()
      }).then(() => {
        remove(pelangganRef).then(() => {
          alert("Pembayaran berhasil!");
          loadPelanggan();
        });
      });
    }
  });
};

// Inisialisasi
loadPelanggan();