from flask import Flask, Response, request, jsonify
from graph import User, Cluster, EntirePopulation
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


cluster = Cluster("Default Cluster")
pop = EntirePopulation()


@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():

    if request.method == 'POST':
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password = data['password']
        gender = data['gender']
        age = int(data['age'])
        experience = int(data['experience'])

        user = User(first_name = first_name, last_name = last_name, email = email, password = password, gender = gender, age = age, experience = experience)
        cluster.cluster_id = user.cluster_id
        pop.clusters[cluster.cluster_id] = cluster
        try: 
            cluster.add_user(user)
        except Exception as e:
            app.logger.error(f'Error adding user to Graph: {e}')
        return Response("Yup, this is post", status=200, mimetype='application/json')
        

        
    elif request.method == 'OPTIONS':
        resp = Response("Yep, this is options")
        resp.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type"
        resp.headers['Access-Control-Allow-Methods']= "GET, POST"
        resp.headers['Access-Control-Allow-Origin'] = "*"
        resp.status_code = 200
        return resp



@app.route('/data', methods=['GET', 'OPTIONS'])
def get_data():
    if request.method == 'GET':
        data = {'name': 'John', 'age': 30, 'experience': 'beginner'}
        print("Hello")
        return jsonify(data)
    elif request.method == 'OPTIONS':
        print("Hello")
        resp = Response("Yep, this is options")
        resp.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type"
        resp.headers['Access-Control-Allow-Methods']= "GET, POST"
        resp.headers['Access-Control-Allow-Origin'] = "*"
        resp.status_code = 200
        return resp
   

if __name__ == '__main__':
    app.run(debug=True, port=5000)
