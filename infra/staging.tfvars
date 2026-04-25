environment_name = "staging"
aws_region       = "us-east-1"
docker_image_uri = "juandagu/curso-cicd-entrega-final-front-front:dev"
lab_role_arn     = "arn:aws:iam::855240645828:role/LabRole"

vpc_id     = "vpc-03e2912aa8e4eebbd"
subnet_ids = ["subnet-001f8096b4db793f9", "subnet-069261d90359cbaba"]

container_port    = 3000
task_cpu          = 256
task_memory       = 512
desired_count     = 1
assign_public_ip  = true
health_check_path = "/"

backend_alb_dns = "movilidad-backend-staging-alb-1202113963.us-east-1.elb.amazonaws.com"