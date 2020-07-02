$(function(){
  var itemValidate = function() {
    lastInputName = $('.js-file_group:first').children().attr('name');
    console.log("2ばんめ");
    $('#new_item').validate( {
      ignore: [],
      // 画像フォームは複数あるので、フォームの数分エラーメッセージが表示されてしまうので
      // grouop化してbalidateされた場合単一のメッセージを表示するように設定
      rules: {
        // 画像フォールのreruiredの設定を他の４つのフォームが空だったらrewuiredをonに、一つでも値がはいっていたらoffになるように設定
        // 各フォームに同様の設定を施しています
        "item[images_attributes][0][image]": {
          required: function(){
                      if ($("#preview-box")[0]){
                        return false
                      } else {
                        return true
                      }
                    }
        }, 
        "item[name]": {
          required: true,
          maxlength: 40,
        },
        "item[description]": {
          required: true,
          maxlength: 1000
        },
        "item[parent_category_id]": {
          required: true
        },
        "item[child_category_id]": { 
          required: true
        },
        "item[category_id]": {
          required: true
        },
        "item[condition]": {
          required: true
        },
        "item[shipping_attributes][shipping_fee]": {
          required: true
        },
        "item[shipping_attributes][shippingway_id]": {
          required: true
        },
        "item[shipping_attributes][shippingarea_id]": {
          required: true
        },
        "item[shipping_attributes][shipping_day]": {
          required: true
        },
        "item[price]": {
          required: true,
          range: [300, 9999999]
        }
      },
      messages: {
        "item[images_attributes][0][image]": {
          required: "画像がありません"
        },
        "item[name]": {
          required: "商品名を入力してください"
        },
        "item[description]": {
          required: "商品の説明を入力してください"
        },
        "item[parent_category_id]": {
          required: "カテゴリーを選択してください"
        },
        "item[child_category_id]": {
          required: "カテゴリーを選択してください"
        },
        "item[category_id]": {
          required: "カテゴリーを選択してください"
        },
        "item[condition]": {
          required: "商品の状態を選択してください"
        },
        "item[shipping_attributes][shipping_fee]": {
          required: "配送料の負担を選択してください"
        },
        "item[shipping_attributes][shippingway_id]": {
          required: "配送方法を選択してください"
        },
        "item[shipping_attributes][shippingarea_id]": {
          required: "配送元の地域を選択してください"
        },
        "item[shipping_attributes][shipping_day]": {
          required: "配送までの日数を選択してください"
        },
        "item[price]": {
          required: "販売価格を入力してください",
          range: "300以上9999999以下で入力してください"
        }
      },
      errorClass: "form-invalid",
      errorElement: "p", 
      validClass: "valid",
      errorPlacement: function(error, element){
        if(element.attr('class') === 'hidden-field'){
          error.insertAfter('#label-box'); 
        }else{  
            error.insertAfter(element);
        }
      }
    })
  }

  $('#new_item').on('blur', '#item_name, #item_description, #parent_category, #child_category, #grandchild_category, #item_condition, #item_shipping_attributes_shipping_fee, #item_shipping_attributes_shippingway_id, #item_shipping_attributes_shippingarea_id, #item_shipping_attributes_shipping_day, #item_price, .hidden-field', function() { 
    itemValidate(); 
    $(this).valid();
  });
})