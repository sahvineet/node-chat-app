var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect', function () {
    console.log('Disconnected to server')
})

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html);
})
socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html)
    
    // var formatedTime = moment(message.createdAt).format('h:mm a')
    // var li = jQuery('<li></li>');
    // var a = jQuery(`<a target='_blank'>My Current Location</a>`);
    // li.text(`${message.from}: ${formatedTime} `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

})

jQuery(document).ready(function () {

    jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('#message').val()
        }, function (data) {
            jQuery('#message').val('')
            console.log('Got It');
        })
    })

    var locationDom = jQuery('#send-location');
    locationDom.on('click', function (e) {
        if (!navigator.geolocation)
            return alert('Geo location in not supported by your browser');

        locationDom.attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition(function (postions) {
            locationDom.removeAttr('disabled').text('Send location');

            socket.emit('createLocationMessage', {
                latitude: postions.coords.latitude,
                longitude: postions.coords.longitude
            })
        }, function (error) {
            locationDom.removeAttr('disabled').text('Send location');

            return alert('Unable to fetch location');
        })
    })

})