output "frontend_alb_dns_name" {
  description = "DNS Name del Application Load Balancer del frontend"
  value       = aws_lb.frontend.dns_name
}

output "frontend_alb_url" {
  description = "URL completa del ALB del frontend (con http://)"
  value       = "http://${aws_lb.frontend.dns_name}/"
}

output "frontend_ecs_cluster_name" {
  description = "Nombre del ECS Cluster del frontend"
  value       = aws_ecs_cluster.frontend.name
}

output "frontend_ecs_service_name" {
  description = "Nombre del ECS Service del frontend"
  value       = aws_ecs_service.frontend.name
}

output "frontend_ecs_task_definition_arn" {
  description = "ARN de la task definition activa del frontend"
  value       = aws_ecs_task_definition.frontend.arn
}
