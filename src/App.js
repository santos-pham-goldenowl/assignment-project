import React from "react";

import "./Style/App.css";
import Header from "./Container/Header";
import Footer from "./Container/Footer";

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
