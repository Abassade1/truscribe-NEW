'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, AlertTriangle, Search, Filter, Calendar, TrendingUp, Shield, Zap, Eye, ExternalLink, MoreHorizontal, Download, Share2, Bookmark, BookmarkCheck, User, Settings, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FactCheck {
  id: string;
  claim: string;
  truthScore: number;
  verdict: 'Likely True' | 'Partially True' | 'Likely False';
  category: 'Salary' | 'Job Posting' | 'Career Advice' | 'Company Info' | 'Scam Alert';
  date: string;
  isBookmarked: boolean;
  sources: number;
  summary: string;
}

interface UserStats {
  totalFactChecks: number;
  averageAccuracy: number;
  scamsDetected: number;
  timesSaved: number;
  streakDays: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD',
    jobTitle: 'Software Engineer',
    company: 'Tech Corp',
    joinDate: '2024-01-15'
  };

  // Mock user stats
  const userStats: UserStats = {
    totalFactChecks: 47,
    averageAccuracy: 78,
    scamsDetected: 12,
    timesSaved: 156,
    streakDays: 7
  };

  // Mock fact-check history
  const factCheckHistory: FactCheck[] = [
    {
      id: '1',
      claim: 'Software engineers in Toronto make $150K starting salary',
      truthScore: 73,
      verdict: 'Partially True',
      category: 'Salary',
      date: '2024-08-05',
      isBookmarked: true,
      sources: 5,
      summary: 'Entry-level positions typically start between $70K-$95K. Senior roles can reach $150K+.'
    },
    {
      id: '2',
      claim: 'Make $5000/week working from home with no experience - just send $99',
      truthScore: 12,
      verdict: 'Likely False',
      category: 'Scam Alert',
      date: '2024-08-04',
      isBookmarked: false,
      sources: 3,
      summary: 'Classic employment scam with multiple red flags including upfront payment requests.'
    },
    {
      id: '3',
      claim: 'Google is hiring 10,000 remote workers this quarter',
      truthScore: 45,
      verdict: 'Partially True',
      category: 'Job Posting',
      date: '2024-08-03',
      isBookmarked: true,
      sources: 4,
      summary: 'Google has announced hiring plans but numbers and timeline require verification.'
    },
    {
      id: '4',
      claim: 'You should quit your job without another one lined up to show confidence',
      truthScore: 25,
      verdict: 'Likely False',
      category: 'Career Advice',
      date: '2024-08-02',
      isBookmarked: false,
      sources: 6,
      summary: 'Financial experts generally advise against quitting without a backup plan.'
    },
    {
      id: '5',
      claim: 'Netflix pays junior developers $200K+ in Vancouver',
      truthScore: 85,
      verdict: 'Likely True',
      category: 'Salary',
      date: '2024-08-01',
      isBookmarked: true,
      sources: 7,
      summary: 'Netflix is known for top-tier compensation packages, including in Canadian offices.'
    },
    {
      id: '6',
      claim: 'AI will replace all software developers by 2025',
      truthScore: 15,
      verdict: 'Likely False',
      category: 'Career Advice',
      date: '2024-07-31',
      isBookmarked: false,
      sources: 8,
      summary: 'Industry experts agree AI will augment rather than replace developers in the near term.'
    }
  ];

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Likely True':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Partially True':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Likely False':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Likely True':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Partially True':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Likely False':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Salary':
        return 'bg-blue-100 text-blue-800';
      case 'Job Posting':
        return 'bg-purple-100 text-purple-800';
      case 'Career Advice':
        return 'bg-indigo-100 text-indigo-800';
      case 'Company Info':
        return 'bg-cyan-100 text-cyan-800';
      case 'Scam Alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleBookmark = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle bookmark for fact-check ${id}`);
  };

  const filteredFactChecks = factCheckHistory.filter(factCheck => {
    const matchesSearch = factCheck.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         factCheck.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'bookmarked' && factCheck.isBookmarked) ||
                         factCheck.category.toLowerCase().replace(' ', '-') === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-hero-bg rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-display text-gray-900">truscribe</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <a href="#" className="text-hero-bg font-medium text-xs sm:text-sm border-b-2 border-hero-bg pb-3 sm:pb-4">
                  DASHBOARD
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm pb-3 sm:pb-4">
                  FACT-CHECK
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm pb-3 sm:pb-4">
                  REPORTS
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm pb-3 sm:pb-4">
                  SETTINGS
                </a>
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => router.push('/')}
                className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-semibold text-xs sm:text-sm px-3 sm:px-6 py-2"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New Fact-Check</span>
                <span className="sm:hidden">New</span>
              </Button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-hero-bg rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-semibold">{userData.avatar}</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{userData.name}</div>
                    <div className="text-xs text-gray-500">{userData.jobTitle}</div>
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <a href="/dashboard" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
            Welcome back, {userData.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your fact-checking activity and insights.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Fact-Checks</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{userStats.totalFactChecks}</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Avg. Accuracy</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{userStats.averageAccuracy}%</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Scams Detected</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{userStats.scamsDetected}</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{userStats.timesSaved}h</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm col-span-2 sm:col-span-1">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{userStats.streakDays} days</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accuracy Trend */}
        <Card className="bg-white border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 font-display">
              Your Fact-Checking Accuracy Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
  <div className="space-y-6">
    {/* Chart Container */}
    <div className="h-64 w-full">
      <div className="relative h-full">
        {/* Chart Background Grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Y-axis labels */}
          <text x="20" y="20" className="text-xs fill-gray-500">100%</text>
          <text x="20" y="60" className="text-xs fill-gray-500">75%</text>
          <text x="20" y="100" className="text-xs fill-gray-500">50%</text>
          <text x="20" y="140" className="text-xs fill-gray-500">25%</text>
          <text x="20" y="180" className="text-xs fill-gray-500">0%</text>
          
          {/* Chart Line */}
          <polyline
            points="60,140 180,120 300,60"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          
          {/* Data Points */}
          <circle cx="60" cy="140" r="4" fill="#ef4444" className="drop-shadow-sm" />
          <circle cx="180" cy="120" r="4" fill="#eab308" className="drop-shadow-sm" />
          <circle cx="300" cy="60" r="4" fill="#22c55e" className="drop-shadow-sm" />
          
          {/* Area Fill */}
          <path
            d="M 60,140 L 180,120 L 300,60 L 300,180 L 60,180 Z"
            fill="url(#areaGradient)"
            opacity="0.1"
          />
          
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* X-axis labels */}
          <text x="60" y="195" className="text-xs fill-gray-500 text-anchor-middle">3 Months Ago</text>
          <text x="180" y="195" className="text-xs fill-gray-500 text-anchor-middle">Last Month</text>
          <text x="300" y="195" className="text-xs fill-gray-500 text-anchor-middle">This Month</text>
        </svg>
        
        {/* Hover Points with Tooltips */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            {/* Tooltip for 3 months ago */}
            <div className="absolute" style={{ left: '15%', top: '70%' }}>
              <div className="group relative">
                <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  3 Months Ago: 68%
                </div>
              </div>
            </div>
            
            {/* Tooltip for last month */}
            <div className="absolute" style={{ left: '45%', top: '60%' }}>
              <div className="group relative">
                <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Last Month: 75%
                </div>
              </div>
            </div>
            
            {/* Tooltip for this month */}
            <div className="absolute" style={{ left: '75%', top: '30%' }}>
              <div className="group relative">
                <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  This Month: 82%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Chart Legend */}
    <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Needs Improvement</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Good Progress</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Excellent</span>
      </div>
    </div>
    
    {/* Improvement Message */}
    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-800">
          Great progress! Your accuracy has improved by 14% over the last 3 months.
        </span>
      </div>
    </div>
  </div>
