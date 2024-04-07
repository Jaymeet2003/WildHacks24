from ast import Dict
from requests_html import HTMLSession
import bs4
import json

s = HTMLSession()
url = "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=7338&offset=0"

api_response = s.get(url).text

data = []
symbol = ""
stock_price = ''
name= ""
s = HTMLSession()
api_response = s.get(url).text
for i in range(192, len(api_response)):
    dic = {}
    if api_response[i:i+6] == "symbol":
        for j in api_response[i+9:]:
            if j == '"':
                break
            else:
                symbol += j
        for h in range(i, len(api_response)):
            if api_response[h:h+4] == "name":
                for a in api_response[h+7:]:
                    if a == '"':
                        #data.append(name)
                        break
                    else:
                        name += a
                break
        for k in range(i, len(api_response)):
            if api_response[k:k+8] == "lastsale":
                for y in api_response[k+12:]:
                    if y == '"':
                        #data.append(stock_price)
                        break
                    else:
                        stock_price += y
                break
        
        dic['symbol'] = symbol
        dic['name'] = name
        dic['stock_price'] = stock_price
        data.append(dic)
        symbol = ""
        stock_price = ''
        name = ""


with open('../frontend/output.json', 'w') as f:
    json.dump(data, f, indent=4)
    
