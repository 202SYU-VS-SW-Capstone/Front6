from typing import Union

from fastapi import FastAPI

from gpt_img import imgapi

from clova_ocr import ClovaApi

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/gptimg/{image_path}")
def getapiimg(image_path: str):
    return imgapi.getimg(image_path)

@app.get("/clovaimg/{image_path}")
def clovaapiimg(image_path: str):
    return ClovaApi.getClovaApi(image_path)
    