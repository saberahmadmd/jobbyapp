import './index.css'

const FiltersGroup = props => {
  const {
    selectSalaryRange,
    salaryRange,
    employmentTypes,
    employmentTypesList,
    salaryRangesList,
    selectemploymentType,
    locationsList,
    selectLocation,
    selectedLocations,
  } = props

  const renderTypeOfEmployment = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="filters-lists-container">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId} className="filter-list-item">
            <input
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              checked={employmentTypes.includes(eachItem.employmentTypeId)}
              onChange={selectemploymentType}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.employmentTypeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="filters-lists-container">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="filter-list-item">
            <input
              id={eachItem.salaryRangeId}
              type="radio"
              checked={salaryRange === eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              onChange={selectSalaryRange}
            />
            <label
              className="filter-input-label"
              htmlFor={eachItem.salaryRangeId}
            >
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLocationFilter = () => (
    <div className="filter-groups-container">
      <h1 className="filters-heading">Location</h1>
      <ul className="filters-lists-container">
        {locationsList.map(eachLocation => (
          <li key={eachLocation} className="filter-list-item">
            <input
              type="checkbox"
              id={eachLocation}
              value={eachLocation}
              checked={selectedLocations.includes(eachLocation)}
              onChange={selectLocation}
            />
            <label htmlFor={eachLocation} className="filter-input-label">
              {eachLocation}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group">
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
      <hr className="horizontal-line" />
      {renderLocationFilter()}
    </div>
  )
}

export default FiltersGroup
