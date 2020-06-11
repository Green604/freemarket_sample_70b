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

    // 投稿編集時
    //items/:i/editページへリンクした際のアクション=======================================
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


    // ラベルのwidth操作  ラベルの横幅を変える関数
    function setLabel() {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      var prevContent = $('.label-content').prev(); //prevメソッドは直前のhtmlを取得。label-contentクラスを取得して変数に代入
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); // label-contentクラスの横幅をreplaceで置き換えて、620からそれを引いたものを変数に代入する
      $('.label-content').css('width', labelWidth); // label-contentクラスの横幅を620-xに変更する
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() { //id=image-boxが対象要素。フォーム部品の状態に何らかの変化があったときに発動するchangeイベント。js-fileはセレクタ。セレクタは対象要素内でさらに指定したセレクタからのイベントだけを確認できるようにする
      setLabel(); //label-contentクラスの横幅を変えるメソッドを呼び出す(＝横幅を変える処理を実行する)
      //js-fileのidの数値のみ取得（id="item_images_attributes_0_image"の0だけ取得するということ。0〜9の数字を取得）
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新
      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader(); //FileReaderオブジェクトの生成
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file); 
      //読み込み時に発火するイベント onloadメソッドは読み込みが完了したら実行する
      reader.onload = function() {
        var image = this.result; //直前に実行したイベントが返した値を取得する
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          var index = $('.preview-box').length; //preview-boxの数を数えて変数に代入
          var html = buildHTML(id); //プレビューを生成する関数を変数に代入
          //ラベルの直前のプレビュー群にプレビューを追加
          var prevContent = $('.label-content').prev(); //prevメソッドは直前のhtmlを取得。label-contentクラスを取得して変数に代入
          $(prevContent).append(html); 
        }
        //イメージを追加
        $(`#preview-box__${id} img`).attr('src', `${image}`); //#preview-box__${id} imgのsrc属性を取得してimageに変更する
        var index = $('.preview-box').length; //preview-boxの数を数えて変数に代入
        //プレビューが5個あったらラベルを隠す。ここはあとで5を10に変えてもいいかも
        if (index == 5) {
          $('.label-content').hide(); //対象要素を隠す
        }

        //=============================================================================
        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================


        //ラベルのwidth操作
        setLabel(); //label-contentクラスの横幅を変えるメソッドを呼び出す(＝横幅を変える処理を実行する)
        //ラベルのidとforの値を変更
        if(index < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`}); //これはたぶんOK
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

