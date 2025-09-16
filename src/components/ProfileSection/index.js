import './index.css'
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileSection = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileDetails, setProfileDetails] = useState({})

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

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
        const updatedData = {
          name: fetchedData.profile_details.name,
          profileImageUrl: fetchedData.profile_details.profile_image_url,
          shortBio: fetchedData.profile_details.short_bio,
        }
        setProfileDetails(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  const renderSuccessView = () => {
    const { name, profileImageUrl, shortBio } = profileDetails
    return (
      <div className="profile-details-container">
        <img
          className="profile-details-image"
          src={profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-details-name">{name}</h1>
        <p className="profile-details-short-bio">{shortBio}</p>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height={50} width={50} />
    </div>
  )

  const onRetry = () => {
    getProfileDetails()
  }

  const renderFailureView = () => (
    <div className="profile-failure-view">
      <button type="button" className="profile-retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )

  const renderAllProfileView = () => {
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

  return <div className="profile-section">{renderAllProfileView()}</div>
}

export default ProfileSection
