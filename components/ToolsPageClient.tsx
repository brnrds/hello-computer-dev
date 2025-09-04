'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import BusinessTemplatesTab from '@/components/BusinessTemplatesTab';
import PromptOptimizerTab from '@/components/PromptOptimizerTab';

type TabType = 'templates' | 'optimizer';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Prompt Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to create and optimize prompts for AI. Start with business templates 
            or enhance any prompt for better results.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => handleTabSwitch('templates')}
              className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'templates'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'templates' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl">📋</span>
                <div className="text-left">
                  <div className="font-semibold">Business Templates</div>
                  <div className="text-sm text-gray-500">Pre-built prompts for marketing & growth</div>
                </div>
              </div>
            </button>
            
            <div className="w-px bg-gray-200"></div>
            
            <button
              onClick={() => handleTabSwitch('optimizer')}
              className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'optimizer'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'optimizer' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl">🚀</span>
                <div className="text-left">
                  <div className="font-semibold">Prompt Optimizer</div>
                  <div className="text-sm text-gray-500">Enhance any prompt for better AI results</div>
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
        </div>
      </div>
    </div>
  );
}
