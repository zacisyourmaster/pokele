import requests
import json
import time

def add_images_to_pokemon_list():
    BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
    file_path = r"\src\data\answerList.json"
    BATCH_SIZE = 50
    DELAY = 0.5  # seconds

    try:
        with open(file_path, "r") as f:
            data = json.load(f)

        print(f"Starting image fetch for {len(data)} Pokémon...")
        for i, p in enumerate(data):
            if "imageUrl" in p and p["imageUrl"]:
                print(
                    f"[{i+1}/{len(data)}] Skipping {p.get('name', p['id'])} (already has image)"
                )
                continue

            print(
                f"[{i+1}/{len(data)}] Fetching image for {p.get('name', p['id'])} (id: {p['id']})..."
            )
            response = requests.get(BASE_URL + str(p["id"]))
            if not response.ok:
                print(f"Error: {response.status_code} for {p.get('name', p['id'])}")
                continue
            poke_data = response.json()
            p["imageUrl"] = poke_data["sprites"]["other"]["official-artwork"][
                "front_default"
            ]

            if (i + 1) % BATCH_SIZE == 0:
                print(f"Saving batch at {i+1} Pokémon...")
                with open("newPokemonList.json", "w") as f:
                    json.dump(data, f, indent=2)
                print(f"Batch {i+1} saved. Pausing for 5 seconds...")
                time.sleep(5)
            else:
                time.sleep(DELAY)

        # Final save
        print("Saving final batch...")
        with open("newPokemonList.json", "w") as f:
            json.dump(data, f, indent=2)
        print("✅ All done!")

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")


def download_pokemon_images():
    import os
    BATCH_SIZE=50
    DELAY = 0.5
    try:
        json_path = r"\src\data\newPokemonList.json"
        img_dir = r"\src\assets\pokemon_imgs"
        os.makedirs(img_dir, exist_ok=True)
        with open(json_path, "r") as f:
            data = json.load(f)
        print(f"Downloading images for {len(data)} Pokémon...")
        for i, p in enumerate(data):
            img_url = p.get("imageUrl")
            poke_id = p.get("id")
            if not img_url or not poke_id:
                print(
                    f"[{i+1}] Skipping {p.get('name', poke_id)}: missing imageUrl or id"
                )
                continue
            img_path = os.path.join(img_dir, f"p_{poke_id}.png")
            if os.path.exists(img_path):
                print(f"[{i+1}] Skipping {img_path}: already exists")
                continue
            try:
                resp = requests.get(img_url, timeout=10)
                if resp.ok:
                    with open(img_path, "wb") as img_file:
                        img_file.write(resp.content)
                    print(f"[{i+1}] Saved {img_path}")
                else:
                    print(f"[{i+1}] Failed to download {img_url}: {resp.status_code}")
                    
                if (i + 1) % BATCH_SIZE == 0:
                    print(f"Saving batch at {i+1} Pokémon...")
                    print(f"Batch {i+1} saved. Pausing for 5 seconds...")
                    time.sleep(5)
                else:
                    time.sleep(DELAY)
            except Exception as e:
                print(f"[{i+1}] Error downloading {img_url}: {e}")
        print("✅ Image download complete.")
    except Exception as e:
        print(f"Error: {e}")


def main():
    # add_images_to_pokemon_list()
    download_pokemon_images()


main()
