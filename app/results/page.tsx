"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Shield,
  Zap,
  TrendingUp,
  Eye,
  ExternalLink,
  Share2,
  Copy,
  Download,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalysisResult {
  truthScore: number
  verdict: "Likely True" | "Partially True" | "Likely False"
  summary: string
  sources: Array<{
    title: string
    summary: string
    url: string
    credibility: string
  }>
  claimBreakdown: Array<{
    text: string
    flag: "accurate" | "misleading" | "false"
    explanation: string
  }>
  alternatives: Array<{
    title: string
    description: string
    url: string
  }>
}

const demoAnalysis: AnalysisResult = {
  truthScore: 73,
  verdict: "Partially True",
  summary:
    "This salary claim contains some accurate information but lacks important context. While senior software engineers in Toronto can earn $150K+, entry-level positions typically start between $70K-$95K. The claim oversimplifies a complex salary landscape that varies significantly by experience level, company size, and specific technologies.",
  sources: [
    {
      title: "Glassdoor Canada - Software Engineer Salaries Toronto",
      summary:
        "Based on 2,847 salary reports, software engineers in Toronto earn between $65K-$140K annually, with senior roles reaching $150K+. Entry-level positions average $78K.",
      url: "https://www.glassdoor.ca/Salaries/toronto-software-engineer-salary-SRCH_IL.0,7_IM976_KO8,25.htm",
      credibility: "High",
    },
    {
      title: "Statistics Canada - Information Technology Wages",
      summary:
        "Official government data shows IT professionals in Toronto metropolitan area earn median wages of $85K, with top 10% earning over $130K.",
      url: "https://www.statcan.gc.ca/en/subjects-start/labour/wages-salaries-and-other-earnings",
      credibility: "Very High",
    },
    {
      title: "Indeed Canada Salary Guide 2024",
      summary:
        "Software engineer salaries in Toronto range from $70K (junior) to $160K (senior), with average at $95K. Remote positions often pay 10-15% premium.",
      url: "https://ca.indeed.com/career/software-engineer/salaries/Toronto--ON",
      credibility: "High",
    },
  ],
  claimBreakdown: [
    {
      text: "Software engineers in Toronto make $150K starting salary",
      flag: "misleading",
      explanation:
        'This statement is misleading because it presents a senior-level salary as a "starting" salary. Entry-level software engineers in Toronto typically start between $70K-$95K. The $150K figure is more accurate for senior developers with 5+ years of experience.',
    },
    {
      text: "Toronto tech market salary expectations",
      flag: "accurate",
      explanation:
        "Toronto does have a robust tech market with competitive salaries. The city is Canada's largest tech hub with companies like Shopify, Wealthsimple, and major banks offering strong compensation packages.",
    },
  ],
  alternatives: [
    {
      title: "Levels.fyi - Toronto Tech Salaries",
      description:
        "Crowdsourced salary data from verified tech professionals at major Toronto companies including Shopify, RBC, and startups.",
      url: "https://www.levels.fyi/t/software-engineer/locations/toronto",
    },
    {
      title: "PayScale Canada - Software Engineer Compensation",
      description:
        "Detailed salary breakdowns by experience level, skills, and company size with Toronto-specific data and market trends.",
      url: "https://www.payscale.com/research/CA/Job=Software_Engineer/Salary/by_City",
    },
    {
      title: "Job Bank Canada - Software Engineer Outlook",
      description:
        "Government resource with official wage data, job market outlook, and career progression information for software engineers.",
      url: "https://www.jobbank.gc.ca/marketreport/wages-occupation/5485/ca",
    },
  ],
}

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get("demo") === "true"
  const [shareCardGenerated, setShareCardGenerated] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [originalClaim, setOriginalClaim] = useState<string>("")

  // Load analysis data on component mount
  useEffect(() => {
    if (isDemo) {
      // Use demo data
      setAnalysis(demoAnalysis)
      setOriginalClaim("Software engineers in Toronto make $150K starting salary")
    } else {
      // Load from sessionStorage
      const storedAnalysis = sessionStorage.getItem("truscribe-analysis")
      const storedClaim = sessionStorage.getItem("truscribe-claim")

      if (storedAnalysis && storedClaim) {
        setAnalysis(JSON.parse(storedAnalysis))
        setOriginalClaim(storedClaim)
      } else {
        // Redirect to home if no data found
        router.push("/")
      }
    }
  }, [isDemo, router])

  // Don't render anything until we have analysis data
  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-hero-bg border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    )
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "Likely True":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "Partially True":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case "Likely False":
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "Likely True":
        return "bg-green-100 text-green-800 border-green-200"
      case "Partially True":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Likely False":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-green-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case "accurate":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "misleading":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "false":
        return <Flag className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getFlagBorderColor = (flag: string) => {
    switch (flag) {
      case "accurate":
        return "border-l-green-500"
      case "misleading":
        return "border-l-yellow-500"
      case "false":
        return "border-l-red-500"
      default:
        return "border-l-gray-500"
    }
  }

  const shareToSocial = (platform: string) => {
    if (!analysis) return

    const text = `I just fact-checked a career claim on TruScribe! 🔍

Truth Score: ${analysis.truthScore}%
Verdict: ${analysis.verdict}

Stay protected from career scams! #TruScribed #CareerFactCheck`
    const url = window.location.href

    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`,
      tiktok: `https://www.tiktok.com/`,
    }

    if (platform === "copy") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${text}\n\n${url}`).catch((err) => {
          console.error("Failed to copy to clipboard:", err)
        })
      }
      return
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer")
    }
  }

  const generateShareCard = () => {
    setShareCardGenerated(true)
    setTimeout(() => setShareCardGenerated(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 p-1 sm:p-2"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Back to Home</span>
              </Button>
              <div className="h-4 sm:h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-hero-bg rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-display text-gray-900">truscribe</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-red-500 text-base sm:text-lg">🍁</span>
              <span className="text-xs sm:text-sm font-medium text-gray-600 hidden sm:inline">
                Canada's #1 Career Fact Checker
              </span>
              <span className="text-xs font-medium text-gray-600 sm:hidden">#1 Fact Checker</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Original Claim Display */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="text-blue-800 font-medium text-sm block mb-1">
                {isDemo ? "Demo Analysis" : "Your Claim"}
              </span>
              <p className="text-blue-700 text-sm leading-relaxed">"{originalClaim}"</p>
              {isDemo && (
                <p className="text-blue-600 text-xs mt-2">
                  This is a demonstration of TruScribe's fact-checking capabilities using sample data.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* AI Analysis Panel */}
          <Card className="bg-white border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getVerdictIcon(analysis.verdict)}
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
                  AI Analysis Results
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Truth Score Display */}
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="text-5xl md:text-7xl font-bold text-gray-900 font-display">
                    {analysis.truthScore}%
                  </div>

                  {/* Color-coded Progress Bar */}
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-4 md:h-6 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${getProgressColor(analysis.truthScore)}`}
                        style={{ width: `${analysis.truthScore}%` }}
                      />
                    </div>

                    {/* Progress Labels */}
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>0% False</span>
                      <span>50% Uncertain</span>
                      <span>100% True</span>
                    </div>
                  </div>

                  {/* Verdict Badge */}
                  <Badge
                    className={`text-lg md:text-xl px-6 md:px-8 py-2 md:py-3 border-2 font-bold font-display ${getVerdictColor(analysis.verdict)}`}
                  >
                    {analysis.verdict}
                  </Badge>
                </div>

                {/* AI Summary */}
                <div className="bg-gray-50 rounded-xl p-4 md:p-6 max-w-3xl mx-auto">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 font-display flex items-center gap-2">
                    <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                    AI Analysis Summary
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-sans">{analysis.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verified Sources Section */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900 font-display flex items-center gap-2">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                  Verified Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.sources.slice(0, 3).map((source, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-green-700 font-display text-sm">{source.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          source.credibility === "Very High"
                            ? "border-green-500 text-green-700"
                            : source.credibility === "High"
                              ? "border-blue-500 text-blue-700"
                              : "border-yellow-500 text-yellow-700"
                        }`}
                      >
                        {source.credibility}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 font-sans leading-relaxed">{source.summary}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                    >
                      View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Claim Breakdown */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900 font-display flex items-center gap-2">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                  Claim Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.claimBreakdown.map((item, index) => (
                  <div key={index} className={`bg-gray-50 rounded-lg p-4 border-l-4 ${getFlagBorderColor(item.flag)}`}>
                    <div className="flex items-start gap-3">
                      {getFlagIcon(item.flag)}
                      <div className="flex-1">
                        <div className="bg-white rounded p-3 mb-3 border border-gray-200">
                          <p className="font-medium text-gray-900 text-sm font-sans">"{item.text}"</p>
                        </div>
                        <div className="space-y-2">
                          <Badge
                            className={`text-xs ${
                              item.flag === "accurate"
                                ? "bg-green-100 text-green-800"
                                : item.flag === "misleading"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.flag.toUpperCase()}
                          </Badge>
                          <p className="text-gray-600 text-sm font-sans leading-relaxed">{item.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alternative Verified Advice */}
          <Card className="bg-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold text-gray-900 font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                Alternative Verified Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analysis.alternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-5 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <h4 className="font-semibold text-blue-700 mb-3 font-display">{alt.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 font-sans leading-relaxed">{alt.description}</p>
                    <a
                      href={alt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      Explore Resource <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Share Feature */}
          <Card className="bg-gradient-to-r from-blue-600 to-green-500 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold font-display flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5 md:w-6 md:h-6" />
                Share Your TruScribed Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white/90 text-center font-sans text-base md:text-lg">
                Help others avoid career scams by sharing your fact-check results
              </p>

              {/* Generate Share Card */}
              <div className="text-center">
                <Button
                  onClick={generateShareCard}
                  disabled={shareCardGenerated}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-sans mb-4"
                >
                  {shareCardGenerated ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Share Card Generated!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Generate Share Card
                    </div>
                  )}
                </Button>
              </div>

              {/* Social Share Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => shareToSocial("linkedin")}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-sans text-sm"
                >
                  Share on LinkedIn
                </Button>
                <Button
                  onClick={() => shareToSocial("twitter")}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-sans text-sm"
                >
                  Share on Twitter
                </Button>
                <Button
                  onClick={() => shareToSocial("tiktok")}
                  className="bg-black hover:bg-gray-800 text-white font-sans text-sm"
                >
                  Share on TikTok
                </Button>
                <Button
                  onClick={() => shareToSocial("instagram")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-sans text-sm"
                >
                  Share on Instagram
                </Button>
                <Button
                  onClick={() => shareToSocial("copy")}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-sans text-sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
