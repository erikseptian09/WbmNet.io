import { db } from "./firebase.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Fungsi untuk ambil dan tampilkan data dari node 'pelanggan'
const input = document.getElementById("fileInput");
const tbody = document.getElementById("dataPelangganBody");

input.addEventListener("change", function () {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const json = JSON.parse(e.target.result);

      // Cek apakah root-nya 'pelanggan'
      const data = json.pelanggan || json;

      tbody.innerHTML = ""; // Kosongkan isi tabel

      Object.values(data).forEach((pel) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pel.nama || '-'}</td>
          <td>${pel.idPelanggan || '-'}</td>
          <td>${pel.paket || '-'}</td>
          <td>Rp ${pel.harga?.toLocaleString("id-ID") || '0'}</td>
          <td>${pel.telepon || '-'}</td>
          <td>${pel.alamat || '-'}</td>
        `;
        tbody.appendChild(row);
      });

    } catch (err) {
      alert("File JSON tidak valid.");
    }
  };

  reader.readAsText(file);
});
