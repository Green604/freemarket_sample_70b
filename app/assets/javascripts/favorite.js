$(function() {
  $('.button_to').on('submit', function(e) {
    // console.log('hello');
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
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
      // console.log('hello');
      var html = buildingHTML(data);
    })
  });
});