import os
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

# Load API key
load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",  # use gemini-1.5-pro for higher quality
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def generate_reminder_message(customer_name, amount, days_overdue):
    """
    Generate a friendly AI-powered reminder message
    """
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that writes polite payment reminders."),
        ("human", f"""
        Write a short WhatsApp-style message for {customer_name}.
        They have not paid ₹{amount} for {days_overdue} days.
        Keep the tone polite, professional, and friendly.
        """)
    ])

    chain = prompt | llm
    response = chain.invoke({})
    return response.content
