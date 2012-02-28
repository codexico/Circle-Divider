/* Author: codexico
 * 20120226
 */

var CircleDivider = {}

CircleDivider.mostrarResultado = function(partes_array) {
  r = "<ul>";
  for(var i = 1, j = partes_array.length; i <= j; i++) {
    r += "<li> Fatia " + i + " : ";
    r += partes_array[i - 1];
    r += "</li>";
  };
  r += "<ul>";

  $('#results').html(r);
},


CircleDivider.calculaCirculo = function(passos, partes) {
  var tamanho, resto, partes_array, i, j, r;
  //calcula tamanho base de cada parte do circulo
  tamanho = parseInt(Math.floor(passos / partes), 10);
  //calcula tamanho do resto do circulo
  resto = passos % partes;
  //array de partes para formar o circulo
  partes_array = [];

  //preenche o array com os tamanhos
  i = partes;
  while(i--) {
    partes_array[i] = tamanho;
  }

  //completa o circulo com o resto da divisao distribuindo pelas partes
  j = resto;
  while(j--) {
    partes_array[j] += 1;
  }

  this.mostrarResultado(partes_array);

  this.desenhaCirculo(passos, partes, partes_array);
},


CircleDivider.drawTextAlongArc = function(context, str, centerX, centerY, radius, startAngle, endAngle, color) {
  context.font = "24pt Calibri";
  context.textAlign = "center";
  context.fillStyle = color;
  context.strokeStyle = color;
  context.lineWidth = 4;

  //spacing
  str = " " + str + " ";
  var lenghtAngle = endAngle - startAngle;

  context.save();
  context.translate(centerX, centerY);

  //arc começa na direita e texto começa em cima???
  context.rotate(startAngle + (Math.PI / 2));

  //letras
  for(var n = 0; n < str.length; n++) {
    context.rotate(lenghtAngle / str.length);
    context.save();
    context.translate(0, (-1 * radius) - 6);
    var c = str[n];
    context.fillText(c, 0, 0);
    context.restore();
  }
  context.restore();
}, 


CircleDivider.desenhaCirculo = function(passos, partes, partes_array) {
  var canvas = document.getElementById("circleCanvas");
  if(canvas.getContext) {//verifica se o navegador suporta
    var context = canvas.getContext('2d');
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = canvas.width / 3;
  var lineWidth = 1;
  var startingAngle = -1 * Math.PI / 2;
  var antiClockwise = false;
  var arco = (Math.PI * 2) / partes;
  var endingAngle = startingAngle + arco;

  while(partes--) {
    var color = colour.next();

    context.beginPath();

    this.drawTextAlongArc(context, partes_array[partes].toString(), centerX, centerY, radius, startingAngle, endingAngle, color)

    context.arc(centerX, centerY, radius, startingAngle, endingAngle, antiClockwise);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.lineWidth = lineWidth;
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = "#000000";
    context.stroke();

    //next size
    startingAngle = endingAngle;
    endingAngle += arco;
  }
}


CircleDivider.init = function () {
  self = this;
  $('#divider').submit(function(e) {
    e.preventDefault();
    var passos, partes;
    //dados do formulario
    passos = parseInt($(this).find('#passos').val(), 10);
    partes = parseInt($(this).find('#partes').val(), 10);

    self.calculaCirculo(passos, partes);
  });  
}


var colour = ( function() {
  var index = 0,
  colours = ["#FF0000", "#FFFFFF", "#00FF00", "#FE57A1", "#0000FF", "#00FFFF", "#000000", "#FFFF00", "#FF00FF", "#CCCCCC"];

  return {
    next : function() {
      if(index >= colours.length) {
        index = 0;
      }
      return colours[index++];
    },
    random : function() {
      //http://paulirish.com/2009/random-hex-color-code-snippets/
      return "#" + (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
    }
  }
}());


$(function($) {
  CircleDivider.init();
}(jQuery));