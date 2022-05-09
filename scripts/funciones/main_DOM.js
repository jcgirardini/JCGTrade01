// FUNCIONES RELATIVAS AL DOM
// Mensaje de alerta
function fcnAlerta(padre, mensaje, tipo) {
    alert(`Padre: ${padre} / Mensaje: ${mensaje} / Tipo: ${tipo}.`);
};

// Fecha encabezado
function fncDOMHora(parServerTime) {
    $("#FechaUTC").html(parServerTime.utcTime);
    $("#FechaLTC").html(parServerTime.lclTime);
};

function fncDOMlstOptions(padre, optArray) {
    let milstOpt = "";
    for (let item = 0; item < optArray.length; item++) {
        let miopcion = `<option value=${optArray[item]}>`;
        milstOpt += miopcion;
    }
    $("#" + padre).html(milstOpt);
};

export { fncDOMHora, fncDOMlstOptions};