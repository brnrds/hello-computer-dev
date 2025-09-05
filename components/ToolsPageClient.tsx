'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import BusinessTemplatesTab from '@/components/BusinessTemplatesTab';
import PromptOptimizerTab from '@/components/PromptOptimizerTab';
import CursorZipGenerator from '@/components/CursorZipGenerator';

type TabType = 'templates' | 'optimizer' | 'cursor';

export default function ToolsPageClient() {
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [crossTabData, setCrossTabData] = useState<{
    prompt?: string;
    fromTab?: TabType;
  }>({});
  
  // Ref to scroll to the tab content area
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleTabSwitch = (tab: TabType, data?: { prompt: string }) => {
    if (data) {
      setCrossTabData({ prompt: data.prompt, fromTab: activeTab });
    }
    setActiveTab(tab);
    
    // Scroll to the tab content area when switching tabs with some breathing room above
    setTimeout(() => {
      if (tabContentRef.current) {
        const rect = tabContentRef.current.getBoundingClientRect();
        const offset = 100; // Add optimal breathing room above the content
        const targetPosition = window.pageYOffset + rect.top - offset;
        
        window.scrollTo({
          top: Math.max(0, targetPosition), // Don't scroll above the page
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure tab content has rendered
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            AI Prompt Tools
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Everything you need for AI prompt workflows. Create business templates, optimize prompts for better results, 
            and generate Cursor-compliant project structures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => handleTabSwitch('templates')}
              className={`flex-1 px-2 sm:px-4 py-3 sm:py-4 font-medium transition-colors relative ${
                activeTab === 'templates'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'templates' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl">📋</span>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-xs sm:text-sm">Templates</div>
                  <div className="text-xs text-gray-500 hidden lg:block">Pre-built prompts</div>
                </div>
              </div>
            </button>
            
            <div className="w-px bg-gray-200"></div>
            
            <button
              onClick={() => handleTabSwitch('optimizer')}
              className={`flex-1 px-2 sm:px-4 py-3 sm:py-4 font-medium transition-colors relative ${
                activeTab === 'optimizer'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'optimizer' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl">🚀</span>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-xs sm:text-sm">Optimizer</div>
                  <div className="text-xs text-gray-500 hidden lg:block">Enhance prompts</div>
                </div>
              </div>
            </button>

            <div className="w-px bg-gray-200"></div>
            
            <button
              onClick={() => handleTabSwitch('cursor')}
              className={`flex-1 px-2 sm:px-4 py-3 sm:py-4 font-medium transition-colors relative ${
                activeTab === 'cursor'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'cursor' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl">📦</span>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-xs sm:text-sm">Project Gen</div>
                  <div className="text-xs text-gray-500 hidden lg:block">Cursor projects</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div ref={tabContentRef} className="tab-content">
          {activeTab === 'templates' && (
            <BusinessTemplatesTab 
              onOptimizePrompt={(prompt) => handleTabSwitch('optimizer', { prompt })}
            />
          )}
          
          {activeTab === 'optimizer' && (
            <PromptOptimizerTab 
              initialPrompt={crossTabData.prompt}
              fromTab={crossTabData.fromTab}
              onClearCrossTabData={() => setCrossTabData({})}
            />
          )}

          {activeTab === 'cursor' && (
            <CursorZipGenerator />
          )}
        </div>
      </div>
    </div>
  );
}
