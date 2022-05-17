
import { ClsTime, ClsSymbol, ClsExchgInfo, ClsPrice, ClsOrderBook, ClsCandel, ClsCandels } from './BinanceObj.js';
//Variables globales requeridas en este módulo
const binDateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: "short",
    hourCycle: "h23"
};
const binUTCOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: "UTC",
    timeZoneName: "short",
    hourCycle: "h23"
};
const binUTCFormat = new Intl.DateTimeFormat("default", binUTCOptions);
const binLTCFormat = new Intl.DateTimeFormat("es-AR", binDateOptions);


//Clases extendidas de Binance
class ClsTimeExt extends ClsTime {
    constructor() {
        super();
        this.lclTime = binLTCFormat.format(this.serverTime);
        this.utcTime = binUTCFormat.format(this.serverTime);
    }
    setTime(TimeStamp) {
        this.serverTime.setTime(TimeStamp);
        this.lclTime = binLTCFormat.format(this.serverTime);
        this.utcTime = binUTCFormat.format(this.serverTime);
    }
}
class ClsExchgInfoExt extends ClsExchgInfo {
    constructor() {
        super();
        this.allSymbols = []
        this.allQuotes = [];
        this.selSymbol = new ClsSymbol();
        this.filteredSymbols = [];
    }
    getAllAssets() {
        if (this.symbols.length > 0) {
            this.allSymbols = this.symbols.map(function (x) {
                return { "symbol": x.symbol, "baseAsset": x.baseAsset, "quoteAsset": x.quoteAsset }
            });
            this.allQuotes = [... new Set(this.allSymbols.map(x=>x.quoteAsset))].sort();
        }

    }
    getSymbols(strQuote) {
        if (this.allQuotes.findIndex(x => x === strQuote) >= 0) {
            this.selQuote = strQuote;
            this.filteredSymbols = this.allSymbols.filter(x => x.quoteAsset === strQuote);
            return this.filteredSymbols.map(function (x) { return x.symbol }).sort();
        };
    }
    setSymbol(strSimbolo){
        this.selSymbol = this.symbols.find(x => x.symbol === strSimbolo);
    }
}
class ClsPriceExt extends ClsPrice {
    constructor() {
        super();
    }
    setPrice(objPrice) {
        let lclPrice = parseFloat(objPrice.price);
        if (typeof lclPrice === "number") {
            this.price = objPrice.price;
        } else {
            console.log("Class Price.setPrice: El argumento no es un objeto precio");
        }
    }
    reset() {
        this.symbol = "";
        this.price = 0;
    }
}
class ClsOrderBookExt extends ClsOrderBook {
    constructor() {
        super();
        this.bidAtVol = 0;      // precio comprador para un % volumen acumulado dado
        this.askAtVol = 0;      // precio vendedor para un % volumen acumulado dado
        this.bidWeight = 0;     // suma de los productos precio * cantidad para comprador
        this.askWeight = 0;     // suma de los productos precio * cantidad para vendedor
    }
    setAtVolum(atVolum) {
        let bidVolTotal = 0;
        let askVolTotal = 0;
        this.bidAtVol = 0;
        this.askAtVol = 0;
        this.bidWeight = 0;
        this.askWeight = 0;

        for (let ind = 0; ind < this.bids.length(); ind++) {
            bidVolTotal += this.bids[ind][1];
            this.bidWeight += this.bids[ind][0] * this.bids[ind][1];
            askVolTotal += this.asks[ind][1];
            this.askWeight += this.asks[ind][0] * this.asks[ind][1];
        }
        let VolAtBid = 0;
        let VolatAsk = 0;
        for (let ind = 0; ind < this.bids.length(); ind++) {
            VolAtBid += this.bids[ind][1];
            VolAtAsk += this.asks[ind][1];
            if (this.bidAtVol == 0 && VolAtBid >= atVolum / 100 * bidVolTotal) {
                this.bidAtVol = this.bids[ind][0];
            }
            if (this.askAtVol == 0 && VolAtAsk >= atVolum / 100 * askVolTotal) {
                this.askAtVol = this.bids[ind][0];
            }
        }
    }
}
class ClsCandelExt extends ClsCandel {
    constructor() {
        super();
    }
    setCandle(array){
        let index=0;
        for (const key in this) {
             this[key] = parseFloat(array[index]);
             index++;
        }
    }
}
class ClsCandelsExt extends ClsCandels {
    constructor() {
        super();
    }
    fillArray(arrayVelas) {
        this.candles.length = 0;
        arrayVelas.forEach(element => {
            const candela = new ClsCandel();
            let index = 0;
            for (const propiedad in candela) {
                candela[propiedad] = parseFloat(element[index]);
                index++;
            }
            this.candles.push(candela);
        });
    }
    reset() {
        this.candles.length = 0;
    }
}

export { ClsTimeExt, ClsExchgInfoExt, ClsPriceExt, ClsOrderBookExt, ClsCandelExt, ClsCandelsExt }