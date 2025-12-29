import { useState } from 'react'
import { Download, Star, Code, Search } from 'lucide-react'

interface Template {
  id: number
  name: string
  description: string
  category: string
  rating: number
  downloads: number
  author: string
}

const templates: Template[] = [
  {
    id: 1,
    name: 'Simple Token',
    description: 'Basic fungible token implementation with mint and transfer functions',
    category: 'Token',
    rating: 4.5,
    downloads: 234,
    author: 'CedraTeam',
  },
  {
    id: 2,
    name: 'NFT Collection',
    description: 'Complete NFT implementation with metadata and ownership tracking',
    category: 'NFT',
    rating: 4.8,
    downloads: 189,
    author: 'CedraTeam',
  },
  {
    id: 3,
    name: 'Voting System',
    description: 'Decentralized voting platform with proposal creation and voting',
    category: 'Governance',
    rating: 4.2,
    downloads: 156,
    author: 'CedraTeam',
  },
  {
    id: 4,
    name: 'Staking Pool',
    description: 'Token staking contract with reward distribution',
    category: 'DeFi',
    rating: 4.7,
    downloads: 298,
    author: 'CedraTeam',
  },
  {
    id: 5,
    name: 'Multi-Sig Wallet',
    description: 'Multi-signature wallet for secure fund management',
    category: 'Wallet',
    rating: 4.6,
    downloads: 145,
    author: 'CedraTeam',
  },
  {
    id: 6,
    name: 'Marketplace',
    description: 'Decentralized marketplace for buying and selling assets',
    category: 'Marketplace',
    rating: 4.4,
    downloads: 167,
    author: 'CedraTeam',
  },
]

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'Token', 'NFT', 'Governance', 'DeFi', 'Wallet', 'Marketplace']

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Template Library</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{template.name}</h3>
                <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                  {template.category}
                </span>
              </div>
              <Code className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-gray-400 mb-4 text-sm">{template.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 text-blue-400 mr-1" />
                  <span>{template.downloads}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">by {template.author}</span>
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No templates found matching your search criteria.
        </div>
      )}
    </div>
  )
}

