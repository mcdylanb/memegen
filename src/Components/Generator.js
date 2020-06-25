import React, { useState, useEffect, Component } from "react";
import axios from "axios";
const url = "https://api.imgflip.com/get_memes";

require("dotenv").config();

console.log(process.env);
export default class Generator extends Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

const App = () => {
  const [picture, setPicture] = useState("");
  const [dummy, setDummy] = useState([]);
  const [topText, SetTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [naniiii, setNaniiii] = useState("https://i.imgflip.com/46a7zi.jpg");

  useEffect(() => {
    axios.get(url).then((response) => setPicture(response.data.data.memes));
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const randNum = Math.floor(Math.random() * picture.length);
      setDummy(picture[randNum].url);

      const params = {
        template_id: picture[randNum].id,
        text0: topText,
        text1: bottomText,
        username: process.env.REACT_APP_IMGFLIP_USERNAME,
        password: process.env.REACT_APP_IMGFLIP_PASSWORD,
      };
      const response = await fetch(
        `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
      );
      const json = await response.json();
      const magic = json.data.url;
      setNaniiii(magic);

      console.log("why", params);
    } catch (error) {}
  };

  function save2() {
    var gh = naniiii;

    var a = document.createElement("a");
    a.href = gh;
    a.download = "image.png";

    a.click();
  }
  if (!picture)
    return (
      <div className="container">
        <img
          className="invert"
          src={require("./loading-png-gif.gif")}
          alt="loading..."
        />
      </div>
    );

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="form">
          <div className="nai">
            <button className="nainput">GENERATE</button>
          </div>
          <div className="nai">
            <input
              className="nainput"
              type="text"
              name="topText"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => SetTopText(e.target.value)}
            />
          </div>
          <div className="nai noy">
            <input
              className="nainput"
              type="text"
              name="bottomText"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="nai sasdnai ">
        <button onClick={save2}>Save</button>
      </div>

      <div className="gamay">
        <div className="meme">
          <img src={naniiii} alt="" />
          <p>The site loads like shit by the way</p>
        </div>
      </div>
    </div>
  );
};
