import React, { useEffect, useCallback } from 'react';
import { Layout, Loading } from '../components';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useEmployeeCreate } from '../hooks';
import './page.css';

export default function EmployeeCreate() {
  const location = useLocation().pathname.split('/');
  const employeeId = location[2];
  const [{employee, isLoading}, setEmployee, createEmployee] = useEmployeeCreate(employeeId);
  
  const handleInput = (e) => {
      setEmployee(e.target.name, e.target.value)
  }

  return (
    <Layout>
      <div style={{fontFamily: `Georgia, Times New Roman, Times, serif`, paddingBottom: '10px', fontSize: '20px'}}>
        <strong>회사원 생성하기</strong>
      </div>
      <div id="input_employee">
          <div>
            <input type='text' id='name' name='name' placeholder='이름' value={employee.name} onChange={handleInput}/>
          </div>
          <div>
            <input type='number' id='age' name='age' placeholder='나이' value={employee.age}  onChange={handleInput}/>
          </div>
          <div>
            <input type='number' id='salary' name='salary' placeholder='월급' value={employee.salary}  onChange={handleInput}/>
          </div>
          <div>
              <button onClick={()=>createEmployee()} id="update">
                  생성 완료
              </button>
          </div>
      </div>
      <Loading open={isLoading} />
    </Layout>
  );
}
