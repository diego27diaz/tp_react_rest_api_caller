import React from 'react';

import './Home.css';

class Home extends React.Component {

  state = {
    apiData: [],
    loadingData: "loading-off",
    createUserResponse: {
      "status": "",
      "data": {
          "name": "",
          "salary": "",
          "age": "",
          "id": 0
      }
  }
  }

  constructor(props:any){
    super(props);
    this.createRandomEmp = this.createRandomEmp.bind(this);
  }

  componentDidMount(){
    this.setState({loadingData: "loading-on"});
    return fetch('http://dummy.restapiexample.com/api/v1/employees')
    .then((response) => response.json())
    .then((json) => {
      this.setState({loadingData: "loading-off"});
      this.setState({apiData: json.data});
      return json;
    })
    .catch((error) => {
      this.setState({loadingData: "loading-off"});
      console.error(error);
    });
  }
  
  createRandomEmp(){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"name":"test " + Math.random(),"salary":"$3000","age":"30"})
    };

    this.setState({loadingData: "loading-on"});
    fetch('http://dummy.restapiexample.com/api/v1/create', requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({createUserResponse: json});
      this.setState({loadingData: "loading-off"});
    })
    .catch((error) => {
      this.setState({loadingData: "loading-off"});
      console.error(error);
    });
  }

  render() {
    return (
        <div className="home">
          <div className={this.state.loadingData}>Loading...</div>
          <div className="left-api">
            <h2>Autoload component did mount with "fetch"</h2>
            {this.state.apiData.map((item:any) => <div key={item.id}>
            <span>ID: {item.id}</span><br/>
            <span>NAME: {item.employee_name}</span><br/>
            <span>SALARY: {item.employee_salary}</span><br/>
            <span>AGE: {item.employee_age}</span><br/>
            <span>IMG: {item.profile_image}</span><br/>
            <hr />
            </div>)}
          </div>

          <div className="right-api">
            <h2>Create employee</h2>
            <button onClick={this.createRandomEmp}>Create random</button>
            <br/>
            <div>
              <span>Response: </span>
              <span>{this.state.createUserResponse.status}</span><br/>
              <span>Created: </span><br/>
              <span>ID: {this.state.createUserResponse.data.id}</span><br/>
              <span>NAME: {this.state.createUserResponse.data.name}</span><br/>
              <span>AGE: {this.state.createUserResponse.data.age}</span><br/>
              <span>SALARY: {this.state.createUserResponse.data.salary}</span><br/>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;

