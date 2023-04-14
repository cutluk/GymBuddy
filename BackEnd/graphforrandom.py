import random
# create a class for each node 
class User:
    # may need to add a picture
    def __init__(self, first_name, last_name, email, password, gender, age, experience):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password #length of 8
        self.gender = gender
        self.age = age
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
                    return "Female Advanced MIddle Aged"
                
            else:
                if experience < 4:
                    return "Female Beginner Old"
                
                elif experience >= 4 and experience <= 6:
                    return "Female Intermediate Old"

                elif experience > 6:
                    return "Female Advanced  Old"
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
                    return "Male Advanced  Old"

        # use the user's age, experience, and gender to determine the cluster ID
        # Return the cluster ID


# the graph will have a list of clusters
class Graph:
    def __init__(self):
        self.edges = {}
        self.nodes = set()

    def add_node(self, node):
        self.nodes.add(node)

    # well have figure out when to call this function 
    # take the most recent user from the nodes set and use that node as the "from" and then a new user as the "to"
    def add_edge(self, from_node, to_node):
        if from_node not in self.edges:
            self.edges[from_node] = []
        self.edges[from_node].append(to_node)

        if to_node not in self.edges:
            self.edges[to_node] = []
        self.edges[to_node].append(from_node)

# ---- Working on genertating Random Nodes Here ----
male_first_names = ('Liam', 'Noah',	'Oliver', 'Elijah', 'James')
female_first_names = ('Olivia',	'Emma',	'Charlotte', 'Amelia', 'Ava')

last_names = ('Johnson' , 'Williams' , 'Brown' , 'Jones', 'Garcia' , 'Miller' , 'Davis' , 'Rodriguez')

gender_options = ('Female', 'Male')

group=" ".join(random.choice(male_first_names)+" "+random.choice(last_names) for _ in range(4))

print(group)
        

# cluster will have ID and a list of users
# calling something like cluster.users will provide a list of users in the cluster
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

def main():
    userMary = User("Mary", "Smith", "marysmith@gmail.com", "IamMarySmith", "Female", 50, 10)
    userJohn = User("John", "John", "john@email", "john", "Female", 50, 10)
    userThird = User("third", "jonny", "john@email", "john", "Female", 50, 10)

    clusterOld = Cluster(cluster_id= userJohn.cluster_id)
    clusterOld.add_user(userMary)
    clusterOld.add_user(userJohn)
    clusterOld.add_user(userThird)

    print(clusterOld.users)

    clusterOld.connect_users(userMary, userJohn)
    clusterOld.connect_users(userMary, userThird)

    for i in clusterOld.users:
        for j in clusterOld.graph.edges[i]:
            print(j.first_name)
    

if __name__ == "__main__":
    main()


    