$(document).on('submit', '#upload-form', function(e){
    e.preventDefault();

    var form_data = new FormData($('#upload-form')[0]);
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/upload',
        processData: false,
        contentType: false,
        async: false,
        cache: false,
        data : form_data,
        success: function(response){
            console.log(response);
            var player = $('#player');
            player.attr('src', response.location);
            player[0].load();
        }
    });
});



