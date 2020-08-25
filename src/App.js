import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

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
      <Router>
        <div className="app" ref={this.myRef}>
          <Header />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
