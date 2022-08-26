
$("document").ready(function () {
    GetSymbols();

    document.getElementById("send").onclick = function () {
        LoadData();
    }

    document.getElementById("money1").onchange = function () {
        LoadData();
    }

    document.getElementById("money2").onchange = function () {
        LoadData();
    }

    document.getElementById("input").onchange = function () {
        LoadData();
    }
});

function LoadData() {
    document.getElementById("ausgabe").innerText = "";

    let geld1 = document.getElementById("money1").value;
    let geld2 = document.getElementById("money2").value;

    var requestURL = 'https://api.exchangerate.host/convert?from=' + geld1 + '&to=' + geld2;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    var wert = document.getElementById("input").value;

    request.onload = function () {
        var response = request.response;

        for (let x in response) {
            if (x == "result") {
                if (document.getElementById("ausgabe").innerText == "") {
                    document.getElementById("ausgabe")
                        .append(wert + " " + geld1 + " sind " + (wert * response[x]).toFixed(2) + " " + geld2 + " (Wechselkurs: 1 : " + response[x].toFixed(3) + ")");
                }
            }
        }
    }
}

function GetSymbols() {
    var requestURL = 'https://api.exchangerate.host/symbols';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var response = request.response;
        for (let x in response) {
            for (let y in response[x]) {
                for (let z in response[x][y]) {

                    if (response[x][y][z].length > 2) {

                        if (response[x][y][z].length == 3) {
                            var result = '<option value ="' + response[x][y][z] + '"/>' + text;
                            $(".dd").append(result)
                        }
                        else {
                            var text = response[x][y][z] + '</option>'
                        }
                    }
                }
            }
        }
        sortlist("money1");
        sortlist("money2");

        document.getElementById("money1").value = "EUR";
        document.getElementById("money2").value = "USD";
    }
}

function sortlist(list) {
    $("#" + list).append($("#" + list + " option")
        .remove().sort(function (a, b) {
            var at = $(a).text(),
                bt = $(b).text();
            return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
        }))
};