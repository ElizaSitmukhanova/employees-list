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
                ],
            term: '',
            filter: ''
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

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }
    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterPost = (items, filter) => {
       switch (filter) {
        case 'like': 
            return items.filter(item => item.like);
        case 'moreThen1000':
            return items.filter(item => item.salary> 1000);
        default:
            return items
       }
    }
    onFilterSelect = (filter) => {
        this.setState({filter: filter});
    }
    onChangeSalary = (newSalary, id) => {
        this.setState(({ data }) => ({
            data: data.map(person => {
                if (person.id === id) {
                    return { ...person, salary: newSalary.replace(/\D/g, '') }
                }
                return person;
            })
        }))
    }
   render() {
    const sumEmployees = this.state.data.length;
    const increasedEmp = this.state.data.filter(item => item.increase).length;
    const {data, term, filter } = this.state;
    let visibleData =this.filterPost(this.searchEmp(data, term), filter);
    
    return (
        <div className="app">
            <AppInfo 
            sumEmployees={sumEmployees}
            increasedEmp={increasedEmp}/>
            <div className="search-panel" >
                <SearchPanel
                onUpdateSearch = {this.onUpdateSearch}  />
                <AppFilter 
                filter = {filter} 
                onFilterSelect = {this.onFilterSelect}/>
            </div>
            <EmployeesList 
            data={visibleData}
            onDelete = {this.deleteItem}
            onToggleProp = {this.onToggleProp}
            onChangeSalary={this.onChangeSalary}
            />
            <EmployeesAddForm
            onAdd = {this.addItem} 
            />
        </div>
    )
   }
}

export default App;