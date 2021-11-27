import os
from dotenv import load_dotenv
from flask import Flask, request
from PIL import Image
from main import get_prediction
from werkzeug.utils import secure_filename
import json


load_dotenv()

app = Flask(__name__, static_folder='build', static_url_path='')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/get_statistics')
def get_statistics():
    f = open('record.json',)
    return json.load(f)

@app.route('/update_statistics', methods=['POST'])
def update_statistics():
    new_value = request.json['newValue']
    f = open('record.json',)
    data = json.load(f)
    data['total_data'] = data['total_data'] + 1
    data['probabilities_sum'] = data['probabilities_sum'] + float(new_value)

    with open("record.json", "w") as outfile:
        json.dump(data, outfile)
    
    return {'success': True}


@app.route('/process_photo', methods=['POST'])
def process_photo():
    imgfile = request.files['image']

    if imgfile.filename == '':
        return {'Error': 'No Filename Specified'}

    #img = Image.open(imgfile)
    #img.show() #comment me out to not open photo automatically

    #TODO: get word prediction from image file

    filename = secure_filename(imgfile.filename)
    path = os.path.join('./images', filename)
    imgfile.save(path)

    word, probability = get_prediction(path)#SEND SECOND PARAMETER AS DECODER NUMBER FROM FRONTEND # download file and then send to function
    return {'word_prediction': word[0], 'probability': str(probability[0])} #TODO: add result here in place of 'WORD_HERE'

if __name__ == '__main__':
    app.run()
