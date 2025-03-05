from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import uuid

# Initialize the embeddings model with dimensionality
embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002",  # Specify model explicitly
    dimensions=1536  # Ada embeddings are 1536 dimensions
)

# Create a persistent vector store with collection name
collection_name = f"rag_tutorial_{uuid.uuid4().hex[:6]}"
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name=collection_name,
    persist_directory="./chroma_db"
)

# Save the vector store
vectorstore.persist()

# Add index statistics
collection = vectorstore.get()
doc_count = len(collection['documents'])
embedding_dim = len(collection['embeddings'][0]) if collection['embeddings'] else 0

print(f"Vector store created with {doc_count} documents")
print(f"Embedding dimensions: {embedding_dim}")
print(f"Collection name: {collection_name}") 