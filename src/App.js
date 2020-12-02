import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AppointmentList from "./component/AppointmentList.component";
import MakeAnAppointment from "./component/MakeAnAppointment.component";
import SearchByPhoneNumber from "./component/SearchByPhoneNumber.component";
import TimeTableDoctor from "./component/TimeTableDoctor.component";
//import { Interface } from 'readline';
// import Demo from './redux-demo/Demo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: [
        {
          id: 1,
          name: "LƯƠNG NGỌC TÚ",
          age: "18",
          gender: "nam",
          detail: "đau bụng",
          date: "2020-20-11",
          phone: "0123456789",
          status: "cancel",
        },
        {
          id: 2,
          name: "LƯƠNG TRƯNG VƯƠNG",
          age: "20",
          gender: "nam",
          detail: "đau đầu",
          date: "2020-20-13",
          phone: "9876543210",
          status: "processing",
        },
        {
          id: 3,
          name: "LƯƠNG THANH ĐỨC",
          age: "22",
          gender: "nu",
          detail: "đau răng ",
          date: "2020-20-15",
          phone: "123789654",
          status: "processing",
        },
      ],
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("patient")) {
      var tasks = JSON.parse(localStorage.getItem("patient"));
      this.setState({
        patient: tasks,
      });
    }
    // localStorage.removeItem("patient");
  }

  onSubmit = (data) => {
    console.log("appont truyen sang :", data);

    const { patient } = this.state;
    console.log("START ONSUBMIT PARENT APP.JS", patient);
    const object = {
      id: patient.length + 1,
      name: data.name,
      age: data.age,
      gender: data.gender,
      detail: data.detail,
      date: data.date,
      phone: data.phone,
      status: data.status,
    };

    // console.log(object);
    // console.log("patient:", patient);
    patient.push(object);

    this.setState({
      patient: patient,
    });
    console.log("END ONSUBMIT PARENT APP.JS", patient);
    localStorage.setItem("patient", JSON.stringify(patient));
  };

  onUpdateStatus = (value, record) => {
    const list = this.state.patient;
    list[list.findIndex(x=>x.id===record.id)].status = value;
    console.log(" list :", [...list]);
    this.setState({
      patient: [...list],
    });
    localStorage.setItem("patient", JSON.stringify(list));
    console.log("START UPDATE STATE PARENT APP.JS");
  }

  render() {
    return (
      <Router>
        <div></div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              Phòng khám
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/appointmentList" className="nav-link">
                    Đặt lịch bệnh nhân
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/makeAnAppointment" className="nav-link">
                    Danh sách lịch hẹn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/searchByPhoneNumber" className="nav-link">
                    Tìm kiếm{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/timeTableDoctor" className="nav-link">
                    Thời khóa biểu bác sĩ{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>{" "}
          <br />
          <Switch>
            <Route path="/appointmentList">
              <AppointmentList sentData={this.onSubmit} />
            </Route>
            <Route path="/makeAnAppointment">
              <MakeAnAppointment
                patient={this.state.patient}
                onUpdateStatus={this.onUpdateStatus}
              />
            </Route>
            <Route path="/searchByPhoneNumber">
               <SearchByPhoneNumber
                  patient={this.state.patient}
               />
            </Route>
            <Route path="/timeTableDoctor" component={TimeTableDoctor} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
