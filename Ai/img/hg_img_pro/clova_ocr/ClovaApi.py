import requests
import uuid
import time
import json

# API URL 및 Secret Key 설정
api_url = 'https://2y40ropy76.apigw.ntruss.com/custom/v1/35548/226799cfe2155757960a454b563d6bfe97853f8b355af57aaaa11a9355adb21b/general'
secret_key = '='


def getClovaApi(imgpath):
            image_file = imgpath
            # JSON 요청 구성
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

            # 요청 페이로드 및 파일 설정
            files = [
                ('file', open(image_file, 'rb'))
            ]
            headers = {
                'X-OCR-SECRET': secret_key
            }

            # API 요청
            response = requests.post(api_url, headers=headers, data={'message': json.dumps(request_json)}, files=files)

            # 응답 처리
            if response.status_code == 200:
                savedText = ''
                try:
                    # JSON 응답 파싱
                    response_json = response.json()

                    # inferText 값 추출
                    texts = [
                        field.get("inferText", "")
                        for image in response_json.get("images", [])
                        for field in image.get("fields", [])
                    ]

                    if texts:
                        # 추출된 텍스트 출력
                       
                        for text in texts:
                            savedText=savedText+'\n'+text
                    else:
                        print("텍스트를 추출할 수 없습니다.")
                except json.JSONDecodeError:
                    print("응답 데이터를 JSON으로 변환할 수 없습니다.")
            else:
                print("요청 실패:", response.status_code)
                print("응답 내용:", response.text)
            return {"clovaResult" : savedText}
print(getClovaApi("C:\\Users\\mdk19\\Desktop\\capstone front\\Ai\\img\\KakaoTalk_20241101_225352018.png"))