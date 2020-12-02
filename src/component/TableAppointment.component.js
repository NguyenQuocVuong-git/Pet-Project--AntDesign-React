import React, {Component} from 'react';

class TableRow extends Component {
    constructor(props){
        super(props);
        

        this.onChangeStatus = this.onChangeStatus.bind(this);
    }


    onChangeStatus(event){
        console.log(this.state);
        console.log(this.props.obj);
        console.log(this.props.key);
        // this.setState({value: event.target.value});
        this.props.onUpdateStatus(this.props.index, event.target.value);
    }

    render(){
        var { key } = this.props;
        return(
            <tr>
               <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.age}
                </td>
                <td>
                    {this.props.obj.gender}
                </td>
                <td>
                    {this.props.obj.phone}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {this.props.obj.detail}
                </td>
                <td>
                    <select  value={this.props.obj.status} onChange={this.onChangeStatus}>  
                                    <option value="thanhcong">Đặt thành công</option>
                                    <option value="choxuly">Đang chờ xử lý</option>
                                    <option value="huy">Hủy</option>
                    </select>
                </td>
            </tr>
        )
    }
}

export default TableRow;