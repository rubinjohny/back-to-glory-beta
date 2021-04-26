import React, {useState} from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { MultipleLineChart } from '../components/MultipleLineChart'


const textData = {
    "finishes": "Over the course of 7 years, while Manchester United found it very difficult to win titles, rival teams such as Liverpool and Manchester City found success by winning leagues!",
    "points": "This 7 season period also saw Manchester City acheive an all time high points tally of 100 points and Liverpool acheiving 99 points. These total points tally were too big to match for Manchester united who could only hit 81 points tally.",
    "goal-differences": "Goal differences direclty affects the chances of winning games. The difference between Man utd and Their rival teams are very evident here. Manchester United during this period consistently lacked defensively as well as offensively."
}

const getGraph = type => {
    switch (type) {
        case "finishes": {
            return (
                <MultipleLineChart
                    id="multiple-line-chart-finish"
                    type="finish"
                    invert={false}
                    xLabel="seasons"
                    yLabel="Finishes"
                />
            )
        }
        case "points": {
            return <MultipleLineChart
                id="multiple-line-chart-point"
                type="points"
                invert={true}
                xLabel="seasons"
                yLabel="Points"
            />
        }
        case "goal-differences": {
            return <MultipleLineChart
                id="multiple-line-chart-goalDiff"
                type="goaldiff"
                invert={true}
                xLabel="seasons"
                yLabel="Goal Differences"
            />
        }
        default: {
            return null
        }
    }
}

export const PartTwo = () => {
    const [data, setData] = useState("finishes");
    const [steps, setSteps] = useState(["finishes", "points", "goal-differences"]);
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
                <h2> Part 2 - Post Ferguson Era</h2>
            </div>

            <div
                style={{
                    padding: '40vh 2vw 20vh',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
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
            </div>
        </div>
    )
}