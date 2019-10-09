FROM httpd:latest
LABEL Name=amigo Version=0.0.0
COPY dist/amigo /usr/local/apache2/htdocs

EXPOSE 80 443
