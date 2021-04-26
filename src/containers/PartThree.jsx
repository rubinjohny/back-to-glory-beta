import React,{useState} from 'react'
import { Scrollama, Step } from 'react-scrollama';
import {GroupedBarChart} from '../components/GroupedbarChart';
import {BarChart} from '../components/BarChart';
import {PieChart} from '../components/PieChart';


const textData = {
    "managers": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "spending": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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