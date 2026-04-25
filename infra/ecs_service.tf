locals {
  base_frontend_environment = {
    APP_ENV         = var.environment_name
    APP_HOST        = "0.0.0.0"
    APP_PORT        = tostring(var.container_port)
    BACKEND_API_URL = "http://${var.backend_alb_dns}"
  }

  effective_frontend_environment = merge(local.base_frontend_environment, var.app_extra_environment)
}

# ── CloudWatch Log Group ─────────────────────────────────────
resource "aws_cloudwatch_log_group" "frontend_ecs" {
  name              = "/ecs/${local.resource_prefix}"
  retention_in_days = 7

  tags = local.common_tags
}

# ── ECS Cluster ──────────────────────────────────────────────
resource "aws_ecs_cluster" "frontend" {
  name = "${local.resource_prefix}-cluster"

  tags = local.common_tags
}

# ── ECS Task Definition ──────────────────────────────────────
resource "aws_ecs_task_definition" "frontend" {
  family                   = "${local.resource_prefix}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = tostring(var.task_cpu)
  memory                   = tostring(var.task_memory)
  task_role_arn            = var.lab_role_arn
  execution_role_arn       = var.lab_role_arn

  container_definitions = jsonencode([
    {
      name  = local.container_name
      image = var.docker_image_uri

      essential = true

      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]

      environment = [
        for name, value in local.effective_frontend_environment : {
          name  = name
          value = value
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.frontend_ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = local.common_tags
}

# ── ECS Service ──────────────────────────────────────────────
resource "aws_ecs_service" "frontend" {
  name            = "${local.resource_prefix}-service"
  cluster         = aws_ecs_cluster.frontend.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.frontend_ecs.id]
    assign_public_ip = var.assign_public_ip
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = local.container_name
    container_port   = var.container_port
  }

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  lifecycle {
    ignore_changes = [desired_count]
  }

  depends_on = [aws_lb_listener.frontend_http]

  tags = local.common_tags
}
