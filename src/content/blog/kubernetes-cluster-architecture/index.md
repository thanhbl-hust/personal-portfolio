---
title: Kiến trúc của một Kubernetes Cluster
description: Control plane và các worker node phối hợp với nhau như thế nào trong một Kubernetes cluster.
pubDate: 2026-10-27
tags: [kubernetes, architecture]
---

> [!NOTE]
> Bài viết đang được hoàn thiện.

## Control Plane

### api-server


<mark>api-server</mark> là cổng giao tiếp duy nhất của cụm Kubernetes, thành phần duy nhất đọc / ghi trạng thái vào **etcd**. 

### etcd

<mark>etcd</mark> là một cơ sở dữ liệu dạng **key - value**, lưu trữ toàn bộ cấu hình được khai báo (desired) và thực tế của cụm Kubernetes. Chỉ có **api-server** là thành phần duy nhất trong cụm được giao tiếp trực tiếp với etcd, các thành phần khác đều phải giao tiếp thông qua api-server.

### scheduler

<mark>scheduler</mark> là một controller trong Kubernetes giúp cho việc phân chia các Pod mới được tạo ra về các Node phù hợp dựa trên cấu hình của chúng. 

### controller-manager

<mark>controller-manager</mark> là thành phần của **Control Plane**, chạy tập hợp các controller của Kubernetes. Chúng liên tục quan sát hệ thống thông qua **api-server** và đưa các resource về đúng như trạng thái đã được khai báo (desired).

## Worker Node

### kubelet

<mark>kubelet</mark> hoạt động như một agent trên tất cả các Node, chạy dưới dạng **systemd**. 

### kube-proxy

<mark>kube-proxy</mark> là một component chạy trên tất cả các Node, biến khái niệm <mark>Service</mark> thành các rule mạng thật node, traffic gửi tới Service sẽ đến được các Pod phía sau.

### container runtime
<mark>container runtime</mark> là thành phần chịu trách nhiệm chạy và quản lý vòng đời container trong Kubernetes.