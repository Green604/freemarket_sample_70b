	$(function()  {
  let tabs = $(".tab");
  function tabSwitch() {
    $('.white-tab').removeClass("white-tab");
    $(this).addClass("white-tab");
    const index = tabs.index(this);
    $(".container").removeClass("show").eq(index).addClass("show");
  }
  tabs.click(tabSwitch);
});
$(function()  {
  let tabs = $(".tab-2");
  function tabSwitch() {
    $('.white-tab-2').removeClass("white-tab-2");
    $(this).addClass("white-tab-2");
    const index = tabs.index(this);
    $(".container-2").removeClass("show").eq(index).addClass("show");
  }
  tabs.click(tabSwitch);
});

$(function()  {
  let contents = $(".content");
  function contentSwitch() {
    $(this).addClass("changecolor");
    const index = contents.index(this);
    $(".icon-arrow__right").removeClass("changecolor").eq(index).addClass("changecolor");
  }
  contents.hover(contentSwitch);
});
$(function() {
  let contents = $(".content");
  $('.content').hover(function() {
    const index = contents.index(this);
    $(".icon-arrow__right").eq(index).animate({'top':'16px','right':'12px'},50);
  }, function() {
    const index = contents.index(this);
    $('.icon-arrow__right').eq(index).animate({'top':'16px','right':'16px'},50); 
    $('.changecolor').removeClass("changecolor");
  });
});
