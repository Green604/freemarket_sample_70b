$(document).on('turbolinks:load', function(){
  Payjp.setPublicKey('pk_test_b6d2647f77424f20f5c12267');


  $('#card-form').on('submit', function(e){
    e.preventDefault();
    
    var card = {
      number: $('#card_number').val(),
      cvc: $('#cvc').val(),
      exp_month: $('#exp_month').val(),
      exo_year: $('#exp_year').val(),
    };

    Payjp.createToken(card, function(status, response) {
      if (response.error) {
        console.log(response.error);
      } 
      else {
        $("#card_number").removeAttr("name");
        $("#cvc").removeAttr("name");
        $("#exp_month").removeAttr("name");
        $("#exp_year").removeAttr("name");
        var token = response.id;
        $('#card-form').append($('<input type="hidden" name="payjpToken" />').val(token));
        $('#card-form').get(0).submit();
      }
    })

  })
})