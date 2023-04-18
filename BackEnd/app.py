from flask import Flask, request, jsonify
from graph import User, Cluster, EntirePopulation
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/**": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# test
cluster = Cluster("Default Cluster")
pop = EntirePopulation()

@app.route('/signup', methods=['POST'])
@cross_origin()
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

        user = User(first_name, last_name, email, password, gender, age, experience)
        cluster.cluster_id = user.cluster_id
        pop[cluster.cluster_id] = cluster
        try: 
            cluster.add_user(user)
        except Exception as e:
            app.logger.error(f'Error adding user to Graph: {e}')

    resp = Flask.Response(json.dumps({"status": "200", "message": "Hell Yeah"}), status=200, mimetype="application/json")
    resp.headers['Access-Control-Allow-Origin'] = "*"
    resp.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type"
    resp.headers['Access-Control-Allow-Methods']= "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    resp.headers['Pragma'] = 'no-cache'
    resp.headers['Expires'] = '0'
    
    return resp

if __name__ == '__main__':
    app.run(debug=True, port=5000)
