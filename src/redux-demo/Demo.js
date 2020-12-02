import { createStore } from 'redux';

var initialState = {
    status : false,
    sort : {
        by : "name",
        value : 1 
    }
}

var myReducer = (state = initialState, action) => {
    if(action.type === 'TOGGGLE_STATUS'){
        state.status = !state.status
    }
    if(action.type === 'SORT'){
        // dùng value và by mới ở action truyền vào để set vào state mặc định
        var { by , value} = action.sort ; //by = action.by
        var { status } = state ; // status = state.status
            return {
                status : status,
                sort :  {
                    by :  by,
                    value : value
            }
        }
    }
    return state;
}

const store = createStore(myReducer);
console.log("Default : ",store.getState());
//thay đổi status 
var action = { type :'TOGGGLE_STATUS'};
// gơi action vào store
store.dispatch(action);
//kiểm tra store có thay đổi state dc k 
console.log('TOGGLE:',store.getState());

//thực hiện sắp xếp tên Z-A
var sortAction = {
    type : 'SORT',
    sort : {
        by : 'ten',
        value : -1
    }
}
store.dispatch(sortAction);
console.log('SORT:',store.getState());