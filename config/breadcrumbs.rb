crumb :root do
  link "Home", root_path
end

crumb :mypage do |user|
  link "出品した商品一覧", user_path(current_user.id)
end

crumb :favorite do |item|
  link "お気に入り商品一覧", item_favorites_path(params[:item_id])
end

crumb :itemDetail do |item|
  link "#{item.name}", item_path(params[:id])
end

crumb :card do |item|
  link "クレジットカード登録", new_card_path
end

crumb :exhibition do |item|
  link "出品ページ", new_item_path
end