import qrcode

# Remplace l'URL par celle de ton site
url = "https://marwan-merdji-portfolio.netlify.app/"

# Génération du QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

# Création et sauvegarde de l'image
img = qr.make_image(fill="bluenavy", back_color="white")
img.save("qrcode.png")

print("QR Code généré et enregistré sous 'qrcode.png'")