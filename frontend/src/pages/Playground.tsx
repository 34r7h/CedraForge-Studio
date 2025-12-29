import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, FileCode } from 'lucide-react'

const exampleCode = `module cedraforge::playground {
    use std::signer;
    use std::string;

    public fun hello_world(): string::String {
        string::utf8(b"Hello from CedraForge Playground!")
    }

    public fun add(a: u64, b: u64): u64 {
        a + b
    }

    public fun multiply(a: u64, b: u64): u64 {
        a * b
    }
}`

export default function Playground() {
  const [code, setCode] = useState(exampleCode)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('Running contract...\n')
    
    // Simulate execution
    setTimeout(() => {
      setOutput(prev => prev + '✅ Contract executed successfully!\n\n')
      setOutput(prev => prev + 'Function: hello_world()\n')
      setOutput(prev => prev + 'Result: "Hello from CedraForge Playground!"\n\n')
      setOutput(prev => prev + 'Function: add(5, 10)\n')
      setOutput(prev => prev + 'Result: 15\n\n')
      setOutput(prev => prev + 'Function: multiply(3, 4)\n')
      setOutput(prev => prev + 'Result: 12\n')
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(exampleCode)
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Code Playground</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors flex items-center"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center disabled:opacity-50"
          >
            <Play className="h-5 w-5 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 overflow-hidden">
          <div className="bg-slate-700/50 px-4 py-2 flex items-center">
            <FileCode className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-white font-semibold">Move Code</span>
          </div>
          <Editor
            height="500px"
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

        {/* Output */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 overflow-hidden">
          <div className="bg-slate-700/50 px-4 py-2 flex items-center">
            <Play className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-white font-semibold">Execution Output</span>
          </div>
          <div className="p-4 h-[500px] overflow-auto">
            <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap">
              {output || 'Click "Run" to execute your contract...'}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">Playground Features</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Test Move contracts in a safe sandbox environment</li>
          <li>• No deployment required - instant execution</li>
          <li>• Debug and iterate quickly</li>
          <li>• Share code snippets with the community</li>
        </ul>
      </div>
    </div>
  )
}

