import { useEffect, useState } from 'react';
import { getAllEmployee, createEmployee, updateEmployee } from '../api/api';

export function useEmployeeList(){
    const [employee, setEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        getAllEmployee().then(response => {
            setEmployee(response.data);
            setIsLoading(false);
        }).catch(e => {
            console.log(e);
            alert('에러 발생');
            setIsLoading(false);
        })
    }, [])
    return [
        {employee, isLoading}, 
    ()=>setIsLoading(true),
    ()=>setIsLoading(false)
];
}

export const useEmployeeUpdate = (id, data) => {
    const [employee, setEmployee] = useState({
        name: '',
        age: '',
        salary: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setEmployee({
            id,
            name: data.employee_name,
            salary: data.employee_salary,
            age: data.employee_age
        });
    }, [data, id])

    return [
        {employee, isLoading}, 
        (name, data) => {
            setEmployee(value=>{
                return {
                    ...value,
                    [name]: data
            }});
        },
    ()=> {
        setIsLoading(true);
        updateEmployee(employee, id).then(response => {
            console.log(response);
            setIsLoading(false);
        });
    },
    ()=> {
        setIsLoading(true);
        createEmployee(employee).then(response => {
            console.log(response);
            setIsLoading(false);
        });
    }
]
}

export const useEmployeeCreate = (id) => {
    const [employee, setEmployee] = useState({
        name: '',
        age: '',
        salary: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    return [
        {employee, isLoading}, 
        (name, data) => {
            setEmployee(value=>{
                return {
                    ...value,
                    [name]: data
            }});
        },
    ()=> {
        setIsLoading(true);
        createEmployee(employee).then(response => {
            console.log(response);
            setIsLoading(false);
        });
    }
]
}