import React, { useState, useEffect, useCallback } from 'react'
import './index.css'

import { BsSearch } from 'react-icons/bs'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProfileSection from '../ProfileSection'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
]

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
]

const locationsList = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai']

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const AllJobsSection = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchInput, setSearchInput] = useState('')
  const [employmentTypes, setEmploymentTypes] = useState([])
  const [salaryRange, setSalaryRange] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [allJobsData, setAllJobsData] = useState([])

  const getAllJobsData = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      setApiStatus(apiStatusConstants.failure)
      return
    }

    const employmentTypesJoined = employmentTypes.join(',')
    const locationsJoined = selectedLocations.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesJoined}&minimum_package=${salaryRange}&search=${searchInput}&locations=${locationsJoined}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))

        setAllJobsData(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [employmentTypes, salaryRange, selectedLocations, searchInput])

  useEffect(() => {
    getAllJobsData()
  }, [getAllJobsData])

  const selectLocation = event => {
    const { value, checked } = event.target
    setSelectedLocations(prevLocations => {
      if (checked) {
        return [...prevLocations, value]
      }
      return prevLocations.filter(loc => loc !== value)
    })
  }

  const selectEmploymentType = event => {
    const { value, checked } = event.target
    setEmploymentTypes(prevTypes => {
      if (checked) {
        return [...prevTypes, value]
      }
      return prevTypes.filter(type => type !== value)
    })
  }

  const selectSalaryRange = event => {
    setSalaryRange(event.target.value)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    getAllJobsData()
  }

  const renderSearchBar = () => (
    <div className="search-bar">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
      />
      <button
        onClick={onClickSearch}
        className="search-icon-button"
        type="button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderSuccessView = () => {
    if (allJobsData.length === 0) {
      return (
        <div className="no-jobs-view">
          <img
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="no-jobs-error">No Jobs Found</h1>
          <p className="no-jobs-message">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="job-section-success-view">
        <ul className="job-cards-container">
          {allJobsData.map(eachCard => (
            <JobItem key={eachCard.id} jobDetails={eachCard} />
          ))}
        </ul>
      </div>
    )
  }

  const onRetryButton = () => {
    getAllJobsData()
  }

  const renderFailureView = () => (
    <div className="job-section-failure-view">
      <img
        className="job-section-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-section-failure-error">Oops! Something Went Wrong</h1>
      <p className="job-section-failure-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-section-failure-retry-btn"
        onClick={onRetryButton}
      >
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div data-testid="loader" className="all-jobs-loader-container">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </div>
  )

  const renderAllJobsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="all-jobs-section">
      <div className="profile-and-filters-container">
        {renderSearchBar()}
        <ProfileSection />
        <hr className="horizontal-line" />
        <FiltersGroup
          employmentTypes={employmentTypes}
          salaryRange={salaryRange}
          selectEmploymentType={selectEmploymentType}
          selectSalaryRange={selectSalaryRange}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          selectedLocations={selectedLocations}
          locationsList={locationsList}
          selectLocation={selectLocation}
        />
      </div>
      <div className="jobs-section-container">{renderAllJobsView()}</div>
    </div>
  )
}

export default AllJobsSection
