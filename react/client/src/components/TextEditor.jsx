const React = require('react');

const TextEditor = React.createClass({

  render: function(){
    if (this.state.editing === false) {
      let markUp = function() {
        return {__html: this.state.text};
      }.bind(this);
        return (
          <div dangerouslySetInnerHTML={markUp()} onDoubleClick={this.onDoubleClick}>
          </div>
        )
    } else {
      return (
        <div>
          <form>
            <textarea value={this.state.text}
                      onDoubleClick={this.onDoubleClick}
                      onChange={this.updateDisplayedText}
                      className="editor"
            />
          </form>
        </div>
      )
    }

  },







  getInitialState: function () {
    return {
      text: "<h1>Hello!</h1>",
      editing: false
    };
  },

  loadResourcesFromServer: function() {
    let textURL = this.props.textURL;
    let request = new XMLHttpRequest();
    request.open("GET", textURL);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if(request.status === 200) {
        let data = JSON.parse(request.responseText);
        this.setState({text: data.data[0].the_text});
      }
    }.bind(this);
    request.send(null);
  },

  componentDidMount: function() {
    this.loadResourcesFromServer();
  },

  toggleEditing: function() {
    if (this.state.editing === false) {
      this.setState({editing: true})
    } else {
      let url = this.props.textURL;
      let request = new XMLHttpRequest();
      let params = {"the_text": `${this.state.text}`}
      request.open('PUT', url, true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(params));
      this.setState({editing: false});
    }
  },

  onDoubleClick: function() {
    this.toggleEditing();
  },

  updateDisplayedText: function(e) {
    this.setState({text: e.target.value});
  }









});

module.exports = TextEditor;
