import { Link } from 'react-router-dom'
import { Code, Zap, Book, Users, Rocket, Trophy, Play } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Code,
      title: 'Visual Builder',
      description: 'Drag-and-drop interface for building Move contracts visually',
    },
    {
      icon: Book,
      title: 'Template Library',
      description: 'Pre-built contract templates ready to customize and deploy',
    },
    {
      icon: Zap,
      title: 'Auto Documentation',
      description: 'Generate comprehensive docs from your Move code automatically',
    },
    {
      icon: Play,
      title: 'Code Playground',
      description: 'Test and debug your contracts in a safe sandbox environment',
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Unlock badges and compete on the leaderboard',
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Share templates and collaborate with other developers',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">
          Forge Fast, <span className="text-purple-400">Move Smart</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Build Move smart contracts on Cedra with our interactive, gamified development environment
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/builder"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Start Building
          </Link>
          <Link
            to="/templates"
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            Browse Templates
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
            >
              <Icon className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">50+</div>
            <div className="text-gray-400 mt-2">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">1,200+</div>
            <div className="text-gray-400 mt-2">Contracts Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">500+</div>
            <div className="text-gray-400 mt-2">Active Developers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

