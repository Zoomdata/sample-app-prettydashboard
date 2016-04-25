$(document).ready(function(){
    $('.modal-trigger').leanModal({
          dismissible: false
        });
})
var jwidget = function(data){
      var widget = ' <li> \
                <div class="card card-panel dark-grey">\
                      <section class="card-header">\
                            <a href="#modal1" class="tooltipped modal-trigger" data-position="bottom" data-delay="50" data-tooltip="Full Screen">\
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

$(function(){
     gridster = $(".gridster ul").gridster({
     widget_base_dimensions: [200, 200],
     widget_margins: [5, 5],
     autogrow_cols: true,
     draggable: {
            handle: 'section, section *',
          },
     resize: {
            enabled: true,
            resize: function(e, ui, $widget) {
                $widget.trigger('click');
            },
            stop: function(e, ui, $widget) {
                $widget.trigger('click');
            }
          }
    }).data('gridster');
});
