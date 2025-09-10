"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  CheckCircle,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Users,
  Search,
  Filter,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface JobPlatform {
  id: string
  name: string
  description: string
  trustScore: number
  verificationLevel: "Government" | "Corporate" | "Community"
  url: string
  logo: string
  features: string[]
  jobCount: string
}

interface FeaturedJob {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  posted: string
  platform: string
  verified: boolean
  description: string
}

const jobPlatforms: JobPlatform[] = [
  {
    id: "job-bank-canada",
    name: "Job Bank Canada",
    description: "Official Government of Canada job portal with verified employers and accurate wage data.",
    trustScore: 98,
    verificationLevel: "Government",
    url: "https://www.jobbank.gc.ca",
    logo: "🇨🇦",
    features: ["Government Verified", "Wage Transparency", "Labour Market Info", "No Scams"],
    jobCount: "50,000+",
  },
  {
    id: "usajobs",
    name: "USAJobs",
    description: "Official United States government job portal for federal employment opportunities.",
    trustScore: 97,
    verificationLevel: "Government",
    url: "https://www.usajobs.gov",
    logo: "🇺🇸",
    features: ["Federal Jobs", "Security Clearance", "Benefits Package", "Career Progression"],
    jobCount: "25,000+",
  },
  {
    id: "linkedin",
    name: "LinkedIn Jobs",
    description: "Professional network with verified company profiles and employee connections.",
    trustScore: 89,
    verificationLevel: "Corporate",
    url: "https://www.linkedin.com/jobs",
    logo: "💼",
    features: ["Company Verification", "Employee Networks", "Skill Matching", "Professional Profiles"],
    jobCount: "20M+",
  },
  {
    id: "indeed",
    name: "Indeed",
    description: "Large job aggregator with company reviews and salary insights from real employees.",
    trustScore: 85,
    verificationLevel: "Corporate",
    url: "https://www.indeed.com",
    logo: "🔍",
    features: ["Company Reviews", "Salary Data", "Application Tracking", "Job Alerts"],
    jobCount: "15M+",
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    description: "Transparent job platform with employee reviews, salary data, and company insights.",
    trustScore: 87,
    verificationLevel: "Community",
    url: "https://www.glassdoor.com",
    logo: "🏢",
    features: ["Salary Transparency", "Employee Reviews", "Interview Insights", "Company Culture"],
    jobCount: "2M+",
  },
  {
    id: "angellist",
    name: "AngelList (Wellfound)",
    description: "Startup-focused job platform with equity information and founder connections.",
    trustScore: 83,
    verificationLevel: "Corporate",
    url: "https://wellfound.com",
    logo: "🚀",
    features: ["Startup Focus", "Equity Details", "Founder Access", "Tech Roles"],
    jobCount: "130K+",
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow Jobs",
    description: "Developer-focused job board with technical skill matching and company tech stacks.",
    trustScore: 86,
    verificationLevel: "Community",
    url: "https://stackoverflow.com/jobs",
    logo: "💻",
    features: ["Tech Focus", "Skill Matching", "Developer Community", "Remote Options"],
    jobCount: "50K+",
  },
  {
    id: "dice",
    name: "Dice",
    description: "Technology career platform with detailed job requirements and salary benchmarks.",
    trustScore: 82,
    verificationLevel: "Corporate",
    url: "https://www.dice.com",
    logo: "🎲",
    features: ["Tech Careers", "Salary Benchmarks", "Skill Assessments", "Career Advice"],
    jobCount: "80K+",
  },
]

