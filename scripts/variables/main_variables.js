import { ClsBinInfo, ClsJcgBin, ClsJcgInfo, ClsPronosticos } from "./JcgObj.js";


//DEFINICION DE VARIABLES GLOBALES
//Variables y Formatos de fecha
const glbUTC = new Date();
const glbLTC = new Date();

// Formatos de números
const glbBinAssetOptions = {
    notation: "standard",
    signDisplay: "auto",
    style: "decimal",                // "currency", "percent", "unit"
    //  unit: 
    useGrouping: false,
    roundingMode: "floor",
    roundingPriority: "auto",
    //  roundingIncrement:
    trailingZeroDisplay: "auto",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 8
}

const glbBinFormatAsset = new Intl.NumberFormat("en-EN", glbBinAssetOptions);

//FLAGS DE CONTROL DE FLUJOS
const blnJcgInfo = new ClsJcgInfo();
const blnBinInfo = new ClsBinInfo();

//VARIABLES DE JCGTrade
const jcgCandles = new ClsJcgBin();
const jcgPronostico = new ClsPronosticos();

export { glbUTC, glbLTC, glbBinAssetOptions, glbBinFormatAsset };
export { blnJcgInfo, blnBinInfo };
export { jcgCandles, jcgPronostico };