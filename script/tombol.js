
var mathField = MathQuill.getInterface(2).MathField(document.getElementById('math-field'));
mathField.latex('');

function takHingga() {
    mathField.write('\\sum_{n=1}^{\\infty}\\left(\\right)');
}


function kosong() {
    mathField.write('\\sum_{ }^{ }\\left(\\right)')
}

function hapus() {
    mathField.latex('');
}

function pembagian(){
    mathField.write('\\frac{}{}');
}

function kurungBuka() {
    mathField.typedText('(');
}

function kurungTutup() {
    mathField.typedText(')');
}

function one() {
    mathField.typedText('1');
}

function two() {
    mathField.typedText('2');
}

function three() {
    mathField.typedText('3');
}

function four() {
    mathField.typedText('4');
}

function five() {
    mathField.typedText('5');
}

function six() {
    mathField.typedText('6');
}

function seven() {
    mathField.typedText('7');
}

function eight() {
    mathField.typedText('8');
}

function nine() {
    mathField.typedText('9');
}

function zero() {
    mathField.typedText('0');
}

function n() {
    mathField.typedText('n');
}

function slash() {
    mathField.typedText('/')
}

function multiple() {
    mathField.typedText('*')
}

function plus() {
    mathField.typedText('+')
}

function power() {
    mathField.typedText('^')
}

function comma() {
    mathField.typedText(',')
}

function minus() {
    mathField.typedText('-')
}

function div() {
    mathField.write('\\div')
}

function berbatas() {
    mathField.write('\\sum_{n=1}^{ }\\left(\\right)')
}

function kiri() {
    mathField.keystroke('Left')
}

function kanan() {
    mathField.keystroke('Right')
}

function remove() {
    mathField.keystroke('Backspace')
}

function infinity() {
    mathField.write('\\infty')
}

