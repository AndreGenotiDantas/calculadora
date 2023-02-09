'use strict';


const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");
let novoNumero = true;
let operador;
let numeroAnterior;

//textContent obtém o conteúdo de todos os elementos, incluindo os elementos <script> e <style> . por outro lado, o innerText mostra apenas os elementos para "leitura humana". textContent retorna todos os elementos de um nó


const operacaoPendente = () => operador != undefined; //funcao que verifica se o operador e diferente de undefined

const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = Number(display.textContent.replace(",", "."));
        novoNumero = true;
        if(operador == "+"){
            atualizarDisplay(numeroAnterior + numeroAtual);
            return;
        }

        if(operador == "-"){
            atualizarDisplay(numeroAnterior - numeroAtual);
            return;
        }

        if(operador == "*"){
            atualizarDisplay(numeroAnterior * numeroAtual);
            return;
        }

        if(operador == "/"){
            atualizarDisplay(numeroAnterior / numeroAtual);
            return;
        }
        
    }
}


const atualizarDisplay = (texto) =>{
    if(!(novoNumero)){
        display.textContent += texto;
        return;
    }
    display.textContent = texto;
    novoNumero = false;
    return;
} 
    

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);


numeros.forEach(numero => 
    numero.addEventListener("click", inserirNumero)
);


const selecionarOperador = (evento) =>{
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = Number(display.textContent.replace(",", "."));
        console.log(operador);
    }

}

operadores.forEach(operador => 
    operador.addEventListener("click", selecionarOperador)
);

const ativarIgual = () => {
    calcular();
    operador =  undefined
}

document.getElementById("igual").addEventListener("click", ativarIgual);


const limparDisplay = () => display.textContent = "";

document.getElementById("limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById("limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById("backspace").addEventListener("click", removerUltimoNumero);

const inverterSinal = () =>{
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
} 

document.getElementById("inverter").addEventListener("click", inverterSinal);



const exiteDecimal = () => display.textContent.indexOf(",") != -1;
const existevalor = () => display.textContent.length > 0 ;
const inserirDecimal = () => {
    if(!exiteDecimal()){
        if(existevalor()){
            atualizarDisplay(',');
            return;
        }
        atualizarDisplay("0,");
    }
}
document.getElementById("decimal").addEventListener("click", inserirDecimal);