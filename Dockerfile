# Utilisation de l'image officielle Nginx
FROM nginx:latest

# Suppression du fichier de configuration par défaut et ajout du nôtre
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copie du contenu du projet dans le dossier accessible par Nginx
COPY . /usr/share/nginx/html

# Exposition du port 80 pour accéder au serveur
EXPOSE 80

# Lancement de Nginx
CMD ["nginx", "-g", "daemon off;"]
