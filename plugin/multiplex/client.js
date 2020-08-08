(function() {
	var multiplex = Reveal.getConfig().multiplex;
	var socketId = multiplex.id;
	var socket = io.connect(multiplex.url);

	socket.on(multiplex.id, function(data) {
		// ignore data from sockets that aren't ours
		if (data.socketId !== socketId) { return; }
		if( window.location.host === 'localhost:1947' ) return;

		if (data.state) {
			Reveal.setState(data.state);
		} else {
			Reveal.dispatchEvent( data.type, { "action": data.event.action } );
		}
		
	});
}());
