variable "cluster_name" {
  description = "Name of the local Kind cluster"
  type        = string
  default     = "moveo-devops-cluster"
}

variable "namespace" {
  description = "Target Kubernetes namespace"
  type        = string
  default     = "moveo-ai"
}
