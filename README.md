# 🚀 EVORA — AI Business Intelligence & Decision Optimization System

> **Enterprise Vision Optimizing Reasoning Assistant**

EVORA is an **AI-powered Business Intelligence and Decision Optimization System** that analyzes business data, identifies important insights and risks, evaluates possible business actions, and recommends suitable actions based on available evidence.

The system combines **Business Intelligence, Machine Learning, Anomaly Detection, Multi-Agent AI, and What-if Analysis** into a single workflow.

---

# 🎯 Project Goal

The main goal of EVORA is:

> **To transform raw business data into meaningful insights, identify business risks, evaluate possible actions, and recommend the most suitable business action based on available evidence.**

### Simple Concept

```text
Business Data
      ↓
Analyze
      ↓
Identify Problems / Risks
      ↓
Understand Possible Outcomes
      ↓
Evaluate Alternatives
      ↓
Recommend Suitable Action
      ↓
Final Decision by User
```

EVORA does **not automatically execute business decisions**.

The system provides evidence-based recommendations, while the **final decision remains with the user**.

---

# ❗ Problem Statement

Businesses generate large amounts of data related to:

* Sales
* Revenue
* Expenses
* Products
* Customers
* Complaints
* Delivery performance

A traditional dashboard may show:

```text
Sales = ₹1,20,000
```

However, the user still needs to determine:

* Why did sales decrease?
* Which product or customer is causing the problem?
* Where is the business risk?
* What may happen next?
* Which action should be considered?
* What could happen if a different action is taken?

EVORA aims to reduce this gap by combining **business analytics, Machine Learning, risk analysis, and AI-based decision optimization**.

---

# 💡 Proposed Solution

EVORA processes business data through multiple stages.

```text
Business Data
      ↓
Data Processing
      ↓
Business Metrics
      ↓
Machine Learning
      ↓
Risk Analysis
      ↓
AI Agents
      ↓
Alternative Evaluation
      ↓
Decision Optimization
      ↓
Recommended Action
```

---

# ❓ What EVORA Answers

EVORA follows five important questions:

### 1. What happened?

**Analytics Agent**

Analyzes business performance and trends.

### 2. What is wrong?

**Risk Agent**

Identifies abnormal patterns, negative trends, and important risk factors.

### 3. What may happen?

**Machine Learning**

Provides a selected business prediction or risk-related outcome.

### 4. What are our options?

**What-if Analysis**

Evaluates possible business scenarios.

### 5. Which action is most suitable?

**Decision Optimization Agent**

Uses available evidence and analysis to recommend a suitable action.

---

# 🔄 Core Workflow

```text
Business CSV / Excel
        ↓
Data Preprocessing
        ↓
Business Metrics
        ↓
Machine Learning
   ├── Prediction
   └── Anomaly Detection
        ↓
Risk Analysis
        ↓
LangGraph Workflow
        ↓
Analytics Agent
        ↓
Risk Agent
        ↓
Decision Optimization Agent
        ↓
Alternative / What-if Analysis
        ↓
Recommended Action
        ↓
Final Decision by User
```

---

# 📊 Input Data

EVORA will primarily support **CSV / Excel business datasets**.

Possible fields:

```text
Date
Product
Quantity
Revenue
Expense
Customer
Customer Segment
Complaint Count
Delivery Delay
Category
```

Not every dataset must contain every field.

The system will analyze the available fields and perform appropriate processing.

---

# ⚙️ Main Features

## 1. Business Data Upload

Users can upload CSV or Excel business data.

The system will:

* Validate the data
* Check missing values
* Check duplicate records
* Check data types
* Identify available columns
* Perform basic preprocessing

---

## 2. Business Metrics

EVORA calculates important business metrics such as:

```text
Total Revenue
Total Expense
Total Profit
Profit Margin
Total Sales
Sales Growth
Product Contribution
Customer Contribution
```

---

## 3. Machine Learning Prediction

EVORA will use **XGBoost** for a selected primary business prediction task.

