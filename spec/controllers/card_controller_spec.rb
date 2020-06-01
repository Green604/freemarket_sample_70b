require 'rails_helper'

describe CardController do

  describe '#new' do
    it 'new.html.haml に遷移すること' do
      expect(response).to render_template :new
    end
  end

end
