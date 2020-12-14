import React from "react";

import "./style.css";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldValue: "",
      preview: [],
    };
  }

  componentDidMount() {
    if (this.props.imagePreviewList) {
      const previewArr = this.props.imagePreviewList.split(",").map(String);
      console.log("previewArr: ", previewArr);
      const { getValueUpload } = this.props;
      getValueUpload(null, previewArr);
      this.setState({
        preview: [...previewArr],
        oldValue: [...previewArr],
      });
    }
  }

  onChangeFileValue = (e) => {
    const value = e.target.files;
    const selectedValue = Array.from(value);
    const { preview } = this.state;
    console.log("preview: ", preview);
    if (selectedValue) {
      selectedValue.forEach((file) => {
        console.log("URL.createObjectURL: ", URL.createObjectURL(file));
        preview.push(URL.createObjectURL(file));
      });
    }

    console.log("preview: ", preview);
    const { getValueUpload } = this.props;
    const oldValue = preview.filter((item) => item.includes("blob") === false);
    console.log("oldvalue: ", oldValue);
    return getValueUpload(value, oldValue);
  };

  deleteImagePreviewServer = (index) => {
    const { preview } = this.state;
    const newPreviewList = [...preview];
    newPreviewList.splice(index, 1);

    const { getValueUpload } = this.props;
    const oldValue = newPreviewList.filter(
      (item) => item.includes("blob") === false
    );
    console.log("oldvalue: ", oldValue);
    getValueUpload(newPreviewList, oldValue);

    this.setState({
      preview: newPreviewList,
    });
  };

  render() {
    const { lbName } = this.props;
    const { fileValue, preview } = this.state;
    return (
      <>
        <div className="add-img">
          <label className="upload-file-lb">{lbName}</label>
          <input
            className="file-ip"
            type="file"
            name="imageUrl"
            onChange={this.onChangeFileValue}
            multiple
          ></input>

          <div className="preview-container">
            {preview &&
              preview.map((item, index) => {
                let newSrc;
                if (item.match(/blob/i)) {
                  newSrc = item;
                } else {
                  newSrc = "http://localhost:3002/images/" + item;
                }
                return (
                  <div className="preview-img-container" key={index}>
                    <img
                      src={newSrc}
                      style={{ width: "60px", height: "60px" }}
                      alt="product"
                      className="preview-img"
                    />
                    <button
                      className="remove-img-btn"
                      type="button"
                      onClick={() => this.deleteImagePreviewServer(index)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            {/* {fileValue &&
              fileValue.map((file, index) => {
                return (
                  <div className="preview-img-container" key={index}>
                    <img
                      src={file ? URL.createObjectURL(file) : null}
                      style={{ width: "60px", height: "60px" }}
                      alt="product"
                      className="preview-img"
                    />
                    <button
                      className="remove-img-btn"
                      type="button"
                      onClick={() => this.deleteImagePreviewClient(index)}
                    >
                      X
                    </button>
                  </div>
                );
              })} */}
          </div>
        </div>
      </>
    );
  }
}

export default FileUpload;
