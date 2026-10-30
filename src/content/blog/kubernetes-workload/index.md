---
title: Kubernetes Workload
description: Workloads trong Kubernetes.
pubDate: 2026-10-27
tags: [kubernetes]
---

## Pod

<mark>Pod</mark> là đơn vị triển khai nhỏ nhất mà bạn có thể tạo ra và quản lý trong Kubernetes.

Một Pod có thể là một nhóm bao gồm một hoặc nhiều **container**, các container này chia sẻ chung tài nguyên về mạng (network) và lưu trữ (storage). 

### Static Pod


<mark>Static Pod</mark> là các Pod được tạo ra và quản lý bằng kubelet tại mỗi Node thông qua các file manifest (staticPodPath - cấu hình của kubelet, mặc định ở **/etc/kubernetes/manifests/**), chứ không phải thông qua api-server. 

Ta vẫn quan sát được các Pod này thông qua **kubectl** là vì kubelet tạo ra các **Mirror Pod**,  nhưng chỉ để quan sát. Ta không thay đổi được các Pod này thông qua API, phải thông qua file manifest của chúng và kubelet sẽ tự động cập nhật. 

> [!NOTE]
> Trường hợp phổ biến nhất là kubeadm dùng Static Pod để chạy các thành phần của Control Plane (api-server, etcd, controller manager & scheduler).

Tên của Static Pod sẽ có hậu tố là tên Node mà nó nằm trên đó. Ví dụ, pod **api-server** nằm trên node **control-plane** sẽ có tên là **api-server-control-plane**.

### Sidecar, Init, Ephemeral & Pause Container

Trong mỗi Pod sẽ có một hoặc nhiều container, và mỗi loại container sẽ có các công dụng khác nhau.

1. **Sidecar Container**

2. **Init Container**

3. **Ephemeral Container**

4. **Pause Container**

### Probes trong Kubernetes

1. **Startup Probes**: Startup Probes là cơ chế giúp kubelet xác định xem Pod đã khởi động đúng cách hay chưa. Startup Probes sẽ được thực hiện đầu tiên nếu được khai báo, Liveness và Readiness sẽ không chạy nếu Startup chưa thành công. Nếu thành công, Startup không chạy nữa và các cơ chế còn lại bắt đầu chạy. Nếu Fail, kubelet sẽ restart Container dựa theo restartPolicy.

2. **Liveness Probes**: Liveness Probes giúp Kubernetes xác định một Pod có đang hoạt động đúng cách hay không và kubelet sẽ làm gì với nó (restart hoặc trả về **Fail** dựa theo restartPolicy).

3. **Readiness Probes**: Readiness Probes là cơ chế giúp Kubernetes xác định xem Pod đã sẵn sàng để nhận traffic hay chưa (đưa vào hoặc xóa khỏi Endpoint của **Service**).


## ReplicaSet & Deployment

<mark>ReplicaSet</mark> controller là một controller trong Kubernetes giúp đảm bảo luôn có một số lượng Pod giống nhau đang chạy tại một thời điểm.

<mark>Deployment</mark> controller là một resource ở lớp cao hơn so với ReplicaSet. Nó không quản lý trực tiếp các Pod mà quản lý các ReplicaSet. Mỗi lần Pod template thay đổi, Deployment sẽ tạo một ReplicaSet mới và tạo các Pod mới theo các cơ chế như **Rolling Update** hay **ReCreate**.

Deployment thường được sử dụng để quản lý các ứng dụng **stateless**.

- **ReCreate**: xóa tất cả các Pod với template cũ rồi sau đó mới tạo Pod mới.

- **RollingUpdate**: thực hiện đồng thời việc xóa các Pod cũ và tạo các Pod mới.

    - *maxSurge*: được phép có dư bao nhiêu Pod so với replica.
    - *maxUnavaible*: được phép tối đa bao nhiêu Pod thiếu so với replica.

Đơn vị của maxSurge và maxUnavaiable đều có thể là **Pod** hoặc **%**.

## StatefulSet

<mark>StatefulSet</mark> controller cũng là một resource để quản lý các Pod, nhưng khác với Deployment, nó quản lý những Pod cần lưu trạng thái, hay **Stateful** (database, kafka, redis..).

Các Pod được StatefulSet quản lý sẽ có những đặc điểm sau:
- Pod sẽ được tạo, xóa và đặt tên theo đúng trình tự (redis-0, redis-1, ..).
- Mỗi Pod sẽ có PVC riêng.

> [!NOTE]
> BEST PRACTICE: Thường sẽ là chúng ta sẽ quản lý các app Stateless trong Kubernetes, còn những app Stateful chúng ta sẽ sử dụng managed-service (RDS, MSK, ..). Tùy từng trường hợp (chi phí, kinh nghiệm của nhân sự) mà chúng ta có thể sử dụng phương án phù hợp.

## DaemonSet

<mark>DaemonSet</mark> controller là một resource để đảm bảo rằng tất cả các Node (hoặc một tập hợp các Node thỏa mãn điều kiện nào đó) đều có một Pod chạy trên Node đó.

> [!NOTE]
> Các use case dùng DaemonSet có thể như Logging, Monitoring, CNI, CSI...

## Job & Cronjob