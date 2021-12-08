FROM python:latest
WORKDIR /app
COPY . .
RUN python .