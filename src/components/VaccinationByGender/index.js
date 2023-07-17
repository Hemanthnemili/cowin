import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props

  return (
    <PieChart width={1000} height={300}>
      <Pie
        data={vaccinationByGenderDetails}
        cx="50%"
        cy="60%"
        outerRadius="60%"
        innerRadius="30%"
        datakey="count"
      />

      <Cell name="Male" fill="#f54394" />
      <Cell name="Female" fill="#5a8dee" />
      <Cell name="Others" fill="#2cc6c6" />

      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
      />
    </PieChart>
  )
}

export default VaccinationByGender
