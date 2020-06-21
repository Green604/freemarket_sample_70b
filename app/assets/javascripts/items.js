$(function() {
  $(function() {
  // 画像用のinputを生成する関数
    function buildHTML(index) {
      var html = `<div class="preview-box" id="preview-box__${index}">
                    <div data-index="${index}" class="upper-box">
                      <img src="" alt="preview" class="upload-image">
                    </div>
                    <div class="lower-box">
                      <div class="delete-box" id="delete_btn_${index}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`;
      return html;
    }

    // 投稿編集時のみ（出品した画像情報を取得しておく必要がある）============================
    if (window.location.href.match(/\/items\/\d+\/edit/)){
      //登録済み画像のプレビュー表示欄の要素を取得する
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      //プレビューにidを追加
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })
      //削除ボタンにidを追加
      $('.delete-box').each(function(index, box){
        $(box).attr('id', `delete_btn_${index}`);
      })
      var count = $('.preview-box').length;
      //プレビューが5あるときは、投稿ボックスを消しておく
      if (count == 5) {
        $('.label-content').hide();
      }
    }
    //=============================================================================


    // ラベルの横幅を変える操作
    function setLabel() {
      //プレビューの幅を変数に代入
      var prevContent = $('.label-content').prev(); 
      //ラベル（カメラマークの範囲）のもともとの620pxからプレビューの分だけ引いた幅にする
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); 
      //ラベル（カメラマークの範囲）の幅を変える
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    //hidden-fieldにchangeイベントを発火させる
    $(document).on('change', '.hidden-field', function() { 
      setLabel(); //ラベルの横幅を変える処理を実行する
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新
      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      //FileReaderオブジェクトの生成
      var reader = new FileReader(); 
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file); 
      //読み込み時に発火するイベント onloadメソッドは読み込みが完了したら実行する
      reader.onload = function() {
        //直前に実行したイベントが返した値を取得する
        var image = this.result; 
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          //プレビューの数を数えて変数に代入
          var index = $('.preview-box').length; 
          //プレビューを生成する関数を変数に代入
          var html = buildHTML(id); 
          //プレビューエリアのhtmlを変数に代入
          var prevContent = $('.label-content').prev(); 
          //既存のプレビューエリアに新たに追加されたプレビューを追加
          $(prevContent).append(html); 
        }
        //画像を追加
        $(`#preview-box__${id} img`).attr('src', `${image}`); 
        var index = $('.preview-box').length; //preview-boxの数を数えて変数に代入
        //プレビューが5個あったらラベルを隠す（ここはあとで10に変える）
        if (index == 5) {
          $('.label-content').hide();
        }

        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=====
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================

        //ラベル（カメラマークの範囲）の横幅を変える処理を実行
        setLabel(); 
        //ラベルのidとforの値を変更
        if(index < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var index = $('.preview-box').length;
      setLabel(index);
      //item_images_attributes_${id}_image から${id}に入った数字のみを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();

      //新規登録時と編集時の場合分け==========================================================

      //新規投稿時
      //削除用チェックボックスの有無で判定
      if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
        //フォームの中身を削除 
        $(`#item_images_attributes_${id}_image`).val("");
        //削除時のラベル操作
        var index = $('.preview-box').length;
        //5個めが消されたらラベルを表示
        if (index == 4) {
          $('.label-content').show();
        }
        setLabel(index);
        if(id < 5){
          //削除された際に、空っぽになったfile_fieldをもう一度入力可能にする
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
        }
      } else {
        //投稿編集時
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);
        //5個めが消されたらラベルを表示
        if (index == 5) {
          $('.label-content').show();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        //削除したプレビューのidによって、ラベルのidを変更する
        if(id < 5){
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
        }
      }
    });
  });
});

// 検索機能の並び替え表示で使用
$(function() {
  // プルダウンメニューを選択することでイベントが発生
  $('select[name=sort_order]').change(function() {

    // 選択したoptionタグのvalue属性を取得する
    var this_value = $(this).val();
    // value属性の値により、ページ遷移先の分岐
    if (this_value == "price_asc") {
      html = "&sort=price+asc"
    } else if (this_value == "price_desc") {
      html = "&sort=price+desc"
    } else if (this_value == "created_at_asc") {
      html = "&sort=created_at+asc"
    } else if (this_value == "created_at_desc") {
      html = "&sort=created_at+desc"
    } else {
      html = ""
    };
    // 現在の表示ページ
    var current_html = window.location.href;
    // ソート機能の重複防止 
    if (location['href'].match(/&sort=*.+/) != null) {
      var remove = location['href'].match(/&sort=*.+/)[0]
      var current_html = current_html.replace(remove, '')
    };
    // ページ遷移
    window.location.href = current_html + html
  });
  // ページ遷移後の挙動
  $(function () {
    if (location['href'].match(/&sort=*.+/) != null) {
      // option[selected: 'selected']を削除
      if ($('select option[selected=selected]')) {
        $('select option:first').prop('selected', false);
      }

      var selected_option = location['href'].match(/&sort=*.+/)[0].replace('&sort=', '');

      if(selected_option == "price+asc") {
        var sort = 1
      } else if (selected_option == "price+desc") {
        var sort = 2
      } else if (selected_option == "created_at+asc") {
        var sort = 3
      } else if (selected_option == "created_at+desc") {
        var sort = 4
      }

      var add_selected = $('select[name=sort_order]').children()[sort]
      $(add_selected).attr('selected', true)
    }
  });
});