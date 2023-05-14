import { Button } from "@mui/material"
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { generateDownload } from "./utlis/cropImage";



function App() {

  const inputRef = useRef();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null)
  const [crop, setCrop] = useState({
    x: 0,
    y: 0
  })
  const [zoom, setZoom] = useState(1)
  const [output, setOutput] = useState(null)

  const triggerFileSelectedPopup = () => inputRef.current.click();

  const onCropComplete = (croppedAreaPercentages, croppedAreaPixels) => {
    console.log(croppedAreaPixels)
    setCroppedArea(croppedAreaPixels)
  }

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.addEventListener('load', () => {
        setImage(reader.result)
      })
    }
  }

  const onDownload = () => {
    setOutput(generateDownload(image, croppedArea))
    console.log(output)
  }


  return (
    <>
      <div className="container">
        <div className="container-cropper">
          {image ?
            <>
              <div className="cropper">
                <Cropper image={image} crop={crop} zoom={zoom} aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="slider">
                <Slider min={1} max={3} step={0.1} value={zoom} onChange={(e, zoom) => setZoom(zoom)} />
              </div>

            </> : null}
        </div>
        <div className="container-buttons">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={onSelectFile}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectedPopup}
            style={{ marginRight: "10px" }}
          >Choose</Button>
          <Button variant="contained" color="secondary" onClick={onDownload}>Download</Button>
        </div>
      </div>
      {output && <div>
        <img src={image} />
      </div>}
    </>
  )
}

export default App
