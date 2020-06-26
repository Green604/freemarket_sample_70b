class WithErrorFormBuilder < ActionView::Helpers::FormBuilder

  # ①エラーメッセージを含んだ要素を生成してあげる記述
  def pick_errors(attribute)
    return nil if @object.nil? || (messages = @object.errors.messages[attribute]).nil?
    
    # collect=mapメソッド…各要素に対してブロックを評価した結果を全て含む配列を返す
    lis = messages.collect do |message|
      %{<li>#{@object.errors.full_message(attribute, message)}</li>}
    end.join

    %{<ul class="errors">#{lis}</ul>}.html_safe
  end

  # ②既存のFormHelperをオーバーライドさせる記述
  def text_field(attribute, options={})
    # super 親クラス定義されている同名のメソッドを呼ぶことが出来る。
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def email_field(attribute, options={})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def password_field(attribute, options={})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def date_select(attribute, options={})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def text_area(attribute, options={})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def number_field(attribute, options={})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  def collection_select(attribute, collection, value_method, text_method, options = {}, html_options = {})
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

 def select(attribute, choices = nil, options = {}, html_options = {}, &block)
    return super if options[:no_errors]
    super + pick_errors(attribute)
  end

  
end