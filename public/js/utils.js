$('ul').on('click', 'li div.card section.card-header a.fullscr', function(){
  $('#modal1').openModal();
  //Get the widget
    li = $(this).parentsUntil('ul')[2];
    console.log(li);
    chart_id = $(li).children('div').children('div').children('div').attr('id');
    options = mycharts[chart_id].getOption();
    chart = echarts.init(document.getElementById('modalchart'));
    chart.setOption(options);
    console.log(chartOpts);
})

$('ul').on('click', 'li div.card section.card-header a.del', function(){
    console.log('asdadas');
    var elem = $(this).parentsUntil('ul')[2];
    console.log(elem);
    gridster.remove_widget(elem);
})
