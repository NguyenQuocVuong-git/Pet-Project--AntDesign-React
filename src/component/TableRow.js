import React, {Component} from 'react';

class TableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            cancel : false,
            success : false,
            loading : false
        }

        this.onChangeStatus = this.onChangeStatus.bind(this);
        
    }


    onChangeStatus(event){
        console.log(this.state);
        this.setState({value: event.target.value});
    }

    change(){
        if(this.props.value === "huy"){
            return <td> Hủy</td>
        }
    }
    render(){
        var cancel = this.props.value;
        if( cancel ==="huy"){
            var messCancel = " Hủy " ;
        }
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
                    <select  value={this.props.obj.status} disabled="true">                
                                    <option value="success">Đặt thành công</option>
                                    <option value="processing">Đang chờ xử lý</option>
                                    <option value="cancel">Hủy</option>
                                   
                    </select>
                </td>
            </tr>
        )
    }
}

export default TableRow;