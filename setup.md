# Install and Configure Ingress-NGINX on a Bare-Metal Kubernetes Cluster

## Step 1: Install the Bare-Metal Ingress-NGINX

Run the following command to install the official **Ingress-NGINX Controller** designed for bare-metal Kubernetes clusters:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0/deploy/static/provider/baremetal/deploy.yaml
```

---

## Step 2: Bind Ingress-NGINX to Port 80 on the EC2 Worker Node

By default, the bare-metal installation exposes the Ingress controller using a **NodePort** (typically a high-numbered port such as `31234`).

To make the controller listen directly on standard HTTP port **80** (and HTTPS port **443**) of the EC2 worker node, patch the deployment to use `hostNetwork: true`.

Run the following command on your Kubernetes master/control-plane node:

```bash
kubectl patch deployment ingress-nginx-controller \
  -n ingress-nginx \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/template/spec/hostNetwork", "value": true}]'
```

### What this does

Setting `hostNetwork: true` allows the Ingress controller pod to:

* Bypass the Kubernetes pod networking layer for exposed ports.
* Bind directly to ports **80** and **443** on the underlying EC2 worker node.
* Accept HTTP/HTTPS traffic directly from the node's network interface.

---

## Step 3: Verify the Ingress Controller is Running

Wait for a minute or two after applying the patch, then check the status of the Ingress controller pods:

```bash
kubectl get pods -n ingress-nginx
```

Expected output:

```text
NAME                                        READY   STATUS    RESTARTS   AGE
ingress-nginx-controller-xxxxxxxxxx-xxxxx   1/1     Running   0          XXm
```

Ensure the pod status is **Running**.

---

## Step 4: Configure AWS Security Group Rules

Even though the Ingress controller is listening on port **80**, AWS Security Groups will still block incoming traffic unless the appropriate inbound rule is configured.

### Steps

1. Open the AWS Management Console.
2. Navigate to **EC2 → Instances**.
3. Select your **Worker Node** instance.
4. Open the attached **Security Group**.
5. Edit **Inbound Rules**.
6. Add the following rule:

| Type | Protocol | Port Range | Source    |
| ---- | -------- | ---------- | --------- |
| HTTP | TCP      | 80         | 0.0.0.0/0 |

> **Note:** For production environments, consider restricting the source IP range instead of allowing access from anywhere (`0.0.0.0/0`).

---

## Verification

After completing the above steps:

1. Confirm the Ingress controller pod is running.
2. Verify port 80 is open in the AWS Security Group.
3. Access the EC2 worker node's public IP address from a browser:

```text
http://<worker-node-public-ip>
```

If an Ingress resource is configured correctly, traffic should be routed to the appropriate Kubernetes service.

