//$('ul').on('click', 'li div.card section.card-header a.fullscr', function(){
  //$('#modal1').openModal();
//})

$('ul').on('click', 'li div.card section.card-header a.del', function(){
    console.log('asdadas');
    var elem = $(this).parentsUntil('ul')[2];
    console.log(elem);
    gridster.remove_widget(elem);
})
