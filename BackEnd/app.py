from flask import Flask, Response, request, jsonify
from graphforrandom import User, Cluster, EntirePopulation
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


cluster = Cluster("Default Cluster")
pop = EntirePopulation()
pop.generate_population()


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

        user = User(first_name = first_name, last_name = last_name, email = email, password = password, 
                    gender = gender, age = age, experience = experience)
        pop.special_user = user
        
        try: 
            pop.clusters[user.cluster_id].add_user(user)
            current_cluster = pop.clusters[user.cluster_id]
            pop.clusters[user.cluster_id].connect_users(current_cluster.users[-1], user)

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
        data = pop.get_users_from_cluster("Female Beginner Young")

        stats = pop.get_competition("Female", 22,"Female Intermediate Young")
        response = {
            "data": data,
            "stats": stats
        }
        return jsonify(response)
        
    elif request.method == 'OPTIONS':
        print("Hello")
        resp = Response("Yep, this is options")
        resp.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type"
        resp.headers['Access-Control-Allow-Methods']= "GET, POST"
        resp.headers['Access-Control-Allow-Origin'] = "*"
        resp.status_code = 200
        return resp
   

if __name__ == '__main__':
    app.run(debug=True, port=3081)
