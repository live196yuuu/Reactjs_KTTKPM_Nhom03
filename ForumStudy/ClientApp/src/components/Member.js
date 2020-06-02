import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            membersDisplay: [],
            currentPage: 1,
            listPage: [],
            numRow: 10,
            start: 0,
            type: 0,

        }
        this.rid=React.createRef();
        this.raccount=React.createRef();
        this.rlevel=React.createRef();
        this.getAllMember();
        this.getTypeByName();
    }
    getTypeByName(){
        var nm = cookies.get('account');
        fetch('api/Members/GetByName/'+nm)
            .then(response => response.json())
            .then(data => {
                console.log(data[0].type);
                this.setState({type: data[0].type});
            })
    }
    getAllMember() {
        fetch('api/Members/GetAll')
            .then(response => response.json())
            .then(data => {
                //this.setState({members: data});
                var listPage = [];
                for (var i = 1; i <= Math.ceil(data.length / this.state.numRow); i++) {
                    listPage.push(i);
                }
                //console.log(data2);
                if (this.state.currentPage > listPage.length) {
                    var start = this.state.start - this.state.numRow;
                    if (start < 0) start = 0;
                    var data2 = data.slice(start, start + this.state.numRow);
                    var currentPage = this.state.currentPage - 1;
                    if (currentPage < 1) currentPage = 1;
                    this.setState({ members: data, membersDisplay: data2, listPage: listPage, currentPage: currentPage, start: start });
                }
                else {
                    var data2 = data.slice(this.state.start, this.state.start + this.state.numRow);
                    this.setState({ members: data, membersDisplay: data2, listPage: listPage });
                }
            })
    }
    changeCurrentPage = (e) => {
        var x = e.target.value;
        var start = (x - 1) * this.state.numRow;
        var temp = [];
        temp = this.state.members.slice(start, start + this.state.numRow);
        this.setState({ currentPage: x, membersDisplay: temp, start: start });
    }
    clickRow=(e)=>{
        if(this.state.type < 2) return false;
        var id=e.target.className;
        id=id.slice(7);
        for(var i=0;i<this.state.membersDisplay.length;i++){
            if(this.state.membersDisplay[i].id == id){
                var temp=this.state.membersDisplay[i];
                this.rid.current.value=temp.id;
                this.raccount.current.value=temp.account;
                this.rlevel.current.value=temp.type;
                // this.rHoten.current.value=temp.hoten;
                // this.rDiem.current.value=temp.diem;
                // this.rLanthi.current.value=temp.lanthi;
                // this.rLop.current.value=temp.lop;
                // this.rKhoa.current.value=temp.khoa;
                break;
            }
        }
    }
    handlePhanQuyen=(e)=>{
        e.preventDefault();
        var id=this.rid.current.value;
        var lvl=this.rlevel.current.value;
        fetch('api/Members/UpdateType/id='+id+'&type='+lvl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Phân quyền thành công!")
                this.getAllMember();
                
            })
    }
    render() {
        return (
            <div>
                <div className='categories'>Quản lý thành viên</div>
                <div style={{ padding: '0px 20px' }}><br/>
                    {this.state.type > 1 &&
                    <div>
                        <form onSubmit={this.handlePhanQuyen}>
                        <b>ID</b> <input style={{width: '50px'}} type='text' ref={this.rid} readOnly /> <b>Account:</b> <input readOnly style={{width: '150px'}} type='text' ref={this.raccount} />
                        <b>Level:</b><select ref={this.rlevel} style={{height: '25px'}} defaultValue={0}>
                            <option value={0}>Khách</option>
                            <option value={1}>Thành viên</option>
                            <option value={2}>Kiểm duyệt viên</option>
                            <option value={3}>Quản trị viên</option>
                        </select>
                        <button>Phân quyền</button>
                        </form>
                    </div>
                    }
                    <br/>
                    <table className='table table-hover table-bordered'>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Account</th>
                                <th>Email</th>
                                <th>Level</th>
                            </tr>
                            {this.state.membersDisplay.map(i => (
                                <tr key={i.id}>
                                    <td className={'rowdata'+i.id} onClick={this.clickRow}>{i.id}</td>
                                    <td className={'rowdata'+i.id} onClick={this.clickRow}>{i.account}</td>
                                    <td className={'rowdata'+i.id} onClick={this.clickRow}>{i.email}</td>
                                    <td className={'rowdata'+i.id} onClick={this.clickRow}>
                                        {i.type === 0 && "Khách"}
                                        {i.type === 1 && "Thành viên"}
                                        {i.type === 2 && "Kiểm duyệt viên"}
                                        {i.type === 3 && "Quản trị viên"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {this.state.members.length > this.state.numRow &&
                        <div className='phanTrang'>
                            {this.state.listPage.map(i => (
                                <input type='button' onClick={this.changeCurrentPage} key={i} value={i} className={i == this.state.currentPage ? 'currentPage' : 'generalPage'} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        )
    }
}