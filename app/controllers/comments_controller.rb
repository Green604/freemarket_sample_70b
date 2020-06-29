class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params) 
    if @comment.save
      respond_to do |format|
        format.json
      end
    else
      flash[:alert] = 'エラーが発生しました。'
      redirect_to item_path(@comment.item.id)
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:comment).merge(user_id: current_user.id, item_id: params[:item_id])
  end
end
