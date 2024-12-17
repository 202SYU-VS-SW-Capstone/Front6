import base64
import openai
<<<<<<< HEAD
import json
openai.api_key = "b-"
=======
openai.api_key = "sk-7UDYIcKhUkb-"
>>>>>>> parent of 0d45f7a (#05)

def getimg(imgpath):


# Function to encode the image
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
    image_path = imgpath

# Getting the base64 string
    base64_image = encode_image(image_path)

    response = openai.ChatCompletion.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Let us know what food ingredients are in the image",
        },
        {
          "type": "image_url",
          "image_url": {
            "url":  f"data:image/jpeg;base64,{base64_image}"
          },
        },
      ],
    },

      {
      "role": "system",
      "content" :[
        {
        "type" : "text",
         "text" : "You are a competent secretary. Translate the requested information into Korean."
        }
      ]

    }
  ],
)

    
    
    return {"result" : response.choices[0]["message"]["content"]}
print(getimg("C:\\Users\\mdk19\\Desktop\\capstone front\\Ai\\img\\test img2.jpg"))