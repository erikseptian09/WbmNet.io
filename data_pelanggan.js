import { db } from "./firebase.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const tbody = document.getElementById("dataPelangganBody");

function tampilkanDataPelanggan() {
  const dbRef = ref(db);
  get(child(dbRef, "pelanggan")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      tbody.innerHTML = "";

      Object.entries(data).forEach(([id, pel]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pel.nama || '-'}</td>
          <td>${pel.idPelanggan || '-'}</td>
          <td>${pel.paket || '-'}</td>
          <td>Rp ${pel.harga?.toLocaleString("id-ID") || '0'}</td>
          <td>${pel.telepon || '-'}</td>
          <td>${pel.alamat || '-'}</td>
          <td><button onclick="alert('Bayar belum diaktifkan')">Bayar</button></td>
        `;
        tbody.appendChild(row);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="7">Data pelanggan kosong.</td></tr>`;
    }
  }).catch((error) => {
    console.error("Gagal ambil data:", error);
    tbody.innerHTML = `<tr><td colspan="7">Gagal ambil data dari Firebase.</td></tr>`;
  });
}

tampilkanDataPelanggan();
