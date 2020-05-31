class CommentsController < ApplicationController

  def create
    comment = Comment.create(comment_params)
    redirect_to item_path(comment.item.id) # コメントと結びつく商品の詳細画面に遷移する
  end

  private
  def comment_params
    params.require(:comment).permit(:comment).merge(user_id: current_user.id, item_id: params[:item_id])
  end
end
