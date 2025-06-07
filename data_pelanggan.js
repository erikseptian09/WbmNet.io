import { db } from "./firebase.js";
import { ref, set, get, child, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const pelangganBody = document.getElementById("dataPelangganBody");

function loadPelanggan() {
  const dbRef = ref(db);
  get(child(dbRef, "pelanggan")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      pelangganBody.innerHTML = "";

      Object.entries(data).forEach(([id, pel]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pel.nama ?? '-'}</td>
          <td>${pel.idPelanggan ?? '-'}</td>
          <td>${pel.paket ?? '-'}</td>
          <td>Rp ${pel.harga ? pel.harga.toLocaleString("id-ID") : '0'}</td>
          <td>${pel.telepon ?? '-'}</td>
          <td>${pel.alamat ?? '-'}</td>
          <td><button onclick="bayar('${id}')">Bayar</button></td>
        `;
        pelangganBody.appendChild(row);
      });
    } else {
      pelangganBody.innerHTML = "<tr><td colspan='7'>Data pelanggan kosong.</td></tr>";
    }
  }).catch((error) => {
    console.error("Gagal mengambil data:", error);
  });
}

window.bayar = function(id) {
  const pelangganRef = ref(db, `pelanggan/${id}`);
  get(pelangganRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const tanggalBayar = new Date().toISOString();
      const lunasRef = ref(db, `lunas/${id}`);
      const dataLunas = { ...data, tanggalBayar };

      set(lunasRef, dataLunas).then(() => {
        remove(pelangganRef).then(() => {
          tampilkanFaktur(dataLunas);
          loadPelanggan();
        });
      });
    }
  });
};

// ✅ Faktur Popup
function tampilkanFaktur(pel) {
  const tanggal = new Date(pel.tanggalBayar).toLocaleString("id-ID");

  const fakturHTML = `
    <div id="fakturModal" class="modal">
      <div class="modal-content">
        <h2>Faktur Pembayaran</h2>
        <p><strong>Nama:</strong> ${pel.nama}</p>
        <p><strong>ID Pelanggan:</strong> ${pel.idPelanggan}</p>
        <p><strong>Paket:</strong> ${pel.paket}</p>
        <p><strong>Harga:</strong> Rp ${pel.harga.toLocaleString("id-ID")}</p>
        <p><strong>Tanggal Bayar:</strong> ${tanggal}</p>
        <div class="modal-actions">
          <button onclick="window.print()">Cetak</button>
          <button onclick="document.getElementById('fakturModal').remove()">Tutup</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", fakturHTML);
}

loadPelanggan();
