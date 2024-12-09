#APi 가이드

http://127.0.0.1:8000/gptimg/식재료 이미지 경로
http://127.0.0.1:8000/clovaimg/영수증 이미지 경로

#사용 파일
clova_ocr/폴더파일
gpt_img/폴더파일

두폴더 안에있는 파일들만 사용해주세요 키값은 카톡주세요

#추가 의존성 필수
pip install fastapi
pip install uvicorn
pip install openai


#실행법
mian.py 가 있는 폴더 경로에서
터미널창 uvicorn main:app --reload(서버 가동 명령어)

#주의사항
꼭 api키 값을 넣어줘야 정상적으로 반환됩니다.

#서버 가동후 swagger 사용하시면 좀더 편하게 response 값을 보실수있을거에요
http://127.0.0.1:8000/docs
