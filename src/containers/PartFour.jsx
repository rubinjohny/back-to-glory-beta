import React, {useState, useEffect} from 'react'
import {ScatterPlot} from '../components/ScatterPlot'
import Players from '../data/topplayers.json'
import Select from 'react-select';

const options = [
    { value: '2013/2014', label: '2013/2014' },
    { value: '2014/2015', label: '2014/2015' },
    // { value: '2015/2016', label: '2015/2016' },
    // { value: '2016/2017', label: '2016/2017' },
    // { value: '2017/2018', label: '2017/2018' },
    // { value: '2018/2019', label: '2018/2019' },
    // { value: '2019/2020', label: '2019/2020' }
]

export const PartFour = () => {

    const [selectedOption, setSelectedOption] = useState("2013/2014")
    const [data, setData] = useState(Players[selectedOption])
    const handleChange = selected => {
        setSelectedOption(selected.value)
        setData(Players[selected.value])
    }

    return(
        <div>
            <div style={{ margin: 30 }}>
                <h2> Part 4 - Top Players Post Ferguson Era</h2>
            </div>

            <div style={{ width:200, margin:"auto"}}>
                <Select 
                    options={options} 
                    defaultValue={selectedOption}
                    value={selectedOption}
                    onChange={handleChange}
                    style={{width:200}}
                    width="200px"
                />
            </div>
        
            <div style={{padding:30}}>
                <ScatterPlot data={data} />
            </div>
        </div>
    )
}