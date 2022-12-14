var listPlayer = [];
var DF_VALUE = 10;
var historyValue = [];
var historyAll = [];
var keyGame = "";
var keySalt = 0;
var deviant = 0;

$(document).ready(function () {
    initData();
    showAddPlayerModal();
    genListPlayer();
    genHistoryAll();
    genBtnDeInScore();
    // //test
    // $('#div_add_player').hide();
    // $('#div_main').show();
    // genTableScore();
    // saveData();
});

$('#add_Person_btn').click(function () {
    var name = $('#add_Person_txt').val();
    if (listPlayer.indexOf(name) >= 0) {
        alert("Tên đã tồn tại, hãy sử dụng tên khác");
        return;
    }
    listPlayer.push({ name: name, scrTemp: 0, score: 0 });
    genListPlayer();
    $('#add_Person_txt').val("")
});

$('#new_game_btn').click(function () {
    if (keyGame.split('_')[0] == new Date().yyyyMMdd()) {
        keySalt++;
    } else {
        keySalt = 1;
    }
    keyGame = new Date().yyyyMMdd() + "_" + keySalt;

    $('#div_add_player').hide();
    $('#div_main').show();

    listPlayer.forEach(x => {
        x.total = 0;
        x.scrTemp = 0;
        x.score = 0;
    })
    historyValue = [];

    genTableScore();
    saveData();
});

$('#continues_btn').click(function () {
    $('#div_add_player').hide();
    $('#div_main').show();
    genTableScore();
    saveData();
});

function initData() {
    dfValue = window.localStorage.getItem("DF_VALUE_F");
    listPlayer = JSON.parse(window.localStorage.getItem("listPlayerF"));
    historyValue = JSON.parse(window.localStorage.getItem("historyValueF"));
    historyAll = JSON.parse(window.localStorage.getItem("historyAllF"));

    if (!listPlayer) listPlayer = [];
    if (!historyValue) historyValue = [];
    if (!historyAll) historyAll = [];
    if (dfValue) DF_VALUE = dfValue;

    if (historyAll.length == 0) {
        keySalt = 0;
        keyGame = new Date().yyyyMMdd() + "_" + keySalt;
    } else {
        keyGame = historyAll[0].id;
        keySalt = keyGame.split("_")[1];
    }
}

function showAddPlayerModal() {
    $('#div_add_player').show();
}

function genListPlayer() {
    var html = "";
    for (i = 0; i < listPlayer.length; i++) {
        html = html + `<div class="p-1" style="padding-left: 1rem !important;"><label class="form-check-label"> - <b>` + listPlayer[i].name + `</b></label> &nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-outline-danger btn-sm p-0 px-1 ml-1" onclick="deletePlayer(` + i + `)">delete</button></div>`;
    }
    $('#div_show_player').empty();
    $('#div_show_player').html(html);
}

function genHistoryAll() {
    var html = "";
    historyAll.forEach(x => {
        html = html +
            `<tr>
            <td class="td_id bdr-r-w-0" colspan="2">` + x.id + `
                <button type="button" style="float:right" class="btn btn-outline-danger btn-sm pt-0 pb-0" onclick="deleteHistoryAll('` + x.id + `')">delete</button>
            </td>
        </tr>`
        for (i = 0; i < x.player.length; i++) {
            html = html +
                `<tr>
                <td scope="row">` + x.player[i].name + `</td>
                <td class="text-end">` + x.player[i].score + `</td>
            </tr>`;
        }
    })

    $('#tbl_history_all').empty();
    $('#tbl_history_all').html(html);
}

function genBtnDeInScore() {
    for (i = 0; i < 6; i++) {
        $('#decre_' + i).html("-" + (i * DF_VALUE));
        $('#incre_' + i).html("+" + (i * DF_VALUE));
    }
}

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