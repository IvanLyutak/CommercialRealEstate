from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import FileResponse

from models import *
from dbq import *

import json
import uuid

import aiofiles

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(SessionMiddleware ,secret_key='maihoonjiyan')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/")
async def root():
    return {"message": "backend is working"}


@app.get("/api/survey/list")
async def listServey():
    return db_listServey()

@app.post("/api/survey/insertResult")
async def insertResultServey(item: insertResultServeyItem):
   return db_insertResultServey(item.question, item.answer)

@app.get("/api/survey/selectionСriteriaRealty")
async def selectionСriteriaRealty():
    print("selectionСriteriaRealty")
    return db_selectionСriteriaRealty()

@app.get("/api/survey/agencySelectionCriteria")
async def selectionСriteriaRealty():
    return db_agencySelectionCriteria()

@app.get("/api/survey/interestingInformation")
async def interestingInformation():
    return db_interestingInformation()

@app.post("/api/reviews/insert")
async def insertReview(item: insertReviewItem):
   return db_insertReview(item.name, item.text)

@app.get("/api/reviews/list")
async def listReview():
   return db_listReview()

@app.post("/api/bot/message/send")
async def sendMessageBot(item: sendMessageBotItem):
    return db_chat(item.message)


@app.post("/api/uploadAd")
async def uploadAd(metadata: str = Form(), images: List[UploadFile] = File(...)):
        
    imageNames = []
    for image in images:
        destination_file_path = "images/" + str(uuid.uuid4()) + ".jpeg"
        async with aiofiles.open(destination_file_path, 'wb') as out_file:
            while content := await image.read(1024):
                await out_file.write(content)
            imageNames.append(destination_file_path.split("/")[1])
    
    metadata = json.loads(metadata)
    metadata["images"] = "{" + ', '.join(imageNames) + "}"

    print(metadata)

    return db_insertAdvt(metadata)

@app.post("/api/listObject")
async def listObject(item: listObjectItem):
    print(item)
    data = db_listObject(item)
    
    if data is not None:
        for item in data:
            print(item)
            item["image"] = f"/api/image/{item['image'][0]}"
        return data
    else:
        return []

@app.get("/api/image/{image}")
async def getImage(image: str):
    return FileResponse('images/' + image, media_type='image/jpeg', filename=image)

@app.get("/api/dataOfObject/{id}")
async def dataOfObject(id: int):

    data = db_dataOfObject(id)
    for i in range (len(data["images"])):
        data["images"][i] = "/api/image/" + data["images"][i]

    return data