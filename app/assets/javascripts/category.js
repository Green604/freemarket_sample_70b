$(function(){

  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }

  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml =  `<div class='category-select-child'>
                          <select class="category-select-wrapper__box--select" id="child_category" name="item[child_category_id]">
                            <option value="">選択してください</option>
                            ${insertHTML}
                          </select>
                          <svg class='childCategory-svg', aria-hidden="true", fill="888888", fill-rule= "evenodd", height="24", view="0 0 24 24", width="24">
                            <path d="M12,15.66a1.73,1.73,0,0,1-1.2-.49L5.21,9.54a.7.7,0,0,1,1-1l5.62,5.62c.15.15.27.15.41,0L17.8,8.6a.71.71,0,0,1,1,0,.69.69,0,0,1,0,1l-5.57,5.58A1.71,1.71,0,0,1,12,15.66Z" />
                          </svg>
                        </div>`;
    $('.category-section__pulldown').append(childSelectHtml);
  }

  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='category-select-grandchild'>
                              <select class="category-select-wrapper__box--select" id="grandchild_category" name="item[category_id]">
                                <option value="">選択してください</option>
                                ${insertHTML}
                              </select>
                              <svg class='grandChildCategory-svg', aria-hidden="true", fill="888888", fill-rule= "evenodd", height="24", view="0 0 24 24", width="24">
                                <path d="M12,15.66a1.73,1.73,0,0,1-1.2-.49L5.21,9.54a.7.7,0,0,1,1-1l5.62,5.62c.15.15.27.15.41,0L17.8,8.6a.71.71,0,0,1,1,0,.69.69,0,0,1,0,1l-5.57,5.58A1.71,1.71,0,0,1,12,15.66Z" />
                              </svg>
                            </div>`;
    $('.category-section__pulldown').append(grandchildSelectHtml);
  }

  $(window).on('load',function(){
    if(document.URL.match('new')) {
      $('#parent_category').on('change', function(){
        var parentCategory = $(this).val(); 
        if ($('div').hasClass('category-select-child')){ 
          $('.category-select-child').remove();
          $('.category-select-grandchild').remove();
          $.ajax({
            url: 'get_category_children',
            type: 'GET',
            data: { parent_id: parentCategory }, 
            dataType: 'json'
          })
          .done(function(children){
            var insertHTML = '';
            children.forEach(function(child){
              insertHTML += appendOption(child);
            });
            appendChidrenBox(insertHTML);
          })
          .fail(function(){
            alert('カテゴリー取得に失敗しました');
          })
        } else {
          $.ajax({
            url: 'get_category_children',
            type: 'GET',
            data: { parent_id: parentCategory }, 
            dataType: 'json'
          })
          .done(function(children){
            var insertHTML = '';
            children.forEach(function(child){
              insertHTML += appendOption(child);
            });
            appendChidrenBox(insertHTML);
          })
          .fail(function(){
            alert('カテゴリー取得に失敗しました');
          })
        }
      });
      
      $('.category-section__pulldown').on('change', '#child_category', function(){
        var childId = $('#child_category option:selected').data('category'); 
        if ($('div').hasClass('category-select-grandchild')){ 
          $('.category-select-grandchild').remove();
          $.ajax({
            url: 'get_category_grandchildren',
            type: 'GET',
            data: { child_id: childId }, 
            dataType: 'json'
          })
          .done(function(grandchildren){
            if (grandchildren.length != 0) {
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
        } else {
          $.ajax({
            url: 'get_category_grandchildren',
            type: 'GET',
            data: { child_id: childId }, 
            dataType: 'json'
          })
          .done(function(grandchildren){
            if (grandchildren.length != 0) {
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
        }
      });
    }
    //edit.html.hamlの場合
    if(document.URL.match('edit')) {
      $('#parent_category').on('change', function(){
        //親カテゴリーの名前を取得
        var parentCategory = $(this).val(); 
        //親カテゴリーが初期値でないことを確認
        if (parentCategory != "---"){ 
          $.ajax({
            url: 'get_category_children',
            type: 'GET',
            data: { parent_id: parentCategory }, 
            dataType: 'json'
          })
          .done(function(children){
            //親カテゴリーが変更された時
            //子カテゴリーを削除
            $('#children_wrapper').remove(); 
            //孫カテゴリーを削除
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
          //親カテゴリーが初期値になった時
          //子カテゴリーを削除
          $('#children_wrapper').remove(); 
          //孫カテゴリーを削除
          $('#grandchildren_wrapper').remove();
        }
      });
    
      $('.category-section__pulldown').on('change', '#child_category', function(){
        var childId = $('#child_category option:selected').data('category'); 
        if (childId != "---"){ 
          $.ajax({
            url: 'get_category_grandchildren',
            type: 'GET',
            data: { child_id: childId }, 
            dataType: 'json'
          })
          .done(function(grandchildren){
            if (grandchildren.length != 0) {
              $('#grandchildren_wrapper').remove(); 
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
        } else {
          $('#grandchildren_wrapper').remove(); 
        }
      });
    }
  });
});

// 詳細検索ページのカテゴリー表示
$(function(){

  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }

  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml =  `<div class='category-select-child'>
                          <select class="category-select-wrapper__box--select" id="child_category_q" name=" q[child_category_id]">
                            <option value="">選択してください</option>
                            ${insertHTML}
                          </select>
                          <svg class='childCategory-svg', aria-hidden="true", fill="888888", fill-rule= "evenodd", height="24", view="0 0 24 24", width="24">
                            <path d="M12,15.66a1.73,1.73,0,0,1-1.2-.49L5.21,9.54a.7.7,0,0,1,1-1l5.62,5.62c.15.15.27.15.41,0L17.8,8.6a.71.71,0,0,1,1,0,.69.69,0,0,1,0,1l-5.57,5.58A1.71,1.71,0,0,1,12,15.66Z" />
                          </svg>
                        </div>`;
    $('.category-section__pulldown').append(childSelectHtml);
  }

  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='category-select-grandchild'>
                              <select class="category-select-wrapper__box--select" id="grandchild_category" name="q[category_id]">
                                <option value="">選択してください</option>
                                ${insertHTML}
                              </select>
                              <svg class='grandChildCategory-svg', aria-hidden="true", fill="888888", fill-rule= "evenodd", height="24", view="0 0 24 24", width="24">
                                <path d="M12,15.66a1.73,1.73,0,0,1-1.2-.49L5.21,9.54a.7.7,0,0,1,1-1l5.62,5.62c.15.15.27.15.41,0L17.8,8.6a.71.71,0,0,1,1,0,.69.69,0,0,1,0,1l-5.57,5.58A1.71,1.71,0,0,1,12,15.66Z" />
                              </svg>
                            </div>`;
    $('.category-section__pulldown').append(grandchildSelectHtml);
  }

  $(window).on('load',function(){
    $('#parent_category_q').on('change', function(){
      var parentCategory = $(this).val(); 
      if ($('div').hasClass('category-select-child')){ 
        $('.category-select-child').remove();
        $('.category-select-grandchild').remove();
        $.ajax({
          url: 'get_category_children',
          type: 'GET',
          data: { parent_id: parentCategory }, 
          dataType: 'json'
        })
        .done(function(children){
          var insertHTML = '';
          children.forEach(function(child){
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
        })
        .fail(function(){
          alert('カテゴリー取得に失敗しました');
        })
      } else {
        $.ajax({
          url: 'get_category_children',
          type: 'GET',
          data: { parent_id: parentCategory }, 
          dataType: 'json'
        })
        .done(function(children){
          var insertHTML = '';
          children.forEach(function(child){
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
        })
        .fail(function(){
          alert('カテゴリー取得に失敗しました');
        })
      }
    });
    
    $('.category-section__pulldown').on('change', '#child_category_q', function(){
      var childId = $('#child_category_q option:selected').data('category'); 
      if ($('div').hasClass('category-select-grandchild')){ 
        $('.category-select-grandchild').remove();
        $.ajax({
          url: 'get_category_grandchildren',
          type: 'GET',
          data: { child_id: childId }, 
          dataType: 'json'
        })
        .done(function(grandchildren){
          if (grandchildren.length != 0) {
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
      } else {
        $.ajax({
          url: 'get_category_grandchildren',
          type: 'GET',
          data: { child_id: childId }, 
          dataType: 'json'
        })
        .done(function(grandchildren){
          if (grandchildren.length != 0) {
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
      }
    });
  });
});
