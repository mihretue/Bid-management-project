import React from 'react'
import ReactDOM from 'react-dom'
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import Button from '@material-ui/core/Button'
import {AiFillHome} from 'react-icons/ai'
import {FaUsersCog} from 'react-icons/fa'
import {MdOutlineManageAccounts} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoBan} from 'react-icons/io5'
import {RiLoaderLine} from 'react-icons/ri'
import {FaUsers} from 'react-icons/fa'
import {BsArrowRight} from 'react-icons/bs'
import { Avatar } from 'evergreen-ui'
export default function SidebarTabsExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage User Accounts', 'Me'], [])

  return (
    <Pane className='row container-fluid' height={240}>
      <Tablist className="col-md-3 col-12">
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
             
            >
               {tab}
            </Tab>
          )
        })}
        <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
        <Avatar
         src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
         name="Alan Turing"
         size={40}
        />
        <h6 className='text-center'>Mehretu Endeshaw</h6>
        <p className='fs-9 m-0 text-break text-center'>mihretuendeshaw84@gmil.com</p>
       </div>
      </Tablist>
      <Pane className="col-md-9 col-12 " >
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'inline-block' : 'none'}
            key={tab}
            role="tabpanel"
            className='container-fluid'
          >
            {tab=="Manage User Accounts"?
            <div className='w-100' style={{height:'10rem'}}>
               <h3 className='m-0 text-center fs-6'>Manage User Accounts</h3>
               <div className='row justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
                 <div className='col-5 border rounded col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <FaUsers style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>All users</p>
                    <p className='m-0 fs-6'>567</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     Manage
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
                 <div className='col-5 ms-auto ms-md-0 border rounded  col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <RiLoaderLine style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Waiting For Approval</p>
                    <p className='m-0 fs-6'>23</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     Manage
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
                 <div className='col-12 my-md-0 my-2 border rounded  col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <IoBan style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Banned users</p>
                    <p className='m-0 fs-6'>13</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     Manage
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
               </div>
            </div>
            :
            (tab=="Me"?
            <p>dfd</p>:
            (tab=="Other"?
            <p>heh</p>:
            <p>hi</p>))}
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
