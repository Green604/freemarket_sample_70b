$(function() {
  // 画像用のinputを生成する関数

  // const buildFileField = (index)=> {
  //   const html = `<div data-index="${index}" class="js-file_group">
  //                   <input class="js-file" type="file"
  //                   name="item[images_attributes][${index}][image]"
  //                   id="item_images_attributes_${index}_image"><br>
  //                   <div class="js-remove">削除</div>
  //                 </div>`;
  //   return html;
  // }

  // プレビュー用のimgタグを生成する関数
  // const buildHTML = (index, url)=> {
  //   const html = `<div class="preview-box" id="preview-box__${index}}>
  //                   <div class="upper-box">
  //                     <img data-index="${index}" src="${url}" width="50px" height="50px">
  //                   </div>
  //                   <div class="lower-box">
  //                     <div class="delete-box" id="delete_btn_${index}">
  //                       <span>削除</span>
  //                     </div>
  //                   </div>
  //                 </div>`;
  //   return html;
  // }

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

  // ラベルのwidth操作  ラベルの横幅を変える関数
  function setLabel() {
    //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
    var prevContent = $('.label-content').prev(); //prevメソッドは直前のhtmlを取得。label-contentクラスを取得して変数に代入
    labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, '')); // label-contentクラスの横幅をreplaceで置き換えて、620からそれを引いたものを変数に代入する
    $('.label-content').css('width', labelWidth); // label-contentクラスの横幅を620-xに変更する
  }

  //ここまでは理解した-----------------------------------------------------------------------------

  // プレビューの追加
  $(document).on('change', '.hidden-field', function() { //id=image-boxが対象要素。フォーム部品の状態に何らかの変化があったときに発動するchangeイベント。js-fileはセレクタ。セレクタは対象要素内でさらに指定したセレクタからのイベントだけを確認できるようにする
    console.log('hello!');
    setLabel(); //label-contentクラスの横幅を変えるメソッドを呼び出す(＝横幅を変える処理を実行する)
    console.log('hellohello!');
    //js-fileのidの数値のみ取得（id="item_images_attributes_0_image"の0だけ取得するということ。0〜9の数字を取得）
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    console.log(id); //id=0が取得できている!!!
    //labelボックスのidとforを更新
    $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
    //選択したfileのオブジェクトを取得
    var file = this.files[0];
    console.log(file); //fileの中身確認できた!!
    var reader = new FileReader(); //FileReaderオブジェクトの生成
    console.log(reader); //まだデータは読み込まれていない
    //readAsDataURLで指定したFileオブジェクトを読み込む
    reader.readAsDataURL(file); 
    //読み込み時に発火するイベント onloadメソッドは読み込みが完了したら実行する
    reader.onload = function() {
      var image = this.result; //直前に実行したイベントが返した値を取得する
      console.log(image); //なんかすごいのが返り値として出てきた
      //プレビューが元々なかった場合はhtmlを追加
      if ($(`#preview-box__${id}`).length == 0) {
        var index = $('.preview-box').length; //preview-boxの数を数えて変数に代入
        console.log(index); //0が出た＝プレビューがもともとなかった場合
        var html = buildHTML(id); //プレビューを生成する関数を変数に代入
        console.log(html); //htmlにちゃんと上記の記述が入っている
        //ラベルの直前のプレビュー群にプレビューを追加
        var prevContent = $('.label-content').prev(); //prevメソッドは直前のhtmlを取得。label-contentクラスを取得して変数に代入
        console.log(prevContent[0]); //prevContenの中身が意味わからない
        $(prevContent).append(html); 
        console.log(prevContent[0]); 
      }
      //イメージを追加
      // var alt = $('.upload-image').attr('alt', 'hello');
      // console.log(alt[0]);

      $(`#preview-box__${id} img`).attr('src', `${image}`); //#preview-box__${id} imgのsrc属性を取得してimageに変更する
      // console.log(`#preview-box__${id} img`);
      var index = $('.preview-box').length; //preview-boxの数を数えて変数に代入
      //プレビューが5個あったらラベルを隠す。ここはあとで5を10に変えてもいいかも
      if (index == 5) {
        $('.label-content').hide(); //対象要素を隠す
        console.log('eeeeeeeee');
      }

      //ラベルのwidth操作
      setLabel(); //label-contentクラスの横幅を変えるメソッドを呼び出す(＝横幅を変える処理を実行する)
      //ラベルのidとforの値を変更
      if(index < 5){
        //プレビューの数でラベルのオプションを更新する
        $('.label-box').attr({id: `label-box--${index}`,for: `item_images_attributes_${index}_image`}); //これはたぶんOK
        console.log('fffffffffff');
      }
    }
  });

  //------------------------------------------------------------------------------

  // file_fieldのnameに動的なindexをつける為の配列
  // let fileIndex = [1,2,3,4,5,6,7,8,9,10];

  // 既に使われているindexを除外
  // lastIndex = $('.js-file_group:last').data('index'); //data属性の取得。引数にindexとしているのでdata-indexだけを取得する
  // fileIndex.splice(0, lastIndex);

  // $('.hidden-destroy').hide(); //対象要素を隠す

  // $('#image-box').on('change', '.js-file', function(e) {
  //   console.log('hello!');
  //   const targetIndex = $(this).parent().data('index');
  //   // ファイルのブラウザ上でのURLを取得する
  //   const file = e.target.files[0];
  //   const blobUrl = window.URL.createObjectURL(file);

  //   // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
  //   if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
  //     img.setAttribute('src', blobUrl);
  //   } else {  // 新規画像追加の処理
  //     $('#previews').append(buildHTML(targetIndex, blobUrl));
  //     // fileIndexの先頭の数字を使ってinputを作る
  //     $('#image-box').append(buildFileField(fileIndex[0]));
  //     fileIndex.shift();
  //     // 末尾の数に1足した数を追加する
  //     fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
  //   }
  // });

  // $('#image-box').on('click', '.js-remove', function() {
  //   const targetIndex = $(this).parent().data('index')
  //   // 該当indexを振られているチェックボックスを取得する
  //   const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
  //   // もしチェックボックスが存在すればチェックを入れる
  //   if (hiddenCheck) hiddenCheck.prop('checked', true);

  //   $(this).parent().remove();
  //   $(`img[data-index="${targetIndex}"]`).remove();
  //   // 画像入力欄が0個にならないようにしておく
  //   if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  // });


  // 画像の削除
  $(document).on('click', '.delete-box', function() {
    var index = $('.preview-box').length;
    setLabel(index);
    //item_images_attributes_${id}_image から${id}に入った数字のみを抽出
    var id = $(this).attr('id').replace(/[^0-9]/g, '');
    //取得したidに該当するプレビューを削除
    $(`#preview-box__${id}`).remove();
    console.log("new")
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
  });
});

