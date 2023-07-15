import React from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickFun = this.clickFun.bind(this);
  }
  clickFun() {
    console.log("React this 指向问题", this);
  }
  render() {
    return (
      <div onClick={this.clickFun}>React this 指向问题</div>
    );
  }
}



