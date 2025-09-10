"use client"

import { useState, useEffect } from "react"
import {
  X,
  CheckCircle,
  Menu,
  Shield,
  AlertTriangle,
  AlertCircle,
  Flag,
  TrendingUp,
  Search,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"

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

export default function TruScribeLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const [factCheckText, setFactCheckText] = useState("")
  const [isFactChecking, setIsFactChecking] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [shareCardGenerated, setShareCardGenerated] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [remainingFactChecks, setRemainingFactChecks] = useState(3)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const carouselWords = [
    "career claim",
    "salary claim",
    "job listing",
    "employment offer",
    "work opportunity",
    "career advice",
  ]
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("userSession")
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsAuthenticated(authToken !== null || isLoggedIn)
    }

    checkAuth()

    // Listen for storage changes to update auth state
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Carousel effect for rotating words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % carouselWords.length)
    }, 2000) // Change word every 2 seconds

    return () => clearInterval(interval)
  }, [carouselWords.length])

  // Add this useEffect after the existing useEffects, inside the component function
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileMenuOpen && !target.closest("#mobile-menu") && !target.closest('button[aria-controls="mobile-menu"]')) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden" // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const handleFactCheck = async () => {
    if (!factCheckText.trim() || remainingFactChecks <= 0) return

    setIsFactChecking(true)

    try {
      // Simulate AI analysis with demo data
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const demoResult = getDemoAnalysis(factCheckText.trim())

      // Decrement remaining fact-checks
      setRemainingFactChecks((prev) => Math.max(0, prev - 1))

      // Store the analysis result in sessionStorage and redirect
      sessionStorage.setItem("truscribe-analysis", JSON.stringify(demoResult))
      sessionStorage.setItem("truscribe-claim", factCheckText.trim())
      router.push("/results")
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsFactChecking(false)
    }
  }

  const handleEmailSignup = async () => {
    if (!email.trim()) return

    setEmailSubmitted(true)
    setTimeout(() => setEmailSubmitted(false), 3000)
  }

  const getDemoAnalysis = (claim: string): AnalysisResult => {
    const lowerClaim = claim.toLowerCase()

    if (lowerClaim.includes("software engineer") || lowerClaim.includes("$150k") || lowerClaim.includes("toronto")) {
      return {
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
    }

    // Demo analysis for scam-related claims
    if (
      lowerClaim.includes("work from home") &&
      (lowerClaim.includes("$5000") || lowerClaim.includes("no experience") || lowerClaim.includes("$99"))
    ) {
      return {
        truthScore: 12,
        verdict: "Likely False",
        summary:
          "This claim exhibits multiple red flags characteristic of employment scams. The combination of unrealistic income promises ($5000/week), no experience requirements, and upfront payment requests are classic indicators of fraudulent schemes. Legitimate remote work opportunities exist, but they require skills and never ask for upfront payments.",
        sources: [
          {
            title: "Federal Trade Commission - Work-at-Home Scams",
            summary:
              "Official FTC warning about work-from-home scams, including common tactics like upfront fees, unrealistic income promises, and vague job descriptions.",
            url: "https://consumer.ftc.gov/articles/work-home-scams",
            credibility: "Very High",
          },
          {
            title: "Better Business Bureau - Employment Scam Report 2024",
            summary:
              "BBB tracked over 14,000 employment scam reports in 2023, with work-from-home schemes being the most common, averaging $1,200 in losses per victim.",
            url: "https://www.bbb.org/article/news-releases/27045-bbb-study-employment-scams-target-job-seekers",
            credibility: "High",
          },
          {
            title: "FBI Internet Crime Complaint Center - Employment Fraud",
            summary:
              "FBI reports employment fraud increased 65% in 2023, with work-from-home scams targeting job seekers with promises of easy money and flexible schedules.",
            url: "https://www.ic3.gov/Media/Y2024/PSA240216",
            credibility: "Very High",
          },
        ],
        claimBreakdown: [
          {
            text: "Make $5000/week working from home with no experience",
            flag: "false",
            explanation:
              "This is a classic scam promise. Legitimate remote work paying $260,000+ annually requires significant skills and experience. Entry-level remote positions typically pay $35K-$50K annually.",
          },
          {
            text: "Just send $99 for starter kit or training materials",
            flag: "false",
            explanation:
              "Legitimate employers NEVER ask for upfront payments. This is the #1 red flag for employment scams. Real companies provide training and materials at no cost to employees.",
          },
        ],
        alternatives: [
          {
            title: "FlexJobs - Verified Remote Opportunities",
            description:
              "Hand-screened remote job listings from legitimate companies. All employers are verified and no job posting fees are allowed.",
            url: "https://www.flexjobs.com",
          },
          {
            title: "Remote.co - Curated Remote Jobs",
            description:
              "Carefully curated remote job opportunities from established companies with transparent hiring processes and realistic salary ranges.",
            url: "https://remote.co",
          },
          {
            title: "We Work Remotely - Largest Remote Job Board",
            description:
              "Established remote job platform featuring positions from reputable companies across various industries with clear job requirements.",
            url: "https://weworkremotely.com",
          },
        ],
      }
    }

    // Default demo analysis for any other claims
    return {
      truthScore: 65,
      verdict: "Partially True",
      summary:
        "This career claim contains elements that may be accurate but requires additional context and verification. Career advice and job market information can vary significantly based on individual circumstances, geographic location, industry conditions, and timing.",
      sources: [
        {
          title: "LinkedIn Workforce Report 2024",
          summary:
            "Comprehensive analysis of job market trends, in-demand skills, and hiring patterns across industries with data from 900+ million professionals.",
          url: "https://www.linkedin.com/business/learning/blog/learning-and-development/workplace-learning-report",
          credibility: "High",
        },
        {
          title: "McKinsey Global Institute - Future of Work",
          summary:
            "Research-driven insights on changing job markets, skill requirements, and career development strategies in the evolving economy.",
          url: "https://www.mckinsey.com/featured-insights/future-of-work",
          credibility: "Very High",
        },
        {
          title: "World Economic Forum - Jobs Report",
          summary:
            "Annual analysis of global employment trends, emerging job categories, and skills needed for future career success.",
          url: "https://www.weforum.org/reports/the-future-of-jobs-report-2023",
          credibility: "Very High",
        },
      ],
      claimBreakdown: [
        {
          text: "General career advice or market observation",
          flag: "accurate",
          explanation:
            "The general premise appears sound and aligns with common industry knowledge and current market trends.",
        },
        {
          text: "Specific details or universal applicability",
          flag: "misleading",
          explanation:
            "Some specifics may be outdated, overgeneralized, or not applicable to all markets, experience levels, or individual circumstances.",
        },
      ],
      alternatives: [
        {
          title: "O*NET Interest Profiler",
          description:
            "U.S. Department of Labor career exploration tool with detailed occupation information, salary ranges, job outlook, and required skills.",
          url: "https://www.mynextmove.org/explore/ip",
        },
        {
          title: "CareerOneStop - Career Exploration Tools",
          description:
            "Government-sponsored career resource with salary data, job market information, training resources, and career assessment tools.",
          url: "https://www.careeronestop.org",
        },
        {
          title: "Glassdoor Career Guide",
          description:
            "Comprehensive career resources including salary data, company reviews, interview tips, and industry insights from real employees.",
          url: "https://www.glassdoor.com/blog/guide/",
        },
      ],
    }
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
        navigator.clipboard
          .writeText(`${text}

${url}`)
          .catch((err) => {
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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Pure Solid Background */}
      <section className="relative min-h-screen bg-hero-bg overflow-hidden">
        {/* Floating Header */}
        <header
          className={`fixed top-2 sm:top-4 lg:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl px-2 sm:px-4 transition-all duration-300 ${
            isScrolled ? "top-2 sm:top-4" : "top-2 sm:top-4 lg:top-6"
          }`}
        >
          <div
            className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 ${
              isScrolled ? "bg-white/95 border-gray-200" : "bg-white/10 border-white/20"
            }`}
          >
            <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-1.5">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isScrolled ? "bg-hero-bg/20" : "bg-white/20"
                    }`}
                  >
                    <CheckCircle
                      className={`w-3 h-3 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isScrolled ? "text-hero-bg" : "text-white"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-lg sm:text-xl font-bold font-display transition-colors duration-300 ${
                      isScrolled ? "text-gray-900" : "text-white"
                    }`}
                  >
                    truscribe
                  </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                  {isAuthenticated && (
                    <a
                      href="/dashboard"
                      className={`hover:opacity-80 transition-colors text-sm font-medium ${
                        isScrolled ? "text-gray-700" : "text-white/90"
                      }`}
                    >
                      DASHBOARD
                    </a>
                  )}
                  <a
                    href="/verified-jobs"
                    className={`hover:opacity-80 transition-colors text-sm font-medium ${
                      isScrolled ? "text-gray-700" : "text-white/90"
                    }`}
                  >
                    VERIFIED JOBS
                  </a>
                  <a
                    href="#how-it-works"
                    className={`hover:opacity-80 transition-colors text-sm font-medium ${
                      isScrolled ? "text-gray-700" : "text-white/90"
                    }`}
                  >
                    HOW IT WORKS
                  </a>
                  <a
                    href="#features"
                    className={`hover:opacity-80 transition-colors text-sm font-medium ${
                      isScrolled ? "text-gray-700" : "text-white/90"
                    }`}
                  >
                    FEATURES
                  </a>
                  <a
                    href="#pricing"
                    className={`hover:opacity-80 transition-colors text-sm font-medium ${
                      isScrolled ? "text-gray-700" : "text-white/90"
                    }`}
                  >
                    PRICING
                  </a>
                </nav>

                {/* CTA Buttons - Desktop */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                  <Button
                    onClick={() => router.push("/login")}
                    variant="ghost"
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 px-3 py-2 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    LOGIN
                  </Button>
                  <Button
                    onClick={() => router.push("/results?demo=true")}
                    className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg text-xs sm:text-sm font-bold px-3 sm:px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    GET STARTED
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {mobileMenuOpen ? (
                    <X
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isScrolled ? "text-gray-900" : "text-white"
                      }`}
                    />
                  ) : (
                    <Menu
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        isScrolled ? "text-gray-900" : "text-white"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden mt-2">
              <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2">
                  <nav className="space-y-1">
                    {isAuthenticated && (
                      <a
                        href="/dashboard"
                        className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </a>
                    )}
                    <a
                      href="/verified-jobs"
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Verified Jobs
                    </a>
                    <a
                      href="#how-it-works"
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How It Works
                    </a>
                    <a
                      href="#features"
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#pricing"
                      className="block px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </a>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex flex-col space-y-2 px-3 py-2">
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          router.push("/login")
                        }}
                        variant="outline"
                        className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 font-medium text-sm"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          router.push("/results?demo=true")
                        }}
                        className="w-full bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-bold text-sm"
                      >
                        Get Started
                      </Button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Hero Content */}
        <div className="relative z-10 max-w-full mx-auto px-3 sm:px-4 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/20">
              <span className="text-red-500 text-base sm:text-lg">🇨🇦</span>
              <span className="text-white text-xs sm:text-sm font-medium">
                Canada's #1 AI Job Fact Checker & Employment Truth App
              </span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 sm:mb-8 font-display leading-tight font-medium px-2">
              Fact-check any{" "}
              <span className="inline-block transition-all duration-500 ease-in-out transform">
                {carouselWords[currentWordIndex]}
              </span>{" "}
              instantly
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Detect fake job listings and verify career claims with AI. Canada's trusted job truth checker for
              employment scam protection.
            </p>

            {/* Fact Check Form */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10 mb-3 sm:mb-4">
                      <div className="w-2 h-2 bg-moss-accent rounded-full"></div>
                      <span className="text-white/80 text-xs sm:text-sm font-medium">
                        {remainingFactChecks > 0
                          ? `${remainingFactChecks} of 3 fact-checks remaining today`
                          : "Daily limit reached - Upgrade for unlimited access"}
                      </span>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Paste job claim or salary info to verify..."
                    value={factCheckText}
                    onChange={(e) => setFactCheckText(e.target.value)}
                    disabled={isFactChecking}
                    className="min-h-20 sm:min-h-24 md:min-h-32 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-moss-accent resize-none disabled:opacity-50 text-sm sm:text-base md:text-lg"
                  />

                  <Button
                    onClick={handleFactCheck}
                    disabled={!factCheckText.trim() || isFactChecking || remainingFactChecks <= 0}
                    className="w-full bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                  >
                    {remainingFactChecks <= 0 ? (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className="text-xs sm:text-sm md:text-base">Upgrade for More Fact-Checks</span>
                      </div>
                    ) : isFactChecking ? (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-hero-bg border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs sm:text-sm md:text-base">AI is analyzing your claim...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className="text-xs sm:text-sm md:text-base">TruScribe It Now</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Mockups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto scroll-animate px-2">
            {/* Career Analysis Mockup */}
            <div className="relative group animate-float sm:col-span-1" style={{ animationDelay: "0s" }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 shadow-2xl">
                <div className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/job-factcheck.jpg-wAgM6GHzuGHRUm9jp4eHacROJZ9nlF.jpeg"
                    alt="Professional using AI job fact checker app on smartphone to verify job listings and detect employment scams"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Job Search Dashboard Mockup */}
            <div className="relative group animate-float sm:col-span-2 lg:col-span-2" style={{ animationDelay: "2s" }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 shadow-2xl">
                <div className="aspect-[8/3] sm:aspect-[8/3] rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/job-verify.jpg-OAZkr2xbuCLbjCiDQSnw7zkozlTvZV.jpeg"
                    alt="Job seeker using AI career verification tool on laptop to fact-check job descriptions and salary claims"
                    width={800}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Fact-Checking Mockup */}
            <div className="relative group animate-float sm:col-span-1 lg:col-start-4" style={{ animationDelay: "4s" }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 shadow-2xl">
                <div className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/happy-users.jpg-5OvDBBjhnD0U4U7FOUVtCSlTleCjdq.jpeg"
                    alt="Happy professionals who successfully used AI job truth checker to find verified employment opportunities"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 scroll-animate">
            <div className="text-left mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4 tracking-wider">
                01 VERIFY CAREER CLAIMS INSTANTLY
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-display leading-tight">
                <span className="text-gray-900 font-medium text-5xl">AI Job Verification & Fake Job Detection </span>
                <br />
                <span className="text-gray-500 font-medium text-5xl">in one intelligent career platform.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            {/* AI Analysis Feature */}
            <div className="scroll-animate">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-gray-900 mb-3 sm:mb-4 font-display text-base sm:text-lg font-semibold">
                  AI-Powered Job Fact Checker
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Get instant truth scores (0-100%) for any job listing or career claim with our advanced AI job
                  verification engine. Perfect for entry-level job scam detection and employment truth verification.
                </p>
              </div>

              {/* Analysis Mockup */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-medium text-gray-500">CLAIM ANALYSIS</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">VERIFIED</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-700">Truth Score:</span>
                      <span className="text-base sm:text-lg font-bold text-green-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Software engineer salaries in Toronto vary by experience level...
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-hero-bg text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    FACT-CHECK WITH TRUSCRIBE
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Sources Feature */}
            

            {/* Scam Detection Feature */}
            <div className="scroll-animate">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-gray-900 mb-3 sm:mb-4 font-display text-base sm:text-lg font-semibold">
                  Fake Job Listing Detector
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Protect yourself from employment scams and fraudulent job offers. Specialized in remote job scams
                  check and entry-level job scam detection.
                </p>
              </div>

              {/* Scam Detection Mockup */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
                <div className="text-center mb-3 sm:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Scam Alert Analysis</h4>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-red-800 block">
                        Upfront Payment Required
                      </span>
                      <p className="text-xs text-red-600">High Risk Indicator</p>
                    </div>
                    <span className="text-xs text-red-700 font-bold">£99</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-yellow-800 block">Unrealistic Salary</span>
                      <p className="text-xs text-yellow-600">Medium Risk</p>
                    </div>
                    <span className="text-xs text-yellow-700 font-bold">$5000/week</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-red-800 block">No Experience Required</span>
                      <p className="text-xs text-red-600">Suspicious Pattern</p>
                    </div>
                    <span className="text-xs text-red-700 font-bold">⚠️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Job Listings Feature */}
            <div className="scroll-animate">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-gray-900 mb-3 sm:mb-4 font-display text-base sm:text-lg font-semibold">
                  Verified Job Listings
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Browse and apply with confidence. TruScribe curates job postings only from trusted and reputable
                  sources like LinkedIn, Glassdoor, Indeed, and government job banks—helping job seekers avoid scams and
                  misleading opportunities.
                </p>
              </div>

              {/* Verified Jobs Mockup */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-moss-accent" />
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Trusted Sources</h4>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-green-800 block">Government Job Banks</span>
                      <p className="text-xs text-green-600">98% Trust Score</p>
                    </div>
                    <span className="text-xs text-green-700 font-bold">🇨🇦</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-blue-800 block">LinkedIn Jobs</span>
                      <p className="text-xs text-blue-600">Verified Companies</p>
                    </div>
                    <span className="text-xs text-blue-700 font-bold">💼</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-purple-800 block">Glassdoor</span>
                      <p className="text-xs text-purple-600">Salary Transparency</p>
                    </div>
                    <span className="text-xs text-purple-700 font-bold">🏢</span>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Button
                    onClick={() => router.push("/verified-jobs")}
                    size="sm"
                    className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-medium text-xs sm:text-sm"
                  >
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Browse Verified Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 scroll-animate">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4 tracking-wider">02 HOW IT WORKS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display leading-tight">
              <span className="text-gray-900 font-medium text-5xl">Fact-check job descriptions and verify</span>
              <br />
              <span className="text-gray-500 font-medium text-5xl">employment claims in three steps.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our AI job checker analyzes career claims in seconds, providing verified information for confident job
              search decisions. Trusted by job seekers across Toronto, Vancouver, New York, and California.
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative mb-16 sm:mb-20">
            {/* Timeline Header */}
            <div className="flex justify-center items-center mb-12 sm:mb-16">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-16">
                <div className="text-center">
                  <div className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium mb-2">
                    STEP 01
                  </div>
                </div>
                <div className="hidden sm:block w-8 lg:w-16 h-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium mb-2">
                    STEP 02
                  </div>
                </div>
                <div className="hidden sm:block w-8 lg:w-16 h-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium mb-2">
                    STEP 03
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="scroll-animate">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 h-full">
                  <h3 className="text-gray-900 mb-4 sm:mb-6 font-display font-semibold text-lg">
                    Submit job listings for verification
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">
                        Paste any job posting or career claim for fact-checking
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">
                        AI resume analyzer checks job descriptions instantly
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">Instant processing and validation</span>
                    </li>
                  </ul>

                  {/* Mockup */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-3 h-3 bg-moss-accent rounded-full"></div>
                      <span className="text-xs text-gray-500 font-medium">CLAIM INPUT</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm text-gray-700">
                        "Software engineers in Toronto make $150K starting salary..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="scroll-animate">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 h-full">
                  <h3 className="text-xl text-gray-900 mb-4 sm:mb-6 font-display sm:text-lg font-semibold">
                    AI analyzes job posting authenticity
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">Cross-reference with verified employment databases</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">
                        Detect fake job offers and employment scams automatically
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">Check government salary databases</span>
                    </li>
                  </ul>

                  {/* Mockup */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs text-gray-500 font-medium">ANALYZING</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                        <span className="text-xs sm:text-sm text-gray-600">847 salary reports verified</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="scroll-animate md:col-span-2 lg:col-span-1">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 h-full">
                  <h3 className="text-xl text-gray-900 mb-4 sm:mb-6 font-display font-semibold sm:text-lg">
                    Get job truth score and verification results
                  </h3>
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">
                        Truth score for job listings with detailed breakdown
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">Real vs fake job offers analysis and alternatives</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-moss-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">Share results to protect others</span>
                    </li>
                  </ul>

                  {/* Mockup */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs text-gray-500 font-medium">TRUTH SCORE</span>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-yellow-600 font-medium">PARTIALLY TRUE</span>
                      </div>
                    </div>
                    <div className="text-center mb-2 sm:mb-3">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">73%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div className="bg-yellow-500 h-2 sm:h-3 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-hero-bg rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center">
                        <Shield className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="scroll-animate">
            <div className="bg-gradient-to-br from-hero-bg to-moss-secondary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl mb-4 sm:mb-6 font-display font-medium sm:text-4xl">
                  See TruScribe AI Job Fact Checker in Action
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 px-2">
                  Try our TruScribe app live demo with real job listings and see how our TruScribe fact-checker works.
                  Get your TruScribe job truth score instantly - perfect for job seekers, Gen Z career help and youth
                  employment verification.
                </p>

                {/* Demo Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <button
                    onClick={() => setFactCheckText("Software engineers in Toronto make $150K starting salary")}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-left transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-moss-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-hero-bg" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Salary Claim</h4>
                        <p className="text-white/80 text-xs sm:text-sm break-words">
                          "Software engineers in Toronto make $150K starting salary"
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setFactCheckText(
                        "Make $5000/week working from home with no experience required - just send $99 for starter kit",
                      )
                    }
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-left transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Scam Detection</h4>
                        <p className="text-white/80 text-xs sm:text-sm break-words">
                          "Make $5000/week working from home with no experience..."
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  onClick={() => document.querySelector("textarea")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Try It Now - It's Free
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 sm:mt-20 scroll-animate">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl text-hero-bg mb-2 font-display font-semibold">
                  50K+
                </div>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Claims Fact-Checked</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl text-hero-bg mb-2 font-display font-semibold">92%</div>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl text-hero-bg mb-2 font-display font-semibold">
                  15K+
                </div>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Scams Detected</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl text-hero-bg mb-2 font-display font-semibold">3s</div>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Average Analysis Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 scroll-animate">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4 tracking-wider">
              03 CHOOSE YOUR PLAN
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-display leading-tight">
              <span className="text-gray-900 font-medium text-5xl">AI Job Verification Plans</span>
              <br />
              <span className="text-gray-500 font-medium text-5xl">for every career stage and location.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Start free with our AI job checker. Upgrade for unlimited job listing verification and advanced employment
              scam detection. Available for job seekers in Canada, USA, Toronto, Vancouver, New York, and California.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="scroll-animate">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-2 font-display font-semibold">Starter</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Perfect for occasional fact-checking
                  </p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  <Button
                    onClick={() => router.push("/results?demo=true")}
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Get Started Free
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">5 fact-checks per month</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Basic AI analysis</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Scam detection alerts</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Email support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="scroll-animate">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-hero-bg hover:shadow-xl transition-all duration-300 relative h-full flex flex-col">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-hero-bg text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    Most Popular
                  </span>
                </div>

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-2 font-display font-semibold">Professional</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    For active job seekers and professionals
                  </p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  <Button
                    onClick={() => router.push("/results?demo=true")}
                    className="w-full bg-hero-bg hover:bg-hero-bg/90 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Start 14-Day Free Trial
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Unlimited job listing fact-checks</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">
                      Advanced AI job verification with sources
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Salary claim checker & benchmarking</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Job posting authenticity verification</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Resume keyword checker and optimization</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Job posting authenticity check</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Career trend insights</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Priority support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="scroll-animate md:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-2 font-display font-semibold">Enterprise</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">For teams and organizations</p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$50</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  <Button
                    onClick={() => router.push("/results?demo=true")}
                    variant="outline"
                    className="w-full border-2 border-hero-bg text-hero-bg hover:bg-hero-bg hover:text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Contact Sales
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Everything in Professional</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Team dashboard & analytics</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">API access</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">24/7 phone support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 sm:mt-20 text-center scroll-animate">
            <h3 className="text-gray-900 mb-6 sm:mb-8 font-display text-2xl sm:text-5xl font-medium">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto text-left">
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  How accurate is the fact-checking?
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Our AI analyzes multiple verified sources and provides accuracy scores of 85-95% for career-related
                  claims.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I cancel anytime?</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What sources do you use?</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  We aggregate data from Glassdoor, Indeed, government databases, and other verified career platforms.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is my data secure?</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Absolutely. We use enterprise-grade encryption and never store or share your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-hero-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4 sm:mb-6 font-display font-medium text-3xl sm:text-4xl lg:text-5xl px-2">
            Ready to verify job listings and detect fake offers?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 px-4">
            Join thousands of job seekers who trust TruScribe's AI job fact checker for accurate employment
            verification. Protect yourself from job scams across Canada, USA, and worldwide.
          </p>
          <Button
            onClick={() => router.push("/results?demo=true")}
            className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg text-base sm:text-lg font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Fact-Checking Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hero-bg text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-moss-accent rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-hero-bg" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-white font-display">truscribe</span>
                </div>
              </div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md">
                AI-powered job fact checker and employment truth app. Verify job listings, detect fake job offers, and
                protect professionals from career scams and misinformation across Canada and USA.
              </p>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0 .515-.037 1.026-.112 1.534-1.048.1-2.156-.058-3.102-.414z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07a7.46 7.46 0 012.196.586 7.341 7.341 0 012.065 2.065 7.46 7.46 0 01.586 2.196c.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85a7.46 7.46 0 01-.586 2.196 7.341 7.341 0 01-2.065 2.065 7.46 7.46 0 01-2.196.586c-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07a7.46 7.46 0 01-2.196-.586 7.341 7.341 0 01-2.065-2.065 7.46 7.46 0 01-.586-2.196c-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85a7.46 7.46 0 01.586-2.196 7.341 7.341 0 012.065-2.065 7.46 7.46 0 012.196-.586c1.266-.058 1.646-.07 4.85-.07m0 2.42c-3.73 0-6.77 3.042-6.77 6.77s3.042 6.77 6.77 6.77 6.77-3.042 6.77-6.77-3.042-6.77-6.77-6.77m0 9.37a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">Newsletter</h4>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Subscribe to our newsletter to stay updated on the latest news and career tips.
              </p>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/60 mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:border-moss-accent"
                />
                <Button className="bg-moss-accent hover:bg-moss-accent/90 text-hero-bg font-bold px-6 py-2 rounded-lg transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-white/20 pt-8 sm:pt-10 text-center">
            <p className="text-white/80 text-xs sm:text-sm">&copy; 2024 TruScribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
