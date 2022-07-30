// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export const nFormatter = (num:number|null):string => {
    if (num === null) {
    return "";
    }
    let digits = 1;
    const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
        return num >= item.value;
    });
    if (num > 1e7) {
    digits = 0;
    }
    return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

const padNumber = (n:number):string => {
    return ('0' + n).slice(-2)
}

export const durationConverter = (seconds:number):string => {
    let hours = null
    let sec = seconds%60
    let mins = Math.floor(seconds/60)
    if(mins > 60){
        hours = Math.floor(mins/60)
        mins = mins%60
    }
    return `${hours ? padNumber(hours)+":" : ""}${padNumber(mins)}:${padNumber(sec)}`
}
