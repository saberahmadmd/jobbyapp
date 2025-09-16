import './index.css'

const FiltersGroup = ({
  selectSalaryRange,
  salaryRange,
  employmentTypes,
  employmentTypesList,
  salaryRangesList,
  selectEmploymentType,
  locationsList,
  selectLocation,
  selectedLocations,
}) => {
  return (
    <div className="filters-group">
      {/* Type of Employment */}
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
                onChange={selectEmploymentType}
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

      <hr className="horizontal-line" />

      {/* Salary Range */}
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
                name="salary" // important for radio grouping
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

      <hr className="horizontal-line" />

      {/* Location Filter */}
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
    </div>
  )
}

export default FiltersGroup
