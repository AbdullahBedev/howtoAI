from langchain.document_loaders import TextLoader, PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load multiple documents from a directory
loader = DirectoryLoader(
    "./documents", 
    glob="**/*.pdf",  # Load all PDF files
    loader_cls=PyPDFLoader  # Use PDF loader
)
documents = loader.load()

# Advanced text splitting with RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\n\n", "\n", " ", ""]  # Custom separators for better context preservation
)
chunks = text_splitter.split_documents(documents)

# Add document metadata for better retrieval context
for i, chunk in enumerate(chunks):
    if "source" not in chunk.metadata:
        chunk.metadata["source"] = f"document_{i//10}"
    chunk.metadata["chunk_id"] = i

print(f"Processed {len(documents)} documents into {len(chunks)} chunks") 