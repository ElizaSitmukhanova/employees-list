import './app-info.css';

const AppInfo = ({increasedEmp, sumEmployees}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании </h1>
            <h2> Общее число сотрудников: {sumEmployees}</h2>
            <h2> Премию получат: {increasedEmp} </h2>
        </div>
    )
}

export default AppInfo;