$('ul').on('click', 'li div.card section.card-header a.fullscr', function(){
  $('#modal1').openModal();
  //Get the widget
    li = $(this).parentsUntil('ul')[2];
    console.log(li);
    chart_id = $(li).children('div').children('div').children('div').attr('id');
    options = mycharts[chart_id].getOption();
    chart = echarts.init(document.getElementById('modalchart'));
    chart.setOption(options);
    console.log(chart);
})

var jwidget = function(data){
      var widget = ' <li> \
                <div class="card card-panel dark-grey">\
                      <section class="card-header">\
                            <a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Filters">\
                                <i class="material-icons md-light">filter_list</i></a>\
                            <a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Chart Style">\
                                <i class="material-icons md-light">assessment</i></a>\
                            <a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Full Screen">\
                                <i class="material-icons md-light">open_in_new</i></a>\
                            <a href="#" class="del tooltipped" data-position="bottom" data-delay="50" data-tooltip="Delete">\
                                <i class="material-icons md-light">close</i></a>\
                      </section>\
                        <div class="card-body">\
                            <h3>+widget!</h3>\
                            <p>A new dash generation</p>\
                        </div>\
                </div>\
              </li>'
    gridster.add_widget(widget, 2, 1);
}

var gridster;
var colors = {
   1:'orange',
   2:'red',
   3:'yellow',
   4:'blue',
   5:'green',
   6:'blue-gray',
  };

function resizeChart(widget){
    chart_id = widget.children('div').children('div').children('div').attr('id');
    elem = $('#'+chart_id);
    console.log(elem);
    li = widget[0];
    elem.height(li.offsetHeight);
    elem.width(li.offsetWidth);
    chart = mycharts[chart_id];
    options = mycharts[chart_id].getOption();
    mycharts[chart_id] = echarts.init(document.getElementById(chart_id));
    mycharts[chart_id].setOption(options);
}

$(function(){
     gridster = $(".gridster ul").gridster({
     widget_base_dimensions: [200, 200],
     widget_margins: [5, 5],
     autogrow_cols: true,
     draggable: {
            handle: 'section',
          },
     resize: {
            enabled: true,
            resize: function(e, ui, $widget) {
            //    resizeChart($widget);
                console.log('');
            },
            stop: function(e, ui, $widget) {
            //    resizeChart($widget);
            }
          }
    }).data('gridster');
});
function rand() {
    return Math.floor(1 + Math.random() * 6)
}

$('ul').on('click', 'li div.card section.card-header a.del', function(){
    console.log('asdadas');
    var elem = $(this).parentsUntil('ul')[2];
    console.log(elem);
    gridster.remove_widget(elem);
})
