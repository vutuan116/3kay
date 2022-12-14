Date.prototype.hhmmss = function () {
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();

    return [hh < 10 ? '0' + hh : hh, mm < 10 ? '0' + mm : mm, ss < 10 ? '0' + ss : ss].join(':');
};

Date.prototype.yyyyMMdd = function () {
    var hh = this.getFullYear();
    var MM = this.getMonth() + 1;
    var dd = this.getDate();

    return [hh < 10 ? '0' + hh : hh, MM < 10 ? '0' + MM : MM, dd < 10 ? '0' + dd : dd].join('/');
};