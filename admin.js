import { db } from "./firebase.js";
import {
  ref,
  set,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const nama = document.getElementById("nama");
const idPelanggan = document.getElementById("idPelanggan");
const paket = document.getElementById("paket");
const harga = document.getElementById("harga");
const telepon = document.getElementById("telepon");
const alamat = document.getElementById("alamat");
const tambahBtn = document.getElementById("tambahBtn");
const tabel = document.getElementById("tabelPelanggan");

tambahBtn.addEventListener("click", () => {
  const id = `pel${Date.now()}`;
  const data = {
    nama: nama.value,
    idPelanggan: idPelanggan.value,
    paket: paket.value,
    harga: parseInt(harga.value),
    telepon: telepon.value,
    alamat: alamat.value
  };
  set(ref(db, `pelanggan/${id}`), data);
  nama.value = idPelanggan.value = paket.value = harga.value = telepon.value = alamat.value = "";
});

function tampilkanData() {
  const pelangganRef = ref(db, "pelanggan");
  onValue(pelangganRef, (snapshot) => {
    const data = snapshot.val();
    tabel.innerHTML = "";
    if (data) {
      Object.keys(data).forEach((id) => {
        const p = data[id];
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.nama}</td>
          <td>${p.idPelanggan}</td>
          <td>${p.paket}</td>
          <td>Rp ${p.harga.toLocaleString()}</td>
          <td>${p.telepon}</td>
          <td>${p.alamat}</td>
          <td><button onclick="hapusPelanggan('${id}')">Hapus</button></td>
        `;
        tabel.appendChild(row);
      });
    }
  });
}

window.hapusPelanggan = (id) => {
  remove(ref(db, `pelanggan/${id}`));
};

tampilkanData();
