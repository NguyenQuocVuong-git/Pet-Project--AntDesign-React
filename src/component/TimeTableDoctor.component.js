
import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Table, Select , DatePicker, Space, Button} from "antd";
// import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class TimeTableDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {    
            doctor : [
                {     
                name : "Nguyễn Quốc Vương",
                status: "maybefree" }
            ],
            dateList : [
                {
                name : "Nguyễn Quốc Vương",
                startDate : "2020-12-18",
                endDate : "2020-12-19",
                status : "maybefree"
            }]
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
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
                  <Select
                    value={status}
                    style={{ width: 120 }}
                    disabled
                  >
                    <Option value="maybefree" disabled>Có thể rảnh</Option>
                    <Option value="busy" disabled>Bận</Option>
                    <Option value="free" disabled >Rảnh</Option>
                  </Select>
                ),
            },           
    ]

    columns = [
        {
          title: "Tên bác sĩ ",
          dataIndex: "name",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          render: (status) => <Select value={status} style={{ width: 120 }} onChange={this.onChangeStatus}>
                            <Option value="maybefree" disabled>Có thể rảnh</Option>
                            <Option value="busy">Bận</Option>
                            <Option value="free">Rảnh</Option>
                        </Select>
        },
        {
          title: "Ngày",
          render: () => <Space direction="vertical" size={12}>
                            <RangePicker onChange={this.onChangeDate}
                            // defaultValue={[moment(this.state.doctor.dateStart), moment(this.state.doctor.dateEnd)]}
                            />      
                        </Space>,
        }
    ]
    onChangeStatus(event){
        console.log(event);
        //  this.setState({ status : event.target.value});
         localStorage.setItem('status',event );
         const { doctor } = this.state;
        console.log(doctor[0].status);
        doctor[0].status = event;
          this.setState({
            doctor : [...doctor]
          });
        //   localStorage.setItem('doctor', doctor);
        //   console.log(JSON.stringify(localStorage.getItem(('doctor'))));
        }


    onChangeDate(date,dateString){     
        console.log("dateStart:" , dateString[0]) ;
        console.log(dateString[1]) ;
        localStorage.setItem('dateStart',  dateString[0]);
        localStorage.setItem('dateEnd',  dateString[1]);
        this.setState({
            dateStart : dateString[0],
            dateEnd : dateString[1]
        })
        console.log("SAU KHI SET STATUS : ", this.state.doctor)
    }

    onSubmit(e){
        // e.preventDefault();
        console.log(e);
        console.log("submit dateStart",localStorage.getItem('dateStart'));
        console.log("submit EndStart",localStorage.getItem('dateEnd'));
        console.log("submit status",localStorage.getItem('status'));
        const date = {
                name : "Nguyễn Quốc Vương",
                startDate : (localStorage.getItem('dateStart')),
                endDate : (localStorage.getItem('dateEnd')),
                status : localStorage.getItem('status')
               }
       const { dateList } = this.state ;
       dateList.push(date);
       this.setState({
        dateList : [...dateList]
       })
       localStorage.setItem('dateListLocal',JSON.stringify(dateList));
       console.log("dateLocalList : ",localStorage.getItem('dateListLocal'));
    //   if(arrayDate){
    //     console.log('if');
    //     const date = {
    //         startDate : (localStorage.getItem('dateStart')),
    //         endDate : (localStorage.getItem('dateEnd')),
    //         status : localStorage.getItem('status')
    //     }
    //     arrayDate.push(date);
    //     localStorage.setItem('arrayDate',JSON.stringify(arrayDate));
    //     console.log(localStorage.getItem('arrayDate'));
    //   }else{
    //     console.log('else');
    //     var arrayDate = [];
    //     const date = {
    //         startDate : (localStorage.getItem('dateStart')),
    //         endDate : (localStorage.getItem('dateEnd')),
    //         status : localStorage.getItem('status')
    //     }
    //     arrayDate.push(date);
    //     localStorage.setItem('arrayDate',JSON.stringify(arrayDate));
    //     console.log(localStorage.getItem('arrayDate'));
    //   }
    }
    componentDidMount(){
        console.log("componentDidMount",  localStorage.getItem('status'));
        if (localStorage && localStorage.getItem('status')) {
            this.setState({
                doctor : [{   
                    name : "Nguyễn Quốc Vương",
                    status: localStorage.getItem('status')
                }
                ]
               })
        }
        if(localStorage && localStorage.getItem('dateListLocal')) {
            this.setState({
                dateList : JSON.parse( localStorage.getItem('dateListLocal'))
               })
        }
     
    }
    render() {
        return (     
            <div>
                <h4>Cài đặt lịch </h4>
                <Table columns={this.columns} dataSource={this.state.doctor} size="middle" />
                <Button type="primary" onClick={this.onSubmit} >
                      Submit
                 </Button>
                 <br></br>
                 <h4>Chi tiêt</h4>
                <Table columns={this.columns2} dataSource={this.state.dateList} size="middle" />
            </div>
              
        )
    }
}