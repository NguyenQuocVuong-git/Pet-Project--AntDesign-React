import { Button, DatePicker, Select, Space, Table } from "antd";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import React, { Component } from "react";
// import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class TimeTableDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [
        {
          name: "Nguyễn Quốc Vương",
          status: "maybefree",
        },
      ],
      dateList: [
        {
          name: "Nguyễn Quốc Vương",
          startDate: "2020-12-18",
          endDate: "2020-12-19",
          status: "maybefree",
        },
      ],
      messFail: false,
      currentDay :false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

 
  columns2 = [
    {
      title: "Tên bác sĩ ",
      dataIndex: "name",
    },
    {
      title: "Ngày bắt đầu ",
      dataIndex: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Select value={status} style={{ width: 120 }} disabled>
          <Option value="maybefree" disabled>
            Có thể rảnh
          </Option>
          <Option value="busy" disabled>
            Bận
          </Option>
          <Option value="free" disabled>
            Rảnh
          </Option>
        </Select>
      ),
    },
  ];

  columns = [
    {
      title: "Tên bác sĩ ",
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={this.onChangeStatus}
        >
          <Option value="maybefree" disabled>
            Có thể rảnh
          </Option>
          <Option value="busy">Bận</Option>
          <Option value="free">Rảnh</Option>
        </Select>
      ),
    },
    {
      title: "Ngày",
      render: () => (
        <Space direction="vertical" size={12}>
          <RangePicker onChange={this.onChangeDate} />
        </Space>
      ),
    },
  ];
  onChangeStatus(event) {
    console.log(event);
    //  this.setState({ status : event.target.value});
    localStorage.setItem("status", event);
    const { doctor } = this.state;
    console.log(doctor[0].status);
    doctor[0].status = event;
    this.setState({
      doctor: [...doctor],
    });
    //   localStorage.setItem('doctor', doctor);
    //   console.log(JSON.stringify(localStorage.getItem(('doctor'))));
  }

  onChangeDate(date, dateString) {
    console.log("dateStart:", dateString[0]);
    console.log(dateString[1]);
    localStorage.setItem("dateStart", dateString[0]);
    localStorage.setItem("dateEnd", dateString[1]);
    this.setState({
      dateStart: dateString[0],
      dateEnd: dateString[1],
    });
    console.log("SAU KHI SET STATUS : ", this.state.doctor);
  }
  getToday() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear(); 
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    var today = dd + "/" + mm + "/" + yyyy;
 
    var dayFormat = today.toString().split("/").reverse().join("-");
    
    return dayFormat;
  }

  onSubmit(e) {
    var today = this.getToday();
    console.log("today", today)
    console.log("submit dateStart", localStorage.getItem("dateStart"));
    console.log("submit EndStart", localStorage.getItem("dateEnd"));
    console.log("submit status", localStorage.getItem("status"));
    const checkDateStart = localStorage.getItem("dateStart");
    const checkEndStart = localStorage.getItem("dateEnd");
    const status = localStorage.getItem("status");


    if ( status == null || checkDateStart == null || checkEndStart == null || checkDateStart === 'null' || checkEndStart === 'null' ) {
      this.setState({
        messFail: true,
        currentDay :false
      });
     }else if(checkDateStart < today ){
      this.setState({
        currentDay: true,
        messFail : false
      });
    }else if( checkEndStart < today){
      this.setState({
        currentDay: true,
        messFail : false
      });
    } else {
      const date = {
        name: "Nguyễn Quốc Vương",
        startDate: localStorage.getItem("dateStart"),
        endDate: localStorage.getItem("dateEnd"),
        status: localStorage.getItem("status"),
      };
      const { dateList } = this.state;
      dateList.push(date);
      this.setState({
        dateList: [...dateList],
        messFail: false,
        currentDay : false
      });
      localStorage.setItem("dateListLocal", JSON.stringify(dateList));
      console.log("dateLocalList : ", localStorage.getItem("dateListLocal"));
      localStorage.setItem("dateStart", null);
      localStorage.setItem("dateEnd", null);
    }
  }
  componentDidMount() {
    console.log("componentDidMount", localStorage.getItem("status"));
    if (localStorage && localStorage.getItem("status")) {
      this.setState({
        doctor: [
          {
            name: "Nguyễn Quốc Vương",
            status: localStorage.getItem("status"),
          },
        ],
        messFail: false,
        currentDay :false
      });
    }
    if (localStorage && localStorage.getItem("dateListLocal")) {
      this.setState({
        dateList: JSON.parse(localStorage.getItem("dateListLocal")),
      });
    }
  }
  render() {
    var { messFail , currentDay} = this.state;
    const message = messFail ? "Vui lòng nhập đủ ngày hoặc trạng thái  " : "";
    const currentDayy = currentDay ? "không được nhập ngày đã qua ":"";
    return (
      <div>
        <h4>Cài đặt lịch </h4>
        <div style={{ textAlign: "center", color: "red" }}>{message}</div>
        <div style={{ textAlign: "center", color: "red" }}>{currentDayy}</div>
        <Table
          ref={this.formRef}
          columns={this.columns}
          dataSource={this.state.doctor}
          size="middle"
        />
        <Button type="primary" onClick={this.onSubmit}>
          Submit
        </Button>
        <br></br>
        <h4>Chi tiết</h4>
        <Table
          columns={this.columns2}
          dataSource={this.state.dateList}
          size="middle"
        />
      </div>
    );
  }
}
