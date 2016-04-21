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
    chart_id = widget.attr('id');
    elem = $('div#'+chart_id);
    console.log(elem);
    li = widget[0];
    //TODO: This condition is harcoded for the TREND, due to the extra-option
    //this can be setted on the redux store.
    elem.width(li.offsetWidth);
    elem.height(li.offsetHeight);
    if(chart_id == 'TREND')
        elem.width(li.offsetWidth - 10);
        elem.height(li.offsetHeight - 60);
    chart = chartOpts[chart_id];
    console.log(chart);
    options = chartOpts[chart_id].getOption();
    console.log(chartOpts.theme);
    chartOpts[chart_id] = echartObj.init(elem[0]);
    chartOpts[chart_id].setOption(options);
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
                resizeChart($widget);
            },
            stop: function(e, ui, $widget) {
                resizeChart($widget);
            }
          }
    }).data('gridster');
});
function rand() {
    return Math.floor(1 + Math.random() * 6)
}

