import {useState} from 'react'

const Butt = ({handleClick, handleTrigger, text}) => (
    <button onClick={function(event) { handleClick(); handleTrigger()}}>
        {text}
    </button>

)

const AnecButt = ({handleAnecdote, handleAnecTrig}) => (
    <button onClick={function(event) { handleAnecdote(); handleAnecTrig()}}>
    next anecdote
    </button>

)

const VoteButt = ({handleVote, handleVoteTrig}) => (
    <button onClick={function(event) { handleVote(); handleVoteTrig()}}>
        vote
    </button>

)   

const Display = ({triggered, a, b, c}) => {
    if (triggered > 0) {
        return (
            Stats({a, b, c})
            )
        }
    else {
        return (
        <div>
            No feedback given
        <p></p>
        </div>
        
        )
    }
}   

const Stats = ({a, b, c}) => {
    return(<div>
        <table>
            <tbody>
            <tr>
                <td>good {a}</td>
            </tr>
            <tr>
                <td>neutral {b}</td>
            </tr>
            <tr>
                <td>bad {c}</td>
            </tr>
            <tr>
                <td>all <Adder a = {a} b = {b} c = {c}></Adder></td>
            </tr>
            <tr>
                <td>average <Avger a = {a} b = {b} c = {c}></Avger></td>
            </tr>
            <tr>
                <td>positive <Sentiment a = {a} b = {b} c = {c}></Sentiment>%</td>
            </tr>
            </tbody>
        </table>
        <p></p>
        </div>)
}

const AnecDisplay = ({anecTrig, anecdotes, selected}) => {
    if (anecTrig > 0) {
    return (
        <div>
            {anecdotes[selected]}
            
        </div>

        
        )
    }
    
}

const VoteDisplay = ({voteCount, selected, voteTrig}) => {
    if (voteTrig > 0) {
        return (
            <div>
                has {voteCount[selected]} votes
            </div>
        )
    }
}


const Adder = ({a, b, c,}) => (a + b + c)

const Avger = ({a,b,c}) => {
    return (a - b) / (a + b + c)
}

const Sentiment = ({a, b, c}) => {
    return (a / (a + b + c)) * 100
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
      ]
    const [selected, setSelected] = useState(0)
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [triggered, setTrigger] = useState(0)
    const [anecTrig, setAnecTrig] = useState(0)
    const [voteCount, setVoteCount] = useState(new Uint8Array(7))
    const [voteTrig, setVoteTrig] = useState(0)
    const maxIndex = voteCount.indexOf(Math.max(...voteCount))
    const handleGoodClick = () => {
    setGood(good + 1)
      }
    const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
    setBad(bad + 1)
        }
    const handleTrigger = () => {
    setTrigger(triggered + 1)
    }
    const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
    }
    const handleAnecTrig = () => {
    setAnecTrig(anecTrig + 1)
    }
    const handleVote = () => {
        let newArray = [...voteCount]
        newArray[selected] += 1 
        setVoteCount(newArray)
    }
    const handleVoteTrig = () => {
    setVoteTrig(voteTrig + 1)
    }
    return (
        <div>
            <h1>give feedback</h1>
            <Butt handleClick ={handleGoodClick}
            handleTrigger = {handleTrigger} text = 'good'/>
            <Butt handleClick ={handleNeutralClick} 
            handleTrigger = {handleTrigger} text = 'neutral'/>
            <Butt handleClick ={handleBadClick}
            handleTrigger = {handleTrigger} text = 'bad'/>
            <h1>statistics</h1>
            <Display triggered = {triggered} a = {good} b = {neutral} c = {bad}/>
            <h3>Annecdote of the day</h3>
            <AnecDisplay anecdotes = {anecdotes} selected = {selected} 
            anecTrig = {anecTrig}/>
            <VoteDisplay voteCount = {voteCount} selected = {selected} voteTrig = {voteTrig}/>
            <AnecButt handleAnecdote = {handleAnecdote} handleAnecTrig = {handleAnecTrig}/>
            <VoteButt handleVote = {handleVote} handleVoteTrig = {handleVoteTrig}/>
            <h3>Anecdote with most votes</h3>
            <AnecDisplay anecdotes = {anecdotes} selected = {maxIndex} 
            anecTrig = {anecTrig}/>
            <VoteDisplay voteCount = {voteCount} selected = {maxIndex} voteTrig = {voteTrig}/>
        </div>
    )
}

export default App