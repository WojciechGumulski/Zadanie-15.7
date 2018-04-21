class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []   
        };
    }

    reset() {
        this.setState ({
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        });
    }

    
    format() {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	start() {
    	if (!this.state.running) {
        	this.setState ({
                running: true
            });
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
    	if (!this.state.running) return;
    	this.calculate();
	}

	calculate() {
        if (!this.state.running) return;
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

        miliseconds++;

        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        })
    }

	stop() {
    	this.state.running = false;
    	clearInterval(this.watch);
	}

	

    save() {
    	const newResults = this.state.results.slice();
    	newResults.push(this.format());

    	this.setState({
    		results: newResults
    	});
    	
    }

    clear () {
    	this.setState({results: []});
    }
    
    pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
       	result = '0' + result;
    }
    return result;
    }
    
    render() {
    	
    	return React.createElement('div', {},
    		React.createElement('div', {},
    		React.createElement('button', {onClick: () => this.start()}, 'Start'),
    		React.createElement('button', {onClick: () => this.stop()}, 'Stop'),
            React.createElement('button', {onClick: () => this.reset()}, 'Zeruj'),
            React.createElement('button', {onClick: () => this.save()}, 'Zapisz wynik'),
            React.createElement('button', {onClick: () => this.clear()}, 'Wyczyść listę wyników'),
            
    	),
    	React.createElement('div', {id: 'stopwatch'}, this.format()),
    	React.createElement('ol', {}, this.state.results.map((item, key) => {return React.createElement('li', {key}, item)})
		),    	
    	)

    }

}

var element = React.createElement(Stopwatch);

ReactDOM.render(
	element,
	document.getElementById('app')
);