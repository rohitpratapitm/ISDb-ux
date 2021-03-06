FROM nginx

## Remove default nginx index page
RUN rm -rf /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html

COPY dist/isdb-ux /usr/share/nginx/html
EXPOSE 4200 80
CMD ["nginx", "-g", "daemon off;"]