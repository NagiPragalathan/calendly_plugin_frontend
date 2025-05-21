import requests
import json

url = "https://calendly-server-sigma.vercel.app/process-qa"

qa_data = [
    {
        "question": "Please share anything that will help prepare for our meeting.",
        "answer": "sample response",
        "position": 0
    },
    {
        "question": "What are the main agenda items?",
        "answer": "Budget review, project updates, next steps",
        "position": 1
    }
]

payload = {
    "qa_list": qa_data
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(payload), headers=headers)

if response.ok:
    print("Success!")
    print(response.json()['data']['formatted_qa'])
else:
    print("Failed!")
    print(response.text)
