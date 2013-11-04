module QuizzesHelper

	def test_repeater(content_arr)
		html = ""

		content_arr.each_with_index do |content, idx|
			html += content_tag(:div, content, :id => "number-#{idx}")
		end
		html.html_safe
	end


end
