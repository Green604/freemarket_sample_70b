$(function() {
  function buildHTML(data) {
    var html = 
      `<% if user_signed_in? %>
    <%= item.favorites.count %>
    <% if current_user.already_favorited?(item) %>
    <%= button_to 'いいねを取り消す', item_favorite_path(item), method: :delete %>
    <%= else %>
    <%= button_to 'いいね', item_favorites_path(item), method: :post %>
      <% else %>
  <p>いいね数</p>
      <%= item.favorites.count %> `
  }

  if($('.button_to').children().is('#good')) {
    console.log('good');
    $('.button_to').on('click', function(e) {
      // console.log('hello'); // 
      e.preventDefault();  
      
    
  
      var formData = new FormData(this); // FormDataオブジェクトは、フォームで送信される情報を収集するために用いる
      console.log(this);
      e.preventDefault(); 
      var url = $(this).attr('action'); 
                                        
      $.ajax({ 
        url: url,  
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
        $('.button_to').html(`<form class="button_to" method="delete" action="/items/${data.user_id}/favorites/${data.id}" ><input type="submit" value="いいねを取り消す" id="delete-good" /></form>`)
      $("#good").prop('disabled', true);
      })
    });

  } else {
    $('.button_to').on('click', function(e) {
      // console.log('hello'); // 
      e.preventDefault();  

      var formData = new FormData(this); // FormDataオブジェクトは、フォームで送信される情報を収集するために用いる
      console.log(this);
      e.preventDefault(); 
      var url = $(this).attr('action'); 
                                        
      $.ajax({ 
        url: url,
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
        $('.button_to').html(`<form class="button_to" method="delete" action="/items/${data.user_id}/favorites" ><input type="submit" value="いいね" id="good" /></form>`)
      $("#delete-good").prop('disabled', true);
      })
    });
  }

});



// 
