/* ##################################
   ########## BINANCE SPOT ##########
   ##################################
   
   La información respecto del acceso a la plataforma de BINANCE 
   se ha obtenido del siguiente enlace.

        https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md

    Los presente desarrolladores no se responsabilizan por la información
    obtenida a través de este medio, quedando a criterio extrictamente del
    usuario la confianza depositada en la misma.

*/
//Importación de variables globales

//Public Rest API for Binance (2021-08-12)
const urlApi1 = "https://api1.binance.com";
const urlApi2 = "https://api2.binance.com";
const urlApi3 = "https://api3.binance.com";

//GENERAL ENDPOINTS - GET
const urlTime = "/api/v3/time";
const urlPing = "/api/v3/ping";
const urlInfo = "/api/v3/exchangeInfo";           // ?symbol=BNBBTC -- ?symbols=["BNBBTC", "BTCUSDT", ...]

//MARKET DATA ENDPOINT - GET
const urlBook = "/api/v3/depth";                            // Order book
const urlTrades = "/api/v3/trades";                         // Recent trades list
const urlCandles = "/api/v3/klines";                        // Kline/Candlestick data
const urlPrice = "/api/v3/avgPrice";                        // Current average price

//FUNCIONES CONSTRUCTORAS DE LOS PARÁMETROS PARA LOS ENDPOINS ANTERIORES
function param(acceso, informacion, parametro) {
    let lclurl = "";
    let lclinfo = "";
    let lclpara = "";
    let lclresult = "";

    switch (acceso) {
        case "1":
            lclurl = urlApi1;
            break;
        case "2":
            lclurl = urlApi2;
        case "3":
            lclurl = urlApi3;
        default:
            lclurl = "";
    }

    switch (informacion) {
        case "time":
            lclinfo = urlTime;
            break;
        case "ping":
            lclinfo = urlPing;
            break;
        case "info":
            lclinfo = urlInfo;
            break;
        case "book":
            lclinfo = urlBook;
            break;
        case "trades":
            lclinfo = urlTrades;
            break;
        case "candles":
            lclinfo = urlCandles;
            break;
        case "price":
            lclinfo = urlPrice;
            break;
        default:
            lclinfo = "";
            break;
    }

    if (parametro.length > 0) {
        lclpara = "?" + parametro;
    } else {
        lclpara = "";
    }
    if (lclurl.length > 0 && lclinfo.length > 0) {
        lclresult = lclurl + lclinfo + lclpara;
    } else {
        lclresult = "";
        alert = ("faltan parámetros para realizar la petición");
    }
    return lclresult;

};

async function binGetTime(parServerTime) {
    let lclURL = param("1", "time", "");
    let lclResult = await $.get(lclURL, () => { return true })
        .done((dataTime) => {
            parServerTime.setTime(dataTime.serverTime);
        })
        .fail(() => {
            console.log("binGetTime", "Fallo en la carga de Time Stamp de Binance.", "Fallo");
        })
    return false;
};

async function binGetInfo(parExchgInfo) {
    let lclURL = param("1", "info", "");
    let lclResult = await $.get(lclURL, () => { return true })
        .done((dataInfo) => {
            parExchgInfo.timezone = dataInfo.timezone;
            parExchgInfo.serverTime = dataInfo.serverTime;
            parExchgInfo.rateLimits = dataInfo.rateLimits;
            parExchgInfo.exchangeFilters = dataInfo.exchangeFilters;
            parExchgInfo.symbols = dataInfo.symbols;
            parExchgInfo.getAllAssets();
        })
        .fail(() => {
            console.log("binGetInfo", "Fallo en la carga de información de Binance. Recargue la página", "Fallo")
        });
    return false;
};

async function binGetPrice(parSelSymPrice) {
    let lclURL = param("1", "price", $.param({ symbol: parSelSymPrice.symbol }));
    let lclResult = await $.get(lclURL, () => { return true })
        .done((data) => {
            parSelSymPrice.setPrice(data);
        })
        .fail(() => {
            console.log("binGetPrice", "Fallo en la carga de información de Precio", "Fallo")
        });
    return false;
};

async function binGetCandle(simbolo, objeto, periodo) {
    let lclURL = param("1", "candles", $.param({ symbol: simbolo, interval: periodo, limit: 5 }));
    let lclResult05m = await $.get(lclURL, () => { return true })
        .done((data) => {
            objeto.setCandle(data[4]);
        })
        .fail(() => {
            console.log("binGetCandle", "Fallo en la carga de una candela", "Fallo")
        });
    return false;
}

async function binGetCandles(simbolo, objeto, periodo, cantidad) {
    let lclURL = param("1", "candles", $.param({ symbol: simbolo, interval: periodo, limit: cantidad }));
    let lclResult = await $.get(lclURL, () => { return true })
        .done((data) => {
            objeto.fillArray(data);
        })
        .fail(() => {
            console.log("binGetCandles", "Fallo en la carga de varias candelas", "Fallo")
        });
    return false;
}

export { binGetTime, binGetInfo, binGetPrice };
export { binGetCandle, binGetCandles };
