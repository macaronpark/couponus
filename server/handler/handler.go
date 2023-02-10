package handler

import (
    "context"
    "log"

    pb "server/proto"
)

type APIServer struct {
    pb.UnimplementedApiServer
}

func (s *APIServer) GetHello(ctx context.Context, in *pb.Request) (*pb.Reply, error) {
    log.Printf("Received: %v", in.GetName())

    return &pb.Reply{Message: "Hello " + in.GetName()}, nil
}