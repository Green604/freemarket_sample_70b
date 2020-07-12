$(function() {
  
  $(".brand-item").on("mouseover", function() {
    var id = this.id//どのリンクにマウスが乗ってるのか取得します
    $(".now-selected-blue").removeClass("now-selected-blue")//青色のcssのためです
    $('#' + id).addClass("now-selected-blue");//青色のcssのためです
  });
});