Example:

```text
Predicted Next-Period Sales:
₹1,12,000
```

or:

```text
Sales Decline Probability:
78%
```

The exact prediction task will depend on the selected dataset.

> ML provides a quantitative estimate. It does not make the final business decision.

---

## 4. Anomaly Detection

EVORA identifies unusual business patterns.

Example:

```text
⚠ Unusual expense pattern detected.
```

or:

```text
⚠ Sales drop is significantly different from normal behavior.
```

A technique such as **Isolation Forest** can be used for anomaly detection.

---

## 5. Risk Score

EVORA can combine:

* Business metrics
* ML results
* Anomaly results
* Business rules

to generate a decision-oriented risk score.

Example:

```text
Risk Score: 82 / 100
Severity: HIGH
```

> Risk score is a decision-support indicator and is not a guaranteed probability.

---

# 🤖 AI Agents

EVORA uses three primary AI agents.

---

## 📈 Analytics Agent

### Question

> **What happened?**

### Responsibilities

* Sales trend analysis
* Revenue analysis
* Expense analysis
* Customer trend analysis
* Product performance analysis
* Business pattern identification

### Example

> Sales decreased by 12% during the last period.

---

# ⚠️ Risk Agent

### Question

> **What is wrong?**

### Responsibilities

* Interpret anomaly results
* Identify negative trends
* Identify risky products
* Identify risky customers
* Identify important risk factors

### Example

> High business risk detected due to increasing complaints and delivery delays.

---

# 🎯 Decision Optimization Agent

### Question

> **Which action is most suitable?**

### Responsibilities

* Receive Analytics Agent results
* Receive Risk Agent results
* Analyze ML results
* Evaluate possible actions
* Compare alternatives
* Use LLM reasoning
* Consider What-if scenarios
* Generate practical recommendations
* Provide supporting evidence
* Explain assumptions and limitations

### Example

> Investigate delayed deliveries and high-risk customer segments before increasing marketing expenditure.

EVORA does not automatically execute the recommendation.

---

# 🧠 ML vs AI Agents

This is an important concept in EVORA.

### Machine Learning

ML performs quantitative analysis.

Example:

```text
Sales decline probability = 78%
```

### AI Agents

AI agents interpret the analytical results and generate reasoning.

Example:

> The predicted sales decline combined with increasing delivery delays indicates a high-risk situation. Delayed orders should be investigated first.

Therefore:

```text
ML
=
Quantitative Analysis
```

```text
AI Agents
=
Interpretation
+
Reasoning
+
Decision Optimization
```

---

# 🔗 LangChain

LangChain will be used for:

* LLM integration
* Agent development
* Tool integration
* Structured outputs
* Prompt management

Concept:

```text
Analytics Agent
      ↓
Business Analysis Tools

Risk Agent
      ↓
Risk / ML Tools

Decision Optimization Agent
      ↓
Recommendation / Evaluation Tools
```

---

# 🕸️ LangGraph

LangGraph will control the workflow and state between the AI agents.

Example:

```text
Analytics Agent
       ↓
Risk Agent
       ↓
Risk Level
   /       \
 HIGH      LOW
  ↓         ↓
Decision   Basic
Optimization Report
Agent
  ↓
Final Result
```

### Viva Explanation

> **LangChain is used for LLM and agent integration, while LangGraph is used to control the state and workflow between multiple agents.**

---

# 📚 RAG

RAG is a supporting component of EVORA.

The knowledge base may contain:

* KPI definitions
* Business terminology
* Basic business concepts
* Uploaded business documents

Example:

```text
User
 ↓
"What does profit margin indicate?"
 ↓
RAG Retrieval
 ↓
Relevant Business Knowledge
 ↓
LLM Explanation
```

For actual business recommendations, **uploaded business data and calculated metrics will have higher priority**.

---

# 🔎 Embeddings + FAISS

Embeddings can be used for:

