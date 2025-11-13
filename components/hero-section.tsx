"use client"

import { useState } from "react"
import { SearchIcon, MapPinned, X, BriefcaseBusiness, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useJobs } from "@/lib/job-context"

export function HeroSection() {
  const { filters, setFilters, jobs } = useJobs()
  const [searchValue, setSearchValue] = useState("")
  const [locationValue, setLocationValue] = useState("")

  const opportunityTypes = [
    { value: "Job", label: "Jobs", icon: BriefcaseBusiness },
    { value: "Internship", label: "Internships", icon: GraduationCap },
    { value: "Scholarship", label: "Scholarships", icon: Award },
    { value: "Education", label: "Education", icon: GraduationCap },
  ]

  const getOpportunityTypeCount = (type: string) => {
    return jobs.filter((job) => job.opportunityType === type).length
  }

  const toggleOpportunityType = (type: string) => {
    const current = filters.opportunityTypes
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    setFilters({ opportunityTypes: updated })
  }

  const handleSearch = () => {
    setFilters({
      search: searchValue,
      location: locationValue,
    })
  }

  const clearSearch = () => {
    setSearchValue("")
    setFilters({ search: "" })
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Rwanda Job Hub
          </h1>
          <p className="mb-8 text-lg  text-muted-foreground">
            Looking for a job? browse latest Rwandan job openings to view & apply!
          </p>

          <div className="mx-auto flex max-w-2xl flex-col gap-2 rounded-lg bg-white p-2 shadow-lg md:flex-row">
            <div className="relative flex flex-1 items-center">
              <SearchIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 pl-10 pr-8 focus-visible:ring-0"
              />
              {searchValue && (
                <button onClick={clearSearch} className="absolute right-3 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative flex flex-1 items-center border-t pt-2 md:border-l md:border-t-0 md:pl-2 md:pt-0">
              <MapPinned className="absolute left-3 h-5 w-5 text-muted-foreground md:left-5" />
              <Input
                placeholder="Country or timezone"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 pl-10 focus-visible:ring-0"
              />
            </div>

            <Button onClick={handleSearch} className="text-black hover:opacity-90" style={{ backgroundColor: '#76c893' }}>
              Search
            </Button>
          </div>

          {/* Opportunity Type Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {opportunityTypes.map(({ value, label, icon: Icon }) => {
              const count = getOpportunityTypeCount(value)
              const isActive = filters.opportunityTypes.includes(value)
              return (
                <Button
                  key={value}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  onClick={() => toggleOpportunityType(value)}
                  className="text-base font-semibold px-6 py-3 gap-2"
                  style={{
                    backgroundColor: isActive ? '#16A34A' : 'transparent',
                    borderColor: '#16A34A',
                    color: isActive ? 'white' : '#16A34A',
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {label} ({count})
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
