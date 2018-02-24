FROM nginx:1.13.9-alpine
#remove default configuration
RUN rm /etc/nginx/conf.d/default.conf
#put load-balancing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf