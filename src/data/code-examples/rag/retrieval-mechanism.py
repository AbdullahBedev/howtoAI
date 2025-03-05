# Create a retriever with advanced configuration
retriever = vectorstore.as_retriever(
    search_type="mmr",  # Maximum Marginal Relevance for diversity
    search_kwargs={
        "k": 5,  # Return top 5 most relevant chunks
        "fetch_k": 20,  # Fetch 20 and then rerank
        "lambda_mult": 0.7  # Balance between relevance and diversity
    }
)

# Helper function to test retrieval quality
def test_retrieval(query, retriever, top_k=3):
    print(f"Query: {query}")
    retrieved_docs = retriever.get_relevant_documents(query)
    
    if not retrieved_docs:
        print("No documents retrieved")
        return
        
    print(f"Retrieved {len(retrieved_docs)} documents")
    
    for i, doc in enumerate(retrieved_docs[:top_k]):
        print(f"\nDocument {i+1}:")
        print(f"Source: {doc.metadata.get('source', 'unknown')}")
        print(f"Content: {doc.page_content[:150]}...")
        
    return retrieved_docs

# Test with different queries
test_queries = [
    "What are the key benefits of RAG systems?",
    "How does RAG compare to fine-tuning?",
    "What are common challenges in implementing RAG?"
]

for query in test_queries:
    docs = test_retrieval(query, retriever)
    print("\n" + "-"*50 + "\n") 