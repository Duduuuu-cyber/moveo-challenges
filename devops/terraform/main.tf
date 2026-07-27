terraform {
  required_version = ">= 1.5.0"
  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "0.4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.26"
    }
  }
}

provider "kind" {}

resource "kind_cluster" "default" {
  name           = var.cluster_name
  wait_for_ready = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"
      extra_port_mappings {
        container_port = 30080
        host_port      = 8080
      }
    }
  }
}

provider "kubernetes" {
  host                   = kind_cluster.default.endpoint
  client_certificate     = kind_cluster.default.client_certificate
  client_key             = kind_cluster.default.client_key
  cluster_ca_certificate = kind_cluster.default.cluster_ca_certificate
}

resource "kubernetes_namespace" "moveo" {
  metadata {
    name = var.namespace
  }
}
