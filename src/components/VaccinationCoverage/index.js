import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {vaccinationCoverageDetails} = props

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <BarChart width={900} height={400} data={vaccinationCoverageDetails}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />

        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
          }}
        />

        <Bar dataKey="dose1" name="Dose 1" fill="#132345" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#132322" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
