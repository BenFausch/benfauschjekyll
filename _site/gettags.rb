require 'open-uri'
url = 'https://www.breakingviews.com'
source = open(url, &:read)