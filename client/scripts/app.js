// YOUR CODE HERE:

var app = {
  init: function() { 
    console.log('in init');
    $('#send .submit').on('submit', function(event) {
      event.preventDefault(); // prevents page reload
      console.log('trying to submit');
      console.log(document.forms);
      app.handleSubmit('Why so many Mel Brooks quotes?');
    });
  },
  send: function(message) {
    $.ajax({
      url: this.server,
      type: "POST",
      data: JSON.stringify(message),
      contentType: "application/json",
      success: function(data) {
        console.log("chatterbox: Message Sent! data: ", data);
      },
      error: function(data) {
        console.log("chatterbox: Failed to send message. Error: ", data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: this.server,
      type: "GET",
      data: "",
      dataType: "json",
      success: function(data) {
        console.log("chatterbox: Fetched! data: ", data);
      }
      // error: function() {}
    });
  },
  server: "https://api.parse.com/1/classes/chatterbox",
  clearMessages: function() {
    $('#chats').children().remove();
  },
  addMessage: function(message) {
    var userName = $('<span class="username">' + message.username + '</span>');
    var text = $('<span class="message">' + message.text + '</span>');
    var roomName = $('<span class="roomName">' + message.roomname + '</span>');
    var div = $('<div></div>');
    userName.on('click', function() {
      app.addFriend();
    });
    div.append(userName, text, roomName);
    $('#chats').append(div);
  },
  addRoom: function(room) {
    $('#roomSelect').append('<p>' + room + '</p>');
  },
  addFriend: function() {},
  handleSubmit: function(message) {
    var text = $('#message').val();
    console.log(text);
    app.send(text);
    console.log("This is handleSubmit");
  }
};