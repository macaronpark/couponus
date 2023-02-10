package main

import (
		"fmt"
		"flag"
    "log"
    "net"

    "google.golang.org/grpc"
		pb "server/proto"
    handler "server/handler"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

func main() {
    lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
    if err != nil {
        log.Fatalf("failed to listen %v", err)
    }

    s := grpc.NewServer()
		pb.RegisterApiServer(s, &handler.APIServer{})

    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}