* Business knowledge retrieval
* Finding relevant reports
* Searching uploaded documents
* Retrieving similar business information

FAISS can be used for local vector search.

---

# 🔬 What-if Analysis

What-if Analysis allows users to evaluate hypothetical business scenarios.

Example:

> **What if Product A price increases by 10%?**

```text
Current Scenario
       ↓
Scenario Change
       ↓
Impact Analysis
       ↓
Risk Analysis
       ↓
Alternative Comparison
       ↓
Recommended Action
```

Example output:

```text
Possible Revenue Impact: Positive
Risk Level: Medium
```

> **What-if results are scenario estimates based on available data and assumptions, not guaranteed outcomes.**

---

# 🏗️ System Architecture

```text
                         USER
                           ↓
                  Next.js + React
                           ↓
                       FastAPI
                           ↓
                  Data Processing
                       Pandas
                           ↓
                   Business Metrics
                           ↓
                     ML Engine
                ┌──────────┴──────────┐
                ↓                     ↓
             XGBoost          Anomaly Detection
                └──────────┬──────────┘
                           ↓
                      Risk Analysis
                           ↓
                       LangGraph
                           ↓
            ┌──────────────┼──────────────┐
            ↓              ↓              ↓
      Analytics Agent   Risk Agent   Decision Optimization
            └──────────────┼──────────────┘
                           ↓
                   AI Recommendation
                           ↓
                    What-if Analysis
                           ↓
                 Recommended Action
                           ↓
                    Final Dashboard
```

---

# 🖥️ Frontend

EVORA will use:

* **Next.js**
* **React**

Streamlit will **not** be used.

## Planned Pages

1. Dashboard
2. Business Analysis
3. ML Predictions
4. Anomaly & Risk
5. AI Recommendations
6. What-if Analysis
7. Ask EVORA
8. Reports

---

# ⚡ Backend

EVORA will use **FastAPI**.

Possible API endpoints:

```text
POST /business/upload
GET  /dashboard
GET  /metrics
GET  /predictions
GET  /anomalies
POST /analyze
POST /decision
POST /what-if
POST /ask
GET  /report
GET  /health
```

The exact API structure may evolve during implementation.

---

# 🗄️ Database

SQLite can be used for the initial mini-project.

## Business Data

```text
business_id
date
product
quantity
revenue
expense
customer_segment
complaints
delivery_delay
```

## Prediction

```text
prediction_id
period
predicted_value
model
created_at
```

## Risk

```text
risk_id
risk_type
risk_score
severity
reason
```

## Recommendation

```text
recommendation_id
question
recommendation
evidence
confidence
created_at
```

---

# 🛠️ Technology Stack

## Programming

* Python

## Data Processing

* Pandas
* NumPy

## Machine Learning

* Scikit-learn
* XGBoost

## Agentic AI

* LangChain
* LangGraph

## LLM

* Groq

## Retrieval

* Sentence Transformers
* FAISS

## Backend

* FastAPI

## Database

* SQLite

## Frontend

* Next.js
* React

## Version Control

* Git
* GitHub

---

# 👥 Two-Member Team Division

## Student 1 — ML & Business Data Analysis

### Responsibilities

* Dataset preparation
* Pandas / NumPy
* Data preprocessing
* Feature engineering
* XGBoost
* Prediction
* Anomaly detection
* Risk scoring
* ML evaluation

### Main Responsibility

> **Business Intelligence and ML Layer**

---

## Student 2 — AI Agents & Application

### Responsibilities

* LangChain
* LangGraph
* Analytics Agent
* Risk Agent
* Decision Optimization Agent
* Groq
* RAG / FAISS
* FastAPI
* Next.js
* React
* Frontend integration

### Main Responsibility

> **AI Decision Optimization and Application Layer**

Both modules will be integrated into the same EVORA pipeline.

---

# 📏 Evaluation

## Machine Learning

### Regression

* MAE
* RMSE
* MAPE

### Classification, if applicable

* Precision
* Recall
* F1 Score

