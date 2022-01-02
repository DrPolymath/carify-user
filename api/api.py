from contextlib import nullcontext
import time
from flask import Flask
from flask import request

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from recommendation_engine import recommendCar

import csv

cred = credentials.Certificate("venv/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    header = ['carBrandId', 'carBrandName', 'carBrandUrl', 'carModelId', 'carModelName', 'carModelUrl',
              'carVariantId', 'carVariantName', 'bodyType', 'price', 'priceRange']

    with open('C:/Users/DrPolymath/Downloads/carData.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)

        # write the header
        writer.writerow(header)

        cbDocs = db.collection('carBrand').get()
        for cbDoc in cbDocs:
            cmDocs = db.collection('carBrand').document(
                cbDoc.id).collection('carModel').get()
            for cmDoc in cmDocs:
                cvDocs = db.collection('carBrand').document(
                    cbDoc.id).collection('carModel').document(
                    cmDoc.id).collection('carVariant').get()

                for cvDoc in cvDocs:
                    data = []
                    data.append(cbDoc.id)
                    data.append(cbDoc.to_dict()['carBrandName'])
                    data.append(cbDoc.to_dict()['url'])
                    data.append(cmDoc.id)
                    data.append(cmDoc.to_dict()['carModelName'])
                    data.append(cmDoc.to_dict()['url'])
                    data.append(cvDoc.id)
                    data.append(cvDoc.to_dict()['carVariantName'])
                    data.append(cmDoc.to_dict()['bodyType'])
                    data.append(cvDoc.to_dict()['price'])
                    data.append(cvDoc.to_dict()['priceRange'])
                    writer.writerow(data)

    return {'time': time.time()}

    # print("\n")
    # print(cvDoc.to_dict().carVariantName)
    # print(u'{}'.format(cvDoc.to_dict()['carVariantName']))
    # variant = Variant()
    # carVariant = variant.from_dict(cvDoc.to_dict())
    # print("\n")
    # print(f'{cvDoc.id} => {cvDoc.to_dict()}')
    # a = u'{} => {}'.format(cvDoc.id, cvDoc.to_dict())
    # new_list = a.split("=>")
    # new_dict = eval(new_list[1])

    # for key in new_dict:
    #     print(new_dict[key])

    # my_dict = {el.id: el.to_dict() for el in doc}

    # header = ['carBrandId', 'carBrandName',
    #           'country_code2', 'country_code3']

    # print("\n")
    # print(cvDoc.to_dict())
    # print(cmDoc.to_dict())
    # print(cvDoc.to_dict())


@app.route('/interest', methods=['GET', 'POST'])
def get_interest():
    carVariantName = request.args.get('carVariantName')
    return recommendCar(carVariantName)