const featuredJobs: FeaturedJob[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Shopify",
    location: "Toronto, ON",
    salary: "$120K - $160K",
    type: "Full-time",
    posted: "2 days ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description:
      "Join our platform team to build scalable e-commerce solutions used by millions of merchants worldwide.",
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Government of Canada",
    location: "Ottawa, ON",
    salary: "$85K - $110K",
    type: "Permanent",
    posted: "1 day ago",
    platform: "Job Bank Canada",
    verified: true,
    description: "Analyze public data to inform policy decisions and improve government services for Canadians.",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "Wealthsimple",
    location: "Toronto, ON (Remote)",
    salary: "$130K - $170K",
    type: "Full-time",
    posted: "3 days ago",
    platform: "AngelList",
    verified: true,
    description: "Lead product strategy for our investment platform serving over 3 million Canadians.",
  },
  {
    id: "4",
    title: "UX Designer",
    company: "Slack",
    location: "Vancouver, BC",
    salary: "$95K - $125K",
    type: "Full-time",
    posted: "1 week ago",
    platform: "Glassdoor",
    verified: true,
    description: "Design intuitive user experiences for collaboration tools used by teams worldwide.",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Stripe",
    location: "Toronto, ON",
    salary: "$110K - $145K",
    type: "Full-time",
    posted: "3 days ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description: "Build and maintain infrastructure that processes billions of dollars in payments globally.",
  },
  {
    id: "6",
    title: "Marketing Manager",
    company: "Canva",
    location: "Vancouver, BC (Hybrid)",
    salary: "$80K - $105K",
    type: "Full-time",
    posted: "5 days ago",
    platform: "Indeed",
    verified: true,
    description: "Drive growth marketing initiatives for our design platform used by millions worldwide.",
  },
  {
    id: "7",
    title: "Full Stack Developer",
    company: "Notion",
    location: "Remote",
    salary: "$100K - $130K",
    type: "Full-time",
    posted: "1 week ago",
    platform: "Stack Overflow Jobs",
    verified: true,
    description: "Build features that help teams organize and collaborate more effectively.",
  },
  {
    id: "8",
    title: "Data Engineer",
    company: "Databricks",
    location: "Toronto, ON",
    salary: "$115K - $150K",
    type: "Full-time",
    posted: "4 days ago",
    platform: "Glassdoor",
    verified: true,
    description: "Design and build data pipelines that power machine learning at scale.",
  },
  {
    id: "9",
    title: "Security Analyst",
    company: "Government of Canada",
    location: "Ottawa, ON",
    salary: "$75K - $95K",
    type: "Permanent",
    posted: "2 days ago",
    platform: "Job Bank Canada",
    verified: true,
    description: "Protect critical government infrastructure and citizen data from cyber threats.",
  },
  {
    id: "10",
    title: "Frontend Developer",
    company: "Figma",
    location: "Remote",
    salary: "$90K - $120K",
    type: "Full-time",
    posted: "6 days ago",
    platform: "AngelList",
    verified: true,
    description: "Create beautiful, performant interfaces for the world's leading design tool.",
  },
  {
    id: "11",
    title: "Machine Learning Engineer",
    company: "OpenAI",
    location: "Remote",
    salary: "$150K - $200K",
    type: "Full-time",
    posted: "1 day ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description: "Develop and deploy AI models that push the boundaries of artificial intelligence.",
  },
  {
    id: "12",
    title: "Sales Development Representative",
    company: "HubSpot",
    location: "Toronto, ON",
    salary: "$55K - $70K",
    type: "Full-time",
    posted: "3 days ago",
    platform: "Indeed",
    verified: true,
    description: "Generate qualified leads and help businesses grow with our marketing platform.",
  },
  {
    id: "13",
    title: "Cloud Architect",
    company: "Amazon Web Services",
    location: "Vancouver, BC",
    salary: "$140K - $180K",
    type: "Full-time",
    posted: "1 week ago",
    platform: "Glassdoor",
    verified: true,
    description: "Design scalable cloud solutions for enterprise customers across various industries.",
  },
  {
    id: "14",
    title: "Content Marketing Specialist",
    company: "Mailchimp",
    location: "Remote",
    salary: "$65K - $85K",
    type: "Full-time",
    posted: "5 days ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description: "Create compelling content that helps small businesses succeed with email marketing.",
  },
  {
    id: "15",
    title: "iOS Developer",
    company: "Spotify",
    location: "Toronto, ON",
    salary: "$105K - $135K",
    type: "Full-time",
    posted: "2 days ago",
    platform: "Stack Overflow Jobs",
    verified: true,
    description: "Build features for the iOS app that brings music to millions of users daily.",
  },
  {
    id: "16",
    title: "Business Analyst",
    company: "Royal Bank of Canada",
    location: "Toronto, ON",
    salary: "$70K - $90K",
    type: "Full-time",
    posted: "4 days ago",
    platform: "Indeed",
    verified: true,
    description: "Analyze business processes and drive digital transformation initiatives.",
  },
  {
    id: "17",
    title: "Cybersecurity Specialist",
    company: "Shopify",
    location: "Ottawa, ON",
    salary: "$95K - $125K",
    type: "Full-time",
    posted: "1 week ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description: "Protect merchant and customer data across our global e-commerce platform.",
  },
  {
    id: "18",
    title: "Technical Writer",
    company: "Atlassian",
    location: "Remote",
    salary: "$75K - $95K",
    type: "Full-time",
    posted: "6 days ago",
    platform: "AngelList",
    verified: true,
    description: "Create clear, helpful documentation for developer tools used by millions.",
  },
  {
    id: "19",
    title: "HR Generalist",
    company: "Slack",
    location: "Vancouver, BC",
    salary: "$65K - $80K",
    type: "Full-time",
    posted: "3 days ago",
    platform: "Glassdoor",
    verified: true,
    description: "Support employee lifecycle and culture initiatives in our growing organization.",
  },
  {
    id: "20",
    title: "Backend Engineer",
    company: "Discord",
    location: "Remote",
    salary: "$110K - $140K",
    type: "Full-time",
    posted: "2 days ago",
    platform: "Stack Overflow Jobs",
    verified: true,
    description: "Build scalable systems that power real-time communication for millions of users.",
  },
  {
    id: "21",
    title: "Financial Analyst",
    company: "TD Bank",
    location: "Toronto, ON",
    salary: "$60K - $75K",
    type: "Full-time",
    posted: "5 days ago",
    platform: "Indeed",
    verified: true,
    description: "Analyze financial data and provide insights to support strategic decision making.",
  },
  {
    id: "22",
    title: "Quality Assurance Engineer",
    company: "Zoom",
    location: "Remote",
    salary: "$80K - $100K",
    type: "Full-time",
    posted: "1 week ago",
    platform: "LinkedIn Jobs",
    verified: true,
    description: "Ensure the quality and reliability of video conferencing solutions used globally.",
  },
  {
    id: "23",
    title: "Social Media Manager",
    company: "Buffer",
    location: "Remote",
    salary: "$55K - $70K",
    type: "Full-time",
    posted: "4 days ago",
    platform: "AngelList",
    verified: true,
    description: "Manage social media strategy and community engagement for our platform.",
  },
  {
    id: "24",
    title: "Research Scientist",
    company: "Google DeepMind",
    location: "Toronto, ON",
    salary: "$160K - $220K",
    type: "Full-time",
    posted: "2 days ago",
    platform: "Glassdoor",
    verified: true,
    description: "Conduct cutting-edge AI research to solve complex real-world problems.",
  },
]

