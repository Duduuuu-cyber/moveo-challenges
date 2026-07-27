output "cluster_endpoint" {
  value       = kind_cluster.default.endpoint
  description = "Kubernetes control plane API endpoint"
}

output "namespace" {
  value       = kubernetes_namespace.moveo.metadata[0].name
  description = "Target namespace created"
}
