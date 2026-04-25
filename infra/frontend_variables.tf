variable "app_name" {
  description = "Nombre base de la aplicacion frontend para recursos ECS/ALB."
  type        = string
  default     = "movilidad-frontend"
}

variable "container_port" {
  description = "Puerto del contenedor nginx."
  type        = number
  default     = 80
}

variable "task_cpu" {
  description = "CPU para la tarea Fargate (256, 512, 1024, etc.)."
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Memoria (MiB) para la tarea Fargate (512, 1024, etc.)."
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Numero deseado de tareas ECS para el frontend."
  type        = number
  default     = 1
}

variable "health_check_path" {
  description = "Ruta del health check expuesta por nginx (SPA sirve index en /)."
  type        = string
  default     = "/"
}

variable "assign_public_ip" {
  description = "Asigna IP publica a tareas Fargate (util en subredes publicas sin NAT)."
  type        = bool
  default     = true
}

variable "alb_ingress_cidr_blocks" {
  description = "CIDRs permitidos hacia el ALB en HTTP (80)."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}
