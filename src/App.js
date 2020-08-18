import React from "react";

import "./Style/App.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.myRef.current.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="app" ref={this.myRef}>
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
