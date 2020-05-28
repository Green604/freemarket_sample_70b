$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    // value=category.idでカテゴリーテーブルの親IDを取得する
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成、後のif文で変更が判断できるように初期値をvalue="---"とする
  // name="item[child_category_id]"でchild_category_idに子IDの値を保存する
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='category-select-wrapper__added' id= 'children_wrapper'>
                        <div class='category-select-wrapper__box'>
                          <select class="category-select-wrapper__box--select" id="child_category" name="item[child_category_id]">
                            <option value="---" data-category="---">---</option>
                            ${insertHTML}
                          <select>
                          <i class='fas fa-chevron-down category-select-wrapper__box--arrow-down'></i>
                        </div>
                      </div>`;
    $('.label-group-category').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成、後のif文で変更が判断できるように初期値をvalue="---"とする
  // name="item[category_id]"でcategory_idに孫IDの値を保存する
  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='category-select-wrapper__added' id= 'grandchildren_wrapper'>
                              <div class='category-select-wrapper__box'>
                                <select class="category-select-wrapper__box--select" id="grandchild_category" name="item[category_id]">
                                  <option value="---" data-category="---">---</option>
                                  ${insertHTML}
                                </select>
                                <i class='fas fa-chevron-down category-select-wrapper__box--arrow-down'></i>
                              </div>
                            </div>`;
    $('.label-group-category').append(grandchildSelectHtml);
  }
  // 親カテゴリー選択後のイベント
  $('#parent_category').on('change', function(){
    var parentCategory = document.getElementById('parent_category').value; //選択された親カテゴリーの名前を取得
    if (parentCategory != "---"){ //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: 'get_category_children',
        type: 'GET',
        data: { parent_id: parentCategory }, //親IDの値をコントローラーに送る
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove(); //親が変更された時、子以下を削除するする
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChidrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除するする
      $('#grandchildren_wrapper').remove();
    }
  });
  // 子カテゴリー選択後、孫カテゴリーの選択ボックスを出すイベント
  $('.label-group-category').on('change', '#child_category', function(){
    var childId = $('#child_category option:selected').data('category'); //選択された子カテゴリーのidを取得
    if (childId != "---"){ //子カテゴリーが初期値でないことを確認
      $.ajax({
        url: 'get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId }, //子IDの値をコントローラーに送る
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0) {
          $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除するする
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchidrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
    }
  });
});
