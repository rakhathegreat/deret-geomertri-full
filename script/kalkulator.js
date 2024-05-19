function rasio() {
    let series = mathField.latex();
    if (series.includes("\sum")) {
        series = filter(formatExpression(series));
        Swal.close()
        let result = math.evaluate(series, {n: 2}) / math.evaluate(series, {n: 1});
        if (((result * 10) % 10) == 0) {
            return (result);
        } else {
            return decimalToFraction(result);
        }
    } else {
        if (isGeometricSeries()) {
            series = formatExpression(series);
            if (series.includes(",")) {
                series = series.split(',');
                Swal.close()
                let result = ratio(series);
                if (((result * 10) % 10) == 0) {
                    return (result);
                } else {
                    return decimalToFraction(result);
                }
            } else {
                series = series.split('+');
                Swal.close()
                let result = ratio(series);
                if (((result * 10) % 10) == 0) {
                    return (result);
                } else {
                    return decimalToFraction(result);
                }
            }
        } else {
            return notif()
        }
    }
}

function rasio2(series) {
    let result = math.evaluate(series, {n: 2}) / math.evaluate(series, {n: 1});
    return (result);
}

function isGeometricSeries() {
    let series = mathField.latex();
    series = (formatExpression(series));
    if (series.includes(",")) {
        series = series.split(',');
        if (series.length <= 1) {
            return false;
        }
    
        let ratio = series[1] / series[0];
    
        for (let i = 2; i < series.length; i++) {
            if (series[i] / series[i - 1] !== ratio) {
                return false;
            }
        }
    
        return true;
    } else {
        series = series.split('+');
        if (series.length <= 1) {
            return false;
        }
    
        let ratio = series[1] / series[0];
    
        for (let i = 2; i < series.length; i++) {
            if (series[i] / series[i - 1] !== ratio) {
                return false;
            }
        }
    
        return true;
    }
}

function notif() {
        Swal.fire({
            title: "Bukan Deret Geometri!",
            icon: "warning",
            showConfirmButton: true,
            customClass: {
                input: "custom-font"
            }
        })
}

function jumlah() {
    let series = mathField.latex();
    if (series.includes("\sum")) {
        let upperBound  = batasAtas(series);
        let lowerBound = batasBawah(series);
        let jumlah = 0;
        let cur = 0;
        if (upperBound !== Infinity) {
            series = filter(formatExpression(series));
            for (let i = lowerBound; i <= upperBound; i++) {
                cur = (math.evaluate(series, {n: i}));
                jumlah += cur;
                console.log(cur)
            }
            console.log(jumlah);
        } else {
            series = filter(formatExpression(series));
            if (convergence(series) == "Convergence") {
                jumlah = math.evaluate(series, {n: 1}) / (1 - rasio(series));
                console.log(jumlah);
            } else {
                console.log("Tak Hingga")
            }
        }
    }

}

function jumlah2() {
    let series = mathField.latex();
    if (series.includes("\sum")) {
        let upperBound  = batasAtas(series);
        let jumlah = 0;
        if (upperBound !== Infinity) {
            series = filter(formatExpression(series));
            let jumlah = (math.evaluate(series, {n:1}) * (math.evaluate("r^n", {r:rasio2(series), n:upperBound}) - 1)) / (rasio2(series) - 1);
            Swal.close()
            if (((jumlah * 10) % 10) == 0) {
                return (jumlah);
            } else {
                return decimalToFraction(jumlah);
            }
        } else {
            series = filter(formatExpression(series));
            if (convergence(series) == "Convergence") {
                jumlah = math.evaluate(series, {n: 1}) / (1 - rasio2(series));
                Swal.close()
                return(jumlah);
            } else {
                Swal.close()
                return("\\infinity")
            }
        }
    }

}

function jumlahSukuKeN(upperBound) {
    let series = mathField.latex();
    series = (formatExpression(series));
    if (series.includes(",")) {
        series = series.split(',');
        let sum = 0;
        let r = ratio(series);
        sum += math.evaluate(series[0])
        let cur = math.evaluate(series[0]);
        for (let i = 0; i < upperBound - 1; i++) {
            sum += math.evaluate(`${cur} * ${r}`);
            cur = cur * r;
        }
        return(sum);
    }  else if (series.includes("+")) {
        series = series.split('+');
        let sum = 0;
        let r = ratio(series);
        sum += math.evaluate(series[0])
        let cur = math.evaluate(series[0]);
        for (let i = 0; i < upperBound - 1; i++) {
            sum += math.evaluate(`${cur} * ${r}`);
            cur = cur * r;
        }
        return(sum);
    }
}

