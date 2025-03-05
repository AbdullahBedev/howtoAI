from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.callbacks import get_openai_callback
import time

# Advanced prompt template with system instructions
template = """
You are a helpful AI assistant specialized in providing information about Retrieval Augmented Generation (RAG) systems.
Use the following pieces of retrieved context to answer the user's question.
If you don't know the answer based on the context, say "I don't have enough information to answer this question" instead of making up an answer.
Always cite the sources of your information based on the document sources in the metadata.

Context:
{context}

Question: {question}

Answer in a comprehensive, educational and helpful manner:
"""

PROMPT = PromptTemplate(
    template=template,
    input_variables=["context", "question"]
)

# Create a QA chain with advanced configuration
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
    temperature=0.3,  # Lower temperature for more factual responses
    max_tokens=500  # Control response length
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={
        "prompt": PROMPT,
        "verbose": True  # See the chain's reasoning
    },
    return_source_documents=True  # Include source docs in result
)

# Function to run the QA chain with tracking
def run_qa_with_tracking(query):
    start_time = time.time()
    with get_openai_callback() as cb:
        result = qa_chain({"query": query})
        
        print(f"Response: {result['result']}")
        print(f"\nToken usage: {cb.total_tokens} tokens")
        print(f"Cost: ${cb.total_cost:.5f}")
        print(f"Time: {time.time() - start_time:.2f} seconds")
        
        # Show sources
        if 'source_documents' in result:
            print("\nSources:")
            sources = set()
            for doc in result['source_documents']:
                source = doc.metadata.get('source', 'unknown')
                sources.add(source)
            for source in sources:
                print(f"- {source}")
    
    return result

# Test with a real question
question = "What are the key benefits of RAG systems compared to fine-tuning LLMs?"
result = run_qa_with_tracking(question) 