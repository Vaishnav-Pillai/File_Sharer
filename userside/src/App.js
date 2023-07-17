import React, { useRef, useState } from 'react';
import './App.css';
import Alert from './Alert';

function App() {

  const [file,setFile] = useState('');
  const [result,setResult] = useState('');
  const [alert, setAlert] = useState(null);
  const inputFile = useRef();

  const uploadUrl = "http://localhost:3000/api/upload";


  // useEffect(() => {
  //   const getFile = () => {
  //     if(file) {
  //       const data = new FormData();
  //       data.append("name",file.name);
  //       data.append("file", file);

  //       console.log(data);

  //       fetch("http://localhost:3000/api/upload",{
  //         method: "POST",
  //         crossDomain: true,
  //         headers: {
  //           "Content-type": "Application/json",
  //           Accept: "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //         body: JSON.stringify(data),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //         })

  //     }
  //   }
  //   getFile();
  // }, [file])

  const getFile = () => {
    var id;
    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE){
        console.log(xhr.response);
        id = JSON.parse(xhr.response);
        console.log(id._id);
        setResult(`${uploadUrl}/${id._id}`);
      }
    }
    
    xhr.open("POST", uploadUrl);
    xhr.send(data);

  }

  const showAlert = (message,type)=>{
    setAlert({
      message: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const CopyClick = ()=>{
    navigator.clipboard.writeText(result);
    document.getSelection().removeAllRanges();
    showAlert("Copied to ClipBoard","success");
  }

  const onUpload = () => {
    if(!file){
      inputFile.current.click();
    }
    else{
      getFile();
    }
  }

  return (
    <div>
      <Alert alert={alert}/>
      <div className="my-2" style={{ display:'flex', justifyContent:'center'}}>
        <div className="card" style={{width: '60%', height: '50%', background: 'rgba(255,255,255,0.5)', border: '2px dashed black', boxShadow: '10px 20px 20px #00002e' }}>
          <div className="card-body my-2">
              <h1 className="card-title" style={{textAlign: 'center', fontFamily: 'fantasy', letterSpacing: '1px'}}><u>Share Your File At Your Ease</u></h1>
              <p/>
              <p className="card-text" style={{textAlign: 'center', fontFamily: 'cursive'}}>Choose the File &gt; Upload the File &gt; Share/Download Using the Link</p>
              <p></p><br/>
              <div className='text-center'>
                <input type="file" className="form-control input-group" style={{border: '2px dashed black'}} ref={inputFile} onChange={(e) => setFile(e.target.files[0])}/>
                <p/>
                <button type="button" className="btn btn-outline-dark my-4" onClick={() => onUpload()}>Upload File</button>
                <a href={result} style={{display: result?'block':'none', backgroundColor: 'black', color: 'white', textDecoration: 'none', border: '2px solid white', borderRadius: '7px', padding: '3px 3px', fontSize: '15px'}}>{result}</a>
                <div style={{display: result?'block':'none', textAlign: 'center'}}>
                  <button className="btn btn-outline-dark my-3" onClick={CopyClick} >Copy Link</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
