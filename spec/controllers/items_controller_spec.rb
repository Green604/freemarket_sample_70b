require 'rails_helper'

describe ItemsController do
  # describe 'GET #new' do
  #   it "new.html.hamlに遷移すること" do
  #     get :new
  #     expect(response).to render_template :new
  #   end
  # end

  context 'when items searched' do
    before do
      create_list(:item, 10) #検索用のデータ
    end
    before do
      @item1 = create(:item, name: "おおお", description: "良いい", price: 1000, condition: :"新品・未使用", parent_category_id: 1, child_category_id: 1,category_id: 1, shipping_id: 1)
    end
    specify do
      @params = Hash.new
      @params[:q] = Hash.new
      @params[:name_cont] = 'お'
      get :detail_search, params: @params
      expect(assigns(:items)).to match_array([@item1])
    end
  end
end
