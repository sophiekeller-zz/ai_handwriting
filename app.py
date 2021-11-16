import os
from dotenv import load_dotenv
from flask import Flask, request
import requests
import io
from PIL import Image
try:
    import main
except Exception as e:
    print(e)


load_dotenv()

app = Flask(__name__, static_folder='build', static_url_path='')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/process_photo', methods=['POST'])
def process_photo():
    imgfile = request.files['image']

    if imgfile.filename == '':
        return {'Error': 'No Filename Specified'}

    #img = Image.open(imgfile)
    #img.show() #comment me out to not open photo automatically

    #TODO: get word prediction from image file
    word = main(imgfile.filename)#src.main.main(imgfile.name) # download file and then send to function
    print(word)
    return {'result': word} #TODO: add result here in place of 'WORD_HERE'

if __name__ == '__main__':
    app.run()
