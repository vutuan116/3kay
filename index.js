var listPlayer = [];
var countScore = 0;
var DF_VALUE = 10;
var historyValue = [];
var historyAll = [];
var keyGame = "";
var keySalt = 0;

$(document).ready(function () {
    initData();
    showAddPlayerModal();
    genListPlayer();
    genHistoryAll();
});

$('#add_Person_btn').click(function () {
    var name = $('#add_Person_txt').val();
    if (listPlayer.indexOf(name) >= 0) {
        alert("Tên đã tồn tại, hãy sử dụng tên khác");
        return;
    }
    listPlayer.push({ name: name, score: 0, drink: 0, total: 0 });
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
        x.score = 0;
        x.drink = 0;
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
    dfValue = window.localStorage.getItem("DF_VALUE");
    listPlayer = JSON.parse(window.localStorage.getItem("listPlayer"));
    historyValue = JSON.parse(window.localStorage.getItem("historyValue"));
    historyAll = JSON.parse(window.localStorage.getItem("historyAll"));

    if (!listPlayer) listPlayer = [];
    if (!historyValue) historyValue = [];
    if (!historyAll) historyAll = [];
    if (dfValue) DF_VALUE = dfValue;

    if (historyAll.length==0) {
        keySalt = 0;
        keyGame = new Date().yyyyMMdd() + "_" + keySalt;
    }else{
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
        html = html + `<tr><td class="td_id bdr-r-w-0" colspan="3">` + x.id + `</td><td class="text-end td_id bdr-l-w-0"><button type="button" class="btn btn-outline-danger btn-sm pt-0 pb-0" onclick="deleteHistoryAll('` + x.id + `')">delete</button></td></tr>`
        for (i = 0; i < x.player.length; i++) {
            html = html + `<tr><td scope="row">` + x.player[i].name + `</td><td class="text-end">` + x.player[i].score + `</td><td class="text-end td_drink">` + x.player[i].drink + `</td><td class="text-end">` + x.player[i].total + `</td></tr>`;
        }
    })

    $('#tbl_history_all').empty();
    $('#tbl_history_all').html(html);
}

function genTableScore() {
    var html = "";

    for (i = 0; i < listPlayer.length; i++) {
        html = html + `<tr><td scope="row"><input class="form-check-input" name="scr_pler" type="radio" id="scr_pler_` + i + `" value="` + i + `"><label class="form-check-label pl-1" for="scr_pler_` + i + `">` + listPlayer[i].name + `</label></td><td class="text-end">` + listPlayer[i].score + `</td><td class="text-end td_drink"><input type="number" class="tbox_drink" value="` + listPlayer[i].drink + `" onchange="drinkChange(` + i + `, this.value)"></td><td class="text-end">` + listPlayer[i].total + `</td></tr>`;
    }
    $('#tbl_score').empty();
    $('#tbl_score').html(html);

    html = "";
    for (i = 0; i < historyValue.length; i++) {
        if (historyValue[i].type == "+") {
            html = html + `<tr><td class="text-center">` + historyValue[i].time + `</td><td  class="text-center">` + listPlayer[historyValue[i].index].name + `</td><td class="text-center">` + historyValue[i].type + `</td></tr>`;
        } else {
            html = html + `<tr class="delete_score"><td class="text-center">` + historyValue[i].time + `</td><td  class="text-center">` + listPlayer[historyValue[i].index].name + `</td><td class="text-center">` + historyValue[i].type + `</td></tr>`;
        }
    }
    $('#tbl_history').empty();
    $('#tbl_history').html(html);
}

function drinkChange(index, value) {
    value = isNaN(parseInt(value)) ? 0 : parseInt(value) > 0 ? parseInt(value) * (-1) : parseInt(value);
    listPlayer[index].total = parseInt(listPlayer[index].total) - listPlayer[index].drink + value;
    listPlayer[index].drink = isNaN(value) ? 0 : value;
    genTableScore();
    saveData();
}
