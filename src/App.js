import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Lov from './Lov.js'
import { Button } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props)
    this.callLov = this.callLov.bind(this)
    this.dataLovIsShowCallBack = this.dataLovIsShowCallBack.bind(this)
    this.dataRowCallBack = this.dataRowCallBack.bind(this)
    this.clickLov = this.clickLov.bind(this)
    this.state = {
      lovText: '',
      lovId: ''
    }
  }
  callLov(lovText) {
    this.setState({ // close and open to make it load data
      showLov: false
    })
    this.setState({
      lovText: lovText,
      showLov: true
    })
    // console.log(lovText);
  }

  dataLovIsShowCallBack(isShow) {
    this.setState({
      showLov: isShow
    })
  }
  dataRowCallBack(data) {
    if (data != null) {
      this.setState({
        lovText: data.username,
        lovId: data._id
      })
      console.log("id : " + data._id + " \ntext : " + data.username);
    } else {
      this.setState({
        lovText: '',
        lovId: ''
      })
    }
  }
  clickLov(event) {
    this.setState({
      showLov: !this.state.showLov
    })
  }

  render() {
    const divStyle = { // style for button
      position: 'absolute',
      zIndex: 1,
      top: '0px',
      right: '15px'
    };
    const { lovText } = this.state;

    return (
      <div >
        <input type='hidden' vaule={this.state.lovId} id='text-input' />
        <DebounceInput
          minLength={1}
          value={this.state.lovText}
          debounceTimeout={750}
          onChange={e => this.callLov(e.target.value)} />
        <Button color="danger" onClick={this.clickLov} ><i className='fa fa-search' />Q</Button>
        {
          this.state.showLov == true ?
            <Lov
              param={lovText}
              url='/api/getData'
              columns={[{ dataField: 'username', text: 'Username', sort: true },
              { dataField: 'role', text: 'Role', sort: true }]}
              dataLovIsShowCallBack={this.dataLovIsShowCallBack}
              dataRowCallBack={this.dataRowCallBack}
            />
            : ''
        }
      </div>
    );
  }
}

export default App;
