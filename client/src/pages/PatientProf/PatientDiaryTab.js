import React, { Component } from 'react';
import IconButton from '@material-ui/icons/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const actionStyles = theme => 
    ({
        root: {
            color: secondary
        }
    })

export class PatientDiaryTab extends Component {
    constructor(props) {
        super(props);
        this.handlePage1 = this.handlePage1.bind(this);
        this.handleBackBtn = this.handleBackBtn.bind(this);
        this.handleFwdBtn = this.handleFwdBtn.bind(this);
    }
    handlePage1 = (e) => {
        this.props.onChangePage(e, 0)
    }
    handleBackBtn = (e) => {
        this.props.onChangePage(e, this.props.page - 1)
    }
    handleFwdBtn = (e) => {
        this.props.onChangePage(e, this.props.page + 1)
    }
    render() {

        const { classes, count, page } = this.props;

        return (
            <div>
                <IconButton 
                onClick={this.handlePage1}
                disabled = {this.page === 0}
                {theme.direction === "" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
                />

            </div>
        )
    }
}

export default PatientDiaryTab;
