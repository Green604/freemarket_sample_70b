$(function() {
  $(function() {
    // 上段用のプレビューHTML生成
    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
      <div data-index="${count}" class="upper-box upper-row">
      <img src="" alt="preview" class="upload-image">
      </div>
      <div class="lower-box">
      <div class="delete-box" id="delete_btn_${count}">
      <span>削除</span>
      </div>
      </div>
      </div>`;
      return html;
    }
    // 下段用のプレビューHTML生成
    function buildHTMLUnder(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
      <div class="upper-box lower-row">
      <img src="" alt="preview" class="upload-image">
      </div>
      <div class="lower-box">
      <div class="delete-box" id="delete_btn_${count}">
      <span>削除</span>
      </div>
      </div>
      </div>`;
      return html;
    }
    
    //下段目プレビューHTML
    function addLabelHTML(id) {
      var labelhtml =  `<div class="addlabel-content">
                          <label class="addlabel-box" for="item_images_attributes_${id}_image" id="label-box-${id}">
                            <pre class="label_box__text-visible">
                              <svg area-hidden="true", class="image-upload-svg", fill-rule="evenodd", fill="#222222", height="24", viewBox="0 0 24 24", width="24">
                                <path d="M19.3,5H16.73l-.8-1.61A.7.7,0,0,0,15.3,3H8.7a.7.7,0,0,0-.63.39L7.27,5H4.7A2.7,2.7,0,0,0,2,7.7V18.3A2.7,2.7,0,0,0,4.7,21H19.3A2.7,2.7,0,0,0,22,18.3V7.7A2.7,2.7,0,0,0,19.3,5ZM12,17.3A4.3,4.3,0,1,1,16.3,13,4.31,4.31,0,0,1,12,17.3Z" />
                              </svg>
                            </pre>
                          </label>
                        </div>`;
                        return labelhtml;
                      }

    //新規出品画面のinputファイルフォーム
    const buildFileField = (id)=> {
      const html = `<div data-index="${id}" class="js-file_group">
      <input class="hidden-field" type="file"
      name="item[images_attributes][${id}][image]"
      id="item_images_attributes_${id}_image"
      </div>`;
      return html;
    }
                      
    // 下段ラベルの横幅を変える
    function addSetLabel() {
      var previewContent = $('.addlabel-content').prev(); 
      addLabelWidth = (620 - $(previewContent).css('width').replace(/[^0-9]/g, '')); 
      width = $(previewContent).css('width').replace(/[^0-9]/g, '');
      $('.addlabel-content').css('width', addLabelWidth);
    }

    // 下段用のプレビュー枠
    function buildPreviewContent() {
      var addPreviewContent = `<div class="preview-content"></div>`;
      return addPreviewContent;
    }

    // ラベルの横幅を変える
    function setLabel() {
      var prevContent = $('.label-content').prev(); 
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); 
      $('.label-content').css('width', labelWidth);
    }
    
    // 投稿編集時のみ（出品した画像情報を取得しておく必要がある）============================
    var count = $('.preview-box').length;
    var lowerRow = $('.lower-row').length;

    if (window.location.href.match(/\/items\/\d+\/edit/)){
      $('.hidden-content').append(buildFileField(count));
      // 追加したフォームにバリデーション設定
      $(`input[name="item[images_attributes][${count}][image]"]`).rules('add', {
        required: function(){
          if ($(".preview-box").length !== 0){
            return false
          } else {
            return true
          }
        },
        messages: {
          required: "画像がありません"
      }
    });
      if (lowerRow == 0) { 
        $('.addlabel-content').remove();
      } else { 
        if (lowerRow == 5){
          $('.addlabel-content').hide();  
        }
        addSetLabel(); 
        $('.label-content').hide();
        $('.image-box__upload').css('height', '320px');
        $('.prev-content').css('margin-top', '200px');
      }
      
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
    // =============================================================================

    // file_fieldのnameに動的なindexをつける為の配列
    let fileIndex = [1,2,3,4,5,6,7,8,9,10,11,12];

    lastIndex = $('.js-file_group:last').data('index');
    fileIndex.splice(0, lastIndex);

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() { 
      
      $('.hidden-destroy').hide();
      // fileIndexの先頭の数字を使ってinputを作る  
      $('.hidden-content').append(buildFileField(fileIndex[0]));
      // 追加したフォームにバリデーション設定
      $(`input[name="item[images_attributes][${fileIndex[0]}][image]"]`).rules('add', {
        required: function(){
          if ($(".preview-box").length !== 0){
            return false
          } else {
            return true
          }
        },
        messages: {
          required: "画像がありません"
      }
    });

      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
      $('.js-file_group').hide();
      //inputタグのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      
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

        previewLength = $(`#preview-box__${id}`).length
        var index = $('.preview-box').length;

        //inputタグと同じid値のプレビューがなかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          previewLength = $(`#preview-box__${id}`).length
          var index = $('.preview-box').length; 
          var html = buildHTML(id); 
          var underHtml = buildHTMLUnder(id);
          var upperRow = $('.upper-row').length;
          
          if(index >= 0){
            if (upperRow < 5) {
              $('.prev-content').append(html); 
              setLabel(); 
            } else {
              $('.preview-content').append(underHtml); 
            }
          }
        }

        //画像を追加
        $(`#preview-box__${id} img`).attr('src', `${image}`); 
        var index = $('.preview-box').length; 
        var upperRow = $('.upper-row').length;
        if (upperRow == 5) {
          $('.label-content').hide();
        }

        //編集画面でプレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================
            
        //inputタグの文字列のidを数値に変換
        var numberId = Number(id);
        var ondAddId = numberId + 1;
        //ラベルのidとforの値を変更
        //上段が5枚未満の場合
        if(upperRow < 5){
          $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
          $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});     
        }
        //上段枚数が5枚あり下段が1枚もない場合
        if(upperRow == 5 && index == 5){
          $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
          var addLabel = addLabelHTML(ondAddId); 
          $('.label-content').after(addLabel); 
          $('.image-box__upload').css('height', '320px');
          $('.prev-content').css('margin-top', '200px');
          var previewContent = buildPreviewContent(); 
          $('.addlabel-content').before(previewContent);
        }
        //合計5枚以上の場合
        if(index >= 5){
          //上段が5枚未満の場合
          if(upperRow < 5){
            $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
            $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
          } else {
            $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
          }
        }
        //合計10枚の場合
        if(index == 10){
          $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
          $('.addlabel-content').hide();
        }
        
        if (index <= 5) {
          setLabel();
        }
        
        if (index > 5) {
          addSetLabel(); 
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      //プレビューのidを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //文字列のidを数値化
      var numberId = Number(id);
      var oneAddId = numberId + 1;
      
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();

      //上段の枚数
      var upperRow = $('.upper-row').length;
      //下段の枚数
      var lowerRow = $('.lower-row').length;
      //上段が5枚未満の場合
      if (upperRow < 5) {
        $('.label-content').show();
        setLabel();
      }
      //プレビューの枚数
      var index = $('.preview-box').length;
      //合計枚数が5枚未満の場合
      if (index < 5) {
        setLabel(index);
        $('.label-content').show();
        //下段に1枚以上ある場合
        if (lowerRow > 0) {
          addSetLabel();
          $('.addlabel-content').show();
        }
        //下段に1枚もない場合
        if (lowerRow == 0) {
          $('.addlabel-content').remove();
          $('.preview-content').remove();
          $('#previews').css('padding-top', '0px');
          $('.image-box__upload').css('height', '158px');
        }
      }
      //合計枚数が4枚で全部上段にある場合
      if (upperRow == 4 && index == 4) {
        setLabel(index);
        $('.addlabel-content').remove();
        $('.preview-content').remove();
        $('.image-box__upload').css('height', '158px');
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '0px');
      }
      //合計枚数が5枚の場合
      if (index == 5) {
        addSetLabel();
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '200px');
      }
      //合計枚数が6枚以上の場合
      if (index > 5) {
        $('.addlabel-content').show();
          addSetLabel();
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '200px');
        //上段が5枚未満の場合
        if (upperRow < 5) {
          $('.addlabel-content').hide();
        }
        //下段が5枚未満の場合
        if (lowerRow < 5) {
          $('.addlabel-content').show();
        }
      }
      //合計枚数が9枚の場合
      if (index == 9) {
        $('.addlabel-content').show();
        addSetLabel();
        width = $('.preview-content').css('width').replace(/[^0-9]/g, '');
        //上段が5枚未満の場合
        if (upperRow < 5) {
          $('.addlabel-content').hide();
        }
      }
      
      //新規登録時と編集時の場合分け==========================================================

      //新規出品画面（削除用チェックボックスがない）
      if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
        
        //フォームの中身を削除 
        $(`#item_images_attributes_${id}_image`).parent().remove();
        var index = $('.preview-box').length;

        if (index == 4) {
          $('.label-content').show();
        }
        
        //最後のフォームのinputタグ(中身が入ってないフォーム)のidを取得
        var lastId = $(".js-file_group").last().children().attr('id').replace(/[^0-9]/g, '');

        if(index >= 5){
          if(upperRow < 5) {
            $('.label-box').attr({id: `label-box--${lastId}`,for: `item_images_attributes_${lastId}_image`});
            $('.addlabel-box').attr({id: `label-box--${lastId}`,for: `item_images_attributes_${lastId}_image`});
          } else {
            $('.addlabel-box').attr({id: `label-box--${lastId}`,for: `item_images_attributes_${lastId}_image`});
          }
        }

      } else {
        //出品情報編集画面（削除用チェックボックスがある）
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);

        var lastId = $(".hidden-field").last().attr('id').replace(/[^0-9]/g, '');

        //5枚目が消されたらラベルを表示
        if (index == 4) {
          $('.label-content').show();
        }

        setLabel();
        //ラベルのidとforの値を変更
        //削除したプレビューのidによってラベルのidを変更する
        if(id < 5){
          $('.label-box').attr({id: `label-box--${lastId}`,for: `item_images_attributes_${lastId}_image`});
        }
      }
    });
  });
});