import React,{useState} from 'react'
import { Scrollama, Step } from 'react-scrollama';
import {GroupedBarChart} from '../components/GroupedbarChart';
import {BarChart} from '../components/BarChart';
import {PieChart} from '../components/PieChart';


const textData = {
    "managers": "On Comparing the team's performance under different manager's shows how much the team lacked. Under David moyes the team suffered a stagerring 12 games. LVG had a better season compared to his second but it was still not enough to win the title. Jose Mourinho's second season saw the team rise to second position and the Manager hailed it as his biggest achievement ever.",
    "spending": "Even though the team performed better in Jose Mourinho's second term, The manager had spend twice as much as his previous managers. However, JM was also responsible to selling many of under performing players he inherited from the club's previous manager.",
    "goal-differences": "Here we see an interesting shift in the nature of the data. While the average goal difference in the Ferguson era was 44 and Post- Ferguson era is 24, we do see highs and lows in both eras. While Coach Mourinho was able to achieve a goal difference of 40 in the season 2017 - 2018, it can be inferred that the goal difference of the team sufferred under the various other coach tenures."
}

const getGraph = type => {
    switch (type) {
        case "managers": {
            return (
                <GroupedBarChart />
            )
        }

        case "spending":{
            return (
                <BarChart />
            )
        }
        
        default: {
            return null
        }
    }
}


export const PartThree = () => {

    const [data, setData] = useState("managers");
    const [steps, setSteps] = useState(["managers","spending"]);
    const [progress, setProgress] = useState(0);

    const onStepEnter = ({ data }) => {
        setData(data);
    };

    const onStepExit = ({ direction, data }) => {
        if (direction === 'up' && data === steps[0]) {
            setData(0);
        }
    };

    const onStepProgress = ({ progress }) => {
        setProgress(progress)
    };


    return(
        <div>
            <div style={{ margin: 30 }}>
                <h2> Part 3 - Managers Post Ferguson Era</h2>
            </div>

            <div
                style={{
                    padding: '40vh 2vw 0vh',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{
                    flexBasis: '60%',
                    position: 'sticky',
                    width: '100%',
                    height: '60vh',
                    top: '20vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {getGraph(data)}
                </div>

                <div style={{
                    flexBasis: '35%',
                }}>
                    <Scrollama
                        onStepEnter={onStepEnter}
                        onStepExit={onStepExit}
                        progress
                        onStepProgress={onStepProgress}
                        offset={0.5}
                    >
                        {steps.map(value => {
                            return (
                                <Step data={value} key={value}>
                                    <div
                                        style={{
                                            margin: '0 auto 3rem auto',
                                            padding: '180px 0',
                                        }}
                                    >
                                        <p
                                            style={{
                                                textAlign: 'center',
                                                padding: '1rem',
                                                fontSize: '1.8rem',
                                                margin: 0,
                                            }}
                                        >
                                            {textData[value]}
                                        </p>
                                    </div>
                                </Step>
                            );
                        })}
                    </Scrollama>
                </div>
            </div>

            <div style={{display:"flex", flex:1, flexDirection:"row"}}>
                <div style={{display:"flex", flex:1, justifyContent:"center", padding:20}}>
                    <div>
                        <PieChart manager="dm" />
                        David Moyes <br /> Spent 84 million dollars on two <strong>midfield</strong> players in 1 year
                    </div>
                    
                </div>
                <div style={{display:"flex", flex:1, justifyContent:"center", padding:20}}>
                    <div>
                        <PieChart manager="lvg" />
                        Van Gaal <br /> Spent 295.35 million dollars on eight players in his 2 years and focussed more on <strong>attacking</strong> players
                    </div>
                </div>
                <div style={{display:"flex", flex:1, justifyContent:"center", padding:20}}>
                    <div>
                        <PieChart manager="jm" />
                        Jose Mourinho <br /> Spent 512.71 million dollars on ten players in his 2 years and focussed more on <strong>midfield</strong> players
                    </div>
                </div>

               
            </div>


        </div>
    )
}