</CardContent>
        </Card>

        {/* Fact-Check History */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-900 font-display">
                Recent Fact-Checks
              </CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search fact-checks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss-accent focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="bookmarked">Bookmarked</option>
                  <option value="salary">Salary</option>
                  <option value="job-posting">Job Posting</option>
                  <option value="career-advice">Career Advice</option>
                  <option value="company-info">Company Info</option>
                  <option value="scam-alert">Scam Alert</option>
                </select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredFactChecks.map((factCheck) => (
                <div key={factCheck.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getVerdictIcon(factCheck.verdict)}
                        <Badge className={`text-xs font-medium ${getVerdictColor(factCheck.verdict)}`}>
                          {factCheck.verdict}
                        </Badge>
                        <Badge className={`text-xs font-medium ${getCategoryColor(factCheck.category)}`}>
                          {factCheck.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(factCheck.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 font-display">
                        "{factCheck.claim}"
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {factCheck.summary}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Truth Score: {factCheck.truthScore}%
                        </span>
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {factCheck.sources} sources
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {factCheck.truthScore}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              factCheck.truthScore >= 70 ? 'bg-green-500' :
                              factCheck.truthScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${factCheck.truthScore}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => toggleBookmark(factCheck.id)}
                          variant="ghost"
                          size="sm"
                          className="p-2"
                        >
                          {factCheck.isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-moss-accent" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="p-2">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="p-2">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredFactChecks.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No fact-checks found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery ? 'Try adjusting your search terms' : 'Start fact-checking claims to see your history here'}
                  </p>
                  <Button
                    onClick={() => router.push('/')}
                    className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Fact-Check
                  </Button>
                </div>
              )}
            </div>
            
            {filteredFactChecks.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Load More Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