### Anomaly Detection

* Precision / Recall where labeled test cases are available

---

## AI Evaluation

* Insight correctness
* Recommendation relevance
* Evidence correctness
* Unsupported recommendation rate
* Reasoning consistency

---

## System Evaluation

* Response time
* Token usage
* Agent calls
* Retrieval time
* API performance

---

# 🔬 Research Question

> **Does structured ML-derived business context and multi-agent reasoning improve the quality of AI-based business decision optimization compared with direct LLM prompting?**

---

# 🆚 Baseline vs EVORA

## Baseline

```text
Business Question
      ↓
     LLM
      ↓
    Answer
```

## EVORA

```text
Business Data
      ↓
Business Metrics
      ↓
ML Analysis
      ↓
Analytics Agent
      ↓
Risk Agent
      ↓
Alternative Evaluation
      ↓
Decision Optimization Agent
      ↓
Recommendation
```

The comparison can demonstrate the value of structured business context and multi-agent reasoning.

---

# 🛡️ Reliability

EVORA is designed as a recommendation system and not an autonomous business execution system.

Recommendations should include:

* Reason
* Supporting metric
* Evidence
* Risk
* Confidence
* Assumptions

If the available data is insufficient:

> **Insufficient evidence for a strong recommendation.**

This helps reduce unsupported recommendations.

---

# 🔄 LLM Failure Handling

The core business analysis should not completely depend on the LLM.

If Groq is unavailable:

```text
ML Results
    ↓
Business Rules
    ↓
Basic Recommendation
```

Therefore:

> **LLM failure should not mean complete project failure.**

The ML and business-analysis layer can continue operating independently.

---

# 📦 Project Scope

EVORA is designed as a manageable **3rd-year mini-project**.

## Must Have

* [ ] CSV / Excel upload
* [ ] Business data validation
* [ ] Business metrics
* [ ] XGBoost prediction
* [ ] Anomaly detection
* [ ] Risk score
* [ ] Analytics Agent
* [ ] Risk Agent
* [ ] Decision Optimization Agent
* [ ] Recommendation
* [ ] What-if Analysis
* [ ] Next.js / React UI
* [ ] FastAPI backend

## Optional

* [ ] RAG
* [ ] FAISS
* [ ] PDF business report
* [ ] Downloadable reports
* [ ] Advanced visualizations

## Out of Scope

* ❌ 10+ AI agents
* ❌ Stock trading
* ❌ Automatic business execution
* ❌ Huge enterprise integrations
* ❌ Complex deep learning
* ❌ Real-time streaming infrastructure
* ❌ Precise long-term forecasting

---

# 🚀 Day 1 Development Plan

> **Day 1 मध्ये पूर्ण project तयार करायचा नाही.**

The purpose of Day 1 is to establish the **basic foundation and working data flow**.

## 🎯 Day 1 Goal

```text
CSV Business Data Upload
        ↓
Clean Data
        ↓
Basic Business Metrics
        ↓
Backend API
        ↓
Frontend Connection
```

---

# 📁 Day 1 Project Structure

```text
EVORA/
├── backend/
├── frontend/
├── ml/
├── agents/
├── rag/
├── data/
└── tests/
```

---

# 🛠️ Day 1 Tasks

## Backend

* Python virtual environment
* FastAPI setup
* `/health` API
* `/upload` API

## Frontend

* Next.js + React setup
* Basic EVORA dashboard
* CSV upload UI
* Backend connection

## Dataset

Use a simple business dataset containing:

```text
Date
Product
Quantity
Revenue
Expense
Customer
```

## Pandas Processing

The backend should:

* Read CSV
* Check missing values
* Check duplicates
* Check data types

---

# 📊 Day 1 Metrics

Only four metrics are required on Day 1:

```text
Total Revenue
Total Expense
Total Profit
Total Sales
```

### Calculation

```text
Total Revenue = Sum of Revenue

Total Expense = Sum of Expense

Total Profit = Total Revenue - Total Expense

Total Sales = Sum of Quantity
```

