import { blnJcgInfo, blnBinInfo, glbBinAssetOptions, jcgCandles } from "../variables/main_variables.js";
import { binServerTime, binExchgInfo } from "../variables/BinanceVar.js";
import { binGetTime, binGetInfo } from "./BinanceFnc.js";
import { fncDOMHora, fncDOMlstOptions } from "./main_DOM.js";

var glbTicks = 1;
var glbMinutes = 1;

// Temporizador de ticks
function fncTemporizadorGlobal() {

    //Actualización de ticks
    fncBin01seg();
    if (glbTicks % 60 === 59) {
        glbTicks = 0;
        glbMinutes % 60 === 59 ? 0 : glbMinutes++;
    };

    if (glbTicks % 10 === 9) {
        fncBin10seg();
    };

    if (glbTicks % 35 === 34) {
        fncBin01min();
    };

    if (glbTicks % 40 === 39 && glbMinutes % 5 === 4) {
        fncBin05min();
    };

    if (glbTicks % 45 === 44 && glbMinutes % 30 === 29) {
        fncBin30min();
    };
    glbTicks++;

};
// Función de inicio al cargar la página
async function fncBinInicio() {
    await fncReset();
    if (!blnBinInfo.stsInfo) {
        blnBinInfo.stsInfo = true;
        blnBinInfo.stsInfo = await binGetInfo(binExchgInfo);
        fncDOMlstOptions("lstQuotes", binExchgInfo.allQuotes);
    };
}
// Obtener fecha del servidor de Binance y presentarla en el DOM
async function fncObtenerHora() {
    if (!blnJcgInfo.stsTime) {
        blnJcgInfo.stsTime = true;
        blnJcgInfo.stsTime = await binGetTime(binServerTime);
        fncDOMHora(binServerTime);
    }
}
// Reset de variables de control de flujo y sincronización
async function fncReset() {
    blnJcgInfo.reset();
    blnBinInfo.reset();
    await fncObtenerHora();
}
// Función de seteo del Símbolo con el que se trabajará
async function fncSetSymbol(simbolo) {
    if (binExchgInfo.symbols.length > 0) {
        await fncReset();
        binExchgInfo.setSymbol(simbolo);
        jcgCandles.setSimbolo(binExchgInfo.selSymbol.symbol);
        blnBinInfo.stsSymbol = binExchgInfo.selSymbol.symbol === jcgCandles.simbPrice.symbol;
        glbBinAssetOptions.maximumSignificantDigits = binExchgInfo.selSymbol.quoteAssetPrecision;
        $("#idInpSymbol").val(simbolo);
        (blnBinInfo.stsSymbol && !blnBinInfo.stsPrice) && await jcgCandles.getPrice();
        $("#idSymPrice").html(jcgCandles.getDomPrice());
        await jcgCandles.getInicial();
        $("#idSopRes").html(jcgCandles.getDomSR());
    };
}

//Tareas asíncronas o síncronas lanzadas períodicamente
function fncBin01seg() {
}

async function fncBin10seg() {
    await fncObtenerHora();
    if (blnBinInfo.stsSymbol && !blnBinInfo.stsPrice) {
        await jcgCandles.getPrice();
        $("#idSymPrice").html(jcgCandles.getDomPrice());
        $("#idSopRes").html(jcgCandles.getDomSR());
    }
}

function fncBin01min() {
    if (blnBinInfo.stsSymbol) {
        jcgCandles.getCandel("5m");
    }
}

function fncBin05min() {
    if (blnBinInfo.stsSymbol) {
        jcgCandles.getCandel("30m");
    }
}

function fncBin30min() {
    if (blnBinInfo.stsSymbol) {
        jcgCandles.getCandel("4h");
    }
}

export { fncTemporizadorGlobal, fncBinInicio, fncSetSymbol };