import sys
import os
import glob
import re
from flask_cors import CORS
import numpy as np
# from keras.models import load_model
import keras.utils as image
# from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from PIL import Image
from werkzeug.utils import secure_filename
from flask import Flask, redirect, url_for, request, render_template 
import cv2 

app = Flask(__name__)
CORS(app)
MODEL_PATH = 'models/model.h5'
model = load_model(MODEL_PATH)
print('Model loaded. Start serving...')


def model_predict(img_path, model):
    img_color = cv2.imread(img_path)
    img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
    cv2.imwrite(img_path, img_gray)
    img = Image.open(img_path).resize((400, 400))  #target_size must agree with what the trained model expects!!

    # Preprocessing the image
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)

   
    preds = model.predict(img)
    return preds

@app.route('/predict', methods=['POST'])
def upload():

    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)

        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        print('Prediction started!')
        preds = model_predict(file_path, model)
        
        try:
            os.remove(file_path)#removes file from the server after prediction has been returned
        except:
            print("File already removed!")

        # Arrange the correct return according to the model. 
		# In this model 1 is Pneumonia and 0 is Normal.
        str1 = 'Pneumonia'
        str2 = 'Normal'
        if preds == 1:
            return str1
        else:
            return str2

if __name__ == "__main__" :
    app.run(debug=True, use_reloader=False)