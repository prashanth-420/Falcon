# FALCON: Failure Analysis through Linked Cascading Observation Networks

## About FALCON
FALCON is a temporal graph-based framework designed to model, analyze, and detect cascading software failures from mobile application user reviews[cite: 2]. Unlike conventional review mining methods that treat bugs as independent events, FALCON captures the temporal evolution and dependency patterns among failures[cite: 2]. It introduces the Availability Resilience Index (ARI) to evaluate real-time, user-perceived application availability and resilience without relying on proprietary runtime telemetry or crash logs[cite: 2].

## Technologies & Tools Used
- **Frontend & Visualization:** React 18, Vite, Tailwind CSS, Lucide Icons, Canvas API
- **Machine Learning & Deep Learning:** PyTorch, PyTorch Geometric (PyG), Time2Vec, Temporal Graph Attention Networks (T-GAT)[cite: 2, 3]
- **NLP & Mining:** Scikit-learn (TF-IDF Vectorizer, One-vs-Rest Logistic Regression), Pre-trained Transformers (DeBERTa)[cite: 2, 3]
- **Graph & Network Analysis:** NetworkX (Directed Graph modeling, Betweenness Centrality)[cite: 2, 3]
- **Scientific Computing & Statistics:** NumPy, Pandas, SciPy[cite: 3]
- **Data Collection:** Google Play Scraper (Google Play Store reviews)[cite: 2, 3]

## How It Works
FALCON operates through an end-to-end analytical pipeline across six key stages[cite: 2]:

1. **Review Collection & Preprocessing:** User reviews are gathered across multiple application domains, cleaned, normalized, deduplicated, and partitioned into longitudinal temporal observation windows[cite: 2, 3].
2. **Failure Event Extraction:** Natural language reviews are processed via multi-label NLP classifiers to identify 7 core failure categories: *Crash, ANR, DataLoss, AuthFailure, NetworkFailure, NotificationFailure, and UIFailure*, each weighted by an intrinsic severity score and star rating penalty[cite: 2, 3].
3. **Failure Dependency Network (FDN) Construction:** Extracted events are mapped into a time- and severity-weighted directed graph where edges capture co-occurrence frequency, elapsed calendar time ($\Delta t$), and exponential decay ($\lambda$)[cite: 2, 3].
4. **Temporal Graph Learning (T-GAT):** Time2Vec projects elapsed time into continuous vector embeddings, while a Temporal Graph Attention Network learns evolving dependency weights ($\alpha_{ij}$) to identify cascading roots and structural bottlenecks[cite: 2, 3].
5. **User Impact (UI) Estimation:** Measures real-world external impact by combining rating drops, surges in negative review volume, and long-term user retention signals[cite: 3].
6. **Availability Resilience Index (ARI) Computation:** Synthesizes Failure Depth (FD), Failure Spread (FS), Failure Recovery rate (FR), and User Impact (UI) into a single resilience score ($0.0$ to $1.0$) to automate CI/CD release decisions (`PASS`, `WARN`, `BLOCK`)[cite: 2, 3].
