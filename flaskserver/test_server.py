import requests
import json
from datetime import datetime
from colorama import init, Fore, Style
import time

# Initialize colorama
init()

def print_header(text):
    print(f"\n{Fore.CYAN}{'=' * 60}")
    print(f"{Fore.CYAN}{text.center(60)}")
    print(f"{Fore.CYAN}{'=' * 60}{Style.RESET_ALL}")

def print_section(text):
    print(f"\n{Fore.YELLOW}{'-' * 60}")
    print(f"{Fore.YELLOW}{text.center(60)}")
    print(f"{Fore.YELLOW}{'-' * 60}{Style.RESET_ALL}")

def print_success(text):
    print(f"{Fore.GREEN}✓ {text}{Style.RESET_ALL}")

def print_error(text):
    print(f"{Fore.RED}✗ {text}{Style.RESET_ALL}")

def print_info(text):
    print(f"{Fore.BLUE}ℹ {text}{Style.RESET_ALL}")

def print_key_value(key, value, indent=0):
    indent_str = "  " * indent
    print(f"{indent_str}{Fore.WHITE}{key}: {Fore.GREEN}{value}{Style.RESET_ALL}")

def test_meeting_processing():
    print_header("Meeting Processing Server Test")
    print_info(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Server URL
    url = "https://calendly-server-sigma.vercel.app/process-meeting"
    
    # Test data
    test_data = {
        "meeting_string": '''Meeting Details: \n\n Name :Nagi Pragalathan\n\n Event Memberships : {"user":"https://api.calendly.com/users/ce793946-42ce-4735-83d1-b4ce07155fbf","user_email":"arun@xtracut.com","user_name":"Arun Antony"}\n\n Event Guests :{"created_at":"2025-05-19T05:59:26.187199Z","email":"asdf@gmail.com","updated_at":"2025-05-19T05:59:26.187199Z"},{"created_at":"2025-05-19T05:59:26.209940Z","email":"qwer@gmail.com","updated_at":"2025-05-19T05:59:26.209940Z"}'''
    }
    
    try:
        print_section("Sending Request")
        print_info(f"Endpoint: {url}")
        print_info("Request Method: POST")
        
        start_time = time.time()
        response = requests.post(url, json=test_data)
        end_time = time.time()
        
        print_section("Response Details")
        print_info(f"Status Code: {response.status_code}")
        print_info(f"Response Time: {(end_time - start_time):.2f} seconds")
        
        # Parse the JSON response
        result = response.json()
        
        if result.get('success'):
            print_success("Request Successful!")
            
            print_section("Meeting Information")
            print(f"{Fore.WHITE}{result.get('data', {}).get('message', 'No message received')}{Style.RESET_ALL}")
            
            print_section("Metadata")
            metadata = result.get('metadata', {})
            print(f"{Fore.WHITE}Processing Time: {metadata.get('processing_time', 'N/A')}")
            print(f"Version: {metadata.get('version', 'N/A')}")
            print(f"Format: {metadata.get('format', 'N/A')}{Style.RESET_ALL}")
        else:
            print_error("Request Failed!")
            print(f"{Fore.RED}Error: {result.get('error', 'Unknown error')}{Style.RESET_ALL}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print_section("Error Details")
        print_error(f"Connection Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_meeting_processing() 