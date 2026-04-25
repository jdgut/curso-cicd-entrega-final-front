locals {
  resource_prefix = "frontend-${var.environment_name}"
  container_name  = "${local.resource_prefix}-container"

  common_tags = {
    Environment = var.environment_name
    Service     = "frontend"
    ManagedBy   = "terraform"
  }
}
