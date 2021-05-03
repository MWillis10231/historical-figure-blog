import React, { useEffect, useState } from "react";

export default function ImageList(props) {
    const [imageSelected, setImageSelected] = useState(props.value);

// this function gets the list of images from the server
  async function getImagesFromServer() {
    const response = await fetch(`/api/images/`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    return response
  }

  // change the image in state and in parent
  function changeTheImage(image) {
    setImageSelected(image)
    props.alterImage(image)
  }

  // combination of useState and useEffect so it's not called forever
  const [serverImageList, setServerImageList] = useState(null)

  useEffect(() => {
    if (serverImageList === null) {
      getImagesFromServer().then(response => response.json()).then(response => setServerImageList(response))
    } 
  }, [serverImageList]);


  // props.targetId
  // props.value
  // pass down a function to alter the value in the OG

  if (serverImageList) {
    return (
        <React.Fragment>
        <label htmlFor={props.targetId}>Select an image from the server</label>
        <select id={props.targetId} name="serverImageChoice" onChange={(e) => changeTheImage(e.target.value)} value={imageSelected}>
        {serverImageList.map(function(value, index) {
            return (
                <option key={`serverImageList${index}`} name="serverImageChoice" value={value.name}>{value.name}</option>
            )
        })

        }
        </select>
        </React.Fragment>
    )
  } else {
  return (
    <div>
        List of images should be here
    </div>
  )
  }
}