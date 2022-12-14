
function genTableScore() {
    var html = "";
    var htmlHis = `<th class="w-20per text-center"><i class="far fa-clock"></i></th>`;

    for (i = 0; i < listPlayer.length; i++) {
        html = html +
            `<tr>
                <td scope="row">
                    <input class="form-check-input" type="radio" id="scr_pler_${i}" name="scr_pler" value="${i}">
                    <label class="form-check-label pl-1" for="scr_pler_${i}">${listPlayer[i].name}</label>
                </td>
                <td class="text-end" id="scrTemp_${i}">${listPlayer[i].scrTemp}</td>
                <td class="text-end" id="score_${i}"> ${listPlayer[i].score}</td>
            </tr>`;
        htmlHis = htmlHis +
            `<th class="w-20per text-center">${listPlayer[i].name}</th>`;
    }
    $('#tbl_score').empty();
    $('#tbl_score').html(html);

    html = "";

    for (i = 0; i < historyValue.length; i++) {
        html = html +
            `<tr>
                <td class="text-center">${historyValue[i].time}</td>
                <td class="text-end">${historyValue[i].scr0}</td>
                <td class="text-end">${historyValue[i].scr1}</td>
                <td class="text-end">${historyValue[i].scr2}</td>
                <td class="text-end">${historyValue[i].scr3}</td>
            </tr>`;
    }
    $('#tbl_history_header').empty();
    $('#tbl_history_header').html(htmlHis);
    $('#tbl_history_body').empty();
    $('#tbl_history_body').html(html);
    
    $('#btnAddScore').prop('disabled', true);
}

function saveData() {
    window.localStorage.setItem("listPlayerF", JSON.stringify(listPlayer));
    window.localStorage.setItem("historyValueF", JSON.stringify(historyValue));
    let currentPlayer = historyAll.find(x => x.id == keyGame);
    if (currentPlayer) {
        currentPlayer.player = listPlayer;
    } else {
        historyAll.unshift({ id: keyGame, player: listPlayer });
    }
    window.localStorage.setItem("historyAllF", JSON.stringify(historyAll));
}

function deletePlayer(index) {
    if (confirm("Confirm delete " + listPlayer[index].name + "?")) {
        listPlayer.splice(index, 1);
        genListPlayer();
        showAddPlayerModal();
    }
}

function deleteHistoryAll(id) {
    let hisAl = historyAll.find(x => x.id == id);

    if (confirm("Confirm delete " + hisAl.id + "?")) {
        let index = historyAll.indexOf(hisAl);
        historyAll.splice(index, 1);
        genHistoryAll();
    }
}

function configClick() {
    var regex = new RegExp("^([0-9]+)$");
    value = prompt("Enter the default bet value", DF_VALUE);
    if (regex.test(value)) {
        DF_VALUE = value;
        window.localStorage.setItem("DF_VALUE_F", DF_VALUE);
    }
}

function increaseScore(value) {
    value = value * DF_VALUE;
    deviant = deviant + value;
    $('#btnAddScore').prop('disabled', !deviant == 0);

    playerIndex = $("input[name=scr_pler]:checked").val();
    if (!playerIndex) return;

    for (i = 0; i < listPlayer.length; i++) {
        if (i == playerIndex) {
            listPlayer[i].scrTemp = parseInt(listPlayer[i].scrTemp) + value;
            value = listPlayer[i].scrTemp;
            break;
        }
    }
    $("#scrTemp_" + playerIndex).html(value);
}

function AddScore() {

    historyValue.unshift({ time: new Date().hhmmss()});
    for (i = 0; i < listPlayer.length; i++) {
        listPlayer[i].score = listPlayer[i].score + listPlayer[i].scrTemp;
        historyValue[0]["scr"+i] = listPlayer[i].scrTemp;
        listPlayer[i].scrTemp = 0;
    }

    saveData();
    genTableScore();
}