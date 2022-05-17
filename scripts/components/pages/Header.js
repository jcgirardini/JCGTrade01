export const Header = () => {
    let aux = `
        <div class="col-4 col-md-2 d-flex flex-row justify-content-center align-items-center">
            <img class="img-fluid" width="80px" src="./images/JCGTrade.png" alt="Logo de JCGBinTrade" srcset="">
        </div>
        <div class="d-none col-md-6 p-2 d-md-flex flex-column justify-content-center align-items-center">
            <div class="h1 text-center">JCGTrade</div>
            <div class="h2 text-center">(Página en desarrollo)</div>
        </div>
        <div class="col-8 col-md-4 p-2">
            <div class="row">
                <div class="col-3">LTC:</div>
                <div id="FechaLTC" class="col-9 text-end">YYYY/MM/AA HH:MM</div>
                <div class="col-3">UTC:</div>
                <div id="FechaUTC" class="col-9 text-end">YYYY/MM/AA HH:MM</div>
            </div>
            <div class="row d-flex flex-row justify-content-around align-items-center">
                <input id="idInpQuote" 
                       class="col-4" 
                       list="lstQuotes" 
                       name="nQuotes" 
                       placeholder="Quotes">
                <datalist id="lstQuotes">
                </datalist>
                <input id="idInpSymbol" class="col-7" list="lstSymbols" name="nSymbols" placeholder="Symbols">
                <datalist id="lstSymbols">
                </datalist>
            </div>
        </div>
    `;
    return aux;
}