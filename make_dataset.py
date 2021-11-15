import json
import random


def generate_dummy_data():
    weapons = ["Assault Rİfle","Skye’s Assault Rifle","Heavy Assault Rifle","Meowscles’ Peow Peow Rifle","Burst Assault Rifle","Ocean’s Burst Assault Rifle","Infantry Rifle",	
    "Tactical Assault Rifle", "Scoped Assault Rifle", "Drum Gun", "Midas’ Drum Gun"	"Jules’ Drum Gun","Shadow Midas’ Drum Gun","Stark Industries Energy Rifle",
    "Pump Shotgun","Tactical Shotgun","Lever Action Shotgun","Heavy Shotgun","Drum Shotgun","Combat Shotgun","Double Barrel Shotgun","Submachine Gun","Compact SMG",
    "Suppressed Submachine Gun","Rapid Fire SMG","Machine Pistol","Burst SMG","Tactical Submachine Gun","Pistol","Suppressed Pistol","Shadow Tracker","Hand Cannon",
    "Dual Pistols","Deadpool’s Hand Cannons","Six Shooter","Dual Supressed Pistols","Revolver",	"Scoped Revolver","Common Bolt-Action Sniper Rifle","Hunting Rifle",
    "Suppressed Sniper Rifle","Heavy Sniper Rifle","Boom Sniper Rifle","Semi-Auto Sniper Rifle","Storm Scout Sniper Rifle","Automatic Sniper Rifle","Lever Action Rifle",
    "Amban Sniper Rifle","Rocket Launcher","Grenade Launcher","Snowball Launcher","Egg Launcher","Kit’s Shockwave Launcher","Guided Missile","Quad Launcher",
    "Proximity Grenade Launcher","Light Machine Gun","Minigun","Brutus's Minigun"]

    fortnite_metadata = []

    fortnite_characters = \
        ["Banshee","Carlos","Emmy","Hector","Jonesy","Mansu","Ramirez","Renegade","Rio","Spitfire","Wildcat","Anarchy Agent","Armadillo",
        "Assault Trooper","Aura","B.R.U.T.E Gunner","B.R.U.T.E Navigator", "Banner Trooper","Birdie","Bolt","Bracer","Brainiac","Branded Brawler",
        "Branded Brigadier","Bullseye","Bunnymoon","Cabbie","Cole","Commando","Crimson Scout","Crystal","Desert Dominator","Devastator","Dominator",
        "Gage","Garrison","Grill Sergeant","Grit","Guild","Hard Charger","Hayseed","Highrise Assault Trooper","Jungle Scout","King Flamingo","Knockout",
        "Liteshow","Lt. Logo","Manic","Marked Marauder","Munitions Major","Nitelite","Nog Ops","Pastel","Patch Patroller","Pathfinder","Plastic Patroller",
        "Prickly Patroller","Ranger","Razor","Recon Ranger","Red Jade","Red-Nosed Ranger","Relay","Scarlet Defender","Scorpion","Scout","Sgt. Green Clover",
        "Sgt. Sigil","Signature Sniper","Sizzle Sgt.","Slingshot","Snakepit","Star-Spangled Ranger","Star-Spangled Trooper","Striped Soldier","Sunflower",
        "Sureshot","Swamp Stalker","Symbol Stalwart","Tactics Officer","Tinseltoes","Tower Recon Specialist","Toy Trooper","Tracker","Trooper","Verge",
        "Vice","Whiplash","Whistle Warrior","World Warrior","Absolute Zero","Aerial Assault Trooper","Aerial Threat","Aeronaut","Airheart","Arctic Assassin",
        "Asmodeus","Axiom","Bachii","Backbone","Bandolette","Beach Bomber","Bendie","Bigfoot","Biz","Blue Squire","Blue Team Leader","Bravo Leader","Brawler",
        "Breakpoint","Brilliant Bomber","Brilliant Striker","Brite Blaster","Brite Bomber","Bronto","Bubble Bomber","Bundles","Burial Threat","Bushranger","Callisto",
        "Carbon Commando","Catastrophe","Chopper","Chromium","Cipher","Circuit Breaker","Clinical Crosser","Cloudbreaker","Codename E.L.F.","Crypt Crosser",
        "Cryptic","Danger Zone","Dare","Dazzle","Decaying Dribbler","Demogorgon","Depth Dealer","Desperado","Diecast","Disco Diva","Doublecross","Dream","Dynamic Dribbler",
        "Dynamo","Facet","Fastball","Fatal Finisher","Fennix","Finesse Finisher","Firewalker"]

    for x in fortnite_characters:
        name = x
        age = random.randint(18, 50)
        weapon = weapons[random.randint(0, len(weapons) - 1)]
        victories = random.randint(1, 120)
        fortnite_metadata.append({"name": name, "age": age, "weapon": weapon, "victories": victories, "rank": []})
    return fortnite_metadata


fortnite_roster = generate_dummy_data()
fout = open("fortnite.json", "w")
fout.write(json.dumps(fortnite_roster))
fout.close()
