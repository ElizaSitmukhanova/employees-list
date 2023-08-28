import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data : [
                    {name: 'Eliza S', salary: 7500, increase: true, like: true, id: 1},
                    {name: 'Jerry R', salary: 8500, increase: true, like: true, id: 2},
                    {name: 'Richard K', salary: 500, increase: false, like: true, id: 3},
                    {name: 'Kelvin S', salary: 9500, increase: false, like: false, id: 4},
                ]
        }
        this.maxId = 5;
    }
    deleteItem = (id) => {
        this.setState(({data}) => {
          /* let index = data.findIndex(elem => elem.id===id); */
     /*      let before = data.slice(0, index);
          let after = data.slice(index + 1);
          let newArr = [...before,...after]; */
          return {
            data: data.filter(item => item.id !== id)
          }
        })
    }
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({ 
            data: data.map(item => {
                if (item.id===id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
   render() {
    const sumEmployees = this.state.data.length;
    const increasedEmp = this.state.data.filter(item => item.increase).length;
    return (
        <div className="app">
            <AppInfo 
            sumEmployees={sumEmployees}
            increasedEmp={increasedEmp}/>
            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>
            <EmployeesList data={this.state.data}
            onDelete = {this.deleteItem}
            onToggleProp = {this.onToggleProp}
            />
            <EmployeesAddForm
            onAdd = {this.addItem} 
            />
        </div>
    )
   }
}

export default App;