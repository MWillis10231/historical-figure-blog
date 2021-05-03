import React from "react";
import ReactMarkdown from "react-markdown";
import "./BlogCommentEditHistory.css";
import gfm from "remark-gfm";

export default function BlogCommentEditHistory(props) {
  const reactMarkdownSettings = {
    h1: "h5",
    h2: "h6",
    h3: "h5",
    h4: "h6",
    h5: "h6",
    hr: "p",
    img: "p",
    pre: "p",
    input: "p",
    table: "p",
    tbody: "p",
    td: "p",
    th: "p",
    thead: "p",
    tr: "p",
  };

  if (props.display === "block" && props.history) {
    let commentHistory = props.history.map((historyItem, index) => {
      if (index === 0) {
        return (
          <tr key={index}>
            <td className="TableHeader">Original comment:</td>
            <td>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                components={reactMarkdownSettings}
              >
                {historyItem}
              </ReactMarkdown>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td className="TableHeader">Change {index}:</td>
            <td>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                components={reactMarkdownSettings}
              >
                {historyItem}
              </ReactMarkdown>
            </td>
          </tr>
        );
      }
    });
    return (
      <table
        className="BlogCommentEditHistory"
        style={{ display: props.display }}
      >
        <thead>
          <tr>
            <td>
              <button onClick={props.hideHistory} className="xbutton">
                X
              </button>
            </td>
            <td className="TableTitle">
              <h4>Comment History</h4>
            </td>
          </tr>

          {commentHistory}
        </thead>
        <tbody>
          <tr>
            <td className="TableHeader">Current comment:</td>
            <td>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                components={reactMarkdownSettings}
              >
                {props.current}
              </ReactMarkdown>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <table
        className="BlogCommentEditHistory"
        style={{ display: props.display }}
      ></table>
    );
  }
}
