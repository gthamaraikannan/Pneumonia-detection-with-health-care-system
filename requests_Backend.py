import requests
# //Sample to test background
url = 'http://localhost:3001/predict'
symptoms = 'itching,skin_rash'
data = {'symptoms': symptoms}

response = requests.post(url, data=data)
print(response.json())
