# comment.jsで使用するインスタンス変数を設定
json.user_name @comment.user.nickname
json.created_at @comment.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.comment @comment.comment