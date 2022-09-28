var listPlayer = [];
var countScore = 0;
var DF_VALUE = 10;
var historyValue = [];
var historyAll = [];
var keyGame = "";
var keySalt = 0;


Date.prototype.hhmmss = function () {
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();

    return [hh < 10 ? '0' + hh : hh, mm < 10 ? '0' + mm : mm, ss < 10 ? '0' + ss : ss].join(':');
};

Date.prototype.yyyyMMdd = function () {
    var hh = this.getFullYear();
    var MM = this.getMonth();
    var ss = this.getDay();

    return [hh < 10 ? '0' + hh : hh, MM < 10 ? '0' + MM : MM, ss < 10 ? '0' + ss : ss].join('/');
};


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
    keySalt++;
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
    keyGame = window.localStorage.getItem("keyGame");
    listPlayer = JSON.parse(window.localStorage.getItem("listPlayer"));
    historyValue = JSON.parse(window.localStorage.getItem("historyValue"));
    historyAll = JSON.parse(window.localStorage.getItem("historyAll"));
    if (!keyGame) keyGame = new Date().yyyyMMdd() + "_" + keySalt;
    if (!listPlayer) listPlayer = [];
    if (!historyValue) historyValue = [];
    if (!historyAll) historyAll = [];

    keySalt = keyGame.split("_")[1];
}

function deletePlayer(index) {
    if (confirm("Confirm delete " + listPlayer[index].name + "?")) {
        listPlayer.splice(index, 1);
        genListPlayer();
        showAddPlayerModal();
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
        html = html + `<tr><td class="td_id" colspan="4">` + x.id + `</td></tr>`
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
