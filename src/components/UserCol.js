import React from "react";
import './UserCol.css';
import ColItem from './ColItem'
import Button from '@material-ui/core/Button';

class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      id: props.id,
      hidden: props.hidden,
      rows:{
          0:"Client 0",
          1:"Client 1",
          2:"Client 2",
          3:"Client 3",
          4:"Client 4",
          5:"Client 5",
          7:"Client 6",
      },
      selected: {
          type:null,
          id:null,
      }
    };

    this.handleChange = this.handleChange.bind(this)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked(event){
      alert("Create new "+this.state.title)

  }

  handleChange(type, id){
      var tempSelected = {
        type:type,
        id:id,
    }
      this.setState({...this.state, selected:tempSelected})
  }

  render() {
      let currentThis = this
      var colItems = Object.keys(this.state.rows).map(function(id){
          return <ColItem text={currentThis.state.rows[id]} id={currentThis.state.rows[id]} type={currentThis.state.id} handleChange={currentThis.handleChange}/>
      })
      console.log(colItems)
    return (
      <div className="user-col ">
        <h2>{this.state.title.toUpperCase()}</h2>
        {colItems}
        <div className="col-footer">
        <Button type="button" onClick={this.buttonClicked}>{"Create new "+this.state.title}</Button>
        </div>
      </div>
    );
  }
}

export default UserCol;