# Documentación de las variables requeridas por el backend de estado remoto.
# Los valores reales van en backend-staging.hcl / backend-production.hcl
# (esos archivos NO se commitean al repositorio).
#
# bucket         = "nombre-del-bucket-s3-para-tfstate"
# key            = "frontend/<env>/terraform.tfstate"
# region         = "us-east-1"
# encrypt        = true
# dynamodb_table = "nombre-tabla-para-locking"   # opcional
