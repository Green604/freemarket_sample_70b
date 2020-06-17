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

    //6〜10枚目のプレビュー画像のためのラベル作る関数
    function addLabelHTML(id) {
      var labelhtml =  `<div class="addlabel-content" width="620">
                          <label class="addlabel-box" for="item_images_attributes_${id}_image" id="label-box-${id}">
                            <pre class="label_box__text-visible">
                              <svg area-hidden="true", class="image-upload-svg", fill-rule="evenodd", fill="222222", height="24", viewBox="0 0 24 24", width="24">
                                <path d="M19.3,5H16.73l-.8-1.61A.7.7,0,0,0,15.3,3H8.7a.7.7,0,0,0-.63.39L7.27,5H4.7A2.7,2.7,0,0,0,2,7.7V18.3A2.7,2.7,0,0,0,4.7,21H19.3A2.7,2.7,0,0,0,22,18.3V7.7A2.7,2.7,0,0,0,19.3,5ZM12,17.3A4.3,4.3,0,1,1,16.3,13,4.31,4.31,0,0,1,12,17.3Z" />
                              </svg>
                            </pre>
                          </label>
                        </div>`;
      return labelhtml;
    }

    //6~10枚目のプレビュー画像部分のHTML作る関数
    function buildPreviewHTML(index) {
      var addPreviewhtml = `<div class="preview-box" id="preview-box__${index}">
                              <div data-index="${index}" class="upper-box">
                                <img src="" alt="preview" class="upload-image">
                              </div>
                              <div class="lower-box">
                                <div class="delete-box" id="delete_btn_${index}">
                                  <span>削除</span>
                                </div>
                              </div>
                            </div>`;
      return addPreviewhtml;
    }

    function buildPreviewContent() {
      var addPreviewContent = `<div class="preview-content"></div>`;
      return addPreviewContent;
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


    // ラベルの横幅を変える操作(1〜5枚目)
    function setLabel() {
      //プレビューの幅を変数に代入
      var prevContent = $('.label-content').prev(); 
      //ラベル（カメラマークの範囲）のもともとの620pxからプレビューの分だけ引いた幅にする
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); 
      //ラベル（カメラマークの範囲）の幅を変える
      $('.label-content').css('width', labelWidth);
    }

    // ラベルの横幅を変える操作(6〜10枚目)
    function addSetLabel() {
      //プレビューの幅を変数に代入
      var previewContent = $('.addlabel-content').prev(); 
      //ラベル（カメラマークの範囲）のもともとの620pxからプレビューの分だけ引いた幅にする
      addLabelWidth = (620 - $(previewContent).css('width').replace(/[^0-9]/g, '')); 
      //ラベル（カメラマークの範囲）の幅を変える
      $('.addlabel-content').css('width', addLabelWidth);
    }

    // プレビューの追加
    //hidden-fieldにchangeイベントを発火させる
    $(document).on('change', '.hidden-field', function() { 
      var id = $(this).attr('id').replace(/[^0-9]/g, '');

      //labelボックスのidとforを更新
      if (index <= 5) {
        var index = $('.preview-box').length; 
        $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      }
      
      if (index > 5) {
        var index = $('.preview-box').length; 
        $('.addlabel-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      }

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
        
        //プレビューが5個あったらラベルを隠す
        if (index == 5) {
          $('.label-content').hide();
          var addLabel = addLabelHTML(id); 
          $('.label-content').after(addLabel);
          var previewContent = buildPreviewContent(); 
          $('.addlabel-content').before(previewContent); 
          var previewHtml = buildPreviewHTML(index); 
          $('.preview-content').append(previewHtml); 
          $('.preview-content').hide();
        }

        if (index == 6) {
          $('.preview-content').show();  
          var previewHtml = buildPreviewHTML(index); 
          $('.preview-content').append(previewHtml);
          $('#preview-box__6').hide();
        }

        if (index == 7) {
          $('#preview-box__6').show();  
          var previewHtml = buildPreviewHTML(index); 
          $('.preview-content').append(previewHtml);
          $('#preview-box__7').hide();
        }

        if (index == 8) {
          $('#preview-box__7').show();  
          var previewHtml = buildPreviewHTML(index); 
          $('.preview-content').append(previewHtml);
          $('#preview-box__8').hide();
        }

        if (index == 9) {
          $('#preview-box__8').show();  
          var previewHtml = buildPreviewHTML(index); 
          $('.preview-content').append(previewHtml);
          $('#preview-box__9').hide();
        }

        if (index == 10) {
          $('#preview-box__9').show(); 
          $('.addlabel-content').hide();
        }

        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=====
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================

        //ラベル（カメラマークの範囲）の横幅を変える処理を実行
        if(index <= 5) {
          setLabel();
        }

        if(index >=6) {
          addSetLabel();
        }

        //ラベルのidとforの値を変更
        if(index < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`});
        }

        if(index >= 5){
          //プレビューの数でラベルのオプションを更新する
          $('.addlabel-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`});
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

