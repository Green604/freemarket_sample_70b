$(function(){
  // create.json.jbuilderで渡したインスタンス変数を使用
  // app/views/items/show.html.hamlの%li.clearfix以降のhtmlをjsで挿入する
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

  // コメントフォームに付与したid=commentが送信された時にjsのイベントを発火
  $('#comment').on('submit', function(e){
    e.preventDefault()
    // thisで取得したフォームのdataを変数formDataに代入
    var formData = new FormData(this);
    // フォームのaction属性ないのurl情報を取得
    var url = $(this).attr('action');
    // json形式でcomments_controllerにdataを渡す
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // データを渡し終えた後、5~38行目のhtmlを引数data = commentとして.message-items下に追加
    .done(function(data){
      var html = buildHTML(data);
      // appendではなく、prependを使用することで送信したコメントが一番下ではなく、一番上に追加される
      $('.message-items').prepend(html);
      // text_field=comment_text内の文字を削除
      $('#comment_text').val('');
      // 送信ボタン＝commentBtnを連続で押せるようにする
      $('#commentBtn').prop('disabled', false);
    })
    // return false;によってjavascriptにより、二重でcommentが保存されるのを防ぐ
    // return false;はその記述までで処理を中断する記述
    return false;
  });

});