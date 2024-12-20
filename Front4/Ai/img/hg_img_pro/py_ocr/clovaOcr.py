import requests
import uuid
import time
import json

api_url = ''
secret_key = ''
image_file = 'C:\\Users\\mdk19\\Desktop\\capstone front\\Ai\\img\\KakaoTalk_20241101_225352018.png'

request_json = {
    'images': [
        {
            'format': 'png',
            'name': 'demo'
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))
}

payload = {'message': json.dumps(request_json).encode('UTF-8')}
files = [
  ('file', open(image_file,'rb'))
]
headers = {
  'X-OCR-SECRET': secret_key
}

body = {
    'images':[
        {
            'format': 'png',
            'name': ''
            }
        ],
    'requestId': 'uuid',
    'version': 'V2',
    'lang': 'ko',
    'timestamp': 1702517003312,
    'enableTableDetection': True
    }

response = requests.request("POST", api_url, headers=headers, data = payload, files = files)

print(response.text.encode('utf8'))