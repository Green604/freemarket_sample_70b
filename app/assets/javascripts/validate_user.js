$(function(){ 

  // メソッドの追加
  // 全角入力のバリデーションは元々の機能にないので追加
  jQuery.validator.addMethod("fullName", function(value, element) {
    return this.optional(element) || /^[^\x01-\x7E\xA1-\xDF]+$/.test(value);
  }, "全角で入力して下さい");
  // 全角ひらがな入力のバリデーションは元々の機能にないので追加
  jQuery.validator.addMethod("fullNameKana", function(value, element) {
    return this.optional(element) || /^[\u3040-\u309f]+$/.test(value);
  }, "全角ひらがなで入力して下さい");
  // 半角英数
  jQuery.validator.addMethod("hankaku", function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]*$/.test(value);
  }, "半角英数で入力して下さい");
  // 郵便番号ハイフンありなし対応
  jQuery.validator.addMethod("zipcode", function(value, element) {
    return this.optional(element) || /^\d{3}[-]?\d{4}$/.test(value);
  }, "正しく入力して下さい");
  // 電話番号ハイフンありなし対応
  jQuery.validator.addMethod("phoneNumber", function(value, element) {
    return this.optional(element) || /^\d{10,11}$|^\d{2,5}-\d{1,4}-\d{4}$/.test(value);
  }, "正しく入力して下さい");
  

  // バリデーションの設定
  $('#new_user, #new_shipping_address').validate({
    rules: {
      "user[nickname]": {
        required: true
      }, 
      "user[email]": {
        required: true,
        email: true
      },
      "user[password]": {
        required: true,
        hankaku: true,
        minlength: 7
      },
      "user[password_confirmation]": {
        required: true,
        equalTo: "#user_password"
      },
      "user[last_name]": {
        required: true,
        fullName: true
      },
      "user[first_name]": {
        required: true,
        fullName: true
      },
      "user[last_name_kana]": {
        required: true,
        fullNameKana: true
      },
      "user[first_name_kana]": {
        required: true,
        fullNameKana: true
      },
      "user[birthday(1i)]": {
        required: true
      },
      "user[birthday(2i)]": {
        required: true
      },
      "user[birthday(3i)]": {
        required: true
      },
      "shipping_address[last_name]": {
        required: true,
        fullName: true
      },
      "shipping_address[first_name]": {
        required: true,
        fullName: true
      },
      "shipping_address[last_name_kana]": {
        required: true,
        fullNameKana: true
      },
      "shipping_address[first_name_kana]": {
        required: true,
        fullNameKana: true
      },
      "shipping_address[zipcode]": {
        required: true,
        zipcode: true
      },
      "shipping_address[prefecture]": {
        required: true
      },
      "shipping_address[city]": {
        required: true
      },
      "shipping_address[house_number]": {
        required: true
      },
      "shipping_address[phone_number]": {
        required: true,
        phoneNumber: true
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
        required: "パスワードを入力してください",
        minlength: "パスワードは7文字以上で入力してください"
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
      },
      "shipping_address[last_name]": {
        required: "姓 を入力してください"
      },
      "shipping_address[first_name]": {
        required: "名 を入力してください"
      },
      "shipping_address[last_name_kana]": {
        required: "姓カナ を入力してください"
      },
      "shipping_address[first_name_kana]": {
        required: "名カナ を入力してください"
      },
      "shipping_address[zipcode]": {
        required: "郵便番号を入力してください"
      },
      "shipping_address[prefecture]": {
        required: "都道府県を入力してください"
      },
      "shipping_address[city]": {
        required: "市区町村を入力してください"
      },
      "shipping_address[house_number]": {
        required: "番地を入力してください"
      },
      "shipping_address[phone_number]": {
        required: "電話番号を入力してください"
      }
    },
    errorClass: "form-invalid", // バリデーションNGの場合に追加するクラス名の指定
    errorElement: "p", // エラーメッセージの要素種類の指定
    validClass: "valid", // バリデーションOKの場合に追加するクラス名の指定
    errorPlacement: function(error, element){

      // メッセージ表示場所の変更
      // 【お名前】のようにフォームが2つセットのものは、デフォルトだとそれぞれのフォーム直下にメッセージが出てしまいレイアウトが崩れてしまうため、
      // 表示場所をその親の直下に出てくるように変更
      if(element.attr('id') === 'user_last_name' || element.attr('id') === 'user_first_name'){
        error.insertAfter('.error-msg__name'); 
      } else if(element.attr('id') === 'user_last_name_kana' || element.attr('id') === 'user_first_name_kana') {
        error.insertAfter('.error-msg__name-kana');
      } else if(element.attr('id') === 'user_birthday_1i' || element.attr('id') === 'user_birthday_2i' || element.attr('id') === 'user_birthday_3i' ) {
          error.insertAfter('.error-msg-birthday');
      } else if(element.attr('id') === 'shipping_address_last_name' || element.attr('id') === 'shipping_address_first_name') {
        error.insertAfter('.error-msg__shipping-name');
      } else if(element.attr('id') === 'shipping_address_last_name_kana' || element.attr('id') === 'shipping_address_first_name_kana') {
        error.insertAfter('.error-msg__shipping-name-kana');
      }else{    //標準出力箇所（フォーム項目の後にエラーメッセージを出力）
          error.insertAfter(element);
      }
    }
  })
  // 各フォームに対してバリデーションの実行
  $("#user_nickname, #user_email, #user_password, #user_password_confirmation, #user_last_name, #user_first_name, #user_first_name, #user_last_name_kana, #user_first_name_kana, #user_birthday_1i, #user_birthday_2i, #user_birthday_3i, #shipping_address_last_name, #shipping_address_first_name, #shipping_address_last_name_kana, #shipping_address_first_name_kana, #shipping_address_zipcode, #shipping_address_prefecture, #shipping_address_city, #shipping_address_house_number, #shipping_address_phone_number").blur(function () {
    $(this).valid();
  });
})