# 🔐 GitLab × GKE × SOPS でセキュアなCI/CDパイプライン構築

本リポジトリは、GitLab CI/CD・Google Kubernetes Engine (GKE)・SOPS(GCP KMS)を組み合わせて、**Secretを安全に管理しつつNode.js + PostgreSQLのToDoアプリを自動デプロイする構成**を実現しています。

## ✅ 構成概要

```bash
graph TD
  Dev[Developer]
  Dev -->|git push| GitLab[GitLab CI/CD]
  GitLab -->|Build & Deploy| GKE[GKE Cluster]
  GKE -->|Access| App[ToDo App (Node.js)]
  GitLab --> KMS[GCP KMS: SOPS復号]
```

📁 ディレクトリ構成
```bash
├── .gitlab-ci.yml                    # GitLab CI/CD定義
├── k8s/
│   ├── deployment.yaml              # Node.js Deployment定義
│   ├── service.yaml                 # Node.js Service定義
│   ├── postgres-deployment.yaml    # PostgreSQL StatefulSet定義
│   ├── postgres-service.yaml       # PostgreSQL Service定義
│   ├── postgres-init-sql.yaml      # 初期化SQL ConfigMap
│   └── postgres-secret.enc.yaml    # 暗号化されたSecret（SOPS使用）
├── nodejs-app/
│   ├── Dockerfile                  # Node.jsアプリのDocker定義
│   ├── app.js                      # Node.jsアプリ本体
│   └── package.json
```
🛠 前提条件
- GCPアカウント（GKE使用）

- GitLabアカウント

- DockerHubアカウント


🔒 セキュリティに関して
Secretは SOPS + GCP KMSで暗号化 して管理し、リポジトリに平文は一切含めません。

.gitignore で postgres-secret.yaml などの平文ファイルを除外。

GCP_KEY や KUBECONFIG_DATA は GitLabのCI/CD Variablesにてセキュアに管理。

↓以下のページで今回の実装方法を詳しく解説しています↓
https://qiita.com/Elie1729/items/adb87b4ff63eb5d71969

🙌 最後に
このリポジトリを通じて、セキュアなKubernetes運用、CI/CD自動化、GCP活用の実践力を高めていただけたら幸いです。


🧑‍💻 Author: Elie314159265
📅 初回公開: 2025年6月27日
