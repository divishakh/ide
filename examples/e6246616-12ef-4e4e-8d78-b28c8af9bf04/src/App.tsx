import React, { useState, useCallback } from 'react';
import { AlertCircle, Check, Copy, FileJson, RotateCw } from 'lucide-react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const formatJSON = useCallback(() => {
    try {
      if (!jsonInput.trim()) {
        setFormattedJson('');
        setIsValid(true);
        setError('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setError('');
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }, [jsonInput]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(isValid ? formattedJson : jsonInput);
  }, [isValid, formattedJson, jsonInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonInput(value);
    try {
      if (!value.trim()) {
        setFormattedJson('');
        setIsValid(true);
        setError('');
        return;
      }
      const parsed = JSON.parse(value);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setError('');
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setFormattedJson('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileJson className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">JSON 编辑器</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={formatJSON}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              格式化
            </button>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Copy className="h-4 w-4 mr-2" />
              复制
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-2 h-full divide-x">
            {/* 左侧输入区域 */}
            <div className="p-6 flex flex-col h-full">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-700">输入 JSON</h2>
                {isValid ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    <span>格式正确</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>格式错误</span>
                  </div>
                )}
              </div>
              <textarea
                value={jsonInput}
                onChange={handleInputChange}
                className={`flex-1 w-full font-mono text-sm p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${
                  isValid
                    ? 'focus:ring-blue-500 border-gray-300'
                    : 'focus:ring-red-500 border-red-300'
                }`}
                placeholder="在此粘贴 JSON..."
              />
            </div>

            {/* 右侧预览/错误区域 */}
            <div className="p-6 flex flex-col h-full bg-gray-50">
              <h2 className="text-sm font-medium text-gray-700 mb-2">
                {isValid ? '预览' : '错误信息'}
              </h2>
              {isValid ? (
                <pre className="flex-1 font-mono text-sm p-4 bg-white border border-gray-200 rounded-lg overflow-auto">
                  {formattedJson}
                </pre>
              ) : (
                <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg overflow-auto">
                  <div className="text-red-600">
                    <p className="font-medium mb-2">解析错误：</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;