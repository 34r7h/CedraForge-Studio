import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, Download, FileText, Sparkles } from 'lucide-react'

const defaultCode = `module cedraforge::my_contract {
    use std::signer;
    use std::string;

    struct MyResource has key {
        value: u64,
        name: string::String,
    }

    public fun initialize(account: &signer) {
        let resource = MyResource {
            value: 0,
            name: string::utf8(b"Hello Cedra"),
        };
        move_to(account, resource);
    }

    public fun set_value(resource: &mut MyResource, new_value: u64) {
        resource.value = new_value;
    }

    public fun get_value(resource: &MyResource): u64 {
        resource.value
    }
}`

export default function Builder() {
  const [code, setCode] = useState(defaultCode)
  const [isCompiling, setIsCompiling] = useState(false)
  const [compileResult, setCompileResult] = useState<string | null>(null)

  const handleCompile = async () => {
    setIsCompiling(true)
    setCompileResult(null)
    
    // Simulate compilation
    setTimeout(() => {
      setCompileResult('✅ Compilation successful!')
      setIsCompiling(false)
    }, 1500)
  }

  const handleGenerateDocs = async () => {
    // Generate documentation from code
    const docs = `# My Contract Documentation

## Overview
A simple Move contract demonstrating resource management.

## Functions

### initialize
Initializes a new MyResource with default values.

### set_value
Updates the value field of MyResource.

### get_value
Retrieves the current value from MyResource.

## Structs

### MyResource
- \`value: u64\` - A numeric value
- \`name: string::String\` - A name string
`
    
    const blob = new Blob([docs], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contract-docs.md'
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Visual Contract Builder</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center disabled:opacity-50"
          >
            <Play className="h-5 w-5 mr-2" />
            {isCompiling ? 'Compiling...' : 'Compile'}
          </button>
          <button
            onClick={handleGenerateDocs}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate Docs
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Deploy
          </button>
        </div>
      </div>

      {compileResult && (
        <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4 text-green-200">
          {compileResult}
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 overflow-hidden">
        <div className="bg-slate-700/50 px-4 py-2 flex items-center">
          <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
          <span className="text-white font-semibold">Move Contract Editor</span>
        </div>
        <Editor
          height="600px"
          defaultLanguage="move"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Tips</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Use the Visual Builder to drag-and-drop components</li>
          <li>• Templates are available in the Templates section</li>
          <li>• Click "Generate Docs" to auto-generate documentation</li>
          <li>• Compile before deploying to catch errors early</li>
        </ul>
      </div>
    </div>
  )
}

