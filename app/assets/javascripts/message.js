$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="messages">
            <div class="messages-user">
              <div class="messages-user__name">
                ${message.user_name}
              </div>
              <div class="messages-user__date">
                ${message.created_at}
              </div>
            </div>
            <div class="messages-content">
              <p class="messages-content__text">
                ${message.content}
              </p>
              <img src=${message.image} class="messages-content__image">
            </div>
          </div>`
        return html;
      } else {
        var html =
          `<div class="messages">
            <div class="messages-user">
              <div class="messages-user__name">
                ${message.user_name}
              </div>
              <div class="messages-user__date">
                ${message.created_at}
              </div>
            </div>
            <div class="messages-content">
              <p class="messages-content__text">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-message').append(html);
      $('form')[0].reset();
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
    .always(function(){
      $('.input-submit').removeAttr("disabled");
    });
  });
});