import { useState } from "react";
import Styles from './experience.module.css'
import { IPostData } from "../main/main.types";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {VisuallyHiddenInput } from '@chakra-ui/react'
import { useAddPostMutation } from "../../api/userApi";

const Experience = () => {
    const userName : string = useSelector((state : any) => state.user.name)
    const [state, setState] = useState(false);
    const [data, setData] = useState<IPostData>({country : '', place : '', experience : '', state : '', files : [], date : ''});
    const [imagePreview, setImagePreview] = useState(false);
    const [addPost] = useAddPostMutation();

    
    
    
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
      setData({country : data.country,state : data.state, place : data.place, experience : data.experience, files : Array.from(e.target.files as Iterable<File>), date : data.date});
      setImagePreview(true);// e.target.files type is FileList

    }

    const deleteFile = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
              e.preventDefault();
              const element = (e.target) as HTMLButtonElement;
              const fileName  = element.dataset.file;
              const newFiles = data.files.filter((file) => file.name!=fileName);
              setData({...data,files : newFiles});
    }

    const updateDate = (e : React.ChangeEvent<HTMLInputElement>) => {
      setData({country : data.country,state : data.state, place : data.place, experience : data.experience, files: data.files, date : e.target.value});
    };

    const submitData = async (e : React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         console.log(data.files)
         const formData = new FormData();
        formData.append('user',userName)
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

        const response = await addPost(formData).unwrap();
        const res = await response.text();
        if (res === 'Succesfully added'){
            alert('Succesfully added')
        } else {
            alert('error')
        }  
    }

    return (
        <form  onSubmit={submitData} encType='multipart/form-data' className={Styles['form']}>
                        <div>
                              <label>Date Of Travel : </label>
                              <input type="date" onChange={updateDate} required></input>
                        </div>
                        <div>
                              <label>Country : </label>
                              <input type="text" value={data.country} onChange={updateCountry} required></input>
                        </div>
                        <div>
                              <label>State : </label>
                              <input type="text" value={data.state} onChange={updateState} required></input>
                        </div>
                        <div>
                              <label>Place :  </label>
                              <input type="text" value={data.place} onChange={updatePlace} required></input>
                        </div>
                        
                        
                        <label className={Styles["Experience"]}>Experience :  <textarea rows={30} cols={100} maxLength={10000} value={data.experience} onChange={updateExperience}></textarea></label>
                        
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                <label>upload Photos/videos  <VisuallyHiddenInput type="file" multiple={true} name='file' accept=".png, .jpg, .jpeg"  onChange={updateFile} required/></label>
                              
                        </Button>
                        {data.files.length >0 && <h3>{data.files.length} selected</h3>}
                        {imagePreview && (URLFile.map((file) => {
                            return(
                            <div>
                                    <img src={URL.createObjectURL(file)} height="200px" width="200px"/>
                                    <button onClick={deleteFile} data-file={file.name}>Remove</button>
                           </div>)})
                        )}
                        
                       
                        
                        <button className={Styles["post"]}  type="submit">Post</button>
        </form>
    )
}

export default Experience;