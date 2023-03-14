import psycopg2
from sentiment import *
from chatbot import *
import re
connection = psycopg2.connect(dbname="commercialrealestate", user="postgres",
                            password="Samsung1969", host="localhost")

def db_listServey():
    cursor = connection.cursor()
    cursor.execute(f"SELECT s.choice_text, q.text  FROM survey s JOIN questions q ON s.question_id = q.id")
    
    result = {}
    for item in cursor.fetchall():
        if item[1] in result:
            result[item[1]].append(item[0])
        else:
            result[item[1]] = [item[0]]

    main_result = []
    for item in result:
        main_result.append({item: result[item]})

    connection.commit()
    return main_result


def db_insertResultServey(question, answer):
    cursor = connection.cursor()
    cursor.execute(f"UPDATE survey SET votes=votes + 1 where choice_text='{answer}' and question_id=(select id from questions where text='{question}')")
    
    connection.commit()
    return "OK"


def db_selectionСriteriaRealty():
    cursor = connection.cursor()
    cursor.execute(f"SELECT choice_text, votes  FROM survey where question_id=1")
    
    result = cursor.fetchall()

    connection.commit()
    return result

def db_agencySelectionCriteria():
    cursor = connection.cursor()
    cursor.execute(f"SELECT choice_text, votes  FROM survey where question_id=3")
    
    categories = []
    data = []
    for item in cursor.fetchall():
        categories.append(item[0])
        data.append(item[1])

    result = {}
    result["categories"] = categories
    result["data"] = data
    
    connection.commit()
    return result


def db_interestingInformation():
    cursor = connection.cursor()
    cursor.execute(f"SELECT choice_text, votes  FROM survey where question_id=5")

    result = []

    for item in cursor.fetchall():
        result.append({
            "name": item[0],
            "y": item[1]
        })

    connection.commit()
    return result

def db_insertReview(name, text):
    cursor = connection.cursor()
    cursor.execute(f"insert into Reviews (name, text, emotion) values ('{name}', '{text}', '{reviews_sentiment(text)}')")

    cursor.execute(f"select json_agg(Reviews) from Reviews")

    connection.commit()
    return cursor.fetchall()[0][0]

def db_listReview():
    cursor = connection.cursor()
    cursor.execute(f"select json_agg(Reviews) from Reviews")

    connection.commit()
    return cursor.fetchall()[0][0]


def db_chat(message):

    string = chat(message)
    if '[' in string:
        res = re.findall(r'\[.*?\]', string)
        print(res[0][1:-1])
        
        if res[0][1:-1] == "selectionСriteriaRealty":
            cursor = connection.cursor()
            cursor.execute(f"select choice_text from survey where question_id = 1 and votes = (SELECT MAX(votes) FROM survey where question_id = 1) LIMIT 1")
            result = cursor.fetchall()[0][0]
            string = string.replace("[selectionСriteriaRealty]", result)

            connection.commit()
        
        elif res[0][1:-1] == "agencySelectionCriteria":
            cursor = connection.cursor()
            cursor.execute(f"select choice_text from survey where question_id = 3 and votes = (SELECT MAX(votes) FROM survey where question_id = 3) LIMIT 1")
            result = cursor.fetchall()[0][0]
            string = string.replace("[agencySelectionCriteria]", result)

            connection.commit()

        elif res[0][1:-1] == "interestingInformation":
            cursor = connection.cursor()
            cursor.execute(f"select choice_text from survey where question_id = 5 and votes = (SELECT MAX(votes) FROM survey where question_id = 5) LIMIT 1")
            result = cursor.fetchall()[0][0]
            string = string.replace("[interestingInformation]", result)

            connection.commit()

    return string


def db_insertAdvt(metadata):
    typeAd = metadata["typeAd"]
    title = metadata["title"]
    subtitle = metadata["subtitle"]
    typeObject = metadata["typeObject"]
    address = metadata["address"]
    square = metadata['square']
    description = metadata["description"]
    images = metadata["images"]
    price = metadata["price"]
    phone = metadata["phone"]
    email = metadata["email"]

    cursor = connection.cursor()
    cursor.execute(
        f"insert into Objects (typeAd, title, subtitle, typeObject, address, square, description, images, price, phone, email)" 
        f" values ('{typeAd}', '{title}', '{subtitle}', '{typeObject}', '{address}', "
        f"{square}, '{description}', '{images}', {price}, '{phone}', '{email}')"
    )

    connection.commit()
    return "OK"


def db_listObject(item):
    cursor = connection.cursor()
    cursor.execute(
        f"select json_agg(json_build_object( 'id', id, 'title', title, 'subtitle', subtitle, 'address', address, 'price', price, 'square', square, 'image', images)) " 
        f"from Objects where typeAd = '{item.typeAd}' and typeObject = '{item.typeObject}' and price >= {item.price_from} and price <= {item.price_to} and square >= {item.square_from} and square <= {item.square_to} and address ~ '{item.address}'"
    )
    connection.commit()
    return cursor.fetchall()[0][0]

def db_dataOfObject(id):
    cursor = connection.cursor()
    cursor.execute(
        f"select json_agg(json_build_object( 'title', title, 'subtitle', subtitle, 'address', address, 'price', price, 'square', square, 'images', images, 'description', description)) from Objects where id={id}"
    )
    connection.commit()

    return (cursor.fetchall()[0][0][0])