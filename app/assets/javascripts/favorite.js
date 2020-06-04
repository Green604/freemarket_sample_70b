$(function() {
  // function buildHTML(data) {
  //   var html = 
  //     `<% if user_signed_in? %>
  //   <%= item.favorites.count %>
  //   <% if current_user.already_favorited?(item) %>
  //   <%= button_to 'いいねを取り消す', item_favorite_path(item), method: :delete %>
  //   <%= else %>
  //   <%= button_to 'いいね', item_favorites_path(item), method: :post %>
  //     <% else %>
  // <p>いいね数</p>
  //     <%= item.favorites.count %> `
  // }

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
        var itemId = $('.favorites_buttons').data('id'); //ビューのfavorites_buttonsクラス内にあるdata-indaxを取得
        $('.favorites_buttons').html(`<form class="button_to" method="post" action="/items/${itemId}/favorites"><input type="submit" value="いいね" id="good" /></form>`)
      })
    }
  }) 

});