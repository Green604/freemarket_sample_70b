$(function() {
  
  // Likeボタンクリック
  $('.LikesIcon').on('click', function() {
    let $btn = $(this);
    // Likeボタンがonクラス持っていたら
    // if ($btn.hasClass('on')) {
    if($('.button_to').children().is('#delete-good')) {　　　//ボタン変化はidがdelete-goodかgoodか(いいねしてる時のidかまだしてない時のidか)で変わる
      // $btn.removeClass('on');

      // 白抜きアイコンに戻す
      $btn.children("i").attr('class', 'far fa-heart LikesIcon-fa-heart');

    } else {

      // $btn.addClass('on');

      // ポイントは2つ！！
      // ①アイコンを変更する
      // far fa-heart（白抜きアイコン）
      // ⇒ fas fa-heart（背景色つきアイコン）
      // ②アニメーション+アイコン色変更用のheartクラスを付与する

      $btn.children("i").attr('class', 'fas fa-heart LikesIcon-fa-heart heart');

    }
  })

  $('.LikesIcon').on('click', function(e) {
    if($('.button_to').children().is('#good')) {
      var url = $('.button_to').attr('action'); 
      $.ajax({ 
        url: url,  // action="/items/5/favorites"
        type: 'POST', 
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){ 
        $('.counts').html(`<p>お気に入り数：${data.counts}</p>`)
        $('.favorites_buttons').html(`<form class="button_to" method="delete" action="/items/${data.item_id}/favorites/${data.id}"><input type="submit" value="いいねを取り消す" id="delete-good" ></form>`)
      })
    } else {
      var url = $('.button_to').attr('action');
      $.ajax({ 
        url: url, // action="/items/5/favorites/105"  //No route matches [GET] "/items/5/favorites/105"となる
        type: 'DELETE', //POST→DELETEに変更したらいけた
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){ 
        var itemId = $('.favorites_buttons').data('id'); //ビューのfavorites_buttonsクラス内にあるdata-indaxを取得
        $('.counts').html(`<p>お気に入り数：${data.counts}</p>`)
        $('.favorites_buttons').html(`<form class="button_to" method="post" action="/items/${itemId}/favorites"><input type="submit" value="いいね" id="good" /></form>`)
      })
    }
  }) 

});