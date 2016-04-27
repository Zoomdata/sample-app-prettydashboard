$(document).ready(function(){
    $('.modal-trigger').leanModal({ dismissible: false });
})
$('a.fullscr').on('click', function(){ $('#modalDetails').openModal(); })
