import random

def assign_features(users, features):
    # Shuffle the features list
    random.shuffle(features)
    
    while len(features) > 7:
        features.pop()

    user_features = {}
    for user in users:
        user_features[user] = features.pop(0) if features else None

  
    for user in user_features:
        if not user_features[user] and features:
            user_features[user] = features.pop(0)

    return user_features


users = ["Abdela", "Esubalew", "Melkamu", "Lidu", "Azeb", "Bereket", "Hayat"]
features = ["Uploading Resource", "Searching", "Interaction (Like, unlike, follow, unfollow)",
            "Commenting on resources", "Downloading files", "Exploring Github repositories",
            "Analysis", "Explore resource through resource feed", "Viewing User profiles"]


user_features = assign_features(users, features)


for user, feature in user_features.items():
    print(f"{user}: {feature}")
