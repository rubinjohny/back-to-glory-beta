import React from 'react';
import {LineChart} from '../components/LineChart'

const descriptionStyle = {
    margin:50,
    display:"flex",
    fontSize:22,
    lineHeight:1.5
}

export const PartOne = props => {

    return(
        <div style={{margin:30}}>
            <h2>Pre/Post Ferguson Era</h2>

            <div style={{display:'flex', flexDirection:"row",flex:1}}>
                <div style={{flex:1.5}}>
                    <span style={descriptionStyle}>Under the 18 years of leadership of Ferguson, Manchester United achieved 11 championships and consistently held the top three positions. Season 2013-2014 saw a sharp decline to the 7th position after the team was restructured under the leadership of David Moyes. It can also be understood that recovery to 2nd position was only achieved 5 years later.</span>
                </div>
                <div style={{flex:2}}>
                    <LineChart 
                        id="line-chart-finish"
                        type="finish" 
                        invert={false} 
                        xLabel="seasons"
                        yLabel="Finishes"
                    />
                </div>
            </div>
            <div style={{display:'flex', flexDirection:"row",flex:1}}>
                <div style={{flex:1.5}}>
                    <span style={descriptionStyle}>During the leadership of Ferguson, Manchester United maintained an average of 83 points with the highest acheived point totaling 91 for the season 1999/2000 and the lowest point being 75. In the season of 2013-2014 we see yet another sharp decline to 64 making this the lowest point scored in the history of the team. It is noted that the team has not fully recovered from this decline with the highest Post Ferguson Era point still at 81.</span>
                </div>
                <div style={{flex:2}}>
                    <LineChart 
                        id="line-chart-point"
                        type="points" 
                        invert={true} 
                        xLabel="seasons"
                        yLabel="Points"
                    />
                </div>
            </div>
            <div style={{display:'flex', flexDirection:"row",flex:1}}>
                <div style={{flex:1.5}}>
                    <span style={descriptionStyle}>Here we see an interesting shift in the nature of the data. While the average goal difference in the Ferguson era was 44 and Post- Ferguson era is 24, we do see highs and lows in both eras. While Coach Mourinho was able to achieve a goal difference of 40 in the season 2017 - 2018, it can be inferred that the goal difference of the team sufferred under the various other coach tenures.</span>
                </div>
                <div style={{flex:2}}>
                    <LineChart 
                        id="line-chart-goalDiff"
                        type="goaldiff" 
                        invert={true} 
                        xLabel="seasons"
                        yLabel="Goal Difference"
                    />
                </div>
            </div>
        </div>
    )
}