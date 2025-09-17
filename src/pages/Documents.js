import React from 'react';
import { DocumentDuplicateIcon, ArrowUpTrayIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Document Processing</h1>
          <p className="text-gray-600">AI-powered document upload and data extraction</p>
        </div>
        <div className="px-6 py-8">
          <div className="text-center">
            <DocumentDuplicateIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Document Processing System
            </h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              This feature will be implemented in Task 2. It will include:
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <ArrowUpTrayIcon className="h-8 w-8 text-blue-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">File Upload</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Drag-and-drop interface for PDF, JPG, PNG, TIFF files
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <CpuChipIcon className="h-8 w-8 text-green-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">AI Processing</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Google Vision API + OpenAI GPT-4 for data extraction
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <DocumentDuplicateIcon className="h-8 w-8 text-purple-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">Document Types</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Deed transfers, survey plans, building plans, photographs
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                <span className="text-sm font-medium">Coming in Task 2 Implementation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;