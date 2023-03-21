# syntax=docker/dockerfile:1

FROM python:3.10-alpine

WORKDIR /farmFrame

COPY farmFrame/requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . . 

EXPOSE 5000

CMD ["waitress-serve", "--call", "farmFrame:create_app"]