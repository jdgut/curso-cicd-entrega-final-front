output "frontend_url" {
  description = "URL pública del frontend."
  value       = "http://${aws_lb.frontend.dns_name}"
}

output "alb_dns_name" {
  description = "DNS del ALB del frontend (útil para configurar DNS externo)."
  value       = aws_lb.frontend.dns_name
}

output "ecs_cluster_name" {
  description = "Nombre del ECS cluster del frontend."
  value       = aws_ecs_cluster.frontend.name
}

output "ecs_service_name" {
  description = "Nombre del ECS service del frontend."
  value       = aws_ecs_service.frontend.name
}

output "cloudwatch_log_group" {
  description = "Nombre del log group en CloudWatch."
  value       = aws_cloudwatch_log_group.frontend_ecs.name
}
