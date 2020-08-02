import React from 'react';
import './InfoBox.css'
import {Card,CardContent,Typography } from '@material-ui/core';
function InfoBox({title,cases,total,isred,active, ...props}) {
    return (
        <div  className = {`info_box ${active && "info_box--selected"} ${active && isred && "info_box--red"} ` }  onClick =  {props.onClick}>
            <Card>
                
                <CardContent>
                    <Typography color = "textSecondary" className = "infoBox_title">
                        {title}
                    </Typography>
                    <h2 className = {`infoBox_cases ${!isred && "info_box--recovered"}`}>
                        {cases}
                    </h2>
                    <Typography className = "infoBox_total">
                       Total:  {total}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
export default InfoBox