function isConvergence() {
    let series = mathField.latex();
    series = (formatExpression(series));
    if (series.includes("\sum")) {
        series = filter(series);
        Swal.close()
        return(convergence(series));
    } else {
        Swal.close()
        return(convergenceSeries(series));
    }
}

function filter(inputString) {
    const regex = /\\left\((.*?)\\right\)/g;
    let filteredString = '';
    let match;

    while ((match = regex.exec(inputString)) !== null) {
        filteredString += match[1];
    }
    return filteredString;
}

function formatExpression(expression) {
    let newExpression = expression.replace(/{/g, '(').replace(/}/g, ')');
    newExpression = newExpression.replace(/\\frac\(([^)]+)\)\(([^)]+)\)/g, '($1)/($2)');
    newExpression = newExpression.replace(/\\cdot/g, '*');
    return newExpression;
}

function convergence(series) {
  let ratio = math.evaluate(series, { n: 2 }) / math.evaluate(series, { n: 1 });
  if (ratio > -1 && ratio < 1) {
      return "Convergence";
  } else {
      return "Divergence "
  }
}

function convergenceSeries(series) {
    series = series.split(",");
    let ratio = math.evaluate(series[1]) / math.evaluate(series[0]);
    if (ratio > -1 && ratio < 1) {
        return "Convergence";
    } else {
        return "Divergence"
    }
}

function batasAtas(expression) {
    let regex = /\^\{(\d+)\}/;
    let regex2 = /\\sum_{n=1}\^(\d+)/;
    let match = expression.match(regex);
    if (match) {
        let upperBound = match[1];
        return parseInt(upperBound);
    } else {
        let match = expression.match(regex2);
        if (match) {
            let upperBound = match[1];
            return parseInt(upperBound);
        } else {
            return Infinity;
        }
    }
}

function batasBawah(expression) {
    let regex = /\\sum_{n=(\d+)}/;
    let match = expression.match(regex);
    if (match) {
        let lowerBound = match[1];
        return parseInt(lowerBound);
    } else {
        return null;
    }
}

function ratio(series) {
    let ratio = math.evaluate(series[1]) / math.evaluate(series[0]);
    return ratio;
}

function sukuKeN(upperBound) {
    let series = mathField.latex();
    series = (formatExpression(series));
    if (series.includes(",")) {
        series = series.split(',');
        let r = ratio(series);
        let cur = math.evaluate(series[0]);
        for (let i = 0; i < upperBound - 1; i++) {
            cur = cur * r;
        }
        return(cur);
    } else if (series.includes("+")) {
        series = series.split('+');
        let r = ratio(series);
        let cur = math.evaluate(series[0]);
        for (let i = 0; i < upperBound - 1; i++) {
            cur = cur * r;
        }
        return(cur);
    }
}

function tambahInput() {
    if (isGeometricSeries()) {
        Swal.fire({
            title: "Silahkan Masukan Batas Atas!",
            input: "number",
            showConfirmButton: true,
            customClass: {
                input: "custom-font"
              }
      
        }).then(value => {
            try {
                let result = jumlahSukuKeN(value.value)
                if (((result * 10) % 10) == 0) {
                    return print(result);
                } else {
                    return print(decimalToFraction(result));
                }
            } catch (e) {
                return;
            }
        })
    } else {
        return notif();
    }
    
}

function tambahInput2() {
    if (isGeometricSeries()) {
        Swal.fire({
            title: "Silahkan Masukan Batas Atas!",
            input: "number",
            showConfirmButton: true,
            customClass: {
                input: "custom-font"
              }
      
        }).then(value => {
            try {
                let result = sukuKeN(value.value)
                if (((result * 10) % 10) == 0) {
                    return print(result);
                } else {
                    return print(decimalToFraction(result));
                }
            } catch (e) {
                return;
            }
        })
    } else {
        return notif();
    }
}

function hitung() {
    let series = mathField.latex() ;
    series = (formatExpression(series));
    Swal.close()
    return(math.evaluate(series));
}
function print(result) {
    const equationsHTML = result;
    document.getElementById('hasil').innerHTML = equationsHTML;
    document.getElementById('hasil2').innerHTML = equationsHTML;
    MathQuill.getInterface(2).StaticMath(document.getElementById('hasil'));
    MathQuill.getInterface(2).StaticMath(document.getElementById('hasil2'));
    
}

