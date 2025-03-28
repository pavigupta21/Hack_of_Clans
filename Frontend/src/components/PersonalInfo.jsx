import React, { useState, useEffect } from 'react'
import { BioInput} from './Input'
import Input from './Input'
import { Hotel } from 'lucide-react'
import { useClanStore } from '../store/clan.store'

const PersonalInfo = () => {
  
  const { update_personal_info , personal_Info} = useClanStore(); 
  const [bio, setBio] = useState(personal_Info.bio || "");
  const [college, setCollege] = useState(personal_Info.college || "");


  useEffect(() => {
    console.log("Before updation bio", {bio:bio, college:college});
    update_personal_info(bio, college);
    console.log("Updated bio", {bio:bio, college:college});
  }, [bio, college, update_personal_info]);

  return (
    <>
    <div>
        <BioInput onChange = {(e) => setBio(e.target.value)} value = {personal_Info.bio}/>
    </div>
    <div>
        <Input icon={Hotel} placeholder = 'College' type = 'text' onChange= {(e) => setCollege(e.target.value)} value = {personal_Info.college} />
    </div>
    </>

  )
}

export default PersonalInfo