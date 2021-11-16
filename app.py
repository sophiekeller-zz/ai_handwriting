import os
from dotenv import load_dotenv
from flask import Flask, request
from PIL import Image
from main import main
from werkzeug.utils import secure_filename


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

    filename = secure_filename(imgfile.filename)
    path = os.path.join('./images', filename)
    imgfile.save(path)

    word, probability = main(path)#src.main.main(imgfile.name) # download file and then send to function
    print(word)
    # return {'word': word, 'probability': probability}
    return {'result': word} #TODO: add result here in place of 'WORD_HERE'

if __name__ == '__main__':
    app.run()
