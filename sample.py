import pyautogui
import time, random

import random

# Expanded lists with many more options
beginnings = [
    "I love you", "You are", "My heart is", "Forever yours", "You complete me",
    "I cherish you", "You’re my", "My soul feels", "I’m lost in", "You light up",
    "My world is", "I adore", "You make me", "You’re the reason", "I’m grateful for",
    "You’re the one", "I’m addicted to", "You’re my forever", "My love is", "I’m yours",
    "You hold", "My heart beats for", "I’m captivated by", "You’re my sweetest",
    "I’m enchanted by", "You’re my greatest", "You’re my shining",
    "My love burns for", "I’m devoted to", "You’re my perfect", "You’re my endless",
    "You’re my beautiful", "You’re my angel", "I’m madly in love with",
    "You’re my happiness", "My life belongs to", "You’re my dream", "You’re my desire",
    "You’re my forever flame", "I treasure", "You’re my precious", "I’m enchanted with",
    "You’re my star", "You’re my love story", "You’re my destiny", "You’re my heartbeat",
    "You’re my constant", "You’re my guiding light", "You’re my sweetest melody",
    "You’re my favorite", "You’re my endless joy", "You’re the spark in my soul",
    "I’m mesmerized by", "You’re my perfect peace", "You’re my heart’s whisper",
]

middles = [
    "more than words can say", "my everything", "beating for you", "always and forever",
    "in every way", "the sunshine in my life", "my sweetest addiction",
    "the light in my darkness", "my endless joy", "the reason I smile",
    "my dream come true", "the beat of my heart", "my greatest gift",
    "my perfect match", "the love of my life", "my shining star",
    "the beat in my soul", "my sweetest dream", "my heart’s desire",
    "the one I adore", "my reason for living", "my soul’s delight",
    "my endless passion", "the treasure of my heart", "my guiding light",
    "my constant inspiration", "my sweetest melody", "my beautiful muse",
    "the joy of my days", "my eternal flame", "my beloved soulmate",
    "my precious angel", "the love I’ve always dreamed of", "my heart’s true companion",
    "my morning sun", "my gentle breeze", "my night’s star", "the calm in my storm",
    "my heartbeat’s rhythm", "my soul’s song", "the light of my eyes",
    "my forever inspiration", "my endless adventure", "the spark in my life",
]

ends = [
    ".", " and more.", " every single day.", " like no other.", " with all my heart.",
    " beyond measure.", " now and always.", " until the end of time.", " forever and ever.",
    " with every breath I take.", " in this lifetime and the next.", " more than yesterday.",
    " to the moon and back.", " deeper than the ocean.", " sweeter than honey.",
    " stronger than anything.", " in every heartbeat.", " in all my dreams.",
    " with every fiber of my being.", " more than you can imagine.", " and nothing less.",
    " beyond the stars.", " through all eternity.", " more than life itself.",
    " until the stars burn out.", " in every moment we share.", " in all that I am.",
    " as long as I live.", " forever and beyond.", " beyond the horizon.",
    " for all time.", " without end.", " until the sun falls from the sky.",
]

extras = [
    "", " 💖", " 🌹", " ✨", " 💫", " 💕", " ❤️", " 💘", " 🌟", " 💝",
    " forever yours.", " always and forever.", " with all my love.", " endlessly.",
    " with every heartbeat.", " through thick and thin.", " till the end of time.",
    " with you by my side.", " through every season.", " until the stars fade.",
]

def generate_richer_phrases(n=1000):
    phrases = set()
    while len(phrases) < n:
        phrase = f"{random.choice(beginnings)} {random.choice(middles)}{random.choice(ends)}{random.choice(extras)}"
        phrases.add(phrase)
    return list(phrases)


count = 300

# Example usage:
phrases = generate_richer_phrases(count)


print("Click the message box within 5 seconds...")
time.sleep(5)  # Time for you to click the message box

for i, phrase in enumerate(phrases):
    pyautogui.write(phrase)
    pyautogui.press('enter')
    print(f"Sent message {i+1}/{count}")
    time.sleep(0.5)

print("All messages sent!")