---

# 🔄 Day 1 Working Flow

```text
CSV Upload
     ↓
FastAPI
     ↓
Pandas
     ↓
Data Validation
     ↓
Calculate Metrics
     ↓
JSON Response
     ↓
Next.js Dashboard
```

---

# ✅ Day 1 Success Condition

Day 1 is complete when:

> **A user can upload a CSV from the frontend, the FastAPI backend processes the data using Pandas, and the dashboard displays Revenue, Expense, Profit, and Sales.**

---

# 🚫 Day 1 — Not Included

The following components are intentionally **not part of Day 1**:

* ❌ XGBoost
* ❌ Anomaly Detection
* ❌ Risk Score
* ❌ Analytics Agent
* ❌ Risk Agent
* ❌ Decision Optimization Agent
* ❌ LangChain
* ❌ LangGraph
* ❌ Groq
* ❌ RAG
* ❌ FAISS
* ❌ What-if Analysis

These components will be implemented during later development stages.

---

# 📈 Expected Final Dashboard

> **Important:** This is the expected dashboard concept for the **completed EVORA project**, not the Day 1 dashboard.

```text
┌──────────────────────────────────────────┐
│                  EVORA                   │
│ AI Business Intelligence &               │
│ Decision Optimization System             │
├──────────────────────────────────────────┤
│                                          │
│ Revenue       Expense       Profit       │
│ ₹1,20,000     ₹98,000       ₹22,000      │
│                                          │
│ Sales         Risk Score     Prediction  │
│ 850           82 / 100       ₹1,12,000   │
│                                          │
├──────────────────────────────────────────┤
│ Business Insights                        │
│                                          │
│ • Sales decreased by 12%                 │
│ • Expense anomaly detected               │
│ • Delivery delay risk increased          │
│                                          │
├──────────────────────────────────────────┤
│ Recommended Action                       │
│                                          │
│ Investigate delayed deliveries and       │
│ high-risk customer segments.             │
└──────────────────────────────────────────┘
```

### Day 1 Dashboard

Day 1 will contain only the basic metrics:

```text
┌─────────────────────────────────────┐
│               EVORA                 │
│ AI Business Intelligence &          │
│ Decision Optimization System        │
├─────────────────────────────────────┤
│                                     │
│ Revenue       Expense               │
│ ₹1,20,000     ₹98,000               │
│                                     │
│ Profit        Sales                 │
│ ₹22,000       850                   │
│                                     │
│ ✅ Data processed successfully      │
└─────────────────────────────────────┘
```

---

# 📅 Development Timeline

## Week 1 — Foundation

* Dataset preparation
* Data preprocessing
* FastAPI setup
* Next.js setup
* Basic business metrics
* Frontend-backend connection

## Week 2 — Business Intelligence

* Dashboard improvements
* Business analysis
* Charts
* Backend integration

## Week 3 — Machine Learning

* Feature engineering
* XGBoost
* Prediction
* Model evaluation

## Week 4 — Risk Analysis

* Anomaly detection
* Risk scoring
* Risk visualization

## Week 5 — AI Agents

* Analytics Agent
* Risk Agent
* LangGraph workflow

## Week 6 — Decision Optimization

* Decision Optimization Agent
* Groq integration
* What-if Analysis
* Alternative evaluation

## Week 7 — RAG & Integration

* RAG
* Embeddings
* FAISS
* Full system integration
* Testing

## Week 8 — Finalization

* UI polish
* Performance testing
* Documentation
* PPT
* Final report
* Demo preparation

---

# 🧪 Example Final Scenario

Suppose the business data shows:

```text
Sales           ↓ 12%
Complaints      ↑ 18%
Delivery Delay  ↑ 15%
Expenses        ↑ 21%
```

### Analytics Agent

> Sales performance declined significantly.

### ML

> The model indicates a high likelihood of continued sales weakness.

