// admin.js
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const tabel = document.getElementById("tabelPelanggan");

function tampilkanData() {
  const pelangganRef = ref(db, "pelanggan");

  onValue(pelangganRef, (snapshot) => {
    const data = snapshot.val();
    tabel.innerHTML = ""; // Bersihkan isi tabel

    if (data) {
      Object.keys(data).forEach((id) => {
        const p = data[id];
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.nama}</td>
          <td>${p.idPelanggan}</td>
          <td>${p.paket}</td>
          <td>Rp ${p.harga}</td>
          <td>${p.telepon}</td>
          <td>${p.alamat}</td>
          <td><button onclick="hapusPelanggan('${id}')">Hapus</button></td>
        `;
        tabel.appendChild(row);
      });
    } else {
      tabel.innerHTML = "<tr><td colspan='7'>Data kosong</td></tr>";
    }
  });
}

tampilkanData();
