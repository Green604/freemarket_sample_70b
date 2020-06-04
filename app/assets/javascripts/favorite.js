$(function() {
  
  // Likeボタンクリック
  $('.LikesIcon').on('click', function() {
    let $btn = $(this);
    // Likeボタンがonクラス持っていたら
    if ($btn.hasClass('on')) {

      $btn.removeClass('on');

      // 白抜きアイコンに戻す
      $btn.children("i").attr('class', 'far fa-heart LikesIcon-fa-heart');

    } else {

      $btn.addClass('on');

      // ポイントは2つ！！
      // ①アイコンを変更する
      // far fa-heart（白抜きアイコン）
      // ⇒ fas fa-heart（背景色つきアイコン）
      // ②アニメーション+アイコン色変更用のheartクラスを付与する

      $btn.children("i").attr('class', 'fas fa-heart LikesIcon-fa-heart heart');

    }
  })

  $('.favorites_buttons').on('click','.button_to', function(e) {
    e.preventDefault();
    if($('.button_to').children().is('#good')) {
      console.log('good');
      var formData = new FormData(this); // FormDataオブジェクトは、フォームで送信される情報を収集するために用いる
      console.log(this);
      e.preventDefault(); 
      var url = $(this).attr('action'); 

      $.ajax({ 
        url: url,  // action="/items/5/favorites"
        type: 'POST', 
        data: formData,
          // favorite: {
          //   user_id: current_user.id
          //   item_id: @item.id
          // }
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){ 
        $('.counts').html(`<p>いいね数：${data.counts}</p>`)
        $('.favorites_buttons').html(`<form class="button_to" method="delete" action="/items/${data.item_id}/favorites/${data.id}"><input type="submit" value="いいねを取り消す" id="delete-good" ></form>`)
      })
    } else {
      console.log('not-good');
      var formData = new FormData(this); // FormDataオブジェクトは、フォームで送信される情報を収集するために用いる
      console.log(this);
      e.preventDefault(); 
      var url = $(this).attr('action');

      $.ajax({ 
        url: url, // action="/items/5/favorites/105"  //No route matches [GET] "/items/5/favorites/105"となる
        type: 'DELETE', //DELETEにしたらfavorites_controllerの#destroyアクションに行けた
        data: formData,
          // favorite: {
          //   user_id: current_user.id
          //   item_id: @item.id
          // }
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){ 
        console.log(data.counts);
        var itemId = $('.favorites_buttons').data('id'); //ビューのfavorites_buttonsクラス内にあるdata-indaxを取得
        $('.counts').html(`<p>いいね数：${data.counts}</p>`)
        $('.favorites_buttons').html(`<form class="button_to" method="post" action="/items/${itemId}/favorites"><input type="submit" value="いいね" id="good" /></form>`)
      })
    }
  }) 

});