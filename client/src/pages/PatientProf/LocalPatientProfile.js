import React, { Component } from 'react'
import { DialogActions, Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';




export class LocalPatientProfile extends Component {

    constructor(props) {       
        super(props);

         this.state = {
             anchorEL:null,
             openProfile:false
            };
            
        }

        generalInfo(settings, classes){
            return (
                <div className="localProfileGrid">
                    {/* university */}

                    <div className="flex flex-center justify-spacearound">
                        <SchoolIcon color="primary" fontSize="large">
                            <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.prevMedicalHistory}
                              </Typography>
                              <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.allergies}
                              </Typography>
                              <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.injuries}
                              </Typography>
                              <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.bloodGroup}
                              </Typography>
                              <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.phone}
                              </Typography>
                              <Typography
                              className={classes.infoItems}
                              variant="subtitle1">
                                  {settings.emaill}
                              </Typography>
                        </SchoolIcon>
                        </div> 
                    
                </div>
            )

        }
    
    
      
    
}

export default LocalPatientProfile;