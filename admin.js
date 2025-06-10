import { getDatabase, ref, onValue, set, remove, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { app } from "./firebase.js"; // Ambil dari firebase.js

const db = getDatabase(app);
const pelangganRef = ref(db, 'pelanggan');

const namaInput = document.getElementById('nama');
const paketInput = document.getElementById('paket');
const hargaInput = document.getElementById('harga');
const tambahBtn = document.getElementById('tambahBtn');
const tabelBody = document.getElementById('tabelPelanggan');

// Tambah pelanggan baru
tambahBtn.onclick = async () => {
  const id = `pel${Date.now()}`;
  if (namaInput.value && paketInput.value && hargaInput.value) {
    await set(ref(db, `pelanggan/${id}`), {
      nama: namaInput.value,
      paket: paketInput.value,
      harga: parseInt(hargaInput.value),
      status: 'aktif'
    });
    namaInput.value = paketInput.value = hargaInput.value = '';
  }
};

// Tampilkan data real-time
onValue(pelangganRef, (snapshot) => {
  tabelBody.innerHTML = '';
  const data = snapshot.val();
  if (data) {
    Object.entries(data).forEach(([id, item]) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.paket}</td>
        <td>Rp ${item.harga}</td>
        <td>${item.status}</td>
        <td>
          <button onclick="hapusPelanggan('${id}')">Hapus</button>
          <button onclick="ubahStatus('${id}', '${item.status}')">
            ${item.status === 'aktif' ? 'Bayar' : 'Aktifkan'}
          </button>
        </td>
      `;
      tabelBody.appendChild(row);
    });
  }
});

// Fungsi global agar bisa diakses dari tombol
window.hapusPelanggan = (id) => {
  remove(ref(db, `pelanggan/${id}`));
};

window.ubahStatus = (id, statusSekarang) => {
  const statusBaru = statusSekarang === 'aktif' ? 'lunas' : 'aktif';
  update(ref(db, `pelanggan/${id}`), { status: statusBaru });
};
