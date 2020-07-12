crumb :root do
  link "Home", root_path
end

crumb :mypage do |user|
  link "マイページ", user_path(current_user.id)
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

# 親カテゴリーのパンくず
crumb :parent_category do |category|
  category = Category.find(params[:id]).root
  link "#{category.name}", parents_category_path(category)
  # parent :category_index
end
# -----------------------------------------------------------------
# 子カテゴリーのパンくず
crumb :child_category do |category|
  category = Category.find(params[:id])
  # 表示しているページが子カテゴリーの一覧ページの場合
  if category.has_children?
    link "#{category.name}", children_category_path(category)
    parent :parent_category

  # 表示しているページが孫カテゴリーの一覧ページの場合
  else
    link "#{category.parent.name}", parents_category_path(category.parent)
    parent :parent_category
  end
end
# -----------------------------------------------------------------
# 孫カテゴリーのパンくず
crumb :grandchild_category do |category|
  category = Category.find(params[:id])
  link "#{category.name}", grand_children_category_path(category)
  parent :child_category
end