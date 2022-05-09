//DEFINICIÓN DE OBJETOS PARA JCGTrade

import { binExchgInfo } from "./BinanceVar.js";
import { glbBinFormatAsset } from "./main_variables.js";
import { ClsCandelsExt, ClsCandelExt, ClsPriceExt } from "./BinanceObjExt.js";
import { binGetCandle, binGetCandles, binGetPrice } from "../funciones/BinanceFnc.js"

// Objetos de estados
class ClsJcgInfo {
    constructor() {
        this.stsTime = false;
        this.stsGlobal = false;
    }
    reset() {
        for (const key in this) {
            this.key = false;
        }
    }
};
class ClsBinInfo {
    constructor() {
        this.stsGlobal = false;
        this.stsInfo = false;
        this.stsSymbol = false;
        this.stsPrice = false;

    }
    reset() {
        for (const key in this) {
            this.key = false;
        }
    }
};

export { ClsJcgInfo, ClsBinInfo };

// OBJETOS DE JCGTrade relacionados con BINANCE
class ClsIndTec {
    constructor() {
        this.candles = [];
        this.ema02 = [];
        this.ema07 = [];
        this.ema25 = [];
        this.macd = [];
        this.signal = [];
        this.histo = [];
    }
    getInicial(candelas) {
        this.candles = candelas;
        this.ema02.length = 0;
        this.ema07.length = 0;
        this.ema25.length = 0;
        this.macd.length = 0;
        this.signal.length = 0;
        this.histo.length = 0;

        for (let i = 0; i < this.candles.length; i++) {
            if (i === 0) {
                this.ema02.push(this.candles[i] / 2);
                this.ema07.push(this.candles[i] / 2);
                this.ema25.push(this.candles[i] / 2);
                this.macd.push(this.ema07[i] - this.ema25[i]);
                this.signal.push(this.macd[i]);
                this.histo.push(this.macd[i] - this.signal[i]);
            } else {
                this.ema02.push(ema(2, this.ema02[i - 1], this.candles[i]));
                this.ema07.push(ema(7, this.ema07[i - 1], this.candles[i]));
                this.ema25.push(ema(25, this.ema25[i - 1], this.candles[i]));
                this.macd.push(this.ema07[i] - this.ema25[i]);
                this.signal.push(ema(9, this.macd[i - 1], this.macd[i]));
                this.histo.push(this.macd[i] - this.signal[i]);
            }
        }
        this.recortar();
        return false;
    }
    actCandelas(candela) {
        this.candles.push(candela);
        let i = this.candles.length - 1;
        this.ema02.push(ema(2, this.ema02[i - 1], this.candles[i]));
        this.ema07.push(ema(7, this.ema07[i - 1], this.candles[i]));
        this.ema25.push(ema(25, this.ema25[i - 1], this.candles[i]));
        this.macd.push(this.ema07[i] - this.ema25[i]);
        this.signal.push(ema(9, this.macd[i - 1], this.macd[i]));
        this.histo.push(this.macd[i] - this.signal[i]);
        this.recortar();
    }
    recortar() {
        recortarArray(this.candles, 20);
        recortarArray(this.ema02, 20);
        recortarArray(this.ema07, 20);
        recortarArray(this.ema25, 20);
        recortarArray(this.macd, 20);
        recortarArray(this.signal, 20);
        recortarArray(this.histo, 20);
    }
}
class ClsSopRes {
    constructor() {
        this.s1 = 0;
        this.r1 = 0;
        this.pp = 0;
        this.margen = 0;
        this.domBarra = "";
    }
    getSopRes(barra, actual, maxbar, minbar) {
        let op = barra.open;
        let hi = actual > barra.high ? actual : barra.high;
        let lo = actual !== 0 & actual < barra.low ? actual : barra.low;
        let cl = actual === 0 ? barra.close : actual;

        this.pp = (op + hi + lo + cl) / 4;
        this.s1 = minbar;
        this.r1 = maxbar;
        let ls1 = this.s1 * 0.996;
        let lr1 = this.r1 * 1.007;

        let dt = (lr1 - ls1) / 100;
        let d1 = Math.round((lo - ls1) / dt);
        let d2 = Math.round((this.pp - lo) / dt);
        let d3 = Math.round((hi - this.pp) / dt);
        let d4 = 100 - (d1 + d2 + d3);
        this.margen = (hi - lo) / lo * 100;

        let flechaIzq = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>`
        let flechaDer = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>`

        let flecha = op < cl ? flechaDer : flechaIzq;

        let barra1 = `<div class="progress-bar bg-secondary align-items-start" role="progressbar" style="width: ${d1}%"
                   aria-valuenow="${d1}" aria-valuemin="0" aria-valuemax="100">${flecha}</div>`;
        let barra2 = `<div class="progress-bar jcgbg__compra" role = "progressbar" style = "width: ${d2}%"
                   aria-valuenow="${d2}" aria-valuemin="0" aria-valuemax="100"></div >`;
        let barra3 = `<div class="progress-bar jcgbg__venta" role = "progressbar" style = "width: ${d3}%"
                   aria-valuenow="${d3}" aria-valuemin="0" aria-valuemax="100"></div >`;
        let barra4 = `<div class="progress-bar bg-secondary text-end" role = "progressbar" style = "width: ${d4}%"
                   aria-valuenow="${d4}" aria-valuemin="0" aria-valuemax="100">${this.margen.toFixed(1)}%</div >`;
        this.domBarra = barra1 + barra2 + barra3 + barra4;
    }
    reset() {
        this.s1 = 0;
        this.r1 = 0;
        this.pp = 0;
        this.margen = 0;
        this.domBarra = "";
    }
}
class ClsJcgBin {
    constructor() {
        this.simbPrice = new ClsPriceExt();
        this.cand05m = new ClsCandelsExt();
        this.cand30m = new ClsCandelsExt();
        this.cand04h = new ClsCandelsExt();
        this.ind05mCl = new ClsIndTec();
        this.ind30mCl = new ClsIndTec();
        this.ind04hCl = new ClsIndTec();
        this.srAct = new ClsSopRes();
        this.sr05m = new ClsSopRes();
        this.sr30m = new ClsSopRes();
        this.sr04h = new ClsSopRes();
        this.stsPrice = false
        this.sts05m = false;
        this.sts30m = false;
        this.sts04h = false;
        this.stsBusy = false;
    }
    //TAREAS SINCRÓNICAS
    setSimbolo(strSymbol) {
        this.reset();
        this.simbPrice.symbol = strSymbol;
    }
    actCandelas(candela, periodo) {
        let candAux = "cand" + ("00" + periodo).slice(-3);
        let indAux = "ind" + ("00" + periodo).slice(-3) + "Cl";
        this[candAux].candles.push(candela);
        recortarArray(this[candAux].candles, 200);
        this[indAux].actCandelas(candela);
    }
    actSopRes() {
        let indice = this.cand05m.candles.length - 1;
        let actual = this.cand05m.candles[indice].close;
        let barraAct = { open: actual, close: actual, high: actual * 1.0005, low: actual * 0.9995 }
        let barra05m = this.cand05m.candles[indice - 1];
        let barra30m = this.cand30m.candles[indice - 1];
        let barra04h = this.cand04h.candles[indice - 1];
        let max = Math.max(actual, barra05m.high, barra30m.high, barra04h.high);
        let min = Math.min(actual, barra05m.low, barra30m.low, barra04h.low);
        this.srAct.getSopRes(barraAct, actual, max, min);
        this.sr05m.getSopRes(barra05m, actual, max, min);
        this.sr30m.getSopRes(barra30m, actual, max, min);
        this.sr04h.getSopRes(barra04h, actual, max, min);
    }
    reset() {
        this.simbPrice.reset();
        this.cand05m.reset();
        this.cand30m.reset();
        this.cand04h.reset();
        this.srAct.reset();
        this.sr05m.reset();
        this.sr30m.reset();
        this.sr04h.reset();
        this.sts05m = false;
        this.sts30m = false;
        this.sts04h = false;
        this.stsBusy = false;
    }

