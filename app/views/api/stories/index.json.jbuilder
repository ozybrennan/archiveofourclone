json.total_pages @stories.total_pages

json.total_works @total_works

json.page @page

json.models @stories, partial: 'layouts/story', as: :story, current_user_needed: false
