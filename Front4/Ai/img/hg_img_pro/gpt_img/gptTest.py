import base64
from PIL import Image
import openai

# OpenAI API 키 설정
openai.api_key = ""

def encode_image_to_base64(image_path):
    """
    이미지를 Base64로 변환.
    """
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string

def analyze_image_with_gpt(base64_image):
    """
    GPT에 Base64 이미지를 전달하고, 식재료를 추출하도록 요청.
    """
    prompt = f"""
    아래는 Base64로 인코딩된 이미지 데이터입니다:
    '{base64_image[:200]}... (truncated)'
    이 이미지는 요리에 사용되는 식재료를 포함하고 있습니다.
    이미지 내용을 바탕으로 어떤 식재료가 포함되어 있는지 설명해 주세요.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o",  # 또는 "gpt-4"
        messages=[
            {"role": "system", "content": "You are an AI assistant that extracts ingredients from image descriptions."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=200,
        temperature=0.5,
    )
    return response['choices'][0]['message']['content'].strip()

def main(image_path):
    # 1. 이미지 파일을 Base64로 인코딩
    base64_image = encode_image_to_base64(image_path)
    print("Image encoded to Base64.")

    # 2. GPT API에 Base64 데이터 전달 및 분석 요청
    print("Analyzing image with GPT...")
    analysis_result = analyze_image_with_gpt(base64_image)
    print("\nExtracted Ingredients:")
    print(analysis_result)

if __name__ == "__main__":
    # 로컬 이미지 파일 경로
    image_file_path = "C:\\Users\\mdk19\\Desktop\\capstone front\\Ai\\img\\test img2.jpg"
    main(image_file_path)
