'use client';

import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

/**
 * API Documentation page using Swagger UI
 */
export default function ApiDocsPage() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    // Fetch the OpenAPI specification
    fetch('/api/docs/spec')
      .then(response => response.json())
      .then(data => {
        setSpec(data);
      })
      .catch(error => {
        console.error('Failed to load API spec:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">How-to-AI API Documentation</h1>
        <p className="text-gray-600">
          Explore and test the API endpoints available in the How-to-AI platform.
        </p>
      </div>
      
      {spec ? (
        <SwaggerUI spec={spec} />
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
} 