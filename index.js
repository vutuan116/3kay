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
