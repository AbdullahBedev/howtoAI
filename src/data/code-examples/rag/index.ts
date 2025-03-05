import fs from 'fs';
import path from 'path';

// Read the Python files as strings
const settingUpEnvironmentCode = fs.readFileSync(
  path.join(process.cwd(), 'src/data/code-examples/rag/setting-up-environment.py'),
  'utf8'
);

const documentProcessingCode = fs.readFileSync(
  path.join(process.cwd(), 'src/data/code-examples/rag/document-processing.py'),
  'utf8'
);

const creatingEmbeddingsCode = fs.readFileSync(
  path.join(process.cwd(), 'src/data/code-examples/rag/creating-embeddings.py'),
  'utf8'
);

const retrievalMechanismCode = fs.readFileSync(
  path.join(process.cwd(), 'src/data/code-examples/rag/retrieval-mechanism.py'),
  'utf8'
);

const augmentedPromptCode = fs.readFileSync(
  path.join(process.cwd(), 'src/data/code-examples/rag/augmented-prompt.py'),
  'utf8'
);

// Export the code examples
export const ragCodeExamples = {
  "setting-up-environment": settingUpEnvironmentCode,
  "document-processing": documentProcessingCode,
  "creating-embeddings": creatingEmbeddingsCode,
  "retrieval-mechanism": retrievalMechanismCode,
  "augmented-prompt": augmentedPromptCode,
};

// Export solution examples (same code for now, but could be different)
export const ragSolutionExamples = {
  "setting-up-environment": settingUpEnvironmentCode,
  "document-processing": documentProcessingCode,
  "creating-embeddings": creatingEmbeddingsCode,
  "retrieval-mechanism": retrievalMechanismCode,
  "augmented-prompt": augmentedPromptCode,
}; 