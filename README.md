# Expense Tracker


## Overview

Welcome to **Expense Tracker**, a powerful and flexible web and mobile application designed to help users manage their daily expenses efficiently. Track, categorize, and visualize your expenses in real-time, set monthly budgets, and stay on top of your finances. This app not only provides you with an easy-to-use interface for tracking expenses but also offers detailed charts and statistics to analyze your spending patterns. The application is designed to work seamlessly on all devices, including web browsers and mobile applications.

## Key Features

- **User Authentication**: Register, login, and securely access your expense data.
- **Expense Management**: Add, update, delete, and view your expenses categorized by type.
- **Monthly Budgeting**: Set and monitor your monthly budget with real-time progress tracking.
- **Charts & Statistics**: Visualize your expenses with interactive charts grouped by month, week, and category.
- **Device Compatibility**: Fully responsive and compatible with web browsers, mobile devices (Android/iOS), and tablets.
- **Real-Time Sync**: Powered by **Supabase**, the app synchronizes data across all devices in real-time.
- **Testing & Validation**: Comprehensive unit and UI tests to ensure quality.

## Technologies Used

- **Backend**: Django, PostgreSQL (via Supabase for cloud data storage and authentication)
- **Frontend**: React.js, Bootstrap, Chart.js
- **Cloud Database & Authentication**: Supabase (for real-time database and authentication)
- **Testing**: Cypress, Django Unit Tests
- **Deployment**: Heroku, Docker, or other preferred platforms

---

## Installation Guide

To get started with **Expense Tracker**, follow these simple steps:

```bash
git clone https://github.com/BadBoy0170/Expense-tracker.git
cd Expense-tracker
```

## Supabase Integration
This application leverages Supabase for cloud-based PostgreSQL database and authentication. Supabase provides real-time data syncing and seamless authentication across devices.

## Supabase Setup
Create a Supabase account at https://supabase.io if you don’t have one.
Create a new project and configure your database (PostgreSQL).
Obtain your API keys from the Supabase project dashboard.
Backend Integration with Supabase
To connect your Django backend to Supabase for real-time data management and authentication:

Install supabase-py (a Python client for Supabase):
```
pip install supabase
```
Configure Supabase connection in Django settings (add to settings.py):

# settings.py
```
SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_API_KEY = "your-api-key"
```
Use the Supabase client to interact with your database for storing expenses and user data. For example:

from supabase import create_client
```
url = settings.SUPABASE_URL
key = settings.SUPABASE_API_KEY
supabase = create_client(url, key)

def add_expense(expense_data):
    response = supabase.table("expenses").insert(expense_data).execute()
    return response
Supabase will handle authentication, data syncing, and real-time updates between your backend and frontend, ensuring that any changes made on one device (e.g., mobile) are instantly reflected across all devices (web, mobile).
```

### Key Updates:
- **Supabase Integration**: Added instructions for setting up Supabase for cloud-based database and real-time syncing.
- **Device Compatibility**: Mentioned that the app is fully responsive and compatible across web browsers, mobile devices, and tablets.
- **Connection Details**: Instructions for connecting the Django backend to Supabase using the `supabase-py` client.

This should now cover all essential information and make the project setup clear, along with the added advantage of Supabase's real-time database and cross-device functionality.

