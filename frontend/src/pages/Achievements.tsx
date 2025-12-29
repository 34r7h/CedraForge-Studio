import { Trophy, Star, Target, Award, Users, TrendingUp } from 'lucide-react'

interface Achievement {
  id: number
  name: string
  description: string
  icon: typeof Trophy
  unlocked: boolean
  points: number
  progress?: number
  maxProgress?: number
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: 'First Contract',
    description: 'Create your first Move contract',
    icon: Trophy,
    unlocked: true,
    points: 100,
  },
  {
    id: 2,
    name: 'Template Master',
    description: 'Use 10 different templates',
    icon: Star,
    unlocked: false,
    points: 200,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: 3,
    name: 'Documentation Pro',
    description: 'Generate documentation for 5 contracts',
    icon: Target,
    unlocked: true,
    points: 50,
  },
  {
    id: 4,
    name: 'Deploy Champion',
    description: 'Deploy your first contract to testnet',
    icon: Award,
    unlocked: false,
    points: 150,
  },
  {
    id: 5,
    name: 'Community Contributor',
    description: 'Share 3 templates with the community',
    icon: Users,
    unlocked: false,
    points: 300,
    progress: 1,
    maxProgress: 3,
  },
]

export default function Achievements() {
  const totalScore = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0)
  
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Achievements</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Score</p>
              <p className="text-3xl font-bold text-purple-400">{totalScore}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Achievements</p>
              <p className="text-3xl font-bold text-purple-400">
                {unlockedCount}/{totalAchievements}
              </p>
            </div>
            <Trophy className="h-10 w-10 text-purple-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rank</p>
              <p className="text-3xl font-bold text-purple-400">#42</p>
            </div>
            <Star className="h-10 w-10 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border transition-colors ${
                  achievement.unlocked
                    ? 'border-purple-500/50 bg-purple-900/10'
                    : 'border-purple-500/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        achievement.unlocked
                          ? 'bg-purple-600'
                          : 'bg-slate-700'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          achievement.unlocked ? 'text-white' : 'text-gray-500'
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          achievement.unlocked ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                  <span className="text-purple-400 font-bold">+{achievement.points}</span>
                </div>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(achievement.progress / achievement.maxProgress!) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                {achievement.unlocked && (
                  <div className="text-sm text-green-400 flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    Unlocked!
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">Top Contributors</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((rank) => (
            <div
              key={rank}
              className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div className="flex items-center">
                <span className="text-purple-400 font-bold w-8">#{rank}</span>
                <span className="text-white">Developer{rank}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{rank * 500} pts</span>
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

