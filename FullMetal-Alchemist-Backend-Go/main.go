package main

import server "FullMetal-Alchemist-Backend-Go/server"

func main() {
	Server := server.NewServer()
	server.InitRedisTaskQueue()
	server.StartTaskProcessing(Server)
	Server.StartServer()
}
