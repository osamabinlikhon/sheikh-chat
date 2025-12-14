/**
 * Copyright (c) 2025 Osama Bin Likhon
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Settings, Wifi, WifiOff } from 'lucide-react';
import { getAIStatus, testAIConnection } from '@/app/actions/chatActions';

interface AIStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function AIStatus({ className = '', showDetails = false }: AIStatusProps) {
  const [status, setStatus] = useState<{
    configured: boolean;
    provider: string;
    model: string;
    availableProviders: Array<{ id: string; name: string; models: string[] }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setIsLoading(true);
      const statusData = await getAIStatus();
      setStatus(statusData);
    } catch (error) {
      console.error('Failed to check AI status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setIsTesting(true);
      const result = await testAIConnection();
      setTestResult(result);
      
      // Refresh status after test
      setTimeout(checkStatus, 2000);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Connection test failed',
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        <span>Checking AI status...</span>
      </div>
    );
  }

  if (!status) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-red-600 dark:text-red-400 ${className}`}>
        <AlertCircle className="w-4 h-4" />
        <span>Failed to check AI status</span>
      </div>
    );
  }

  const isConfigured = status.configured;
  const statusColor = isConfigured 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-yellow-600 dark:text-yellow-400';
  const bgColor = isConfigured 
    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
  const Icon = isConfigured ? CheckCircle : AlertCircle;

  return (
    <div className={`${className}`}>
      <div className={`p-3 rounded-lg border ${bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4" />
            <span className={`text-sm font-medium ${statusColor}`}>
              {isConfigured ? 'AI Connected' : 'AI Not Configured'}
            </span>
          </div>
          
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Test AI connection"
          >
            {isTesting ? (
              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              'Test'
            )}
          </button>
        </div>
        
        {isConfigured && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">{status.provider}</span>
            <span className="mx-1">•</span>
            <span>{status.model}</span>
          </div>
        )}
        
        {!isConfigured && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Configure AI provider in environment variables
          </div>
        )}
        
        {showDetails && status.availableProviders && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Available Providers:
            </div>
            <div className="grid grid-cols-1 gap-2">
              {status.availableProviders.map((provider) => (
                <div key={provider.id} className="text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {provider.name}
                  </span>
                  <div className="text-gray-500 dark:text-gray-400 mt-1">
                    Models: {provider.models.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {testResult && (
          <div className={`mt-3 pt-3 border-t text-xs ${
            testResult.success 
              ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
              : 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
          }`}>
            {testResult.message}
          </div>
        )}
      </div>
    </div>
  );
}