import React, { useEffect, useState } from 'react'
import { LinksInput } from './Input'
import { useClanStore } from '../store/clan.store';

const PersonalLinks = () => {
  
  const { update_personal_links, personal_links, profilePic  } = useClanStore(); 
  const [github, setGithub] = useState(personal_links.github_link || "");
  const [linkdin, setLinkdin] = useState(personal_links.linkdin_link || "");
  const [website, setWebsite] = useState(personal_links.portfolio_link || "");


  useEffect(() => {
    update_personal_links(github, linkdin, website)
    // console.log({github_link:github, linkdin_link:linkdin, portfolio_link:website})
  }, [github, linkdin, website, update_personal_links])

  const {user} = useClanStore();

  // console.log("personal links", personal_links, "profile pic is ", profilePic)

  return (
    <div>
        <LinksInput img = '/icons8-github-48.png' name = 'github' onChange ={(e) => setGithub(e.target.value)} value = {personal_links.github_link || user.personal_links.github_link}  />
        <LinksInput img = '/icons8-linkedin-2-48.png' name = 'linkdin' onChange ={(e) => setLinkdin(e.target.value) } value = {personal_links.linkdin_link || user.personal_links.linkdin_link}/>
        <LinksInput img = '/icons8-web-account-48.png' name = 'personal website' onChange ={(e) => setWebsite(e.target.value) } value = {personal_links.portfolio_link || user.personal_links.portfolio_link}/>
    </div>
  )
}

export default PersonalLinks