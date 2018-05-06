var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected to server')
})

socket.on('newMessage', function (message) {
    console.log('New Message', message)
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})
socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery(`<a target='_blank'>My Current Location</a>`);
    li.text(`${message.from} :`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

})

jQuery(document).ready(function () {

    jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('#message').val()
        }, function (data) {
            console.log('Got It');
        })
    })

    var locationDom = jQuery('#send-location');
    locationDom.on('click', function (e) {
        if (!navigator.geolocation)
            return alert('Geo location in not supported by your browser');

        navigator.geolocation.getCurrentPosition(function (postions) {
            socket.emit('createLocationMessage', {
                latitude: postions.coords.latitude,
                longitude: postions.coords.longitude
            })
        }, function (error) {
            return alert('Unable to fetch location');
        })
    })

})