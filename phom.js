var listPlayer = [];
var DF_VALUE = 10;
var historyValue = [];
var historyAll = [];
var keyGame = "";
var keySalt = 0;
var deviant = 0;
var isAutoBalanceScr = false;
var playerAutoBalance = false;

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
