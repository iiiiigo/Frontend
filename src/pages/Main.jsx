import React, { useEffect, useCallback } from 'react';
import { Layout, Loading } from '../components';
import { useHistory, useLocation, Link } from 'react-router-dom';
import chipmunk from '../components/icon/chipmunk.jpeg';
import { useEmployeeList } from '../hooks';
import './page.css';

export default function MainPage() {
  const history = useHistory();
  const [{employee, isLoading}, startLoading, endLoading] = useEmployeeList();
  const handleClickEmployee = (value) => {
    startLoading();
    history.push(`/update`, value); // api 미작동
    endLoading();
  };
  
  return (
    <Layout>
      <div style={{backgroundColor: 'white', alignItems: 'center'}}>
        <img src={chipmunk} alt='다람쥐' style={{  display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}}/>
      </div>
      <div>
        <strong>회사원 목록</strong>
      </div>
      <div id='div_list'>
        <ul  id='employee'>
          {employee.map(value => {
            return (
              <div key={value.id} id="list_li" onClick={()=>handleClickEmployee(value)}>
                  <li>
                  name: <strong>{value.employee_name}</strong>
                  </li>
                  <li>
                  age: {value.employee_age}
                  </li>
                  <li>
                  salary : {value.employee_salary}
                  </li>
              </div>
            )
          })}
        </ul>
      </div>

      <Loading open={isLoading} />
    </Layout>
  );
}
