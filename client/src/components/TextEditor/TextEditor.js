import { useState } from "react";
import ReactMarkdown from "react-markdown";

import "./TextEditor.css";

import gfm from "remark-gfm";

export default function TextEditor(props) {
  // expect certain props to assign it to forms and so that you can select the text area using functions
  const [text, setText] = useState(props.value);

  // sets the text to the value of the input field, and updates its parents (if any)
  function changeText(event) {
    setText(event.target.value)
    if (props.alterContent) {
      props.alterContent(text)
    }
  }

  let reactMarkdownSettings
    let extraFormattingOptions

  if (props.blog === "true") {
    reactMarkdownSettings = { h1: "h3", h2: "h4", h3: "h5", h4: "h6" }
    extraFormattingOptions = "flex"
  } else {
    reactMarkdownSettings = { h1: "h5", h2: "h6", h3: "h5", h4: "h6", h5: "h6", hr:"p", img:"p", pre: "p", input: "p", table: "p", tbody: "p", td: "p", th: "p", thead: "p", tr: "p"}
    extraFormattingOptions = "none"
  }

  function formatText(event, insertOne, insertTwo = "") {
    event.preventDefault();
    var content = document.getElementById(props.targetId);
    var startPosition = content.selectionStart;
    var endPosition = content.selectionEnd;
    if (startPosition === endPosition) {
      content.value += insertOne + insertTwo;
      content.selectionStart = startPosition + insertOne.length;
      content.selectionEnd = endPosition + insertOne.length;
      content.focus();
    } else {
      // save the string that's selected
      let selection = content.value.substring(startPosition, endPosition);
      // add the formatting before and after
      content.value =
        content.value.substring(0, startPosition) +
        insertOne +
        selection +
        insertTwo +
        content.value.substring(endPosition, content.value.length);
      content.selectionStart =
        startPosition + selection.length - insertOne.length;
      content.selectionEnd = endPosition + selection.length - insertTwo.length;
      content.focus();
    }
  }

  return (
    <div className="TextEditor">
      <textarea
        id={props.targetId}
        style={{height: `${props.heightInRem}rem`}}
        value={text}
        onChange={changeText}
      ></textarea>
      <div className="TextEditorButtonContainer">
        <div className="NormalButtonContainer">
          <button onClick={(e) => formatText(e, "**", "**")} className="tooltip">
            <strong>🇧</strong>
            <span className="tooltiptext">
                Bold</span>
          </button>
          <button onClick={(e) => formatText(e, "*", "*")} className="tooltip">
            <em>🇮</em>
            <span className="tooltiptext">Italic</span>
          </button>
          <button onClick={(e) => formatText(e, "~", "~")} className="tooltip">
            <strike>s</strike>
            <span className="tooltiptext">Strikethrough</span>
          </button>
          <button onClick={(e) => formatText(e, "> &quot;", "&quot;")} className="tooltip">
          <p className="ButtonText">Quote</p>
          <span className="tooltiptext">Quote</span>
          </button>
          <button onClick={(e) => formatText(e, "- ", "")} className="tooltip">
            <p className="ButtonText">
              &#8226; &#x2015;<br></br>
              &#8226; &#x2015;<br></br>
              &#8226; &#x2015;
            </p>
            <span className="tooltiptext">Bullet List</span>
          </button>
          <button onClick={(e) => formatText(e, "1. ", "")} className="tooltip">            <p className="ButtonText">
              1 &#x2015;<br></br>
              2 &#x2015;<br></br>
              3 &#x2015;
            </p>
            <span className="tooltiptext">Number List</span>
            </button>
        </div>

        <div className="ExtendedButtonContainer" style={{display: extraFormattingOptions}}>
          <button onClick={(e) => formatText(e, "--- ", "")} className="tooltip">
          <p className="ButtonText">&#x2015;</p>
          <span className="tooltiptext">Page Break</span>
          </button>
          <button onClick={(e) => formatText(e, "# ")} className="tooltip">
          <p className="ButtonText">
            <span className="h1">Title</span>
            </p>
            <span className="tooltiptext">Title</span>
          </button>
          
          <button onClick={(e) => formatText(e, "## ")} className="tooltip">
          <p className="ButtonText">
          <span className="h2">Sub Title</span>
            </p>
            <span className="tooltiptext">Sub-Title</span>
          </button>
          <button onClick={(e) => formatText(e, "### ")} className="tooltip">
          <p className="ButtonText">
          <span className="h3">Header</span>
            </p>
            <span className="tooltiptext">Header</span>
          </button>
          <button onClick={(e) => formatText(e, "#### ")} className="tooltip">
          <p className="ButtonText">
          <span className="h4">Sub Header</span>
            </p>
            <span className="tooltiptext">Sub-Header</span>
          </button>
        </div>
      </div>
      <h4 className="TextEditorPreviewTitle">Preview</h4>
      <div className="TextEditorPreview">
        <ReactMarkdown
          remarkPlugins={[gfm]}
          components={reactMarkdownSettings}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
