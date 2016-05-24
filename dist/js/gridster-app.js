/*
 * Initializes the modal (represented by the WidgetDetail react component) to 
 * avoid the modal can be dismissed by the ESC key
 */
$(document).ready(function(){
    $('.modal-trigger').leanModal({
          dismissible: false
        });
})

var gridster;

/*
 * Initializes the gridster object which takes the <ul> element inside de div
 * with class 'gridster' (Dashboard react component) and creates a gridster instance
 * Check http://gridster.net/#documentation for more information.
 */
$(function(){
     gridster = $(".gridster ul").gridster({
     widget_base_dimensions: [60, 60], 
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
