# syntax=docker/dockerfile:1

FROM python:3.10-alpine

WORKDIR /farmframe

COPY farmFrame/requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . . 

EXPOSE 8080

CMD ["waitress-serve", "farmFrame:app"]