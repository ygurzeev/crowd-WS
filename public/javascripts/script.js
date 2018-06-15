$( document ).ready(function() {
    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:3000/events'
    // }).success(function (data, status) {
    //     // Your code here
    // }).error(function (data, status) {
    //     // Your code here
    // });
});


var getEvents = function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/events',
        success: function(response){
            console.log(response);

        }
    })
}