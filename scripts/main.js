//IMPORTACION VARIABLES GLOBALES
import { Header } from "./components/pages/Header.js";
import { fncTemporizadorGlobal, fncBinInicio, fncSetSymbol } from "./funciones/main_funciones.js";
import { binExchgInfo} from "./variables/BinanceVar.js";
import { fncDOMlstOptions } from "./funciones/main_DOM.js";
var glbTempoId;

//MONTAJE DE LA PÁGINA DESDE JS
$("header").html(Header);


//PROCEDIMIENTOS AL CARGAR LA PAGINA
$(function () {
    glbTempoId = window.setInterval(fncTemporizadorGlobal, 1000);
    fncBinInicio();
});

//GESTION DE EVENTOS
$("#idInpQuote").on('focusout', (e) => {
    let mivalor = $(e.target).val().toUpperCase();
    if (mivalor != "") {
        let miLstSymbols = binExchgInfo.getSymbols(mivalor)
        $("#idInpQuote").val(mivalor);
        $("#idInpSymbol").val("");
        fncDOMlstOptions("lstSymbols", miLstSymbols);
    };
});
$("#idInpSymbol").on('focusout', (e) => {
    let mivalor = $(e.target).val().toUpperCase();
    mivalor != "" && fncSetSymbol(mivalor);
});

