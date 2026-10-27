# FALCON: A Temporal Graph Framework for Failure Propagation Analysis and User-Perceived Availability Assessment from Mobile App Reviews

## About FALCON
FALCON is a temporal graph-based framework designed to model, analyze, and detect cascading software failures from mobile application user reviews[cite: 1, 2]. Unlike conventional review mining methods that analyze software issues as isolated, independent events, FALCON captures their temporal dependencies, cascading behaviors, and evolutionary patterns over time[cite: 1, 2]. It introduces the Availability Resilience Index (ARI) to evaluate continuous, user-perceived application availability and resilience without relying on proprietary runtime telemetry or crash logs[cite: 1, 2].

## Technologies & Tools Used
- **Frontend & Visualization:** React 18, Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas API
- **Machine Learning & Deep Learning:** PyTorch, PyTorch Geometric (PyG), Time2Vec, Temporal Graph Attention Networks (T-GAT)[cite: 1, 2, 3]
- **NLP & Mining:** Scikit-learn (TF-IDF Vectorizer, One-vs-Rest Logistic Regression), Pre-trained Language Models (DeBERTa-v3)[cite: 2, 3]
- **Graph & Network Analysis:** NetworkX (Directed Graph modeling, Betweenness Centrality)[cite: 2, 3]
- **Scientific Computing & Statistics:** NumPy, Pandas, SciPy[cite: 3]
- **Data Collection:** Google Play Scraper (Google Play Store reviews)[cite: 2, 3]

## How It Works
FALCON operates through an end-to-end analytical pipeline across six primary stages[cite: 1, 2]:

1. **Review Collection & Preprocessing:** User reviews are collected across multiple application categories (Productivity, Social, Finance, Health, Gaming), cleaned, tokenized, lemmatized, deduplicated, and segmented into longitudinal temporal observation windows[cite: 1, 2, 3].
2. **Failure Event Extraction:** Natural language feedback is categorized into 7 software failure types (*Crash, ANR, DataLoss, AuthFailure, NetworkFailure, NotificationFailure, and UIFailure*), with each event weighted by an intrinsic severity score and user star-rating penalty[cite: 1, 2, 3].
3. **Failure Dependency Network (FDN) Construction:** Extracted events are structured into a time- and severity-weighted directed graph ($G = (V, E)$), where directed edges model temporal co-occurrence, elapsed calendar time ($\Delta t$), and an exponential decay factor ($\lambda$)[cite: 1, 2, 3].
4. **Temporal Graph Learning (T-GAT):** A Time2Vec-enhanced Temporal Graph Attention Network models the evolving failure relationships across observation windows, utilizing attention coefficients ($\alpha_{ij}$) to identify cascading propagation paths and critical bottleneck nodes[cite: 1, 2, 3].
5. **User Impact (UI) Estimation:** Assesses real-world user consequences by analyzing rating drops, negative review volume surges, and retention recovery trends[cite: 1, 2, 3].
6. **Availability Resilience Index (ARI) Computation:** Fuses Failure Depth (FD), Failure Spread (FS), Failure Recovery rate (FR), and User Impact (UI) to calculate an application-level resilience score ($0.0$ to $1.0$), enabling automated monitoring and CI/CD quality assessment[cite: 1, 2, 3].
