const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof (Storage) !== "undefined"
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 10) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// Noted:
    //JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk 
    // objek JavaScript.

    //JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.

    //localStorage hanya dapat menyimpan data primitif seperti string, sehingga kita perlu mengubah objek 
    // ke dalam bentuk string jika ingin menyimpan ke dalam localStorage

    //fungsi unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada 
    // awal index. Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.

    //Fungsi pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran 
    // array historyData tidak akan pernah lebih dari 5. 


function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "<td>";
        row.innerHTML += "<td>" + history.operator + "<td>";
        row.innerHTML += "<td>" + history.secondNumber + "<td>";
        row.innerHTML += "<td>" + history.result + "<td>";

        historyList.appendChild(row);
    }
}

renderHistory();