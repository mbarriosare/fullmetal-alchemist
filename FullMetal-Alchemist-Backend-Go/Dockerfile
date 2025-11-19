FROM golang:1.25.4 AS base

WORKDIR /build

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o fullmetal-alchemist-backend-go.o

EXPOSE 8000

CMD ["/build/fullmetal-alchemist-backend-go.o"]