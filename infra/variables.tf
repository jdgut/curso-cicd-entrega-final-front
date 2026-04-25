variable "environment_name" {
  description = "Nombre del entorno (staging, production). Usado para nombrar recursos."
  type        = string
  validation {
    condition     = contains(["staging", "production"], var.environment_name)
    error_message = "El entorno debe ser 'staging' o 'production'."
  }
}

variable "docker_image_uri" {
  description = "URI completo de la imagen Docker a desplegar (ej: usuario/repo:tag)."
  type        = string
}

variable "lab_role_arn" {
  description = "ARN completo del rol IAM 'LabRole' existente en la cuenta."
  type        = string
}

variable "vpc_id" {
  description = "ID de la VPC compartida donde se despliegan todos los servicios."
  type        = string
}

variable "subnet_ids" {
  description = "Lista de al menos DOS IDs de subredes de la VPC en diferentes AZs."
  type        = list(string)
}

variable "aws_region" {
  description = "Región de AWS a usar."
  type        = string
  default     = "us-east-1"
}

variable "container_port" {
  description = "Puerto en el que escucha el contenedor Next.js/Nuxt."
  type        = number
  default     = 80
}

variable "task_cpu" {
  description = "CPU units para la tarea ECS (256, 512, 1024…)."
  type        = number
  default     = 512
}

variable "task_memory" {
  description = "Memoria en MiB para la tarea ECS."
  type        = number
  default     = 1024
}

variable "desired_count" {
  description = "Número de tareas ECS a mantener corriendo."
  type        = number
  default     = 1
}

variable "assign_public_ip" {
  description = "Asignar IP pública a las tareas ECS (necesario si las subnets son públicas)."
  type        = bool
  default     = true
}

variable "health_check_path" {
  description = "Path HTTP que el ALB usa para el health check del contenedor."
  type        = string
  default     = "/"
}

variable "alb_ingress_cidr_blocks" {
  description = "CIDRs que pueden acceder al ALB del frontend (por defecto internet abierto)."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# ── Variables de aplicación ──────────────────────────────────
variable "backend_alb_dns" {
  description = "DNS del ALB del backend. El frontend lo usa para comunicarse con la API."
  type        = string
}

variable "app_extra_environment" {
  description = "Variables de entorno adicionales a inyectar en el contenedor."
  type        = map(string)
  default     = {}
}
