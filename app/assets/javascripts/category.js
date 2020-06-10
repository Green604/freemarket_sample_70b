$(function(){
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml =  `<div class='category-select-child'>
                          <select class="category-select-wrapper__box--select" id="child_category" name="item[child_category_id]">
                            <option value="" data-category="---">---</option>
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
                              <select class="category-select-wrapper__box--select" id="grandchild_category" name="item[category_id]>
                                <option value="---" data-category="---">---</option>
                                ${insertHTML}
                              </select>
                              <svg class='grandchildCategory-svg', aria-hidden="true", fill="888888", fill-rule= "evenodd", height="24", view="0 0 24 24", width="24"></svg>
                                <path d="M12,15.66a1.73,1.73,0,0,1-1.2-.49L5.21,9.54a.7.7,0,0,1,1-1l5.62,5.62c.15.15.27.15.41,0L17.8,8.6a.71.71,0,0,1,1,0,.69.69,0,0,1,0,1l-5.57,5.58A1.71,1.71,0,0,1,12,15.66Z"</path>
                            </div>`;
    $('.category-section__pulldown').append(grandchildSelectHtml);
  }
  $('#parent_category').on('change', function(){
    var parentCategory = $(this).val(); 
    if (parentCategory != "---"){ 
      $.ajax({
        url: 'get_category_children',
        type: 'GET',
        data: { parent_id: parentCategory }, 
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove(); 
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
      $('#children_wrapper').remove(); 
      $('#grandchildren_wrapper').remove();
    }
  });
  $('.label-group-category').on('change', '#child_category', function(){
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
    }else{
      $('#grandchildren_wrapper').remove(); 
    }
  });
});
