
// LIBRERIA OPERACIONES CON MATRICES

function smaEcuaciones(matrizEc, vectorRes) {
    // RESOLUCION DE SISTEMAS DE ECUACIONES LINEALES POR REGLA DE CRAMER
    let ordenM = matrizEc.length - 1;
    let ordenV = vectorRes.length - 1;
    if ((ordenM !== matrizEc[0].length - 1) || (ordenM !== ordenV)) {
        return null;
    }
    let detMayor = determinante(matrizEc);
    let matCoeficientes = [];
    for (let i = 0; i <= ordenM; i++) {
        let auxSustituta = sustitucionColumna(matrizEc, vectorRes, i);
        let auxDeterminante = determinante(auxSustituta);
        matCoeficientes.push(auxDeterminante / detMayor);
    }
    return matCoeficientes;
}

function sustitucionColumna(matriz, vector, columna) {
    let ordenM = matriz.length - 1;
    let ordenV = vector.length - 1;
    let sustituta = [];
    if ((ordenM !== matriz[0].length - 1) || (ordenM !== ordenV) || (columna > ordenM)) {
        return null;
    }
    for (let i = 0; i <= ordenM; i++) {
        sustituta.push([...matriz[i]]);
        sustituta[i][columna] = vector[i];
    }
    return sustituta;
}

function adjunta(matriz) {
    let orden = matriz.length - 1;
    if (orden === matriz[0].length - 1) {
        let adjunta = [];
        for (let i = 0; i <= orden; i++) {
            let filaAdj = [];

            for (let j = 0; j <= orden; j++) {
                let auxMenor = [...menor(matriz, i, j)];
                let auxCofactor = Math.pow(-1, i + j) * determinante(auxMenor);
                filaAdj.push(auxCofactor);
            }
            adjunta.push(filaAdj);
        }
        return adjunta;
    } else {
        return null;
    }
}
function menor(matriz, fila, columna) {
    let orden = matriz.length - 1;
    let menor = [];
    if (matriz[0].length - 1 === orden) {
        for (let i = 0; i <= orden; i++) {
            if (i !== fila) {
                let auxfila = [...matriz[i]]
                auxfila.splice(columna, 1);
                menor.push(auxfila);
            };
        };
        return menor;
    } else {
        return null;
    };
}
function determinante(matriz) {
    let orden = matriz.length;
    // Early returns
    if (orden === 0 || orden !== matriz[0].length || matriz[0][0] === 0) {
        return null
    }
    let matrizTri = hacerTriangular(matriz);
    let det = 1;
    for (let idx = 0; idx < orden; idx++) {
        det = det * matrizTri[idx][idx];
    }
    det = parseFloat(det.toFixed(8));
    return det
}
function hacerTriangular(matriz) {
    let orden = matriz.length;
    // Early returns
    if (orden === 0 || orden !== matriz[0].length || matriz[0][0] === 0) {
        return null
    }

    // Body Function
    let matrizTri = [];
    for (let idx = 0; idx < orden; idx++) {
        matrizTri.push([...matriz[idx]]);
    }
    for (let indA = 1; indA < orden; indA++) {
        for (let indB = indA; indB < orden; indB++) {
            if (matrizTri[indB][indA - 1] !== 0) {
                let factor = - matrizTri[indB][indA - 1] / matrizTri[indA - 1][indA - 1];
                let filaAux = matrizTri[indA - 1].map(x => x * factor);
                let filaAux2 = matrizTri[indB].map((x, idx) => {
                    let y = x + filaAux[idx];
                    return y;
                });
                for (let indC = 0; indC < orden; indC++) {
                    matrizTri[indB][indC] = filaAux2[indC];
                }
            }
        }
    }
    return matrizTri;
}

export {smaEcuaciones, sustitucionColumna, adjunta, menor, determinante, hacerTriangular};
