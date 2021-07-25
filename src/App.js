import React, {Component } from 'react';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Content from './components/Content';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'Web', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello React!!'},
      content:[
        {id:1, title:'HTML', desc:'HTML is HyperText...'},
        {id:2, title:'CSS', desc:'CSS is for design...'},
        {id:3, title:'JavaScript', desc:'javascript is interactive'},
      ]
    };
  }

  render(){
    let _title,_desc = null;
    if(this.state.mode === 'welcome'){
      _title= this.state.welcome.title;
      _desc= this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      let i=0;
      while(i<this.state.content.length){
        const data = this.state.content[i];
        if(data.id ===this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;    
        }
        i++;
      }
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({
            mode:'welcome',
          });
        }.bind(this)}>
        </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id),
          })
        }.bind(this)} data={this.state.content}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
