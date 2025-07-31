var setaDir = window.document.getElementById("setaDir")
var Leonardo = window.document.getElementById("Leonardo")
var Samantha = window.document.getElementById("Samantha")
var Bruna = window.document.getElementById("Bruna")
var setaEsq = window.document.getElementById("setaEsq")

function RolarParaDireita(){
    Leonardo.style ="display:none"
    Bruna.style ="display:flex"
    setaDir.style = "display:none"
    setaEsq.style = "display:flex; margin-top:55px"
}


function RolarParaEsquerda(){
    Leonardo.style ="display:flex"
    Bruna.style ="display:none"
    setaDir.style = "display:flex"
    setaEsq.style = "display:none; margin-top:55px"
}
