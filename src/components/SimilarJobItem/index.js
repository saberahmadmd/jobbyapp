import { AiFillStar } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { BsBriefcaseFill } from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const { jobDetails } = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-job-header">
        <img
          className="similar-job-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-title-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating">
            <AiFillStar className="star-icon" />
            <p className="rating-value">{rating}</p>
          </div>
        </div>
      </div>

      <div className="similar-job-description">
        <h2 className="section-heading">Description</h2>
        <p className="description-text">{jobDescription}</p>
      </div>

      <div className="similar-job-footer">
        <div className="location-type">
          <div className="location">
            <MdLocationOn className="icon" />
            <p className="text">{location}</p>
          </div>
          <div className="employment-type">
            <BsBriefcaseFill className="icon" />
            <p className="text">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
