import React, {useState} from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { MultipleLineChart } from '../components/MultipleLineChart'


const textData = {
    "finishes": "Under the 18 years of leadership of Ferguson, Manchester United achieved 11 championships and consistently held the top three positions. Season 2013-2014 saw a sharp decline to the 7th position after the team was restructured under the leadership of David Moyes. It can also be understood that recovery to 2nd position was only achieved 5 years later.",
    "points": "During the leadership of Ferguson, Manchester United maintained an average of 83 points with the highest acheived point totaling 91 for the season 1999/2000 and the lowest point being 75. In the season of 2013-2014 we see yet another sharp decline to 64 making this the lowest point scored in the history of the team. It is noted that the team has not fully recovered from this decline with the highest Post Ferguson Era point still at 81.",
    "goal-differences": "Here we see an interesting shift in the nature of the data. While the average goal difference in the Ferguson era was 44 and Post- Ferguson era is 24, we do see highs and lows in both eras. While Coach Mourinho was able to achieve a goal difference of 40 in the season 2017 - 2018, it can be inferred that the goal difference of the team sufferred under the various other coach tenures."
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