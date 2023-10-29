// Mendapatkan elemen dengan ID "number" untuk menampilkan skor saat ini
let element = document.getElementById("number");

// Variabel untuk menyimpan skor saat ini
let currentValue = 0;

// Fungsi untuk memindahkan fokus ke input berikutnya jika panjang teks input saat ini adalah 1
function autoNext(currentInput, nextInput) {
  if (currentInput.value.length === 1) {
    nextInput.focus();
  }
}

// Fungsi untuk menetapkan event listener ke elemen-elemen input dalam tabel
function done() {
  // Mendapatkan semua elemen input dari tabel dengan kelas "table"
  const tables = document.querySelectorAll(".table");

  // Iterasi melalui setiap tabel
  tables.forEach((table, index) => {
    // Mendapatkan semua elemen input dalam tabel
    let inputs = table.querySelectorAll("input");

    // Menetapkan event listener ke setiap elemen input dalam tabel
    inputs.forEach((input, inputIndex) => {
      input.addEventListener("input", () => {
        // Jika ini bukan elemen input terakhir dalam tabel
        if (inputIndex < inputs.length - 1) {
          autoNext(input, inputs[inputIndex + 1]);
        } else {
          // Jika ini adalah elemen input terakhir dalam tabel saat ini
          if (index < tables.length - 1) {
            autoNext(input, tables[index + 1].querySelector("input"));
          }
        }
      });
    });
    // Memeriksa jawaban setiap kali input berubah
    checkDataObj();
  });
}

// Fungsi untuk mengambil nilai dari kolom dengan kelas tertentu
function stringColumn(className) {
  var col = "";
  // Mendapatkan semua elemen dengan kelas yang diberikan
  let td = document.querySelectorAll(className);
  // Menggabungkan nilai dari setiap elemen ke dalam satu string
  for (let i = 0; i < td.length; i++) {
    col += td[i].value;
  }
  // Mengonversi string ke huruf besar (uppercase)
  return col.toUpperCase();
}

// Fungsi untuk memeriksa jawaban dan menambahkan skor
function checkDataObj() {
  // Objek yang berisi jawaban yang benar untuk setiap kolom
  const data = {
    vert: {
      no1: "ANCHOR",
      no2: "IDE",
      no3: "SQL",
      no4: "REACT",
    },
    horiz: {
      no1: "JAVA",
      no2: "CSS",
      no3: "COMPILER",
      no4: "WEB",
    },
  };

  // Variabel untuk menandai apakah kecocokan ditemukan
  let matchFound = false;

  // Loop vertikal
  for (let i = 1; i <= 4; i++) {
    if (
      stringColumn(`.vert${i}`).toUpperCase() ===
      data.vert[`no${i}`].toUpperCase()
    ) {
      // Menentukan skor berdasarkan kolom tertentu
      if (`vert${i}` === "vert1") {
        increaseScore(`.vert${i}`, 20); // Menambahkan 20 skor untuk vert1
      } else {
        increaseScore(`.vert${i}`, 10); // Menambahkan 10 skor untuk kolom vertikal lainnya
      }
    }
  }

  // Loop horizontal jika belum ada kecocokan vertikal
  if (!matchFound) {
    for (let i = 1; i <= 4; i++) {
      if (
        stringColumn(`.horiz${i}`).toUpperCase() ===
        data.horiz[`no${i}`].toUpperCase()
      ) {
        // Menentukan skor berdasarkan kolom tertentu
        if (`horiz${i}` === "horiz3") {
          increaseScore(`.horiz${i}`, 20); // Menambahkan 20 skor untuk horiz3
        } else {
          increaseScore(`.horiz${i}`, 10); // Menambahkan 10 skor untuk kolom horizontal lainnya
        }
      }
    }
  }
}

// Fungsi untuk menambah skor dan memperbarui tampilan skor
function increaseScore(className, value) {
  // Menambahkan nilai skor
  currentValue += value;
  // Memperbarui tampilan skor di elemen dengan ID "number"
  element.innerHTML = currentValue;
}

// Fungsi untuk mereset nilai input dan skor
function reset() {
  // Looping untuk mereset nilai input dalam kolom vertikal dan horizontal
  for (let i = 1; i <= 4; i++) {
    // Mendapatkan semua elemen input dalam kolom horizontal dan vertikal
    let h = document.querySelectorAll(`.horiz${i}`);
    let v = document.querySelectorAll(`.vert${i}`);
    // Looping untuk mereset nilai input dalam kolom horizontal
    for (let j = 0; j < h.length; j++) {
      h[j].value = "";
    }
    // Looping untuk mereset nilai input dalam kolom vertikal
    for (let j = 0; j < v.length; j++) {
      v[j].value = "";
    }
  }
  // Mereset nilai skor menjadi 0
  currentValue = 0;
  // Memperbarui tampilan skor di elemen dengan ID "number"
  element.innerHTML = currentValue;
}

// Menjalankan fungsi done() dan reset() setelah dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  done(); // Menjalankan fungsi done() untuk menetapkan event listener
  reset(); // Menjalankan fungsi reset() untuk mereset nilai input dan skor
});
