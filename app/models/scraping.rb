# class Scraping < ApplicationRecord
#   require 'mechanize'

#   agent = Mechanize.new
#   page = agent.get("https://www.mercari.com/jp/brand/")
#   elements = page.search('p')

#   elements.each do |ele|
#     brand = Brand.new
#     brand.name = ele.inner_text
#     brand.save
#   end

# end
