import qrcode

# URL publique ngrok
url = "https://77d9-2a02-8440-f50d-2781-119a-5be5-eb4c-abe8.ngrok-free.app"

# Génération du QR
img = qrcode.make(url)

# Sauvegarde dans un fichier distinct
img.save("qrcode_ngrok.png")

print(f"QR code généré pour l'URL ngrok : {url}")
