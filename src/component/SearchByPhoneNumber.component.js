
import React, { Component } from 'react';
import TableRow from './TableRow';
import 'antd/dist/antd.css';
import { Input, Table, Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
export default class SearchByPhoneNumber extends Component {
    constructor(props){
        super(props);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            search : [],
            phone :"",
            isDisplayForm : false,
            mess : false
        };

        
    }
    suffix = (
        <AudioOutlined
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
        />
      );
    columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Tên bệnh nhân",
          dataIndex: "name",
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
          render: (status) => (
            <Select
              value={status}
              style={{ width: 120 }}
              disabled
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


    findArrayElementByTitle(array, title) {
        const dataParent = this.props.patient;
        console.log("data goi sang : ",dataParent );
        console.log(array);
        console.log(title);
        if(array === null ){
            const result = dataParent.filter((item) => item.phone === title);
            if(result.length === 0){
                this.setState({
                    mess : true
                })
             }else{
                 this.setState({
                     search : result,
                     isDisplayForm : true
                 })
             }
        }else{
            const result = array.filter((item) => item.phone === title);
            console.log("result search :",result)
             if(result.length === 0){
                this.setState({
                    mess : true,
                    isDisplayForm : false
                })
             }else{
                 this.setState({
                     search : result,
                     isDisplayForm : true,
                     mess : false
                 })
             }
        }
        
    }

      tabRow() {
        return this.state.search.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }

    onChangePhone(e) {
        this.setState({
            phone : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        var valueSearch = this.state.phone;
        var tasks = JSON.parse(localStorage.getItem('patient'));
        console.log("task search :", tasks);
        this.findArrayElementByTitle(tasks,valueSearch);
    }

    onSearch = value => {
        console.log("sdt tim : ",value);
        var valueSearch = value;
        var tasks = JSON.parse(localStorage.getItem('patient'));
        console.log("submit :",tasks);
        this.findArrayElementByTitle(tasks,valueSearch);
    }
   
    
    render() {
        var { isDisplayForm , mess} = this.state;
        var messNotification = mess ? "Không tìm thấy số điện thoại được nhập " : "";
        var elm = isDisplayForm ?   
        <Table
        columns={this.columns}
        dataSource={this.state.search}
        size="middle"
         />
        : "" ;
        
        return (
            <div>   
                <Search
                    placeholder="Nhập số điện thoại cần tìm"
                    enterButton="Search"
                    size="large"
                    type="number"
                    onSearch={this.onSearch}
                />
                <div>
                     {elm}
                </div>
                {messNotification}
            </div>
        )
    }
}