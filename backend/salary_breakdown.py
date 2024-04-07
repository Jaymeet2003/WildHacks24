import pymongo

uri = ' mongodb+srv://user:JaiShreeRam@wildhacks.ivfjaob.mongodb.net/?retryWrites=true&w=majority&appName=Wildhacks'
client = pymongo.MongoClient(uri)

data = {}

# Access a specific database
db = client['test']

# Access a specific collection within the database
collection = db["incomes"]
salary_breakdown = {}

# Print the first document in the collection
items = collection.find()
for data in items:
    userId = data['userId']

    if(data['Yearly Salary'] < 10000):
        print("You are in the 10% tax bracket")
        salary_breakdown["Essential"] = int(data['Yearly Salary'] * 0.6)
        salary_breakdown["Entertainment"] = int(data['Yearly Salary'] * 0.2)
        salary_breakdown["Savings"] = int(data['Yearly Salary'] * 0.1)
        salary_breakdown["Investment"] = int(data['Yearly Salary'] * 0.0)
        salary_breakdown["Other"] = int(data['Yearly Salary'] * 0.1)


    elif(data['Yearly Salary'] < 25000):
        print("You are in the 20% tax bracket")
        salary_breakdown["Essential"] = int(data['Yearly Salary'] * 0.5)
        salary_breakdown["Entertainment"] = int(data['Yearly Salary'] * 0.2)
        salary_breakdown["Savings"] = int(data['Yearly Salary'] * 0.1)
        salary_breakdown["Investment"] = int(data['Yearly Salary'] * 0.1)
        salary_breakdown["Other"] = int(data['Yearly Salary'] * 0.1)
    else:
        print("You are in the 30% tax bracket")
        salary_breakdown["Essential"] = int(data['Yearly Salary'] * 0.4)
        salary_breakdown["Entertainment"] = int(data['Yearly Salary'] * 0.15)
        salary_breakdown["Savings"] = int(data['Yearly Salary'] * 0.20)
        salary_breakdown["Investment"] = int(data['Yearly Salary'] * 0.15)
        salary_breakdown["Other"] = int(data['Yearly Salary'] * 0.1)
        
    print(salary_breakdown)

    query = {"userId": userId}

    # Define the new field and value you want to add
    for key,value in salary_breakdown.items():
        new_field = {"$set": {key: value}}
        collection.update_one(query, new_field)
        updated_data = collection.find_one(query)

    print(updated_data)

