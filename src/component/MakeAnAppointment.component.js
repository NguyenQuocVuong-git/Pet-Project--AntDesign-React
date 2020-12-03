import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Select } from "antd";

const { Option } = Select;
export default class MakeAnAppointment extends Component {
  constructor(props) {
    // cách sử dụng props đúng là không set props vào state để sử dụng đâu nha
    super(props);
    // this.state = { patient: this.props.sentDataAfter };
    // if (localStorage && localStorage.getItem("patient")) {
    //   // console.log("ZZZZ");
    //   var tasks = JSON.parse(localStorage.getItem("patient"));
    //   console.log("task :", tasks);
    //   this.state = { patient: tasks };
    // }
    // console.log("CONSTRUCT MakeAnAppointment", this.state.patient);
  }


  // data = localStorage.getItem('patient');
 

  // handleOnChange = (value, record) => {
  //   // console.log("value:", value);
  //   // console.log("record:", record);
  //   // console.log("mang ::::", JSON.parse(localStorage.getItem("patient")));
  //   const arraySearch = JSON.parse(localStorage.getItem("patient") || "[]");
  //   const idChangeStatus = record.id;
  //   const result = arraySearch.findIndex((item) => item.id === idChangeStatus);
  //   console.log(result);
  //   arraySearch[result].status = value;
  //   // console.log("dong 76 :", arraySearch);
  //   this.setState({
  //     patient: [...arraySearch],
  //   });
  //   localStorage.setItem("patient", JSON.stringify(arraySearch));
  //   // console.log("sau khi luu bien moi :", localStorage.getItem("patient"));
  //   console.log("handleOnChange MakeAnAppointment", arraySearch);
  //   this.props.onUpdateStatus(arraySearch);
  //   // const patient = Object.assign([], this.state.patient);
  //   // patient[index].status = value;
  //   //   this.setState({ patient });
  //   //  localStorage.setItem("patient", JSON.stringify(patient));
  // };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Tên bệnh nhân",
        dataIndex: "name",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
      },
      {
        title: "Tuổi",
        dataIndex: "age",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
      },
      {
        title: "Ngày hẹn",
        dataIndex: "date",
     
      },
      {
        title: "Chi tiết bệnh",
        dataIndex: "detail",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status, record) => (
          <Select
            value={status}
            style={{ width: 120 }}
            onChange={(value) => this.props.onUpdateStatus(value, record)}
            //onchange chỉ lấy 1 giá trị value, sau khi truyền vào hàm khác thì lấy cái khác bỏ vào
            //  onChange={(value, index,key) => this.handleOnChange(value, index,key)}
          >
            <Option value="processing">Đang xử lý</Option>
            <Option value="succes">Thành Công</Option>
            <Option value="cancel">Hủy</Option>
          </Select>
        ),
      },
    ];
    return (
      <div>
        <h4>Lịch hẹn bệnh nhân</h4>
        <Table
          columns={columns}
          dataSource={this.props.patient}
          size="middle"
        />
      </div>
    );
  }
}
