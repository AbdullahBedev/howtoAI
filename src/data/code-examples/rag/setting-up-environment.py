# Install required packages
pip install langchain openai chromadb langchainhub

# Import necessary libraries
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# Set your OpenAI API key (use environment variables in production)
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API key from environment variables
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY") 