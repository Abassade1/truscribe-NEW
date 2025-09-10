'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, User, Mail, Lock, Building, MapPin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    jobTitle: '',
    location: '',
    experience: ''
  });

  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'linkedin' | 'github') => {
    setSocialLoading(provider);
    
    try {
      // Simulate social login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Pre-fill form data based on social login (mock data)
      const mockSocialData = {
        google: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
          company: 'Google',
          jobTitle: 'Software Engineer',
          location: 'Mountain View, CA'
        },
        linkedin: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@linkedin.com',
          company: 'LinkedIn',
          jobTitle: 'Product Manager',
          location: 'San Francisco, CA'
        },
        github: {
          firstName: 'Alex',
          lastName: 'Johnson',
          email: 'alex.johnson@github.com',
          company: 'GitHub',
          jobTitle: 'DevOps Engineer',
          location: 'Remote'
        }
      };
      
      setFormData(prev => ({
        ...prev,
        ...mockSocialData[provider]
      }));
      
      // Skip to step 3 since we have basic info from social login
      setCurrentStep(3);
      
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and redirect to dashboard
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    router.push('/results?demo=true');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.password;
      case 3:
        return formData.jobTitle;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hero-bg to-moss-secondary">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-moss-accent rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-hero-bg" />
            </div>
            <span className="text-xl font-bold text-white font-display">truscribe</span>
          </div>
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Skip for now
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 pb-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-moss-accent text-hero-bg' 
                    : 'bg-white/20 text-white/60'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-moss-accent' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm">Step {currentStep} of 3</p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 font-display">
              {currentStep === 1 && "Join TruScribe"}
              {currentStep === 2 && "Secure Your Account"}
              {currentStep === 3 && "Tell Us About Yourself"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {currentStep === 1 && "Choose your preferred sign-up method"}
              {currentStep === 2 && "Create a secure password for your account"}
              {currentStep === 3 && "Help us personalize your experience"}
            </p>
          </CardHeader>

          {/* Social Login Options */}
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Sign up with your preferred account</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => handleSocialLogin('google')}
                  disabled={socialLoading !== null}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {socialLoading === 'google' ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
                </Button>
                
                <Button
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={socialLoading !== null}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {socialLoading === 'linkedin' ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {socialLoading === 'linkedin' ? 'Connecting...' : 'Continue with LinkedIn'}
                </Button>

                <Button
                  onClick={() => handleSocialLogin('github')}
                  disabled={socialLoading !== null}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {socialLoading === 'github' ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Github className="w-5 h-5" />
                  )}
                  {socialLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-xs text-gray-600">At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-xs text-gray-600">One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-xs text-gray-600">One number</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Professional Info */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Software Engineer"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Toronto, ON"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience (Optional)
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-accent focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="2-5">2-5 years (Mid Level)</option>
                    <option value="6-10">6-10 years (Senior Level)</option>
                    <option value="10+">10+ years (Expert Level)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Button>
              )}
              
              <div className="flex items-center gap-3 ml-auto">
                {currentStep < 3 && (
                  <Button
                    onClick={handleSkip}
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Skip
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-hero-bg hover:bg-hero-bg/90 text-white font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 3 ? (
                    <div className="flex items-center gap-2">
                      Complete Setup
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-12 text-center">
          <h3 className="text-white font-semibold mb-6 font-display">Why create an account?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-10 h-10 bg-moss-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-hero-bg" />
              </div>
              <h4 className="text-white font-medium mb-2">Quick Social Login</h4>
              <p className="text-white/70 text-sm">Sign up instantly with Google, LinkedIn, or GitHub</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-10 h-10 bg-moss-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-5 h-5 text-hero-bg" />
              </div>
              <h4 className="text-white font-medium mb-2">Personalized Dashboard</h4>
              <p className="text-white/70 text-sm">Track your fact-checking history and accuracy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-10 h-10 bg-moss-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building className="w-5 h-5 text-hero-bg" />
              </div>
              <h4 className="text-white font-medium mb-2">Save Your History</h4>
              <p className="text-white/70 text-sm">Access all your previous fact-checks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
