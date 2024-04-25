from flask import Flask,request,jsonify
app=Flask(__name__)
from testing import predict
from flask_cors import CORS

CORS(app)

@app.route("/predictapi",methods=['POST'])
def predictapi():
    symptoms=request.json['symptoms']
    # print(symptoms)
    prediction=predict(symptoms)
    return jsonify({"Predicted Disease":prediction,"success":True})

if __name__=="__main__":
    app.run(debug=True)