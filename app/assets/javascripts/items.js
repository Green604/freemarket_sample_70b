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
    
    // 投稿編集時のみ（出品した画像情報を取得しておく必要がある）============================
    var count = $('.preview-box').length;
    var lowerRow = $('.lower-row').length;

    if (window.location.href.match(/\/items\/\d+\/edit/)){
      $('.hidden-content').append(buildFileField(count));
      if (lowerRow == 0) { 
        $('.addlabel-content').remove();
      } else { 
        if (lowerRow == 5){
          $('.addlabel-content').hide();  
        }
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

    // ラベルの横幅を変える
    function setLabel() {
      var prevContent = $('.label-content').prev(); 
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); 
      $('.label-content').css('width', labelWidth);
    }
    

    // file_fieldのnameに動的なindexをつける為の配列
    let fileIndex = [1,2,3,4,5,6,7,8,9,10,11,12];

    lastIndex = $('.js-file_group:last').data('index');
    fileIndex.splice(0, lastIndex);

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() { 
      
      $('.hidden-destroy').hide();
    // fileIndexの先頭の数字を使ってinputを作る  
      $('.hidden-content').append(buildFileField(fileIndex[0]));
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

          //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=====
          if ($(`#item_images_attributes_${id}__destroy`)){
            $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
          } 
        //=============================================================================
            
            var numberId = Number(id);
            var ondAddId = numberId + 1;
            // //ラベルのidとforの値を変更
            if(upperRow < 5){
              $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
              $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});     
            }
            
            if(upperRow == 5 && index == 5){
              $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
              var addLabel = addLabelHTML(ondAddId); 
              $('.label-content').after(addLabel); 
              $('.image-box__upload').css('height', '320px');
              $('.prev-content').css('margin-top', '200px');
              var previewContent = buildPreviewContent(); 
              $('.addlabel-content').before(previewContent);
            }
            
            if(index >= 5){
              if(upperRow < 5){
                $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
                $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${newnewId}_image`});
              } else {
                $('.addlabel-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
              }
            }
            
            if(index == 10){
              $('.label-box').attr({id: `label-box--${ondAddId}`,for: `item_images_attributes_${ondAddId}_image`});
              $('.addlabel-content').hide();
            }
            

            // //ラベル（カメラマークの範囲）の横幅を変える処理を実行
            if (index <= 5) {
              setLabel(); //1~5枚目の時の横幅を変える処理
            }
            
            if (index > 5) {
              addSetLabel(); //6~10枚目の時の横幅を変える処理
              console.log('addSetLabel');
            }
          }
        });

        
    // 画像の削除
    $(document).on('click', '.delete-box', function() {

      //item_images_attributes_${id}_image から${id}に入った数字のみを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      var newId = Number(id);
      var newnewId = newId + 1;
      
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();

      var upperRow = $('.upper-row').length;
      var lowerRow = $('.lower-row').length;
      console.log(upperRow);
      if (upperRow < 5) {
        $('.label-content').show();
        setLabel();
        console.log('editSetLabel');
      }

      var index = $('.preview-box').length;
      console.log(index);
      if (index < 5) {
        setLabel(index);
        $('.label-content').show();
        if (lowerRow > 0) {
          addSetLabel();
          $('.addlabel-content').show();
        }
        if (lowerRow == 0) {
          $('.addlabel-content').remove();
          $('.preview-content').remove();
          $('#previews').css('padding-top', '0px');
          $('.image-box__upload').css('height', '158px');
        }
      }

      if (upperRow == 4 && index == 4) {
        setLabel(index);
        $('.addlabel-content').remove();
        $('.preview-content').remove();
        $('.image-box__upload').css('height', '158px');
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '0px');
      }

      if (index == 5) {
        addSetLabel();
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '200px');
      }

      if (index > 5) {
        $('.addlabel-content').show();
        console.log('upperRow');
        //新規投稿画面だったら・・・
        // if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
          addSetLabel(); //6~10枚目の時の横幅を変える処理
        // }
        $('.prev-content').css('margin-top', '0px');
        $('#previews').css('padding-top', '200px');
        if (upperRow < 5) {
          $('.addlabel-content').hide();
        }
        if (lowerRow < 5) {
          $('.addlabel-content').show();
        }
      }

      if (index == 9) {
        $('.addlabel-content').show(); //10枚目を消したらラベルを表示
        addSetLabel(); //6~10枚目の時の横幅を変える処理
        width = $('.preview-content').css('width').replace(/[^0-9]/g, '');
        console.log(width);
        if (upperRow < 5) {
          $('.addlabel-content').hide();
        }
      }
      
      //新規登録時と編集時の場合分け==========================================================

          
      //新規投稿時
      //削除用チェックボックスの有無で判定
      if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
        
        console.log('editedit');
        // $('#image-box').on('click', '.js-remove', function() {
        // $(this).parent().remove();
        // 画像入力欄が0個にならないようにしておく
        // if ($('.hidden-field').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
        // });
        
        //フォームの中身を削除 
        $(`#item_images_attributes_${id}_image`).parent().remove();
        //削除時のラベル操作
        var index = $('.preview-box').length;
        //5枚のうち1枚が消されたらラベルを表示
        if (index == 4) {
          $('.label-content').show();
        }
        
        //一番後ろのフォームのinputタグ(中身が入ってないフォーム)のidを取得
        var specialId = $(".js-file_group").last().children().attr('id').replace(/[^0-9]/g, '');
        console.log(specialId);
        
        // .attr('id').replace(/[^0-9]/g, '');

        // setLabel(index);
        // if(id < 5){
        //削除された際に、空っぽになったfile_fieldをもう一度入力可能にする
        
        if(index >= 5){
          if(upperRow < 5) {
            $('.label-box').attr({id: `label-box--${specialId}`,for: `item_images_attributes_${specialId}_image`});
            // var NeoId = newnewId + 1;
            $('.addlabel-box').attr({id: `label-box--${specialId}`,for: `item_images_attributes_${specialId}_image`});
          } else {
            $('.addlabel-box').attr({id: `label-box--${specialId}`,for: `item_images_attributes_${specialId}_image`});
            console.log('upperUpperUpperUpperUpper');
          }
        }
        // }
        
        // if (index == 0) {
        //   $('.label-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`});
        // }
        console.log(index);//2

      } else {
        //投稿編集時
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);

        var specialId = $(".hidden-field").last().attr('id').replace(/[^0-9]/g, '');
        // var id = $('.hidden-field').attr('id').replace(/[^0-9]/g, '');
        // var editId = Number(specialId);
        // var editeditId = editId + 1;
        // console.log(editeditId);
        // var field = makeFileField(editeditId)
        // console.log(field);
        // $('.hidden-content').append(field);
        // $('.addlabel-box').attr({id: `label-box--${editeditId}`,for: `item_images_attributes_${editeditId}_image`});


        //5個めが消されたらラベルを表示
        if (index == 4) {
          $('.label-content').show();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        //削除したプレビューのidによって、ラベルのidを変更する
        if(id < 5){
          $('.label-box').attr({id: `label-box--${specialId}`,for: `item_images_attributes_${specialId}_image`});
        }
      }
    });
  });
});