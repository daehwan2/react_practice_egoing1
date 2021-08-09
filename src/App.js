import React, { Component } from 'react';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'Web', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello React!!' },
      content: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText...' },
        { id: 2, title: 'CSS', desc: 'CSS is for design...' },
        { id: 3, title: 'JavaScript', desc: 'javascript is interactive' },
      ]
    };
  }
  getReadContent() {
    let i = 0;
    while (i < this.state.content.length) {
      const data = this.state.content[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }
  getContent() {
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id++;
        let _content = this.state.content.concat({ id: this.max_content_id, title: _title, desc: _desc });
        this.setState({
          content: _content,
          mode:"read",
          selected_content_id:this.max_content_id,
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
      onSubmit={function (_id,_title, _desc) {
        let _content = Array.from(this.state.content);
        let i=0;
        while(i<_content.length){
          if(_content[i].id === _id){
            _content[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i++;
        }
        this.setState({
          content: _content,
          mode: 'read',
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: 'welcome',
            });
          }.bind(this)}>
        </Subject>
        <TOC onChangePage={function (id) {
          this.setState({
            mode: 'read',
            selected_content_id: Number(id),
          })
        }.bind(this)} data={this.state.content}></TOC>

        <Control onChangeMode={function (mode) {
          if(mode === 'delete'){
            if(window.confirm('really?')){
              let _content = Array.from(this.state.content);
              let i=0;
              while(i<_content.length){
                if(_content[i].id === this.state.selected_content_id){
                  _content.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                content:_content,
                mode:'welcome',
              });
              alert('deleted!');
            }
          }else{
            this.setState({
              mode: mode
            });
          }
          
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
