import requests
import json
import time


def main():
    BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
    file_path = r"...\pokele\src\data\answerList.json"
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


main()
