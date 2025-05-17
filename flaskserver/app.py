import json

string_parse = '''Meeting Details: \n\n Name :Nagi Pragalathan\n\n Event Memberships : {"user":"https://api.calendly.com/users/ce793946-42ce-4735-83d1-b4ce07155fbf","user_email":"arun@xtracut.com","user_name":"Arun Antony"}\n\n Event Guests :

'''

correct_string = [i.strip() for i in string_parse.split("\n\n")]

title = correct_string[0]
Name = correct_string[1]
members = correct_string[2]
get_json_open = members.index("{")
get_json_close = members.index("}")
members = members[get_json_open:get_json_close+1]
members = json.loads(members)


guests = correct_string[3]


print(title)
print(Name)
print(members)
print(guests)