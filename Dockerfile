FROM python:alpine
WORKDIR /app
RUN pip install BeautifulSoup4
RUN pip install requests
COPY . .
EXPOSE "8888"
CMD ["python", "."]
