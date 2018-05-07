var socket = io();



function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var param = jQuery.deparam(window.location.search);
    
    socket.emit('join', param, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('no error')
      }
    })
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
    scrollToBottom();
})
socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();

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