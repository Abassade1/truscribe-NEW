import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="fixed top-2 sm:top-4 lg:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl px-2 sm:px-4">
        <div className="backdrop-blur-xl border rounded-xl sm:rounded-2xl shadow-2xl bg-white/95 border-gray-200">
          <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg" />
                <Skeleton className="w-20 sm:w-24 h-5 sm:h-6" />
              </div>
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-14 h-4" />
              </div>
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <Skeleton className="w-12 sm:w-16 h-7 sm:h-8" />
                <Skeleton className="w-20 sm:w-24 h-7 sm:h-8" />
              </div>
              <div className="md:hidden">
                <Skeleton className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen bg-hero-bg overflow-hidden">
        <div className="relative z-10 max-w-full mx-auto px-3 sm:px-4 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          {/* Trust Badge Skeleton */}
          <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
            <Skeleton className="w-48 sm:w-64 h-8 sm:h-10 rounded-full bg-white/20" />
          </div>

          {/* Hero Content Skeleton */}
          <div className="text-center max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-2">
              <Skeleton className="w-full max-w-4xl h-12 sm:h-14 lg:h-16 mx-auto bg-white/20" />
              <Skeleton className="w-full max-w-3xl h-12 sm:h-14 lg:h-16 mx-auto bg-white/20" />
            </div>
            
            <Skeleton className="w-full max-w-4xl h-5 sm:h-6 mx-auto mb-8 sm:mb-10 lg:mb-12 bg-white/20" />

            {/* Fact Check Form Skeleton */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <Skeleton className="w-48 sm:w-64 h-6 sm:h-8 mx-auto mb-3 sm:mb-4 bg-white/20" />
                  </div>
                  
                  <Skeleton className="w-full h-20 sm:h-24 md:h-32 bg-white/20" />
                  <Skeleton className="w-full h-10 sm:h-12 bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Mockups Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-2">
            <Skeleton className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-white/10" />
            <div className="sm:col-span-2 lg:col-span-2">
              <Skeleton className="aspect-[8/3] sm:aspect-[8/3] rounded-xl sm:rounded-2xl bg-white/10" />
            </div>
            <Skeleton className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-white/10 sm:col-span-1 lg:col-start-4" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <Skeleton className="w-48 sm:w-64 h-3 sm:h-4 mb-3 sm:mb-4" />
            <div className="space-y-3 sm:space-y-4">
              <Skeleton className="w-full max-w-4xl h-10 sm:h-12" />
              <Skeleton className="w-full max-w-3xl h-10 sm:h-12" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <Skeleton className="w-32 sm:w-48 h-5 sm:h-6" />
                  <Skeleton className="w-full h-12 sm:h-16" />
                </div>
                <Skeleton className="w-full h-48 sm:h-64 rounded-xl sm:rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <Skeleton className="w-24 sm:w-32 h-3 sm:h-4 mx-auto mb-3 sm:mb-4" />
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <Skeleton className="w-full max-w-4xl h-10 sm:h-12 mx-auto" />
              <Skeleton className="w-full max-w-3xl h-10 sm:h-12 mx-auto" />
            </div>
            <Skeleton className="w-full max-w-3xl h-5 sm:h-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 ${i === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <Skeleton className="w-full h-6 sm:h-8 mb-4 sm:mb-6" />
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-start gap-2 sm:gap-3">
                      <Skeleton className="w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                      <Skeleton className="flex-1 h-4" />
                    </div>
                  ))}
                </div>
                <Skeleton className="w-full h-24 sm:h-32 rounded-lg sm:rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Skeleton className="w-32 sm:w-40 h-3 sm:h-4 mx-auto mb-3 sm:mb-4" />
            <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
              <Skeleton className="w-full max-w-4xl h-10 sm:h-12 mx-auto" />
              <Skeleton className="w-full max-w-3xl h-10 sm:h-12 mx-auto" />
            </div>
            <Skeleton className="w-full max-w-3xl h-5 sm:h-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 ${i === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="text-center mb-6 sm:mb-8">
                  <Skeleton className="w-20 sm:w-24 h-6 sm:h-8 mx-auto mb-2" />
                  <Skeleton className="w-32 sm:w-48 h-4 mx-auto mb-4 sm:mb-6" />
                  <Skeleton className="w-16 sm:w-20 h-10 sm:h-12 mx-auto mb-4 sm:mb-6" />
                  <Skeleton className="w-full h-10 sm:h-12" />
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center gap-2 sm:gap-3">
                      <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0" />
                      <Skeleton className="flex-1 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 sm:py-20 lg:py-24 bg-hero-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="w-full max-w-2xl h-10 sm:h-12 mx-auto mb-4 sm:mb-6 bg-white/20" />
          <Skeleton className="w-full max-w-xl h-5 sm:h-6 mx-auto mb-6 sm:mb-8 bg-white/20" />
          <Skeleton className="w-40 sm:w-48 h-10 sm:h-12 mx-auto bg-white/20" />
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-hero-bg text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20" />
                <Skeleton className="w-20 sm:w-24 h-5 sm:h-6 bg-white/20" />
              </div>
              <Skeleton className="w-full max-w-md h-12 sm:h-16 mb-4 sm:mb-6 bg-white/20" />
              <div className="flex items-center space-x-3 sm:space-x-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/20" />
                ))}
              </div>
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="w-16 sm:w-20 h-5 sm:h-6 mb-4 sm:mb-6 bg-white/20" />
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="w-24 sm:w-32 h-3 sm:h-4 bg-white/20" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/10">
            <div className="max-w-2xl mx-auto text-center">
              <Skeleton className="w-48 sm:w-64 h-6 sm:h-8 mx-auto mb-2 sm:mb-3 bg-white/20" />
              <Skeleton className="w-full max-w-lg h-4 mx-auto mb-4 sm:mb-6 bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Skeleton className="flex-1 h-8 sm:h-10 bg-white/20" />
                <Skeleton className="w-20 sm:w-24 h-8 sm:h-10 bg-white/20" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Skeleton className="w-48 sm:w-64 h-3 sm:h-4 bg-white/20" />
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="w-24 sm:w-32 h-3 sm:h-4 bg-white/20" />
                <Skeleton className="w-10 sm:w-12 h-3 sm:h-4 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
