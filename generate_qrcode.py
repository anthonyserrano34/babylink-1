import qrcode

ip = "192.168.1.42"  # à adapter

img = qrcode.make(f"http://{ip}:5000")
img.save("qrcode.png")
print("QR code généré.")