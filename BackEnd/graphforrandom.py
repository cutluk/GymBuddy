import random
from collections import deque
import string
import glob

# create a class for each node 
class EntirePopulation:
    def __init__(self):
        self.clusters = {}
        self.used_emails = []
        self.used_numbers = []
    def get_competition(self, gender, user_age, cluster_above):
        graph_above = self.clusters[cluster_above].graph.edges

        start_node = self.clusters[cluster_above].graph.nodes

        if gender == "Male":
            comp_count = self.bfs(user_age, graph_above, start_node)
            return "There are {comp_count} people better".format(comp_count = comp_count)
        else:
            comp_count = self.dfs(user_age, graph_above, start_node)
            return "There are {comp_count} people better".format(comp_count = comp_count)
        
    # Breadth-First Search (BFS) algorithm 
    # Searches the cluster above a user and returns the sum of people the same age with higher experience
    def bfs(self, user_age, graph_above, start_node):
        sum_people = 0
        visited = set()
        queue = deque(start_node)

        while queue:
            node = queue.popleft()
            if node not in visited and node.age == user_age:
                visited.add(node)
                sum_people += 1
                for neighbor in graph_above[node]:
                    queue.append(neighbor)

        return sum_people
    
    # Depth-First Search (DFS) algorithm 
    # Searches the cluster above a user and returns the sum of people the same age with higher experience
    def dfs(self, user_age, cluster_above, start_node):
        sum_people = 0
        visited = set()
        stack = [start_node.pop()]

        while stack:
            node = stack.pop()
            if node not in visited and node.age == user_age:
                visited.add(node)
                sum_people += 1
                for neighbor in cluster_above[node]:
                    stack.append(neighbor)

        return sum_people

    def add_cluster(self, cluster):
        self.clusters[cluster.cluster_id] = cluster
        
    def generate_population(self, population_size  = 1000):
        for i in range(population_size):
            random_user = self.generate_random_user() 
            current_cluster_id = random_user.cluster_id
            current_cluster = Cluster(current_cluster_id)
            # if the cluster id doesnt exist yet in the population, create it and add a cluster to that
            if current_cluster_id not in self.clusters:
                
                self.add_cluster(current_cluster)
                self.clusters[current_cluster_id].add_user(random_user)
            else:
                self.clusters[current_cluster_id].connect_users(self.clusters[current_cluster_id].users[-1], random_user)
                self.clusters[current_cluster_id].add_user(random_user)
            # so now there should be a cluster assigned to an id in the entire population
            # we should add the random user to the graph inside of their cluster

    # Function to generate a random user with first and last names from predefined lists
    def generate_random_user(self):
        with open('Female_Names.txt', 'r') as file:
            first_names_female = [line.strip() for line in file]

        with open('Male_Names.txt', 'r') as file:
            first_names_male = [line.strip() for line in file]

        with open('Last_Names.txt', 'r') as file:
            last_names = [line.strip() for line in file]
        
        email_platforms = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']

        gender_options = ('Female', 'Male')

        # Choose a random gender
        gender = random.choice(gender_options)

        # Choose a random first name based on the gender
        if gender == 'Male':
            first_name = random.choice(first_names_male)
        else:
            first_name = random.choice(first_names_female)

        # Choose a random last name
        last_name = random.choice(last_names)

        # Generate email, password, age, and experience
        while True:
            # Generate email, password, age, and experience
            email = f"{first_name[0]}{last_name}{random.randint(1, 9999)}@{random.choice(email_platforms)}"

            # Check if the generated email is already used
            if email not in self.used_emails:
                self.used_emails.append(email)
                break  # Break out of the loop if the email is unique

        while True:
            digits = [random.randint(1, 9) for _ in range(10)]
            phone_number = "{}{}{}-{}{}{}-{}{}{}{}".format(*digits)


            if phone_number not in self.used_numbers:
                self.used_numbers.append(phone_number)
                break  


        password = ''.join(random.choice(string.ascii_letters) for _ in range(8))
        age = random.randint(18, 69)
        experience = random.randint(1, 10)

        glob_path = glob.glob(r"../public/face_age/0{i}/*.png".format(i = str(age)))
        glob_size = len(glob_path)
        pic_url = glob_path[random.randint(0, glob_size - 1)]
        pic_url = pic_url[9:]
        

        # Create and return a User object
        return User(first_name = first_name, last_name = last_name, phone_number = phone_number, 
                    email = email, password  =password, gender = gender, age = age, experience = experience, pic_url = pic_url)
    
    def get_users_from_cluster(self, cluster_id):
        user_list = []
        # enter a cluster id into this function and get a list of the users 
        for i in self.clusters[cluster_id].users:
            current_user = {"name": i.first_name,
                            "age" : i.age, 
                            "experience" : i.experience,
                            "contact" : i.phone_number,
                            "url" : i.pic_url}
            user_list.append(current_user)
        return user_list
        
    