function decimalToFraction(decimal) {
    var tolerance = 1.0E-6;

    var h1 = 1;
    var h2 = 0;
    var k1 = 0;
    var k2 = 1;
    var b = decimal;
    var aux;

    do {
        var a = Math.floor(b);
        aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    return `\\frac{${h1}}{${k1}}`;
}


function popup() {
    let series = mathField.latex();
    try {
        if (series == "") {
            Swal.fire({
                title: "Input !",
                icon: "warning",
                showConfirmButton: true,
                customClass: {
                    input: "custom-font"
                  }
              })
        }
        if (series.includes("\\sum_{n=1}^")) {
            if ((series.includes("\\infty"))) {
                Swal.fire({
                    title: "Silahkan Pilih Operasi",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#d33",
                    html: `<div id="operation-container">
                            <button onclick="print(jumlah2())">Jumlah</button>
                            <button onclick="print(isConvergence())">Tes Konvergen</button>
                            <button onclick="print(rasio())">Rasio</button>
                        </div>`,
                    customClass: {
                        input: "custom-font"
                      }
                  })
            } else if ((series.includes("{ }"))) {
                Swal.fire({
                    title: "Silahkan Masukan Batas Atas!",
                    icon: "warning",
                    showConfirmButton: true,
                    customClass: {
                        input: "custom-font"
                      }
                  })
            } else {
                Swal.fire({
                    title: "Silahkan Pilih Operasi",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#d33",
                    html: `<div id="operation-container">
                            <button onclick="print(jumlah2())">Jumlah</button>
                            <button onclick="print(rasio())">Rasio</button>
                        </div>`,
                    customClass: {
                        input: "custom-font"
                      }
                  })
            }
        } else if (series.includes(",")) {
            if(series.includes("\\frac")) {
                let count = (series.match(/\\frac/g) || []).length;
                if (series.includes("{ }")) {
                    Swal.fire({
                        title: "Input Error",
                        icon: "warning",
                        showConfirmButton: true,
                        customClass: {
                            input: "custom-font"
                          }
                      })
                } else if(count < 2) {
                    print(hitung())
                } else {
                    if (series.includes("+")) {
                        Swal.fire({
                            title: "Silahkan Pilih Operasi",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            html:   `<div id="operation-container">
                                        <button onclick="">Jumlah</button>
                                        <button onclick="tambahInput()">Jumlah suku ke n</button>
                                        <button onclick="tambahInput2()">Suku ke n</button>
                                        <button onclick="print(rasio())">Rasio</button>
                                    </div>`,
                            customClass: {
                                input: "custom-font"
                              }
                          })
                    } else {
                        Swal.fire({
                            title: "Silahkan Pilih Operasi",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            html:   `<div id="operation-container">
                                        <button onclick="tambahInput()">Jumlah suku ke n</button>
                                        <button onclick="tambahInput2()">Suku ke n</button>
                                        <button onclick="print(rasio())">Rasio</button>
                                    </div>`,
                            customClass: {
                                input: "custom-font"
                              }
                          })
                    }
                    
                }
            } else {
                Swal.fire({
                    title: "Silahkan Pilih Operasi",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#d33",
                    html:   `<div id="operation-container">
                                <button onclick="tambahInput()">Jumlah suku ke n</button>
                                <button onclick="tambahInput2()">Suku ke n</button>
                                <button onclick="print(rasio())">Rasio</button>
                            </div>`,
                    customClass: {
                        input: "custom-font"
                      }
                  })
            }
        } else if (!series.includes("\\sum_{n=1}^") && !series.includes("\\frac") && series !== "") {
            print(hitung())
        }  else {
            Swal.fire({
                title: "Silahkan Pilih Operasi",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: "#d33",
                html: `<div id="operation-container">
                        <button onclick="print(decimalToFraction(hitung()))">Hitung</button>
                        <button onclick="tambahInput()">Jumlah suku ke n</button>
                        <button onclick="print(rasio())">Rasio</button>
                    </div>`,
                customClass: {
                    input: "custom-font"
                  }
              })
        }
    } catch (e) {
        Swal.fire({
            title: "Input Error!",
            icon: "warning",
            showConfirmButton: true,
            customClass: {
                input: "custom-font"
              }
          })
    }
}