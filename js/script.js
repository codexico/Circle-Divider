/* Author: codexico
 * 20120226
 */
$(function() {
  $('#divider').submit(function(e) {
    e.preventDefault();

    var partes, tamanho, resto, partes_array, i, j, r;
    //dados do formulario
    passos = parseInt($(this).find('#passos').val(), 10);
    partes = parseInt($(this).find('#partes').val(), 10);
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

    //mostrar resultado
    r = "<ul>";
    for(var i = 1, j = partes; i <= j; i++) {
      r += "<li> Fatia " + i + " : ";
      r += partes_array[i - 1];
      r += "</li>";
    };
    r += "<ul>";

    $('#results').html(r);

  })
});
