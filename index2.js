
function increaseScore(playerIndex) {
    playerIndex = playerIndex != '-1' ? playerIndex : $("input[name=scr_pler]:checked").val();
    if (!playerIndex) return;
    for (i = 0; i < listPlayer.length; i++) {
        if (i == playerIndex) {
            listPlayer[i].score = parseInt(listPlayer[i].score) + 1;
            listPlayer[i].total = parseInt(listPlayer[i].total) + (DF_VALUE * listPlayer.length - DF_VALUE);
        } else {
            listPlayer[i].total = parseInt(listPlayer[i].total) - DF_VALUE;
        }
    }
    historyValue.unshift({ time: new Date().hhmmss(), index: playerIndex, type: "+" });
    genTableScore();
    saveData();
}

function decreaseScore(playerIndex) {
    playerIndex = playerIndex != '-1' ? playerIndex : $("input[name=scr_pler]:checked").val();
    if (!playerIndex) return;

    if (confirm("Confirm decrease score of " + listPlayer[playerIndex].name + "?")) {
        for (i = 0; i < listPlayer.length; i++) {
            if (i == playerIndex) {
                listPlayer[i].score = parseInt(listPlayer[i].score) - 1;
                listPlayer[i].total = parseInt(listPlayer[i].total) - (DF_VALUE * listPlayer.length - DF_VALUE);
            } else {
                listPlayer[i].total = parseInt(listPlayer[i].total) + DF_VALUE;
            }
        }
        historyValue.unshift({ time: new Date().hhmmss(), index: playerIndex, type: "-" });
        genTableScore();
        saveData();
    }
}

function saveData() {
    window.localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    window.localStorage.setItem("historyValue", JSON.stringify(historyValue));
    window.localStorage.setItem("keyGame", keyGame);
    let currentPlayer = historyAll.find(x => x.id == keyGame);
    if (currentPlayer) {
        currentPlayer.player = listPlayer;
    } else {
        historyAll.unshift({ id: keyGame, player: listPlayer });
    }
    window.localStorage.setItem("historyAll", JSON.stringify(historyAll));
}
