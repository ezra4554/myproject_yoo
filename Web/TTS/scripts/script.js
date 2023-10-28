let element = document.getElementById("number");
let currentValue = 0;

function autoNext(currentInput, nextInput) {
  if (currentInput.value.length === 1) {
    nextInput.focus();
  }
}

function done() {
  // Mendapatkan semua elemen input dari tabel
  const tables = document.querySelectorAll(".table");

  // Menetapkan event listener ke setiap elemen input di dalam tabel
  tables.forEach((table, index) => {
    let inputs = table.querySelectorAll("input");

    inputs.forEach((input, inputIndex) => {
      input.addEventListener("input", () => {
        // Jika ini bukan elemen input terakhir dalam tabel
        if (inputIndex < inputs.length - 1) {
          autoNext(input, inputs[inputIndex + 1]);
        } else {
          // Jika ini adalah elemen input terakhir dalam tabel saat ini
          if (index < tables.length - 1) {
            autoNext(input, tables[index + 1].querySelector("input"));
          } else {
            // Jika ini adalah elemen input terakhir di tabel terakhir
            checkDataObj();
          }
        }
      });
    });
  });
}

function stringColumn(className) {
  var col = "";
  let td = document.querySelectorAll(className);
  for (let i = 0; i < td.length; i++) {
    col += td[i].value;
  }
  return col.toUpperCase();
}

function checkDataObj() {
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

  let matchFound = false;

  // Loop vert
  for (let i = 1; i <= 4; i++) {
    if (
      stringColumn(`.vert${i}`).toUpperCase() ===
      data.vert[`no${i}`].toUpperCase()
    ) {
      matchFound = true;
      break;
    }
  }

  // Loop horiz
  if (!matchFound) {
    for (let i = 1; i <= 4; i++) {
      if (
        stringColumn(`.horiz${i}`).toUpperCase() ===
        data.horiz[`no${i}`].toUpperCase()
      ) {
        matchFound = true;
        break;
      }
    }
  }

  if (matchFound) {
    console.log("work");
    currentValue += 10;
    element.innerHTML = currentValue;
  } else {
    console.log("No match found");
  }
}

// Panggil done() untuk menetapkan event listener dan memulai pengecekan
done();
