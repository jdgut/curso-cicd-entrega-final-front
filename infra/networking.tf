# El frontend vive en la misma VPC que el backend y la database.
# Su tráfico de salida está restringido: solo puede alcanzar
# el puerto del backend dentro de la VPC.

data "aws_vpc" "shared" {
  id = var.vpc_id
}

# ── Security Group: ALB del frontend ────────────────────────
resource "aws_security_group" "frontend_alb" {
  name        = "${local.resource_prefix}-alb-sg"
  description = "Permite trafico HTTP al ALB del frontend"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP desde internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.alb_ingress_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

# ── Security Group: tareas ECS del frontend ──────────────────
resource "aws_security_group" "frontend_ecs" {
  name        = "${local.resource_prefix}-ecs-sg"
  description = "Permite trafico desde el ALB hacia las tareas ECS del frontend"
  vpc_id      = var.vpc_id

  # Entrada: solo desde el ALB del frontend
  ingress {
    description     = "Desde ALB al puerto del contenedor"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend_alb.id]
  }

  # Salida: solo hacia el puerto 80 del backend dentro de la VPC
  # Esto evita que el frontend pueda alcanzar otros servicios o internet directamente
  egress {
    description = "Hacia el ALB del backend (HTTP)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

# ── Application Load Balancer ────────────────────────────────
resource "aws_lb" "frontend" {
  name               = "${local.resource_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.frontend_alb.id]
  subnets            = var.subnet_ids

  tags = local.common_tags
}

resource "aws_lb_target_group" "frontend" {
  name        = "tg-${local.resource_prefix}"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = var.health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 15
    timeout             = 5
    matcher             = "200"
  }

  lifecycle {
      create_before_destroy = true
    }

  tags = local.common_tags
}

resource "aws_lb_listener" "frontend_http" {
  load_balancer_arn = aws_lb.frontend.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}
