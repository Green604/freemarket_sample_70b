$(function(){
  // バリデーションの実行
  $('#new_user').validate({
    rules: {
      "user[nickname]": {
        required: true
      }, 
      "user[email]": {
        required: true,
        email: true
      },
      "user[password]": {
        required: true
      },
      "user[password_confirmation]": {
        required: true,
        equalTo: "#user_password"
      },
      "user[last_name]": {
        required: true
      },
      "user[first_name]": {
        required: true
      },
      "user[last_name_kana]": {
        required: true
      },
      "user[first_name_kana]": {
        required: true
      },
      "user[birthday(1i)]": {
        required: true
      },
      "user[birthday(2i)]": {
        required: true
      },
      "user[birthday(3i)]": {
        required: true
      }
    },
    messages: {
      "user[nickname]": {
        required: "ニックネームを入力してください"
      },
      "user[email]": {
        required: "メールアドレスを入力してください",
        email: "フォーマットが不適切です"
      },
      "user[password]": {
        required: "パスワードを入力してください"
      },
      "user[password_confirmation]": {
        required: "パスワードを入力してください",
        equalTo: "パスワードが一致しません"
      },
      "user[last_name]": {
        required: "姓 を入力してください"
      },
      "user[first_name]": {
        required: "名 を入力してください"
      },
      "user[last_name_kana]": {
        required: "姓カナ を入力してください"
      },
      "user[first_name_kana]": {
        required: "名カナ を入力してください"
      },
      "user[birthday(1i)]": {
        required: "西暦 を入力してください"
      },
      "user[birthday(2i)]": {
        required: "月 を入力してください"
      },
      "user[birthday(3i)]": {
        required: "日 を入力してください"
      }
    },
    errorClass: "form-invalid", // バリデーションNGの場合に追加するクラス名の指定
    errorElement: "p", // エラーメッセージの要素種類の指定
    validClass: "valid", // バリデーションOKの場合に追加するクラス名の指定
    errorPlacement: function(error, element){

      if(element.attr('id') === 'user_last_name' || element.attr('id') === 'user_first_name'){
        error.insertAfter('.error-msg__name');
      //標準出力箇所（フォーム項目の後にエラーメッセージを出力）
      } else if(element.attr('id') === 'user_last_name_kana' || element.attr('id') === 'user_first_name_kana') {
        error.insertAfter('.error-msg__name-kana');
      } else if(element.attr('id') === 'user_birthday_1i' || element.attr('id') === 'user_birthday_2i' || element.attr('id') === 'user_birthday_3i' ) {
          error.insertAfter('.error-msg-birthday');
      }else{    
        error.insertAfter(element);
      }
    }
  })
  $("#user_nickname, #user_email, #user_password, #user_password_confirmation, #user_last_name, #user_first_name, #user_first_name, #user_last_name_kana, #user_first_name_kana, #user_birthday_1i, #user_birthday_2i, #user_birthday_3i").blur(function () {
    $(this).valid();
  }); 
})