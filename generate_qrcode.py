import qrcode
url = "http://192.168.1.42:5000"  # Remplacer par l’IP réelle du Pi
img = qrcode.make(url)
img.save("qrcode.png")
print("QR Code généré : qrcode.png")