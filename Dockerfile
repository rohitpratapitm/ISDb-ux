FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /app/dist
CMD ["nginx", "-g"]