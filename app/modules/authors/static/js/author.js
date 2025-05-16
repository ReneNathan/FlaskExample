$(document).ready(function () {
  mobile_menu_itens = document.querySelectorAll('.mobile-item');
  menu_itens = document.querySelectorAll('.custom_nav-item');

  remove_active(mobile_menu_itens);
  remove_active(menu_itens);
  mobile_menu_itens[1].classList.add('active');
  menu_itens[1].classList.add('active');

});

//ativação da table de autores
$(document).ready(function () {
  $('#table_autores').DataTable({
    "pageLength": 5,   // 5 registros por página
    "language": {
      "search": "Buscar:",
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "Nada encontrado",
      "info": "Mostrando página _PAGE_ de _PAGES_",
      "infoEmpty": "Nenhum registro disponível",
      "infoFiltered": "(filtrado de _MAX_ registros no total)"
    }
  });
});


function remove_active(menu_itens_list){
  for (let i = 0; i < menu_itens_list.length; i++) {
    if (menu_itens_list[i].classList.contains('active')) {
      menu_itens_list[i].classList.remove('active');
    }
  }
}