# cluster will have ID and a list of users
# calling something like cluster.users will provide a list of users in the cluster
class Cluster:
    def __init__(self, cluster_id):
        self.cluster_id = cluster_id
        self.users = [] 
        self.graph = Graph()

    def add_user(self, user):
        # add to list of users and to graph
        self.users.append(user)  
        self.graph.add_node(user)  
    # add edge between two users in the cluster's graph
    def connect_users(self, user1, user2):
        self.graph.add_edge(user1, user2)  

# the graph will have a list of clusters
class Graph:
    def __init__(self):
        self.edges = {}
        self.nodes = set()

    def add_node(self, node):
        self.nodes.add(node)

    # take the most recent user from the nodes set and use that node as the "from" and then a new user as the "to"
    def add_edge(self, from_node, to_node):
        if from_node not in self.edges:
            self.edges[from_node] = []
        self.edges[from_node].append(to_node)

        if to_node not in self.edges:
            self.edges[to_node] = []
        self.edges[to_node].append(from_node)
    
    def dfs(self, node):
        visited = set()
        stack = [node]

        while stack:
            curr_node = stack.pop()

            if curr_node not in visited:
                visited.add(curr_node)

                if curr_node in self.edges:
                    for neighbor in self.edges[curr_node]:
                        if neighbor not in visited:
                            stack.append(neighbor)

        print("Edges:", self.edges)
        

class User:
    def __init__(self, first_name, last_name, phone_number, email, password, gender, age, pic_url, experience):
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.email = email
        self.password = password #length of 8
        self.gender = gender
        self.age = age
        self.pic_url = pic_url
        self.experience = experience 
        self.cluster_id = self.generateClusterID(gender, age, experience)
    
    def generateClusterID(self, gender, age, experience):
        if(gender == "Female"):
            if age <= 27:
                if experience < 4:
                    return "Female Beginner Young"
                
                elif experience >= 4 and experience <= 6:
                    return "Female Intermediate Young"

                elif experience > 6:
                    return "Female Advanced Young"
            elif age > 27 and age <= 40:
                if experience < 4:
                    return "Female Beginner Middle Aged"
                
                elif experience >= 4 and experience <= 6:
                    return "Female Intermediate Middle Aged"

                elif experience > 6:
                    return "Female Advanced Middle Aged"
                
            else:
                if experience < 4:
                    return "Female Beginner Old"
                
                elif experience >= 4 and experience <= 6:
                    return "Female Intermediate Old"

                elif experience > 6:
                    return "Female Advanced Old"
        else: 
            if age <= 27:
                if experience < 4:
                    return "Male Beginner Young"
                
                elif experience >= 4 and experience <= 6:
                    return "Male Intermediate Young"

                elif experience > 6:
                    return "Male Advanced Young"
            elif age > 27 and age <= 40:
                if experience < 4:
                    return "Male Beginner Middle Aged"
                
                elif experience >= 4 and experience <= 6:
                    return "Male Intermediate Middle Aged"

                elif experience > 6:
                    return "Male Advanced Middle Aged"               
            else:
                if experience < 4:
                    return "Male Beginner Old"
                
                elif experience >= 4 and experience <= 6:
                    return "Male Intermediate Old"

                elif experience > 6:
                    return "Male Advanced Old"
  

# function for logging in 
def initialize_app(population_size = 200):
    
    print("Hello! Welcome to Gym Buddy!")
    print("Please enter your information below and we will get you started...\n")
    first_name = input("First Name: ")
    last_name = input("Last Name: ")
    email = input("Email Address: ")
    phone_number = input("Phone Number: ")
    password = input("Password: ")
    gender = input("Gender (Male / Female): ")
    age = int(input("Age: "))
    experience = int(input("Workout experience (1 - 10): "))
    newest_user = User(first_name= first_name, last_name= last_name, email= email, password=password,
                       gender= gender, phone_number = phone_number, age= age, experience= experience)
    
    print("Congrats {name}! You are ready to meet other users!".format(name = newest_user.first_name))
    return newest_user

def main_menu():
    print("Successfully added you to a cluster of Gym Buddies!")
    print("Select an option below: ")
    option = input("1. Find users with closest age")
    option  = input("2. Search for users by name")

def main():
    userNum = 0
    pop = EntirePopulation()
    pop.generate_population()
    
    current_user = initialize_app()
    #add current user to the population 
    current_cluster = pop.clusters[current_user.cluster_id]
    current_cluster.add_user(current_user)
    current_cluster.connect_users(current_cluster.users[-1], current_user)

    user_list =  pop.get_users_from_cluster(cluster_id= current_user.cluster_id)
    print(user_list)

if __name__ == "__main__":
    main()
