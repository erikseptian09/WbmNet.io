const text1 = "Selamat Datang di ";
const text2 = "Wibawamulia.Network";
let i = 0;

function typeBoth() {
  if (i < text1.length) {
    document.getElementById("part1").innerHTML += text1.charAt(i);
  } else if (i - text1.length < text2.length) {
    document.getElementById("part2").innerHTML += text2.charAt(i - text1.length);
  }
  i++;
  if (i <= text1.length + text2.length) {
    setTimeout(typeBoth, 70);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
  typeBoth();
});

  // Tutup navbar collapse saat klik link di dalamnya (untuk tampilan mobile)
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).toggle();
        }
      });
    });
  });

// Pendaftaran Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      console.log('Service Worker terdaftar dengan sukses:', registration);
    })
    .catch((error) => {
      console.log('Pendaftaran Service Worker gagal:', error);
    });
}

// Menangani event beforeinstallprompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Pengguna menerima instalasi');
      } else {
        console.log('Pengguna menolak instalasi');
      }
      deferredPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', () => {
  console.log('Aplikasi telah diinstal');
});