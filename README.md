# RescueLink 🚨

**AI-Powered Emergency Response Platform**
Bridging citizens and frontline responders for faster, smarter, and safer emergency management.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Architecture](#architecture)
* [Demo / Screenshots](#demo--screenshots)
* [Installation](#installation)
* [Usage](#usage)
* [Tech Stack](#tech-stack)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

**RescueLink** is a multi-agent AI platform designed to streamline emergency response. Citizens can report incidents, track updates, and see nearby alerts, while frontline workers get AI-assisted dashboards to triage, assign, and resolve emergencies efficiently.

The platform ensures faster response times, equitable resource allocation, and empowers communities to act together in crises.

---

## Features

### **User Side (Citizen App)**

* Chatbot-guided incident reporting
* Instant incident ID and real-time status updates
* Community feed and geotagged map alerts
* One-tap “Report Now” emergency button

### **Worker Side (Frontline App)**

* Incident dashboard with AI-generated briefings
* Severity filters, map views, and responder roster
* Merge community and official posts
* Moderator queue for flagged posts

### **Backend / AI Agents**

* **Triage Agent:** Prioritizes emergencies
* **Guidance Agent:** Routes cases to the correct service
* **Booking Agent:** Auto-books appointments and drafts messages
* **Follow-up Agent:** Sends reminders and explains updates
* **Equity Oversight Agent:** Tracks service demand vs. capacity

---

## Architecture

**Frontend:**

* React Native (User + Worker apps)
* Interactive maps, dashboards, and feeds

**Backend:**

* n8n for workflow orchestration
* Airtable database for incidents, posts, responders, notifications
* AI agents for validation, triage, summarization, dispatch, and moderation

**Workflow Highlights:**

1. Incident submitted via app → webhook → AI validation
2. Media processing → triage → AI briefing → saved to Airtable
3. Dispatcher assigns responders and monitors escalation
4. Social feed posts moderated and published based on credibility

---

## Demo / Screenshots

*(Add screenshots or GIFs of app flow, dashboard, maps, and chatbots here)*

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/rescuelink.git
cd rescuelink
```

2. Install dependencies:

```bash
npm install
```

3. Set up `.env` with your API keys, Airtable base ID, and webhook URLs

4. Start the app:

```bash
npm start
```

---

## Usage

* Open the app → select role (User / Worker)
* User: Report incidents, track status, view community feed
* Worker: Access dashboard, triage incidents, assign responders, moderate posts
* AI handles validation, triage, and notifications automatically

---

## Tech Stack

* **Frontend:** React Native, Mapbox / Google Maps
* **Backend:** n8n, Airtable, Node.js
* **AI:** GPT-based agents for triage, summarization, moderation, booking
* **Notifications:** Push notifications via Firebase / OneSignal

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---
