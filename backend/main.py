from flask import Flask, json, jsonify, request
from flask_cors import CORS, cross_origin
import pickle
import numpy as np
import pandas as pd
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

pkl = open('model.pkl', 'rb')
pkl2 = open('model1.pkl', 'rb')
model = pickle.load(open('model.pkl', 'rb'))
model1 = pickle.load(open('model1.pkl', 'rb'))
ctmod = pickle.load(open('DT.pkl', 'rb'))
wt = np.load('wt.npy')


@app.route("/evaluate", methods=['POST'])
def evaluate():
    request_data = json.loads(request.data)
    print(request_data)
    dt = request_data["dt"]
    month = request_data["month"]
    year = request_data["year"]
    purity = request_data["purity"]
    location= request_data["location"]
    ornament=request_data["ornament"]
    print(dt, type(dt))
    print(month, type(month))
    print(year, type(year))
    print(purity, type(purity))
    print(location, type(location))
    print(ornament, type(ornament))
    #######################################
    ##########CODE HERE####################
    clt=[[location,ornament,3]]
    clt=pd.DataFrame(clt)
    clt=np.asarray(clt)
    predic=ctmod.predict(clt)
    print(predic[0])
    if purity == 24:
        del purity
        x_test = [[dt, year, month]]
        x_test = pd.DataFrame(x_test)
        x_test = np.asarray(x_test)
        pred = model.predict(x_test)-wt
        output = {"predictedPrice": str(pred[0]/90),
                  "predictedShop":predic[0],"ornament":ornament}
    else:
        del purity
        x_test = [[dt, year, month]]
        x_test = pd.DataFrame(x_test)
        x_test = np.asarray(x_test)
        pred = model1.predict(x_test)-wt
        output = {"predictedPrice": str(pred[0]/85),
                  "predictedShop":predic[0],"ornament":ornament}
    return output


if __name__ == "__main__":
    app.run(debug=True)
