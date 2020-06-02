document.addEventListener(
  "DOMContentLoaded", e => {
    if (document.getElementById("token_submit") != null) { //token_submitというidがnullの場合、下記コードを実行しない
      Payjp.setPublicKey("pk_test_dd3f3cf108024680396cbdca"); //ここに公開鍵を直書き
      let btn = document.getElementById("token_submit"); //IDがtoken_submitの場合に取得されます
      btn.addEventListener("click", e => { //ボタンが押されたときに作動します
        e.preventDefault(); //ボタンを一旦無効化します
        let card = { //9~12行目のカード情報をcard変数に入れる
          number: document.getElementById("card_number").value,
          cvc: document.getElementById("cvc").value,
          exp_month: document.getElementById("exp_month").value,
          exp_year: document.getElementById("exp_year").value
        };
        Payjp.createToken(card, (status, response) => { //card変数の情報をstatus,response変数に入れる、cardトークンが自動で生成される
          if (status === 200) { //card変数が入力されたstatusが200=成功した場合
            $("#card_token").append(
              $('<input type="hidden" name="payjp-token">').val(response.id)
            ); //取得したcardトークンの中に非表示データのpayjpトークン=card_id情報を入れてpayjpサーバーに送信できる状態にします
            document.inputForm.submit(); //送信ボタンと同様の処理
            alert("登録が完了しました"); //確認用
          } else {
            alert("カード情報が正しくありません。"); //確認用
          }
        });
      });
    }
  },
  false
);