    //ELEMENTOS DEL DOM
    getDomPrice() {
        let domPrice = `<div class="col-12 d-flex flex-row justify-content-between align-items-start fs-6">
                        <div>1 ${binExchgInfo.selSymbol.baseAsset} = </div>
                        <div>${glbBinFormatAsset.format(this.simbPrice.price)}</div>
                        <div>${binExchgInfo.selSymbol.quoteAsset}</div>
                    </div>`;
        return domPrice;
    }
    getDomSR() {
        let auxact = `<div id="sract" class="progress barIndicadores">${this.srAct.domBarra}</div>`;
        let aux05m = `<div id="sr05m" class="progress barIndicadores">${this.sr05m.domBarra}</div>`;
        let aux30m = `<div id="sr30m" class="progress barIndicadores">${this.sr30m.domBarra}</div>`;
        let aux04h = `<div id="sr04h" class="progress barIndicadores">${this.sr04h.domBarra}</div>`;
        let domSR = auxact + aux05m + aux30m + aux04h;
        return domSR;
    }

    //TAREAS ASINCRÓNICAS
    async getPrice() {
        if (!this.stsPrice && !this.stsBusy) {
            this.stsBusy = true;
            this.stsPrice = await binGetPrice(this.simbPrice);
            this.stsBusy = this.stsPrice;
        }
    }
    async getInicial() {
        this.sts05m = true;
        this.sts30m = true;
        this.sts04h = true;
        while (this.sts05m || this.sts30m || this.sts04h) {
            if (this.sts05m && !this.stsBusy) {
                this.stsBusy = true;
                this.sts05m = await binGetCandles(this.simbPrice.symbol, this.cand05m, "5m", 200);
                this.stsBusy = this.ind05mCl.getInicial(this.cand05m.candles.map(x => x.close));
            }
            if (this.sts30m && !this.sts05m && !this.stsBusy) {
                this.stsBusy = true;
                this.sts30m = await binGetCandles(this.simbPrice.symbol, this.cand30m, "30m", 200);
                this.stsBusy = this.ind30mCl.getInicial(this.cand30m.candles.map(x => x.close));
            }
            if (this.sts04h && !this.sts30m && !this.stsBusy) {
                this.stsBusy = true;
                this.sts04h = await binGetCandles(this.simbPrice.symbol, this.cand04h, "4h", 200);
                this.stsBusy = this.ind04hCl.getInicial(this.cand04h.candles.map(x => x.close));
            }
            if (!this.sts05m || !this.sts30m || !this.sts04h) {
                this.actSopRes();
            }
        }
    }
    async getCandel(periodo = "5m") {
        this.stsBusy = true;
        let candAux = new ClsCandelExt();
        this.stsBusy = await binGetCandle(this.simbPrice.symbol, candAux, periodo);
        this.actCandelas(candAux, periodo);
        this.actSopRes();
    }

}
export { ClsJcgBin };

// FUNCIONES
function ema(periodo, ant, act) {
    return ((act - ant) * 2 / (periodo + 1) + ant);
}

function recortarArray(array, tamano) {
    let recorte = array.length - tamano;
    recorte > 0 && array.splice(0, array.length - tamano);
}