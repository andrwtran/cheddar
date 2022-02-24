import React from "react";
import './Footer.css'

export default function Footer() {
  return (
    <div className="Footer">
      <p>A project by Andrew Tran</p>
      <span id="github_link">
        <a href="https://github.com/andrwtran">
          <i className="fa-brands fa-github-square" />
        </a>
      </span>
      <span id="linkedin_link">
        <a href="https://www.linkedin.com/in/andrewvtran/">
          <i className="fa-brands fa-linkedin" />
        </a>
      </span>
    </div>
  );
};
