import {useState} from "react";
import styles from './main.module.css';
import {IPostData} from './main.types';

const Main : React.FC = () : React.JSX.Element=> {
    const [state, setState] = useState(false);
    const [data, setData] = useState<IPostData>({country : '', place : '', experience : '', state : '', files : null, date : ''});
    const [imagePreview, setImagePreview] = useState(false);
    
    
    var URLFile: File[] = [] //FileList object doesn't have map function.FileList is object of iterables
    if (data.files){
      for (var file  of  data.files) {
        URLFile.push(file);
      }
    }
   
    var urlFiles: string[] = URLFile.map((file) => URL.createObjectURL(file)); 
    
    

    const changeState = () => {
        if (state === false) {
               setState(true);
        }
    }
    const updateCountry = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : e.target.value,state : data.state, place : data.place , experience : data.experience, files : data.files, date : data.date});
    }

    const updateState = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : data.country,state : e.target.value, place : data.place , experience : data.experience, files : data.files, date : data.date});
    }

    const updatePlace = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : data.country,state : data.state, place : e.target.value , experience : data.experience, files : data.files, date : data.date});
    }

    const updateExperience = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
      setData({country : data.country,state : data.state, place : data.place, experience : e.target.value, files : data.files, date : data.date});
    };

    const updateFile = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : data.country,state : data.state, place : data.place, experience : data.experience, files : e.target.files, date : data.date});
      setImagePreview(true);// e.target.files type is FileList

    }

    const updateDate = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : data.country,state : data.state, place : data.place, experience : data.experience, files: data.files, date : e.target.value});
    };

    const submitData = (e : React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         console.log(data.files)
         const formData = new FormData();
        formData.append('country', data.country);
        formData.append('state', data.state);
        formData.append('place', data.place);
        formData.append('experience', data.experience);
        if (data.files){
            for (const file of data.files) {
              formData.append(file.name, file);
            }
      }
        formData.append('date', data.date);

        console.log(data);
        fetch('http://localhost:3000/add', {
          method: 'POST',
          body: formData
        });
          
        
          
    }

    return (
        <>
           <button onClick={changeState}>Add Experience</button>
           {
             state && (<form  onSubmit={submitData} encType='multipart/form-data' >
                        <label>Country :  <input type="text" value={data.country} onChange={updateCountry}></input></label>
                        <label>State :  <input type="text" value={data.state} onChange={updateState}></input></label>
                        <label>Place :  <input type="text" value={data.place} onChange={updatePlace}></input></label>
                        <label>Date Of Travel : <input type="date" onChange={updateDate}></input></label>
                        <label className={styles["Experience"]}>Experience :  <textarea rows={30} cols={100} maxLength={10000} value={data.experience} onChange={updateExperience}></textarea></label>
                        <label>Image/Video<input type="file" multiple={true} name='file' accept=".png, .jpg, .jpeg" onChange={updateFile}></input></label>
                        {imagePreview && (urlFiles.map((url) => <img src={url} height="200px" width="200px"/>))}
                        <button className={styles["post"]}  type="submit">Post</button>
                      </form>)
           }
        </>
        );
}

export default Main;