$('ul').on('click', 'li div.card section.card-header a.fullscr', function(){
  $('#modal1').openModal();
  //Get the widget
    li = $(this).parentsUntil('ul')[2];
    chart_id = $(li).attr('id');
    options = chartOpts[chart_id].getOption();
    console.log(options);
    chart = echartObj.init(document.getElementById('modalchart'));
    chart.setOption(options);
})

$('ul').on('click', 'li div.card section.card-header a.del', function(){
    console.log('asdadas');
    var elem = $(this).parentsUntil('ul')[2];
    console.log(elem);
    gridster.remove_widget(elem);
})
