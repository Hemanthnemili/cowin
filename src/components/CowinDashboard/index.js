import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last7DaysVaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose1,
          dose2: eachDay.dose2,
        })),

        vaccinationByAge: fetchedData.vaccinationByAge.map(range => ({
          ade: range.age,
          count: range.count,
        })),

        vaccinationByGender: fetchedData.vaccinationByGender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })

      console.log(fetchedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    ;<div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure logo"
      />
      <h1>Something went wrong</h1>
    </div>
  }

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderLoader = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="dash-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1>Co-WIN</h1>
          </div>
          <h1>CoWIN Vaccination in India</h1>
          {this.renderViews()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
