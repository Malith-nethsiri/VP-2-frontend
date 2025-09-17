import React from 'react';
import { DocumentTextIcon, PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Valuation Reports</h1>
              <p className="text-gray-600">Generate IVSL-compliant valuation reports</p>
            </div>
            <button
              disabled
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Report (Coming Soon)
            </button>
          </div>
        </div>
        <div className="px-6 py-8">
          <div className="text-center">
            <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Report Generation Engine
            </h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              This feature will be implemented in Task 4. It will include:
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <ClipboardDocumentListIcon className="h-8 w-8 text-green-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">IVSL Templates</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Professional templates with 13 standard report sections
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <DocumentTextIcon className="h-8 w-8 text-blue-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">AI Content</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Auto-generated property descriptions and market analysis
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <DocumentTextIcon className="h-8 w-8 text-purple-600 mx-auto" />
                <h4 className="mt-3 font-medium text-gray-900">PDF Export</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Professional PDF reports with formatting and letterheads
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <span className="text-sm font-medium">Coming in Task 4 Implementation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report List Placeholder */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Reports</h2>
        </div>
        <div className="px-6 py-8">
          <div className="text-center">
            <p className="text-gray-500">No reports created yet. Start by uploading documents and creating your first valuation report.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;