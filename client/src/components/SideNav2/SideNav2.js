import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



function SideNav2() {

return (
 <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
 <SideNav.Toggle />
 <SideNav.Nav defaultSelected="home">
     <NavItem eventKey="home">
         <NavIcon>
             <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
         </NavIcon>
         <NavText>
             Home
         </NavText>
     </NavItem>
     <NavItem eventKey="log">
         <NavIcon>
             <i className="fas fa-user-nurse" style={{ fontSize: '1.75em' }} />
         </NavIcon>
         <NavText>
             Doctor
         </NavText>
     </NavItem>
     <NavItem eventKey="clinic">
         <NavIcon>
             <i className="fas fa-clinic-medical" style={{ fontSize: '1.75em' }} />
         </NavIcon>
         <NavText>
             Clinic
         </NavText>
     </NavItem>
     <NavItem eventKey="chart">
         <NavIcon>
             <i className="fas fa-chart-bar" style={{ fontSize: '1.75em' }} />
         </NavIcon>
         <NavText>
             Chart
         </NavText>
     </NavItem>
     <NavItem eventKey="healthlog">
         <NavIcon>
             <i className="fas fa-heartbeat" style={{ fontSize: '1.75em' }} />
         </NavIcon>
         <NavText>
             Health Log
         </NavText>
         <NavItem eventKey="healthlog/symptoms">
             <NavText>
             Symptoms
             </NavText>
         </NavItem>
         <NavItem eventKey="healthlog/Prescriptions">
             <NavText>
             Prescriptions
             </NavText>
         </NavItem>
     </NavItem>
 </SideNav.Nav>
 </ SideNav>
)
}

export default SideNav2;