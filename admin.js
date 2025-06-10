import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const namaInput = document.getElementById('nama');
const paketInput = document.getElementById('paket');
const hargaInput = document.getElementById('harga');
const tambahBtn = document.getElementById('tambahBtn');
const tabelBody = document.getElementById('tabelPelanggan');

const pelangganRef = collection(db, 'pelanggan');

tambahBtn.onclick = async () => {
  if (namaInput.value && paketInput.value && hargaInput.value) {
    await addDoc(pelangganRef, {
      nama: namaInput.value,
      paket: paketInput.value,
      harga: parseInt(hargaInput.value),
      status: 'aktif'
    });
    namaInput.value = paketInput.value = hargaInput.value = '';
  }
};

onSnapshot(pelangganRef, (snapshot) => {
  tabelBody.innerHTML = '';
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.nama}</td>
      <td>${data.paket}</td>
      <td>Rp ${data.harga}</td>
      <td>${data.status}</td>
      <td>
        <button onclick="hapusPelanggan('${docSnap.id}')">Hapus</button>
        <button onclick="updateStatus('${docSnap.id}', '${data.status}')">
          ${data.status === 'aktif' ? 'Bayar' : 'Aktifkan'}
        </button>
      </td>
    `;
    tabelBody.appendChild(row);
  });
});

window.hapusPelanggan = async (id) => {
  await deleteDoc(doc(db, 'pelanggan', id));
};

window.updateStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'aktif' ? 'lunas' : 'aktif';
  await updateDoc(doc(db, 'pelanggan', id), { status: newStatus });
};