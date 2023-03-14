from pydantic import BaseModel

class insertResultServeyItem(BaseModel):
    question: str
    answer: str

class insertReviewItem(BaseModel):
    name: str
    text: str

class sendMessageBotItem(BaseModel):
    message: str

# class metadataItem(BaseModel):
#     typeAd: str,
#     title: str,
#     subtitle: str,
#     typeObject: str,
#     address: str,
#     square: int,
#     description: str
#     images: [str],
#     price: int,
#     phone: str,
#     email: str

class listObjectItem(BaseModel):
    typeAd: str
    typeObject: str
    price_from: int
    price_to: int
    square_from: int
    square_to: int
    address: str