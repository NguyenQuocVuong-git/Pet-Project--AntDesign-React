import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, DatePicker , Select} from "antd";

// const [form] = Form.useForm();
const { Option } = Select;
export default class AppointmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: "",
      gender: "",
      phone: "",
      detail: "",
      date: "",
      messSucces: false,
      messFail: false,
      messLoading: false,
    };
  }
  formRef = React.createRef();

  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };
  onFinish = (values) => {
    console.log("VALUES:", values);
    const dateInput = this.state.date;
    const dateList = JSON.parse(localStorage.getItem("dateListLocal"));
    console.log(dateList);
    if (dateList === null) {
      const object = {
        name: values.user.name,
        age: values.user.age,
        gender: values.user.gender,
        phone: values.user.phone.toString(),
        detail: values.user.detail,
        date: this.state.date,
        status: "processing",
      };
      console.log(object);
      this.props.sentData(object);
      this.setState({
        messFail: false,
        messSucces: false,
        messLoading: true,
      });
    } else {
      const dt = dateList.find(
        (x) => x.startDate <= dateInput && x.endDate >= dateInput
      );
      // const dt = dateList.find(x => x.startDate <= "2030-01-01" && x.endDate >= "2030-01-01");
      console.log("find :", dt);
      if (dt !== undefined && dt.status === "busy") {
        this.setState({
          messFail: true,
          messSucces: false,
          messLoading: false,
        });
      }
      if (dt !== undefined && dt.status === "free") {
        const object = {
          name: values.user.name,
          age: values.user.age,
          gender: values.user.gender,
          phone: values.user.phone.toString(),
          detail: values.user.detail,
          date: this.state.date,
          status: "succes",
        };
        console.log("object: ", object);
        this.props.sentData(object);
        this.setState({
          messSucces: true,
          messFail: false,
          messLoading: false,
        });
        this.formRef.current.resetFields();
      }
      if (dt === undefined) {
        const object = {
          name: values.user.name,
          age: values.user.age,
          gender: values.user.gender,
          phone: values.user.phone.toString(),
          detail: values.user.detail,
          date: this.state.date,
          status: "processing",
        };
        console.log(object);
        this.props.sentData(object);
        this.setState({
          messFail: false,
          messSucces: false,
          messLoading: true,
        });
        this.formRef.current.resetFields();
      }
    }
  };
  validateMessages = {
    required: "${label} không được để trống!",
    types: {
      number: "${label} phải là số!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
    minlength : "${label} phải từ 10 đến 11 số",
    maxlength : "${label} phải từ 10 đến 11 số",
  };
  onChange = (date, dateString) => {
    console.log(dateString);
    this.setState({
      date: dateString,
    });
  };

  PriceInput = ({ value = '', onChange }) => {
    console.log("tuoi : ", value );
    return (
      <span>
        <Input
          type="text"
          value={
            value.replace(/[^0-9]/g,'')
          }
          onChange={(e) => onChange(e.currentTarget.value)}
          style={{
            width: 100
          }}
        />
      </span>
    );
  };

  render() {
    var { messSucces, messFail, messLoading } = this.state;
    const message = messSucces
      ? "Đặt lịch hẹn thành công"
      : messFail
      ? "Bác Sĩ Bận , vui lòng đặt lại ngày khác"
      : messLoading
      ? "Lịch hẹn đang chờ xử lý"
      : "";
    return (
      <div style={{ marginTop: 10 }}>
        <div style={{ textAlign: "center" , color : "red"}} >
             {message}
        </div>
        <h3 style={{ textAlign: "center" }}>Đặt lịch hẹn</h3>
        <Form
          //  form={form}
          ref={this.formRef}
          {...this.layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={this.validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Họ và tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
           
            <Input />
          </Form.Item>
          {/*  */}

          <Form.Item
            name={["user", "gender"]}
            label="Giới tính"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Không xác định">Không xác định</Option>
            </Select>
          </Form.Item>
          <Form.Item
            id = 'number'
            name={["user", "age"]}
            label="Tuổi"
          >
            <this.PriceInput />
          </Form.Item>
          <Form.Item
            name={["user", "phone"]}
            label="Số điện thoại"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "detail"]} label="Mô tả bệnh">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["user", "date"]}
            label="Ngày hẹn"
            rules={[
              {
                type: "date",
                required: true,
              },
            ]}
          >
            <DatePicker onChange={this.onChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
