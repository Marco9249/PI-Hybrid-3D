<div align="center">

# 🌌 PI-Hybrid 3D Viz

### Physics-Informed Solar Forecasting Intelligence

---

## 🚀 **SYSTEM CONTROL CENTER** 🚀

<a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/">
  <img src="https://img.shields.io/badge/LAUNCH_SYSTEM-LOGIN_NOW-00f2ff?style=for-the-badge&logo=google-chrome&logoColor=black&labelColor=101010" height="60">
</a>

<br>

<a href="https://www.techrxiv.org//1376729">
  <img src="https://img.shields.io/badge/SCIENTIFIC_PAPER-READ_ON_TECHRXIV-0056D2?style=for-the-badge&logo=googlescholar&logoColor=white" height="40">
</a>
&nbsp; &nbsp;
<a href="https://www.linkedin.com/in/mohammed924">
  <img src="https://img.shields.io/badge/LINKEDIN-CONNECT_WITH_ME-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" height="40">
</a>

</div>

---

## 📖 **Overview**

This project is a high-fidelity **interactive 3D visualization** of the **Physics-Informed Hybrid CNN-BiLSTM** model proposed in our accompanying research paper. It allows users to dissect the internal mechanisms of solar irradiance forecasting, bridging the gap between "Black Box" Deep Learning and atmospheric physics.

---

## 🧠 **Model Architecture (Sequential Hybrid)**

The system visualizes a sequential deep learning pipeline designed to capture both local cloud dynamics and long-term solar trends:

### 1. **Physics-Informed Input Layer (Tensor Shape: 24×15)**

Unlike standard data-driven models, our input tensor incorporates **15 distinct features** grounded in atmospheric physics:

* **Target:** Global Horizontal Irradiance (GHI).
* **Physics-Derived:** Clear Sky GHI, Clearness Index ($K_t$), Volatility Index.
* **Solar Components:** Direct Normal (DNI) & Diffuse Horizontal (DHI).
* **Meteorological:** Temperature, Humidity, Dew Point, Pressure.
* **Cyclic Encoding:** Sine/Cosine transformations of Hour and Day angles to enforce temporal continuity.

### 2. **Spatial Feature Extraction (1D-CNN)**

* **Component:** 1D-Convolutional Layer (64 Filters, Kernel Size 3).
* **Function:** Slides across the temporal sequence to detect **local gradients** and rapid fluctuations (e.g., sudden cloud cover) that standard RNNs might miss.

### 3. **Temporal Memory Core (BiLSTM)**

* **Component:** Bidirectional Long Short-Term Memory (210 Units).
* **Function:** Processes the CNN-convolved features in both **forward** (past-to-future) and **backward** (future-context) directions, ensuring the model understands the causality of solar patterns.

### 4. **Regression Head (Dense Optimized)**

* **Final Stage:** A fully connected dense layer maps the high-dimensional hidden states to a continuous output (predicted GHI), optimized via **Bayesian Hyperparameter Tuning** to minimize RMSE.

---

## ⚡ **Visualization Features**

* **Interactive Neural Topology:** Walk through the layers in 3D space.
* **Live Data Flow:** Watch how tensors (matrices of numbers) flow and transform from Layer 0 to Layer 10.
* **Loss Landscape:** A visualized 3D terrain representing the Gradient Descent process in the final regression layer.

---

<div align="center">

### 🔬 **NEURAL LAYER DIRECT ACCESS**

| | | |
|:---:|:---:|:---:|
| <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer0-input.html"><img src="https://img.shields.io/badge/LAYER_0-INPUT_PHYSICS-blue?style=for-the-badge"></a> | <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer1-conv1d.html"><img src="https://img.shields.io/badge/LAYER_1-SPATIAL_CNN-blueviolet?style=for-the-badge"></a> | <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer2-batchnorm.html"><img src="https://img.shields.io/badge/LAYER_2-BATCHNORM-success?style=for-the-badge"></a> |
| <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer3-relu.html"><img src="https://img.shields.io/badge/LAYER_3-RELU_ACT-orange?style=for-the-badge"></a> | <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer4-dropout1.html"><img src="https://img.shields.io/badge/LAYER_4-DROPOUT-red?style=for-the-badge"></a> | **<a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer5-bilstm.html"><img src="https://img.shields.io/badge/LAYER_5-TEMPORAL_BILSTM-FFD700?style=for-the-badge&logo=bitcoin&logoColor=black"></a>** |
| <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer6-dropout2.html"><img src="https://img.shields.io/badge/LAYER_6-DROPOUT-red?style=for-the-badge"></a> | <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer7-dense.html"><img src="https://img.shields.io/badge/LAYER_7-DENSE_FC-success?style=for-the-badge"></a> | <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer8-relu2.html"><img src="https://img.shields.io/badge/LAYER_8-RELU-orange?style=for-the-badge"></a> |
| <a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer9-output.html"><img src="https://img.shields.io/badge/LAYER_9-OUTPUT_GHI-00f2ff?style=for-the-badge"></a> | **<a href="https://Marco9249.github.io/PI-Hybrid-3D-Viz/layers/layer10-regression.html"><img src="https://img.shields.io/badge/LAYER_10-LOSS_LANDSCAPE-ff0000?style=for-the-badge"></a>** | |

<br>

![Status](https://img.shields.io/badge/Status-Research_Active-success?style=flat-square&logo=github) ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>
