$(function(){
  function buildHTML(comment){
    var html = `<li class="clearfix">
                  <a class="message-user" href=${comment.user}>
                    <div class="figure">
                      <div class="div">
                        <img width="40" height="40" src="https://static.mercdn.net/thumb/members/551390331.jpg?1581956265">
                      </div>
                      <figcaption class="bold">
                      ${comment.user_name}
                      </figcaption>
                    </div>
                    <div class="message-is-seller">
                    出品者
                    </div>
                  </a>
                  <div class="message-body">
                    <div class="message-body-text">
                    ${comment.comment}
                    </div>
                    <div class="message-icons clearfix">
                      <time class="message-icon-left">
                        <i class="icon-time"></i>
                        <time datetime=${comment.created_at}>
                          ${comment.created_at}
                        </time>
                      </time>
                      <div class="message-icon-right">
                        <a href="#">
                          <i class="fa fa-flag"></i>
                        </a>
                      </div>
                    </div>
                    <i class="icon-balloon"></i>
                  </div>
                </li>`
    return html;
  }

  $('#comment').on('submit', function(e){
    e.preventDefault()
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
      $('.message-items').prepend(html);
      $('#comment_text').val('');
      $('#commentBtn').prop('disabled', false);
    })
    return false;
  });

});