### Risk Agent

> High business risk detected due to expense growth and increasing delivery delays.

### Decision Optimization Agent

> Investigate delayed deliveries and high-risk customer segments before increasing marketing expenditure.

### User

> What if Product A price increases by 10%?

### EVORA

```text
Current Scenario
        ↓
Price Increase Scenario
        ↓
Impact Comparison
        ↓
Risk Analysis
        ↓
Recommended Action
```

---

# 🎓 Mentor Viva Questions

## What is EVORA?

> **“EVORA is an AI Business Intelligence and Decision Optimization System that analyzes business data using Machine Learning, identifies risks using AI agents, evaluates possible actions, and recommends a suitable business action based on available evidence.”**

---

## What is the main goal?

> **“Our main goal is to transform business data into meaningful insights, identify risks, evaluate possible actions, and recommend suitable business decisions based on the available evidence.”**

---

## What does the ML layer do?

> **“The ML layer performs quantitative analysis and predicts a selected business metric or risk-related outcome.”**

---

## What does the Decision Optimization Agent do?

> **“The Decision Optimization Agent uses the available business metrics, ML results, risk analysis, and scenario information to evaluate possible actions and recommend the most suitable option.”**

---

## Does EVORA automatically execute the decision?

> **“No. EVORA only provides an evidence-based recommendation. The final business decision remains with the user.”**

---

## Why use ML and LLM together?

> **“ML provides quantitative analysis, while the LLM-based agents interpret those results, reason about risks and alternatives, and generate understandable recommendations.”**

---

## Why LangGraph?

> **“LangGraph is used to manage the state and workflow between the Analytics, Risk, and Decision Optimization agents.”**

---

# 👤 Target Users

EVORA can potentially help:

* Small business owners
* Student entrepreneurs
* Business analysts
* Small and medium-sized businesses
* Users who need data-driven business insights

---

# 🔮 Future Scope

Possible future improvements include:

* Advanced forecasting
* Additional ML models
* More business domains
* Automated report generation
* PDF report export
* Cloud deployment
* Advanced RAG
* Larger document knowledge bases
* Real-time business data integration
* Advanced scenario simulation
* Role-based access
* More sophisticated optimization techniques

---

# ⚠️ Project Limitations

1. Recommendations depend on the quality of uploaded data.
2. ML predictions are estimates and may not represent actual future outcomes.
3. Anomaly detection results may require human verification.
4. What-if results depend on assumptions and available data.
5. LLM-generated explanations may require validation.
6. Risk scores are indicators and not guaranteed probabilities.
7. EVORA does not automatically execute business actions.

---

# 📜 Final Project Definition

> **EVORA — Enterprise Vision Optimizing Reasoning Assistant is an AI Business Intelligence and Decision Optimization System that uses Machine Learning to analyze business data and a multi-agent AI workflow to interpret trends, identify risks, evaluate possible actions, and recommend the most suitable business action based on available evidence.**

---

# 🔑 Final Core

```text
Business Data
      ↓
ML Analysis
      ↓
Analytics Agent
      ↓
Risk Agent
      ↓
Alternative Evaluation
      ↓
Decision Optimization Agent
      ↓
Recommended Action
      ↓
Final User Decision
```

---

# 📌 Project Status

**Current Status:** 🟡 Initial Setup / Documentation

The EVORA GitHub repository has been created.

The project will be developed incrementally, beginning with the Day 1 basic CSV-to-dashboard data flow.

Advanced components such as Machine Learning, Anomaly Detection, Multi-Agent AI, RAG, and Decision Optimization will be implemented in later stages.

---

# 👨‍💻 Repository

**Project Name:** EVORA

**Repository:** `kedar765/EVORA`

**Primary Branch:** `main`

---

# ⭐ EVORA

> **From Business Data to Optimized Decisions.**

```text
Business Data
      ↓
Intelligence
      ↓
Risk
      ↓
Alternatives
      ↓
Optimization
      ↓
Action
```