export default function VerifiedJobsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [selectedVerificationLevels, setSelectedVerificationLevels] = useState<string[]>([])
  const [minTrustScore, setMinTrustScore] = useState(0)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("featured-jobs")
  const [displayedJobs, setDisplayedJobs] = useState(8)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const categories = ["All", "Government", "Technology", "Remote", "Entry Level", "Senior Level"]

  const getTrustScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 85) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 75) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getVerificationBadgeColor = (level: string) => {
    switch (level) {
      case "Government":
        return "bg-green-100 text-green-800 border-green-200"
      case "Corporate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Community":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredPlatforms = jobPlatforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Government" && platform.verificationLevel === "Government") ||
      (selectedCategory === "Technology" &&
        (platform.name.includes("Stack") || platform.name.includes("Dice") || platform.name.includes("AngelList"))) ||
      selectedCategory === platform.verificationLevel

    const matchesVerificationLevel =
      selectedVerificationLevels.length === 0 || selectedVerificationLevels.includes(platform.verificationLevel)

    const matchesTrustScore = platform.trustScore >= minTrustScore

    const matchesFeatures =
      selectedFeatures.length === 0 || selectedFeatures.some((feature) => platform.features.includes(feature))

    return matchesSearch && matchesCategory && matchesVerificationLevel && matchesTrustScore && matchesFeatures
  })

  const toggleVerificationLevel = (level: string) => {
    setSelectedVerificationLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedVerificationLevels([])
    setMinTrustScore(0)
    setSelectedFeatures([])
    setSearchQuery("")
  }

  const allFeatures = Array.from(new Set(jobPlatforms.flatMap((p) => p.features)))

  const loadMoreJobs = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayedJobs((prev) => Math.min(prev + 8, featuredJobs.length))
      setIsLoadingMore(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to TruScribe
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-moss-accent" />
                <h1 className="text-xl font-bold text-gray-900">Verified Jobs</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Trusted Sources Only</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Browse Jobs from Trusted Sources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Find legitimate job opportunities from verified platforms. We aggregate listings only from reputable sources
            to help you avoid scams and find quality employment.
          </p>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-blue-800 font-medium mb-1">Important Disclaimer</p>
                <p className="text-sm text-blue-700">
                  TruScribe aggregates links from reputable platforms. Always apply directly on the official job board
                  and verify job details independently. We are not responsible for job content or hiring decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="mb-12">
          {/* Tab Navigation */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setActiveTab("featured-jobs")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "featured-jobs"
                    ? "bg-moss-accent text-hero-bg shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Featured Verified Jobs
                <span className="ml-2 bg-moss-accent/20 text-moss-accent px-2 py-1 rounded-full text-xs">
                  {featuredJobs.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("platforms")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "platforms"
                    ? "bg-moss-accent text-hero-bg shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Trusted Job Platforms
                <span className="ml-2 bg-moss-accent/20 text-moss-accent px-2 py-1 rounded-full text-xs">
                  {filteredPlatforms.length}
                </span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "featured-jobs" && (
            <div>
              {/* Enhanced Search and Filter for Jobs */}
              <div className="mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filter Featured Jobs</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                      className="flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      {isFilterExpanded ? "Hide Filters" : "Show Filters"}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </div>

                  {/* Search Bar - Always Visible */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss-accent focus:border-transparent"
                    />
                  </div>

                  {/* Collapsible Filter Section */}
                  {isFilterExpanded && (
                    <div className="space-y-6 border-t border-gray-200 pt-6">
                      {/* Job-specific filters can be added here */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-moss-accent focus:border-transparent">
                            <option>All Types</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Remote</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-moss-accent focus:border-transparent">
                            <option>All Levels</option>
                            <option>Entry Level</option>
                            <option>Mid Level</option>
                            <option>Senior Level</option>
                            <option>Executive</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-moss-accent focus:border-transparent">
                            <option>All Locations</option>
                            <option>Remote</option>
                            <option>Toronto, ON</option>
                            <option>Vancouver, BC</option>
                            <option>Ottawa, ON</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredJobs.slice(0, displayedJobs).map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">{job.title}</h4>
                          {job.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                      <span className="bg-moss-accent/10 text-moss-accent px-2 py-1 rounded text-xs font-medium">
                        {job.platform}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{job.description}</p>

                    <Button
                      onClick={() => {
                        const platformUrl = jobPlatforms.find((p) => p.name === job.platform)?.url || "#"
                        window.open(platformUrl, "_blank")
                      }}
                      className="w-full bg-hero-bg hover:bg-hero-bg/90 text-white"
                    >
                      View on {job.platform}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {displayedJobs < featuredJobs.length && (
                <div className="text-center mt-8">
                  <Button
                    onClick={loadMoreJobs}
                    disabled={isLoadingMore}
                    className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg px-8 py-3"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-hero-bg mr-2"></div>
                        Loading More Jobs...
                      </>
                    ) : (
                      <>Load More Jobs ({featuredJobs.length - displayedJobs} remaining)</>
                    )}
                  </Button>
                </div>
              )}

              {displayedJobs >= featuredJobs.length && (
                <div className="text-center mt-8 p-6 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-600">You've viewed all available jobs!</p>
                  <p className="text-sm text-gray-500 mt-1">Check back later for new opportunities</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "platforms" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted Job Platforms</h3>
                <p className="text-gray-600">Verified sources for legitimate job opportunities</p>
              </div>

              {/* Enhanced Search and Filter for Platforms */}
              <div className="mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filter Job Platforms</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                      className="flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      {isFilterExpanded ? "Hide Filters" : "Show Filters"}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </div>

                  {/* Search Bar - Always Visible */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search platforms, descriptions, or features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss-accent focus:border-transparent"
                    />
                  </div>

                  {/* Collapsible Filter Section */}
                  {isFilterExpanded && (
                    <div className="space-y-6 border-t border-gray-200 pt-6">
                      {/* Active Filters Display */}
                      {(selectedVerificationLevels.length > 0 ||
                        minTrustScore > 0 ||
                        selectedFeatures.length > 0 ||
                        selectedCategory !== "All") && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Active filters:</span>
                          {selectedCategory !== "All" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-moss-accent/10 text-moss-accent rounded-full text-xs">
                              Category: {selectedCategory}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                            </span>
                          )}
                          {selectedVerificationLevels.map((level) => (
                            <span
                              key={level}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {level}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleVerificationLevel(level)} />
                            </span>
                          ))}
                          {minTrustScore > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Trust Score: {minTrustScore}%+
                              <X className="w-3 h-3 cursor-pointer" onClick={() => setMinTrustScore(0)} />
                            </span>
                          )}
                          {selectedFeatures.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                            >
                              {feature}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFeature(feature)} />
                            </span>
                          ))}
                          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                            Clear All
                          </Button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-moss-accent focus:border-transparent"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Level</label>
                          <div className="space-y-2">
                            {["Government", "Corporate", "Community"].map((level) => (
                              <label key={level} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedVerificationLevels.includes(level)}
                                  onChange={() => toggleVerificationLevel(level)}
                                  className="rounded border-gray-300 text-moss-accent focus:ring-moss-accent"
                                />
                                <span className="ml-2 text-sm text-gray-700">{level}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Trust Score: {minTrustScore}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={minTrustScore}
                            onChange={(e) => setMinTrustScore(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {allFeatures.slice(0, 8).map((feature) => (
                              <label key={feature} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedFeatures.includes(feature)}
                                  onChange={() => toggleFeature(feature)}
                                  className="rounded border-gray-300 text-moss-accent focus:ring-moss-accent"
                                />
                                <span className="ml-2 text-xs text-gray-700">{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{platform.logo}</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getVerificationBadgeColor(
                                platform.verificationLevel,
                              )}`}
                            >
                              {platform.verificationLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${getTrustScoreColor(
                          platform.trustScore,
                        )}`}
                      >
                        {platform.trustScore}%
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{platform.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {platform.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <Users className="w-4 h-4 inline mr-1" />
                        {platform.jobCount} jobs
                      </span>
                      <Button
                        onClick={() => window.open(platform.url, "_blank")}
                        size="sm"
                        className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg"
                      >
                        Visit Platform
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Resources */}
      </div>
    </div>
  )
}
